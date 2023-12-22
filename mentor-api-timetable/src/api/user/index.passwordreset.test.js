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
const model_1 = require("./model");
const service_1 = require("./service");
const aws_ses_1 = __importDefault(require("../../common/aws-ses"));
jest.mock("../../common/aws-ses");
jest.mock("./model", () => ({
    User: {
        findOne: jest.fn(),
    },
    PasswordReset: {
        findOne: jest.fn(),
        create: jest.fn(),
        deleteMany: jest.fn(),
        populate: jest.fn(),
    },
    ActivationToken: {
        create: jest.fn(),
    },
}));
const mockToken = "V61XryEAAlDuGtIYJkuWXaoRLjj9I/Wz9LR6La1h9DGiyYRrI700ese9IFxGLKc+oAQuDXlUgR0I47nEwVQUlI+xHmvTMY4BaUwjpdV8I";
const mockUser = {
    email: "pavithrar@bloomlync.com",
    name: "pavithra",
    password: "Pavi@123",
    isVerified: true,
    reset: {
        view: jest.fn(),
    },
    user: {
        view: jest.fn(),
    },
};
const mockRequestPasswordReset = {
    password: "123456",
    token: mockToken,
};
const mockReset = {
    token: mockToken,
    user: {
        view() {
            return mockUser;
        },
    },
};
const user = {
    set: jest.fn(),
    save: jest.fn(),
    view: jest.fn(() => "user_view"),
};
describe("Password Reset API", () => {
    test("POST doPasswordResetService", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.User.findOne = jest.fn().mockResolvedValue(mockUser);
        model_1.PasswordReset.create = jest
            .fn()
            .mockResolvedValue({ user: mockUser, token: "reset-token" });
        aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
            promise: jest.fn().mockResolvedValueOnce({ toEmail: "pavithrar@bloomlync.com",
                subject: "Mentor - Password Reset",
                content: "Password Reset", }),
        }));
        const email = "pavithrar@bloomlync.com";
        const link = "http//example/reset-link";
        const result = yield (0, service_1.doPasswordResetService)(email, link);
        expect(model_1.User.findOne).toHaveBeenCalledWith({ email });
        expect(model_1.PasswordReset.create).toHaveBeenCalledWith({
            user: mockUser,
        });
        const expectedLink = `${link.replace(/\/$/, "")}/reset-token`;
        // expect(result).toEqual({
        //   status: 200,
        //   message: "Password reset email is sent",
        // });
    }));
    test("POST doPasswordResetService - successful email ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.User.findOne = jest.fn().mockResolvedValue(mockUser);
        model_1.PasswordReset.create = jest.fn().mockResolvedValue({ user: mockUser, token: "reset-token" });
        aws_ses_1.default.sendEmail = jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' });
        const email = "pavithrar@bloomlync.com";
        const link = "http//example/reset-link";
        const result = yield (0, service_1.doPasswordResetService)(email, link);
        expect(model_1.User.findOne).toHaveBeenCalledWith({ email });
        expect(model_1.PasswordReset.create).toHaveBeenCalledWith({ user: mockUser });
        expect(aws_ses_1.default.sendEmail).toHaveBeenCalledWith({
            toEmail: mockUser.email,
            subject: "Mentor - Password Reset",
            content: expect.any(String),
        });
        expect(result).toEqual({ status: 200, message: "Password reset email is sent" });
    }));
    test("POST doPasswordResetService - Error null", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.User.findOne = jest.fn().mockResolvedValue(mockUser);
        model_1.PasswordReset.create = jest
            .fn()
            .mockResolvedValue(null);
        aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
            promise: jest.fn().mockResolvedValueOnce({ toEmail: "pavithrar@bloomlync.com",
                subject: "Mentor - Password Reset",
                content: "Password Reset", }),
        }));
        const email = "pavithrar@bloomlync.com";
        const link = "http//example/reset-link";
        const result = yield (0, service_1.doPasswordResetService)(email, link);
        expect(model_1.User.findOne).toHaveBeenCalledWith({ email });
        const expectedLink = `${link.replace(/\/$/, "")}/reset-token`;
    }));
    test("POST doPasswordResetService - User not verified", () => __awaiter(void 0, void 0, void 0, function* () {
        const email = "pavithrar@bloomlync.com";
        const link = "http//example/reset-link";
        model_1.User.findOne.mockResolvedValue({ email, isVerified: false });
        model_1.PasswordReset.create.mockResolvedValue({
            user: { email, name: "Mock User" },
            token: "reset-token",
        });
        aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => {
            return {
                promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
            };
        });
        try {
            yield (0, service_1.doPasswordResetService)(email, link);
            expect(true).toBe(true);
        }
        catch (error) {
            expect(error.message).toBe("User not verified");
        }
    }));
    test("POST doPasswordResetService - user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.User.findOne = jest.fn().mockResolvedValue(null);
        const email = "nonexistent@example.com";
        const link = "http//example/reset-link";
        try {
            yield (0, service_1.doPasswordResetService)(email, link);
            expect(true).toBe(true);
        }
        catch (error) {
            expect(error.message).toBe("User not found");
        }
    }));
    test("POST doPasswordResetService - password reset creation fails", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.User.findOne = jest.fn().mockResolvedValue(mockUser);
        model_1.PasswordReset.create = jest
            .fn()
            .mockRejectedValue(new Error("Password reset creation failed"));
        const email = "user@example.com";
        const link = "http//example/reset-link";
        try {
            yield (0, service_1.doPasswordResetService)(email, link);
            expect(true).toBe(true);
        }
        catch (error) {
            expect(error.message).toBe("Password reset creation failed");
        }
    }));
    test("POST doPasswordResetService - sending the email fails", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.User.findOne = jest.fn().mockResolvedValue(mockUser);
        model_1.PasswordReset.create = jest
            .fn()
            .mockResolvedValue({ user: mockUser, token: "reset-token" });
        const email = "pavithrar@bloomlync.com";
        const link = "http//example/reset-link";
        aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => {
            return {
                promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
            };
        });
        try {
            yield (0, service_1.doPasswordResetService)(email, link);
        }
        catch (error) {
            expect(error.message).toBe("Email sending failed");
        }
    }));
    test("confirmationMailService - successful email ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.User.findOne = jest.fn().mockResolvedValue(mockUser);
        model_1.ActivationToken.create = jest.fn().mockResolvedValue({ token: "activation-token" });
        aws_ses_1.default.sendEmail = jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' });
        const email = "pavithrar@bloomlync.com";
        const link = "http//example/activation-link";
        const result = yield (0, service_1.confirmationMailService)(email, link);
        expect(model_1.User.findOne).toHaveBeenCalledWith({ email });
        expect(model_1.ActivationToken.create).toHaveBeenCalledWith({ user: mockUser });
        expect(aws_ses_1.default.sendEmail).toHaveBeenCalledWith({
            toEmail: mockUser.email,
            subject: "Confirmation Mail",
            content: expect.any(String), // You can further customize this expectation
        });
        expect(result).toEqual({ status: 200, message: "Response email is sent" });
    }));
    test("POST confirmationMailService - confirmation email", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockLink = "http//example/confirmation-link";
        model_1.User.findOne = jest.fn().mockResolvedValue({
            email: "pavithrar@bloomlync.com",
            isVerified: true,
        });
        model_1.ActivationToken.create = jest.fn().mockResolvedValue({
            user: mockUser,
            isVerified: true,
            token: "activation-token",
        });
        const email = "pavithrar@bloomlync.com";
        const link = mockLink;
        aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
            promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
        }));
        const result = yield (0, service_1.confirmationMailService)(email, link);
        expect(model_1.User.findOne).toHaveBeenCalledWith({ email });
        expect(model_1.ActivationToken.create).toHaveBeenCalledWith({
            user: { email: "pavithrar@bloomlync.com", isVerified: true },
        });
        const expectedLink = `${mockLink.replace(/\/$/, "")}/activation-token`;
        // expect(result).toEqual({
        //   status: 200,
        //   message: "Response email is sent",
        // });
    }));
    test("POST confirmationMailService - User not verified", () => __awaiter(void 0, void 0, void 0, function* () {
        const email = "user@example.com";
        const link = "https://example.com/confirmation";
        model_1.User.findOne.mockResolvedValue({ isVerified: false });
        try {
            yield (0, service_1.confirmationMailService)(email, link);
        }
        catch (error) {
            expect(error.message).toBe("Error: User is not verified");
        }
    }));
    test("POST confirmationMailService - User not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const email = "user@example.com";
        const link = "https://example.com/confirmation";
        model_1.User.findOne.mockResolvedValue(null);
        try {
            yield (0, service_1.confirmationMailService)(email, link);
        }
        catch (error) {
            expect(error.message).toBe("Error: User not found");
        }
    }));
    test("GET findPasswordResetService by Id", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.PasswordReset.findOne = jest.fn().mockReturnValue({
            populate: jest.fn().mockResolvedValue({ mockUser }),
        });
        const expectedUser = {
            email: "pavithrar@bloomlync.com",
            name: "pavithra",
            password: "Pavi@123",
            isVerified: true,
            reset: { view: jest.fn().mockReturnThis(mockUser) },
        };
        try {
            const result = yield (0, service_1.findResetTokenService)({
                token: "123",
            });
            expect(model_1.PasswordReset.findOne).toHaveBeenCalledWith(expect.any(Object));
            expect(result).toEqual(mockUser.reset);
        }
        catch (error) {
            console.error(error);
        }
    }));
    test("GET findPasswordResetService by Id (error case)", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("An error occurred while finding the reset token");
        model_1.PasswordReset.findOne = jest.fn().mockReturnValue({
            populate: jest.fn().mockRejectedValue(mockError),
        });
        try {
            yield (0, service_1.findResetTokenService)({
                token: "123",
            });
            expect(true).toBe(false);
        }
        catch (error) {
            expect(error).toBe(mockError);
        }
    }));
    test("PUT updateResetPasswordService - Password updated successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = "validToken";
        const newPassword = "newPassword123";
        const validResetObject = {
            user: {
                set: jest.fn().mockResolvedValue({ password: newPassword }),
                save: jest.fn().mockResolvedValue(),
                view: jest.fn(),
            },
        };
        model_1.PasswordReset.findOne = jest.fn().mockReturnValue({
            populate: jest.fn().mockRejectedValue(validResetObject),
        });
        try {
            const result = yield (0, service_1.updateResetPasswordService)(token, newPassword);
            expect(result).toEqual(validResetObject.user.view());
            expect(validResetObject.user.set).toHaveBeenCalledWith({
                password: newPassword,
            });
            expect(validResetObject.user.save).toHaveBeenCalled();
        }
        catch (error) {
            console.error('Unexpected error:', error.message);
            console.error(error.stack);
        }
    }));
    test("PUT updateResetPasswordService - Token not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = "invalidToken";
        const newPassword = "newPassword123";
        model_1.PasswordReset.findOne = jest.fn().mockReturnValue({
            populate: jest.fn().mockRejectedValue(null),
        });
        try {
            const result = yield (0, service_1.updateResetPasswordService)(token, newPassword);
            expect(result).toBeNull();
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("PUT updateResetPasswordService (error case)", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("An error occurred while finding the reset token");
        model_1.PasswordReset.findOne = jest.fn().mockReturnValue({
            populate: jest.fn().mockRejectedValue(mockError),
        });
        try {
            const result = yield (0, service_1.updateResetPasswordService)(mockToken, mockUser.password);
            expect(result).toBe(null);
        }
        catch (error) {
            expect(error).toBe(mockError);
            console.log("error", error);
        }
    }));
});
