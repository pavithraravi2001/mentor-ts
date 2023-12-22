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
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
const jwt_1 = require("../../common/jwt");
const model_1 = require("./model");
const aws_ses_1 = __importDefault(require("../../common/aws-ses"));
const service_1 = require("./service");
const axios = require("axios");
jest.mock("./model");
jest.mock("../../common/jwt");
jest.mock("../../common/aws-ses");
jest.mock("../../common/response");
const mockAxios = new axios_mock_adapter_1.default(axios);
jest.mock("./model", () => ({
    User: {
        create: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn(),
        set: jest.fn(),
        authenticate: jest.fn(),
    },
    PasswordReset: {
        create: jest.fn(),
    },
    ActivationToken: {
        create: jest.fn(),
        findOne: jest.fn(),
        deleteMany: jest.fn(),
    },
}));
const mockToken = "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF";
const mockUser = {
    email: "pavithrar@bloomlync.com",
    name: "pavithra",
    captcha: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlGG",
    password: "123456",
    isVerified: true,
};
const mockUsers = [
    {
        email: "abc@a.com",
        password: "123456",
        name: "pavithra",
        captcha: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlGG",
        isVerified: true,
    },
    {
        email: "b@a.com",
        password: "123456",
        name: "pavithra",
        captcha: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlGG",
        isVerified: true,
    },
];
jest.mock("axios");
describe("User API", () => {
    test("POST createUserService with valid captcha", () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedResponse = {
            success: true,
        };
        const mockUser = {
            user: {
                email: "pavithrar@bloomlync.com",
                name: "pavithra",
                password: "123456",
                isVerified: true,
            },
            captcha: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlGG",
        };
        const axiosMock = jest.spyOn(require("axios"), "post");
        axiosMock.mockResolvedValue({ data: expectedResponse });
        model_1.User.create.mockResolvedValue(mockUser);
        model_1.ActivationToken.create.mockResolvedValue(mockUser);
        aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
            promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
        }));
        const link = "https://example.com/activation/";
        const recaptchaResult = yield (0, service_1.recaptchaVerificationService)("captcha");
        const mockSesResponse = {
            MessageId: 'mock-message-id',
        };
        aws_ses_1.default.sendEmail.mockImplementation(() => ({
            promise: jest.fn().mockResolvedValueOnce({}),
        }));
        aws_ses_1.default.sendEmail.mockResolvedValue(mockSesResponse);
        const resultWithMessageId = yield (0, service_1.createUserService)(mockUser, link);
        expect(resultWithMessageId.status).toBe(201);
        expect(recaptchaResult).toEqual(expectedResponse);
        expect(resultWithMessageId.message).toBe("A verification email has been sent to the given email. Please verify it.");
    }));
    test("POST createUserService Error while creating activation token", () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedResponse = {
            success: true,
        };
        const axiosMock = jest.spyOn(require("axios"), "post");
        axiosMock.mockResolvedValue({ data: expectedResponse });
        model_1.User.create.mockResolvedValue({ _id: "61ebd33f38b4e0ecc10fa5ab" });
        model_1.ActivationToken.create.mockResolvedValue(null);
        aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
            promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
        }));
        const link = "https://example.com/activation/";
        try {
            const recaptchaResult = yield (0, service_1.recaptchaVerificationService)("captcha");
            const result = yield (0, service_1.createUserService)(mockUser, link);
            console.log(result, "result");
        }
        catch (error) {
            expect(error.message).toBe("Error while creating activation token");
        }
    }));
    test("POST createUserService Error while creating user", () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedResponse = {
            success: true,
        };
        const axiosMock = jest.spyOn(require("axios"), "post");
        axiosMock.mockResolvedValue({ data: expectedResponse });
        model_1.User.create.mockResolvedValue(null);
        model_1.ActivationToken.create.mockResolvedValue(null);
        aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
            promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
        }));
        const link = "https://example.com/activation/";
        try {
            const recaptchaResult = yield (0, service_1.recaptchaVerificationService)("captcha");
            const result = yield (0, service_1.createUserService)(mockUser, link);
        }
        catch (error) {
            expect(error.message).toBe("Error while creating user");
        }
    }));
    test("POST createUserService Email is already registered", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockMongoError = new Error();
        mockMongoError.name = "MongoError";
        mockMongoError.code = 11000;
        const expectedResponse = {
            success: true,
        };
        const axiosMock = jest.spyOn(require("axios"), "post");
        axiosMock.mockResolvedValue({ data: expectedResponse });
        model_1.User.create.mockResolvedValue({ _id: "61ebd33f38b4e0ecc10fa5ab" });
        model_1.ActivationToken.create.mockResolvedValue(mockUser);
        const recaptchaResult = yield (0, service_1.recaptchaVerificationService)("captcha");
        expect(recaptchaResult).toEqual(expectedResponse);
        model_1.User.create.mockRejectedValue(mockMongoError);
        try {
            yield (0, service_1.createUserService)(mockUser, "https://example.com/activation/");
        }
        catch (error) {
            expect(error.message).toBe("Email is already registered");
        }
    }));
    test("POST createUserService error Recaptcha token not found", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.User.create.mockRejectedValue(new Error("User creation error"));
        const body = {};
        const link = "https://example.com/activation/";
        try {
            yield (0, service_1.createUserService)(body, link);
        }
        catch (error) {
            expect(error.message).toBe("Recaptcha token not found");
        }
    }));
    test("POST createUserService with invalid captcha", () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedErrorResponse = {
            success: false,
            error: "Invalid captcha",
        };
        const axiosMock = jest.spyOn(require("axios"), "post");
        axiosMock.mockResolvedValue({ data: expectedErrorResponse });
        try {
            yield (0, service_1.recaptchaVerificationService)("invalid_captcha");
        }
        catch (error) {
            expect(error.message).toBe("reCAPTCHA verification failed");
        }
        try {
            yield (0, service_1.createUserService)(mockUser, "https://example.com/activation/");
        }
        catch (error) {
            expect(error.message).toBe("reCAPTCHA verification failed");
        }
    }));
    test("POST createUserService with valid captcha - Email sending failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedResponse = {
            success: true,
        };
        const mockUser = {
            user: {
                email: "pavithrar@bloomlync.com",
                name: "pavithra",
                password: "123456",
                isVerified: true,
            },
            captcha: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlGG",
        };
        const axiosMock = jest.spyOn(require("axios"), "post");
        axiosMock.mockResolvedValue({ data: expectedResponse });
        model_1.User.create.mockResolvedValue(mockUser);
        model_1.ActivationToken.create.mockResolvedValue(mockUser);
        aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
            promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
        }));
        const link = "https://example.com/activation/";
        const recaptchaResult = yield (0, service_1.recaptchaVerificationService)("captcha");
        try {
            yield (0, service_1.createUserService)(mockUser, link);
            expect(true).toBe(true);
        }
        catch (error) {
            console.log(error);
            expect(error.message).toBe("Error sending activation email");
        }
    }));
    test("POST recaptchaVerificationService", () => __awaiter(void 0, void 0, void 0, function* () {
        const captcha = "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF";
        axios.post.mockResolvedValue({
            data: {
                success: true,
            },
        });
        const result = yield (0, service_1.recaptchaVerificationService)(captcha);
        expect(result).toEqual({ success: true });
    }));
    test("POST recaptchaVerificationService reCAPTCHA verification failed", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockFailedResponse = {
            data: {
                success: false,
            },
        };
        const mockError = new Error("reCAPTCHA verification failed");
        axios.post.mockResolvedValue(mockFailedResponse);
        const captchaToken = "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlGG";
        yield (0, service_1.recaptchaVerificationService)(captchaToken);
    }));
    test("POST resendVerifyEmailService - Email sending failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const email = "pavithrar@bloomlync.com";
        const link = "https://example.com/resend-activation/";
        model_1.User.findOne.mockResolvedValue({ email, isVerified: false });
        model_1.ActivationToken.create.mockResolvedValue({ token: mockToken });
        aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
            promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
        }));
        try {
            yield (0, service_1.resendVerifyEmailService)(email, link);
            expect(true).toBe(true);
        }
        catch (error) {
            expect(error.message).toBe("Failed to send email");
            expect(error.status).toBe(500);
        }
    }));
    test("POST resendVerifyEmailService - Activation email not sent", () => __awaiter(void 0, void 0, void 0, function* () {
        const sendEmailError = new Error("Failed to send email");
        sendEmailError.status = 500;
        const mockUser = {
            email: "pavithrar@bloomlync.com",
            captcha: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlGG",
            password: "123456",
            isVerified: false,
        };
        model_1.User.findOne.mockResolvedValue(mockUser);
        model_1.ActivationToken.create.mockResolvedValue(mockToken);
        aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
            promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
        }));
        try {
            yield (0, service_1.resendVerifyEmailService)("user@example.com", "https://example.com");
        }
        catch (error) {
            expect(error).toEqual(sendEmailError);
        }
    }));
    test("POST resendVerifyEmailService", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            email: 'pavithrar@bloomlync.com',
            name: 'Test User',
            isVerified: false,
        };
        const mockActivationToken = {
            token: 'mock-token',
        };
        const mockSesResponse = {
            MessageId: 'mock-message-id',
        };
        jest.spyOn(model_1.User, 'findOne').mockResolvedValue(mockUser);
        jest.spyOn(model_1.ActivationToken, 'create').mockResolvedValue(mockActivationToken);
        aws_ses_1.default.sendEmail.mockResolvedValue(mockSesResponse);
        const email = 'pavithrar@bloomlync.com';
        const link = 'https://example.com';
        const result = yield (0, service_1.resendVerifyEmailService)(email, link);
        expect(model_1.User.findOne).toHaveBeenCalledWith({ email });
        expect(model_1.ActivationToken.create).toHaveBeenCalledWith({ user: mockUser });
        const expectedLink = `${link.replace(/\/$/, '')}/${mockActivationToken.token}`;
        const expectedContent = `
    Dear, undefined.<br><br> Welcome to our platform! We are thrilled to have you, and we 
want to ensure that your account is fully activated so you can begin your journey with us. To get started, please click on the “Activate Account” button to activate your email account.
      <br><br>
      <a href=\"https://example.com/undefined\" style=\"display: inline-block; background-color: #72bf44; color: white; padding: 10px 20px; border: 
none; border-radius: 5px; text-decoration: none; text-align: center; font-size: 16px;\">Activate Account</a>
      <br><br>
      If you did not request a password reset, please ignore this email. The password reset is valid only for 60 minutes.
      <br><br>
      Thank you for choosing our platform. We look forward to providing you with a seamless and enjoyable experience.
      <br><br>
      Best Regards, <br><br>
      &mdash; Mentor Team
    `;
        expect(result).toEqual({
            status: 201,
            message: 'A verification email has been resent to the given email.',
        });
    }));
    test("POST resendVerifyEmailService Failed to send email", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.User.findOne.mockResolvedValue({
            email: "pavithrar@bloomlync.com",
            isVerified: false,
            name: "John Doe",
        });
        model_1.ActivationToken.create.mockResolvedValue({
            token: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF",
        });
        const email = "pavithrar@bloomlync.com";
        const link = "https://example.com/activation/";
        try {
            yield (0, service_1.resendVerifyEmailService)(email, link);
        }
        catch (error) {
            expect(error.message).toBe("Failed to send email");
        }
    }));
    test("POST verifyEmailService - No activation token found", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = "mockedToken";
        model_1.ActivationToken.findOne.mockResolvedValue(null);
        try {
            const result = yield (0, service_1.verifyEmailService)(token);
            expect(result).toEqual(null);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("POST resendVerifyEmailService - user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.User.findOne.mockResolvedValue(null);
        const email = "nonexistent@mail.com";
        const link = "https://example.com/activation/";
        try {
            yield (0, service_1.resendVerifyEmailService)(email, link);
        }
        catch (error) {
            expect(error.status).toBe(404);
            expect(error.message).toBe("User not found");
        }
    }));
    test("POST resendVerifyEmailService - email is already verified", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.User.findOne.mockResolvedValue({
            email: "verified@example.com",
            isVerified: true,
            name: "Jane Doe",
        });
        const email = "verified@example.com";
        const link = "https://example.com/activation/";
        try {
            yield (0, service_1.resendVerifyEmailService)(email, link);
        }
        catch (error) {
            expect(error.status).toBe(400);
            expect(error.message).toBe("This email has already been verified. Please log in.");
        }
    }));
    test("PUT verifyEmailService", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.ActivationToken.findOne = jest.fn(() => ({
            populate: jest.fn().mockResolvedValue({
                token: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF",
                user: {
                    set: jest.fn().mockReturnThis(),
                    save: jest.fn().mockResolvedValue(),
                },
            }),
        }));
        model_1.ActivationToken.deleteMany.mockResolvedValue({ n: 1 });
        const token = "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF";
        const result = yield (0, service_1.verifyEmailService)(token);
        expect(result.verified).toBe(true);
    }));
    test("PUT verifyEmailService - null", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.ActivationToken.findOne = jest.fn(() => ({
            populate: jest.fn().mockResolvedValue(null),
        }));
        const token = "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF";
        const result = yield (0, service_1.verifyEmailService)(token);
        expect(result).toBe(null);
    }));
    test("PUT verifyEmailService - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedToken = "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF";
        const expectedUser = {
            set: jest.fn().mockReturnThis(),
            save: jest.fn().mockResolvedValue(),
        };
        model_1.ActivationToken.findOne = jest.fn(() => ({
            populate: jest.fn().mockResolvedValue({
                token: expectedToken,
                user: expectedUser,
            }),
        }));
        model_1.ActivationToken.deleteMany.mockResolvedValue({ n: 1 });
        const token = expectedToken;
        const result = yield (0, service_1.verifyEmailService)(token);
        expect(result.verified).toBe(true);
        expect(expectedUser.set).toHaveBeenCalled();
        expect(expectedUser.save).toHaveBeenCalled();
    }));
    test("POST loginService - 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            email: "pavithrar@bloomlync.com",
            password: "Pavi@123",
            authenticate: jest.fn(),
            isVerified: true,
            view: jest.fn(),
        };
        mockUser.authenticate.mockResolvedValue(true);
        model_1.User.findOne.mockResolvedValue(mockUser);
        jwt_1.sign.mockResolvedValue("kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF");
        const requestBody = {
            email: "pavithrar@bloomlync.com",
            password: "Pavi@123",
        };
        const result = yield (0, service_1.loginService)(requestBody);
        expect(model_1.User.findOne).toHaveBeenCalledWith({ email: requestBody.email });
        expect(jwt_1.sign).toHaveBeenCalledWith(mockUser.id);
        expect(result).toEqual({
            token: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF",
            user: mockUser.view(),
        });
    }));
    test("POST loginService - User is not verified", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            email: "pavithrar@bloomlync.com",
            password: "Pavi@123",
            authenticate: jest.fn(),
            isVerified: false,
            view: jest.fn(),
        };
        mockUser.authenticate.mockResolvedValue(true);
        model_1.User.findOne.mockResolvedValue(mockUser);
        const requestBody = {
            email: "pavithrar@bloomlync.com",
            password: "Pavi@123",
            isVerified: false,
        };
        try {
            yield (0, service_1.loginService)(requestBody);
        }
        catch (error) {
            console.log(error, "error");
            //expect(error).toBe("User is not verified");
        }
    }));
    test("POST loginService - Authentication failed", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            email: "pavithrar@bloomlync.com",
            password: "Pavi@123",
            authenticate: jest.fn(),
            isVerified: true,
            view: jest.fn(),
        };
        mockUser.authenticate.mockResolvedValue(false);
        model_1.User.findOne.mockResolvedValue(mockUser);
        const requestBody = {
            email: "pavithrar@bloomlync.com",
            password: "Pavi@123",
        };
        try {
            yield (0, service_1.loginService)(requestBody);
        }
        catch (error) {
            console.log(error, "error");
            expect(mockUser.authenticate).toHaveBeenCalledWith(requestBody.password);
        }
        expect(model_1.User.findOne).toHaveBeenCalledWith({ email: requestBody.email });
    }));
    test("POST loginService - 400 invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            email: "pavithrar@bloomlync.com",
            password: "Pavi@123",
            authenticate: jest.fn(),
            isVerified: true,
            view: jest.fn(),
        };
        mockUser.authenticate.mockRejectedValue(new Error("Invalid password"));
        model_1.User.findOne.mockResolvedValue(mockUser);
        jwt_1.sign.mockResolvedValue("kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF");
        const requestBody = {
            email: "pavithrar@bloomlync.com",
            password: "InvalidPassword",
        };
        try {
            yield (0, service_1.loginService)(requestBody);
        }
        catch (error) {
            expect(error.message).toBe("Invalid password");
            expect(model_1.User.findOne).toHaveBeenCalledWith({ email: requestBody.email });
            expect(mockUser.authenticate).toHaveBeenCalledWith(requestBody.password);
        }
    }));
    test("POST loginService - 400 missing email", () => __awaiter(void 0, void 0, void 0, function* () {
        const requestBody = {
            password: "Pavi@123",
        };
        model_1.User.findOne.mockResolvedValue(null);
        try {
            const result = yield (0, service_1.loginService)(requestBody);
            expect(result).toBeUndefined();
        }
        catch (error) {
            console.log(error);
        }
        expect(model_1.User.findOne).toHaveBeenCalledWith({ email: undefined });
    }));
    test("POST loginService - 400 missing password", () => __awaiter(void 0, void 0, void 0, function* () {
        const requestBody = {
            email: "Pavi@123.com",
        };
        model_1.User.findOne.mockResolvedValue(null);
        try {
            const result = yield (0, service_1.loginService)(requestBody);
            expect(result).toBeUndefined();
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET getUserByEmailService", () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedEmail = "testuser@example.com";
        const expectedUser = {
            email: expectedEmail,
            view: jest.fn().mockReturnThis(),
        };
        model_1.User.findOne = jest.fn().mockResolvedValue(expectedUser);
        const params = { email: expectedEmail };
        const result = yield (0, service_1.getUserByEmailService)(params);
        expect(result).toEqual(expectedUser);
        expect(expectedUser.view).toHaveBeenCalled();
    }));
    test("GET  getUserByEmailService - no user with the provided email is found", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.User.findOne = jest.fn().mockResolvedValue(null);
        const params = { email: "nonexistent@example.com" };
        try {
            yield (0, service_1.getUserByEmailService)(params);
        }
        catch (error) {
            expect(error.status).toBe(404);
            expect(error.message).toBe("User not found");
        }
    }));
    test("POST createUserByAdminService", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.User.create = jest.fn().mockResolvedValue(mockUser);
        const result = yield (0, service_1.createUserByAdminService)(mockUser);
        expect(result).toEqual(mockUser);
    }));
    test("POST createUserByAdminService - email is already registered", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.User.create = jest.fn().mockRejectedValue({
            name: "MongoError",
            code: 11000,
        });
        try {
            yield (0, service_1.createUserByAdminService)(mockUser);
        }
        catch (error) {
            expect(error.status).toBe(409);
            expect(error.message).toBe("Email is already registered");
        }
    }));
    test("POST createUserByAdminService - failed to create", () => __awaiter(void 0, void 0, void 0, function* () {
        const otherError = new Error("failed to create");
        model_1.User.create = jest.fn().mockRejectedValue(otherError);
        try {
            yield (0, service_1.createUserByAdminService)(mockUser);
        }
        catch (error) {
            expect(error).toBe(otherError);
        }
    }));
    test("GET getInstituteUsersService", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.User.find = jest.fn().mockResolvedValue(mockUsers);
        const result = yield (0, service_1.getInstituteUsersService)();
        expect(result).toEqual(mockUsers);
    }));
    test("GET getInstituteUsersService - users not found", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.User.find = jest.fn().mockResolvedValue([]);
        try {
            yield (0, service_1.getInstituteUsersService)();
        }
        catch (error) {
            expect(error.status).toBe(404);
            expect(error.message).toBe("No users found");
        }
    }));
    afterEach(() => {
        mockAxios.reset();
    });
});
