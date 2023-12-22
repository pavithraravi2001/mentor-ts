"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../config");
require("mongoose-schema-jsonschema")(mongoose_1.default);
Object.keys(config_1.mongo.options || {}).forEach((key) => {
    mongoose_1.default.set(key, config_1.mongo.options[key]);
});
/* istanbul ignore next */
mongoose_1.default.Types.ObjectId.prototype.view = function () {
    return { id: this.toString() };
};
/* istanbul ignore next */
mongoose_1.default.connection.on("error", (err) => {
    console.error("MongoDB connection error: " + err);
    process.exit(-1);
});
exports.default = mongoose_1.default;
