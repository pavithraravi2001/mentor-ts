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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstituteUsers = exports.updateResetPassword = exports.findResetToken = exports.confirmationMail = exports.doPasswordReset = exports.recaptchaVerification = exports.verifyEmail = exports.resendVerifyEmail = exports.createUserByAdmin = exports.createUser = exports.getUserByEmail = exports.login = void 0;
const response_1 = require("../../common/response/");
const service_1 = require("./service");
const axios = require("axios");
const login = ({ bodymen: { body } }, res) => {
    (0, service_1.loginService)(body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => res.status(err.status || 400).json(err));
};
exports.login = login;
const getUserByEmail = ({ params }, res) => {
    (0, service_1.getUserByEmailService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getUserByEmail = getUserByEmail;
const createUser = ({ bodymen: { body } }, res) => {
    const { activationLink } = body, user = __rest(body, ["activationLink"]);
    (0, service_1.createUserService)(user, activationLink)
        .then((0, response_1.success)(res, 201))
        .catch((err) => {
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.createUser = createUser;
const createUserByAdmin = ({ bodymen: { body } }, res) => {
    const { activationLink } = body, user = __rest(body, ["activationLink"]);
    (0, service_1.createUserByAdminService)(user, activationLink)
        .then((0, response_1.success)(res, 201))
        .catch((err) => {
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.createUserByAdmin = createUserByAdmin;
const resendVerifyEmail = ({ bodymen: { body } }, res) => {
    const { activationLink, email } = body;
    (0, service_1.resendVerifyEmailService)(email, activationLink)
        .then((0, response_1.success)(res, 201))
        .catch((err) => {
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.resendVerifyEmail = resendVerifyEmail;
const verifyEmail = ({ params: { token } }, res, next) => {
    return (0, service_1.verifyEmailService)(token)
        .then((0, response_1.success)(res))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.verifyEmail = verifyEmail;
const recaptchaVerification = ({ body }, res) => {
    (0, service_1.recaptchaVerificationService)(body)
        .then((recaptchaResponse) => {
        res.json({ message: "reCAPTCHA verification successful" });
    })
        .catch((error) => {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server error" });
        }
    });
};
exports.recaptchaVerification = recaptchaVerification;
const doPasswordReset = ({ bodymen: { body: { email, link }, }, }, res) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, service_1.doPasswordResetService)(email, link)
        .then(() => {
        (0, response_1.success)(res);
    })
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
});
exports.doPasswordReset = doPasswordReset;
const confirmationMail = ({ bodymen: { body: { email, link }, }, }, res) => {
    return (0, service_1.confirmationMailService)(email, link)
        .then((0, response_1.success)(res))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.confirmationMail = confirmationMail;
const findResetToken = ({ params: { token } }, res) => {
    return (0, service_1.findResetTokenService)(token)
        .then((0, response_1.success)(res))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.findResetToken = findResetToken;
const updateResetPassword = ({ params: { token }, bodymen: { body: { password }, }, }, res, next) => {
    return (0, service_1.updateResetPasswordService)(token, password)
        .then((0, response_1.success)(res))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateResetPassword = updateResetPassword;
const getInstituteUsers = ({ params }, res) => {
    (0, service_1.getInstituteUsersService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getInstituteUsers = getInstituteUsers;
