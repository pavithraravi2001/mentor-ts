"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.signSync = exports.sign = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const jwtSign = bluebird_1.default.promisify(jsonwebtoken_1.default.sign);
const jwtVerify = bluebird_1.default.promisify(jsonwebtoken_1.default.verify);
const sign = (id, options, method = jwtSign) => method({ id }, config_1.jwtSecret, options);
exports.sign = sign;
const signSync = (id, options) => (0, exports.sign)(id, options, jsonwebtoken_1.default.sign);
exports.signSync = signSync;
const verify = (token) => jwtVerify(token, config_1.jwtSecret);
exports.verify = verify;
