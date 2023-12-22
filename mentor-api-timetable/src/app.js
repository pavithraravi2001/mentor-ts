"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const api_1 = __importDefault(require("./api"));
const express_1 = __importDefault(require("./common/express"));
const mongoose_1 = __importDefault(require("./common/mongoose"));
const config_1 = require("./config");
const app = (0, express_1.default)(config_1.apiRoot, api_1.default);
const server = http_1.default.createServer(app);
// Polyfill for allseetled
if (!Promise.allSettled) {
    Promise.allSettled = (promises) => Promise.all(promises.map((promise, i) => promise
        .then((value) => ({
        status: "fulfilled",
        value,
    }))
        .catch((reason) => ({
        status: "rejected",
        reason,
    }))));
}
if (config_1.mongo.uri) {
    mongoose_1.default.connect(config_1.mongo.uri);
}
mongoose_1.default.Promise = Promise;
setImmediate(() => {
    server.listen(config_1.port, config_1.ip, () => {
        console.log("Express server listening on http://%s:%d, in %s mode", config_1.ip, config_1.port, config_1.env);
    });
});
exports.default = app;
