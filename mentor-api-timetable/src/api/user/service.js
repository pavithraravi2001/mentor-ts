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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstituteUsersService = exports.updateResetPasswordService = exports.findResetTokenService = exports.doPasswordResetService = exports.confirmationMailService = exports.verifyEmailService = exports.resendVerifyEmailService = exports.createUserByAdminService = exports.createUserService = exports.getUserByEmailService = exports.recaptchaVerificationService = exports.loginService = void 0;
const qs_1 = __importDefault(require("qs"));
const aws_ses_1 = __importDefault(require("../../common/aws-ses"));
const jwt_1 = require("../../common/jwt");
const response_1 = require("../../common/response");
const model_1 = require("./model");
const axios = require("axios");
const loginService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.User.findOne({ email: body.email });
        if (!user) {
            throw new Error('User not found');
        }
        const authenticatedUser = yield user.authenticate(body.password, user.password);
        if (!authenticatedUser) {
            throw new Error('Please enter correct password');
        }
        if (!user.isVerified) {
            throw new Error("Your account has not been verified.");
        }
        const token = yield (0, jwt_1.sign)(user.id);
        const result = { token, user: user.view() };
        return result;
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.loginService = loginService;
const recaptchaVerificationService = (captcha) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!captcha) {
        const error = new Error();
        error.status = 400;
        error.message = "Recaptcha token not found";
        throw error;
    }
    const secretKey = "6Ldhc8UnAAAAAPuypW3ibo_v2nwfNNcl--w7Y9xB";
    const verificationData = {
        secret: secretKey,
        response: captcha,
    };
    try {
        const formData = qs_1.default.stringify(verificationData);
        const verificationUrl = "https://www.google.com/recaptcha/api/siteverify";
        const response = yield axios.post(verificationUrl, formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        if ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.success) {
            return response === null || response === void 0 ? void 0 : response.data;
        }
        else {
            const error = new Error();
            error.status = 400;
            error.message = "reCAPTCHA verification failed";
            throw error;
        }
    }
    catch (error) {
        return {
            status: error.status || 500,
            message: error.message || "Internal Server Error",
        };
    }
});
exports.recaptchaVerificationService = recaptchaVerificationService;
const getUserByEmailService = (params) => {
    return new Promise((resolve, reject) => {
        return model_1.User.findOne({ email: params.email })
            .then((0, response_1.notFoundError)(reject))
            .then((user) => (user ? user.view() : null))
            .then(resolve)
            .catch(reject);
    });
};
exports.getUserByEmailService = getUserByEmailService;
const createUserService = (body, link) => __awaiter(void 0, void 0, void 0, function* () {
    const { captcha } = body;
    yield (0, exports.recaptchaVerificationService)(captcha);
    try {
        const user = yield model_1.User.create(body);
        if (!user) {
            const error = new Error();
            error.status = 400;
            error.message = 'Error while creating user';
            throw error;
        }
        const activationToken = yield model_1.ActivationToken.create({ user });
        console.log(activationToken, "activationToken");
        if (!activationToken) {
            const error = new Error();
            error.status = 400;
            error.message = 'Error while creating activation token';
            throw error;
        }
        const { user: createdUser, token } = activationToken;
        console.log(createdUser, "createdUser");
        link = `${link.replace(/\/$/, '')}/${token}`;
        const content = `
        Dear, ${user.name}.<br><br>
        Welcome to our platform! We are thrilled to have you and we want to ensure that your account is fully activated so you can begin your journey with us. To get started, please click on the “Activate Account” button to activate your email account. 
       <br><br>
       <a href="${link}" style="display: inline-block; background-color: #72bf44; color: white; padding: 10px 20px; border: none; border-radius: 5px; text-decoration: none; text-align: center; font-size: 16px;">Activate Account</a>
       <br><br>
        If you did not request for a password reset, then please ignore this email. The password reset is valid only for 60mins.
        <br><br>
        Thank you for choosing our platform. We look forward to providing you with a seamless and enjoyable experience. 
        <br><br>
        <br><br>
        Best Regards, <br><br>
        &mdash; Mentor Team
      `;
        const response = yield aws_ses_1.default.sendEmail({ toEmail: createdUser.email, subject: 'Mentor - Account Activation', content });
        if (response && response.MessageId) {
            return { status: 201, message: 'A verification email has been sent to the given email. Please verify it.' };
        }
        else {
            return null;
        }
    }
    catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            const error = new Error();
            error.status = 409;
            error.message = 'Email is already registered';
            throw error;
        }
        else {
            return {
                status: err.status || 500,
                message: err.message || "Internal Server Error",
            };
        }
    }
});
exports.createUserService = createUserService;
const createUserByAdminService = (body) => {
    return new Promise((resolve, reject) => {
        return model_1.User.create(body)
            .then(resolve)
            .catch((err) => {
            if (err.name === "MongoError" && err.code === 11000) {
                const error = new Error();
                error.status = 409;
                error.message = "Email is already registered";
                reject(error);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.createUserByAdminService = createUserByAdminService;
const resendVerifyEmailService = (email, link) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.User.findOne({ email });
        if (!user) {
            const error = new Error();
            error.status = 404;
            error.message = "User not found";
            throw error;
        }
        if (user.isVerified) {
            const error = new Error();
            error.status = 400;
            error.message = "This email has already been verified. Please log in.";
            throw error;
        }
        const activationToken = yield model_1.ActivationToken.create({ user });
        const { token } = activationToken;
        link = `${link.replace(/\/$/, "")}/${token}`;
        const content = `
      Dear, ${user.name}.<br><br>
      Welcome to our platform! We are thrilled to have you, and we want to ensure that your account is fully activated so you can begin your journey with us. To get started, please click on the “Activate Account” button to activate your email account. 
      <br><br>
      <a href="${link}" style="display: inline-block; background-color: #72bf44; color: white; padding: 10px 20px; border: none; border-radius: 5px; text-decoration: none; text-align: center; font-size: 16px;">Activate Account</a>
      <br><br>
      If you did not request a password reset, please ignore this email. The password reset is valid only for 60 minutes.
      <br><br>
      Thank you for choosing our platform. We look forward to providing you with a seamless and enjoyable experience. 
      <br><br>
      Best Regards, <br><br>
      &mdash; Mentor Team
    `;
        const response = yield aws_ses_1.default.sendEmail({
            toEmail: user.email,
            subject: "Mentor - Resent Account Activation Link",
            content,
        });
        if (response && response.MessageId) {
            return {
                status: 201,
                message: "A verification email has been resent to the given email.",
            };
        }
        else {
            const error = new Error();
            error.status = 500;
            error.message = "Failed to send email";
            throw error;
        }
    }
    catch (error) {
        return {
            status: error.status || 500,
            message: error.message || "Internal Server Error",
        };
    }
});
exports.resendVerifyEmailService = resendVerifyEmailService;
const verifyEmailService = (token) => {
    return new Promise((resolve, reject) => {
        return model_1.ActivationToken.findOne({ token })
            .populate("user")
            .then((0, response_1.notFoundError)(reject))
            .then((activationToken) => {
            if (!activationToken)
                return null;
            const { user } = activationToken;
            return user
                .set({ isVerified: true })
                .save()
                .then(() => model_1.ActivationToken.deleteMany({ user }))
                .then(() => resolve({ verified: true }));
        })
            .then(resolve)
            .catch(reject);
    });
};
exports.verifyEmailService = verifyEmailService;
const confirmationMailService = (email, link) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        if (!user.isVerified) {
            throw new Error("User is not verified");
        }
        const activationToken = yield model_1.ActivationToken.create({ user });
        const { token } = activationToken;
        link = `${link.replace(/\/$/, "")}/${token}`;
        const content = `
      Dear, ${user.name}.<br><br>
      You request has been approved.<br>
      <a href="${link}">${link}</a>
    `;
        const response = yield aws_ses_1.default.sendEmail({
            toEmail: user.email,
            subject: "Confirmation Mail",
            content,
        });
        if (response && response.MessageId) {
            return { status: 200, message: "Response email is sent" };
        }
        else {
            return null;
        }
    }
    catch (error) {
        return {
            status: error.status || 500,
            message: error.message || "Internal Server Error",
        };
    }
});
exports.confirmationMailService = confirmationMailService;
const doPasswordResetService = (email, link) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Starting password reset process...');
        try {
            const user = yield model_1.User.findOne({ email });
            if (!user) {
                console.log('User not found');
                reject(new Error('User not found'));
                return;
            }
            if (!user.isVerified) {
                console.log('User not verified');
                reject(new Error('User not verified'));
                return;
            }
            console.log('User found and verified:', user);
            const reset = yield model_1.PasswordReset.create({ user });
            if (!reset) {
                console.log('Password reset not initiated');
                resolve(null);
                return;
            }
            console.log('Password reset initiated:', reset);
            const { user: resetUser, token } = reset;
            link = `${link.replace(/\/$/, '')}/${token}`;
            const content = `
        Hey, ${resetUser.name}.<br><br>
        You requested a new password for your Mentor Api account.<br>
        Please use the following link to set a new password. It will expire in 1 hour.<br><br>
        <a href="${link}">${link}</a><br><br>
        If you didn't make this request then you can safely ignore this email. :)<br><br>
        &mdash; Mentor Api Team
      `;
            const response = yield aws_ses_1.default.sendEmail({ toEmail: email, subject: 'Mentor - Password Reset', content });
            if (response && response.MessageId) {
                console.log('Password reset email is sent');
                resolve({ status: 200, message: 'Password reset email is sent' });
            }
            else {
                console.log('Email not sent or MessageId not available in the response:', response);
                resolve(null);
            }
        }
        catch (error) {
            console.error('An error occurred:', error);
            reject(error);
        }
    }));
};
exports.doPasswordResetService = doPasswordResetService;
const findResetTokenService = (token) => {
    return new Promise((resolve, reject) => {
        model_1.PasswordReset.findOne({ token })
            .populate("user")
            .then((0, response_1.notFoundError)(reject))
            .then((reset) => (reset ? reset === null || reset === void 0 ? void 0 : reset.view() : null))
            .then(resolve)
            .catch(reject);
    });
};
exports.findResetTokenService = findResetTokenService;
const updateResetPasswordService = (token, password) => {
    return new Promise((resolve, reject) => {
        return model_1.PasswordReset.findOne({ token })
            .populate("user")
            .then((0, response_1.notFoundError)(reject))
            .then((reset) => {
            if (!reset)
                return null;
            const { user } = reset;
            return user
                .set({ password })
                .save()
                .then(() => model_1.PasswordReset.deleteMany({ user }))
                .then(() => user.view());
        })
            .then(resolve)
            .catch(reject);
    });
};
exports.updateResetPasswordService = updateResetPasswordService;
const getInstituteUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.User.find().then((0, response_1.notFoundError)(reject)).then(resolve).catch(reject);
    });
});
exports.getInstituteUsersService = getInstituteUsersService;
