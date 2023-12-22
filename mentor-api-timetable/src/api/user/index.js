"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodymen_1 = require("bodymen");
const express_1 = require("express");
const config_1 = require("../../config");
const controller_1 = require("./controller");
const model_1 = require("./model");
const router = new express_1.Router();
const { email, password, name, profileURL, roleId, captcha } = model_1.schema.tree;
// const { token } = activationTokenSchemaDef.tree
/**
 * @api {post} /users Create user
 */
router.post("/", (0, bodymen_1.middleware)({
    activationLink: {
        type: String,
        required: false,
        default: config_1.ui.baseURL + config_1.ui.activationPath,
    },
    email,
    password,
    name,
    profileURL,
    roleId,
    captcha,
}), controller_1.createUser);
router.post("/recaptcha", controller_1.recaptchaVerification);
/**
 * @api {post} /users/email-verifications - Resend verify email
 */
router.post("/email-verifications", (0, bodymen_1.middleware)({
    activationLink: {
        type: String,
        required: false,
        default: config_1.ui.baseURL + config_1.ui.activationPath,
    },
    email,
}), controller_1.resendVerifyEmail);
/**
 * @api {put} /users/email-verifications Activate user
 */
router.put("/email-verifications/:token", controller_1.verifyEmail);
/**
 * @api {get} /users/email-verifications Activate user
 */
router.get("/email-verifications/:token", controller_1.verifyEmail);
router.get("/", (req, res) => {
    res.status(200).send("<h1> Welcome to mentor User API </h1>");
});
/**
 * @api {get} /users/login logging in user
 */
router.post("/login", (0, bodymen_1.middleware)({ email, password }), controller_1.login);
/**
 * @api {get} /users/:id Retrieve user
 */
router.get("/:email", controller_1.getUserByEmail);
/**
 * @api {post} /users/password-resets Send email
 */
router.post("/password-resets", (0, bodymen_1.middleware)({
    email,
    link: {
        type: String,
        required: false,
        default: config_1.ui.baseURL + config_1.ui.resetPassword,
    },
}), controller_1.doPasswordReset);
/**
 * @api {post} /users/confirmation-mail Send response email
 */
router.post("/confirmation-mail", (0, bodymen_1.middleware)({
    email,
    link: {
        type: String,
        required: false,
        default: config_1.ui.baseURL + config_1.ui.responseMail,
    },
}), controller_1.confirmationMail);
/**
 * @api {get} /password-resets/:token find token
 */
router.get("/password-resets/:token", controller_1.findResetToken);
/**
 * @api {put} /password-resets/:token Submit password
 */
router.put("/password-resets/:token", (0, bodymen_1.middleware)({ password }), controller_1.updateResetPassword);
/**
 * @api {post} /users/user-create-by-admin Create user by admin
 */
router.post("/user-create-by-admin", (0, bodymen_1.middleware)({
    activationLink: {
        type: String,
        required: false,
        default: config_1.ui.baseURL + config_1.ui.activationPath,
    },
    email,
    password,
    name,
    profileURL,
    roleId,
}), controller_1.createUserByAdmin);
/**
 * @api {get}/list get Users
 */
router.get("/all/users", controller_1.getInstituteUsers);
//router.post("/recaptcha", reCaptchaVerification);
exports.default = router;
