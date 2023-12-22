"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../common/response");
const service_1 = require("./role-management/service");
exports.default = (permission, field = "edit") => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!permission || permission === "undefined" || permission.length === 0) {
        return (0, response_1.sendErrorResponse)(res, 403, "You do not have the authorization to access this");
    }
    const access = yield (0, service_1.getRolesByUserIdService)(Object.assign({ userId: req.userId }, req.body));
    const roles = permission;
    console.log(JSON.stringify(access.filter((f) => f.roles.some((o) => roles.includes(o.featureCode) && field && (o.all || o[field]))).length > 0));
    if (access.filter((f) => f.roles.some((o) => roles.includes(o.featureCode) && field && (o.all || o[field]))).length > 0) {
        return next();
    }
    return (0, response_1.sendErrorResponse)(res, 403, "You do not have the authorization to access this");
});
