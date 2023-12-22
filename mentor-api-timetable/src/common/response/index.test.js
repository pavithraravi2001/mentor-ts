"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const response = __importStar(require("."));
jest.mock('axios');
let res;
beforeEach(() => {
    res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res),
        end: jest.fn(() => res),
        send: jest.fn(),
        redirect: jest.fn(),
    };
});
describe("success", () => {
    it("responds with passed object and status 200", () => {
        expect(response.success(res)({ prop: "value" })).toBeNull();
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({ prop: "value" });
    });
    it("responds with passed object and status 201", () => {
        expect(response.success(res, 201)({ prop: "value" })).toBeNull();
        expect(res.status).toBeCalledWith(201);
        expect(res.json).toBeCalledWith({ prop: "value" });
    });
    it("does not send any response when object has not been passed", () => {
        expect(response.success(res, 201)()).toBeNull();
        expect(res.status).not.toBeCalled();
    });
});
describe("successRender", () => {
    it("sends the entity and logs to console", () => {
        const entity = { prop: "value" };
        const successRenderHandler = response.successRender(res);
        console.log = jest.fn();
        expect(successRenderHandler(entity)).toBeNull();
        expect(res.send).toHaveBeenCalledWith(entity);
        expect(console.log).toHaveBeenCalledWith("AT render : - ", entity);
    });
    it("does not send any response when entity is not passed", () => {
        const successRenderHandler = response.successRender(res);
        expect(successRenderHandler()).toBeNull();
        expect(res.send).not.toHaveBeenCalled();
    });
});
describe("unAuthorizedError", () => {
    it("rejects with status 401 and default message", () => {
        const rejectMock = jest.fn();
        response.unAuthorizedError(rejectMock);
        expect(rejectMock).toHaveBeenCalledWith({
            status: 401,
            message: "Your account has not been verified.",
        });
    });
    it("rejects with status 401 and custom message", () => {
        const rejectMock = jest.fn();
        const customMessage = "Custom unauthorized message";
        response.unAuthorizedError(rejectMock, customMessage);
        expect(rejectMock).toHaveBeenCalledWith({
            status: 401,
            message: customMessage,
        });
    });
    it("returns null after rejection", () => {
        const rejectMock = jest.fn();
        const result = response.unAuthorizedError(rejectMock);
        expect(result).toBeNull();
    });
});
describe("isNotVerifiedUserError", () => {
    it("returns the entity when verified", () => {
        const rejectMock = jest.fn();
        const entity = { isVerified: true };
        const result = response.isNotVerifiedUserError(rejectMock)("entity");
        expect(result).toEqual(null);
    });
    it("rejects with status 401 and default message when entity is not verified", () => {
        const rejectMock = jest.fn();
        const result = response.isNotVerifiedUserError(rejectMock)(null);
        expect(result).toBeNull();
        expect(rejectMock).toHaveBeenCalledWith({
            status: 401,
            message: "Your account has not been verified.",
        });
    });
    it("rejects with status 401 and custom message when entity is not verified", () => {
        const rejectMock = jest.fn();
        const customMessage = "Custom unauthorized message";
        const result = response.isNotVerifiedUserError(rejectMock, customMessage)(null);
        expect(result).toBeNull();
        expect(rejectMock).toHaveBeenCalledWith({
            status: 401,
            message: customMessage,
        });
    });
    it("returns null after rejection when entity is not verified", () => {
        const rejectMock = jest.fn();
        const result = response.isNotVerifiedUserError(rejectMock)(null);
        expect(result).toBeNull();
    });
});
describe("notFound", () => {
    it("responds with status 404 when object has not been passed", () => {
        expect(response.notFound(res)()).toBeNull();
        expect(res.status).toBeCalledWith(404);
        expect(res.end).toHaveBeenCalledTimes(1);
    });
    it("returns the passed object and does not send any response", () => {
        expect(response.notFound(res)({ prop: "value" })).toEqual({
            prop: "value",
        });
        expect(res.status).not.toBeCalled();
        expect(res.end).not.toBeCalled();
    });
});
describe("authorOrAdmin", () => {
    let user, entity;
    beforeEach(() => {
        user = {
            id: 1,
            role: "user",
        };
        entity = {
            author: {
                id: 1,
                equals(id) {
                    return id === this.id;
                },
            },
        };
    });
    it("returns the passed entity when author is the same", () => {
        expect(response.authorOrAdmin(res, user, "author")(entity)).toEqual(entity);
    });
    it("returns the passed entity when author is admin", () => {
        user.role = "admin";
        expect(response.authorOrAdmin(res, user, "user")(entity)).toEqual(entity);
    });
    it("responds with status 401 when author is not the same or admin", () => {
        user.id = 2;
        expect(response.authorOrAdmin(res, user, "author")(entity)).toBeNull();
        expect(res.status).toBeCalledWith(401);
        expect(res.end).toHaveBeenCalledTimes(1);
    });
    it("returns null without sending response when entity has not been passed", () => {
        expect(response.authorOrAdmin(res, user, "author")()).toBeNull();
    });
});
describe("fillTemplate", () => {
    it("fills template with variables", () => {
        const templateString = "Hello, ${name}!";
        const templateVariables = { name: "User" };
        const result = response.fillTemplate(templateString, templateVariables);
        expect(result).toBe("Hello, User!");
    });
    it("does not change the template if variables are not present", () => {
        const templateString = "Hello, Mentor!";
        const templateVariables = { name: "User" };
        const result = response.fillTemplate(templateString, templateVariables);
        expect(result).toBe("Hello, Mentor!");
    });
    it("handles multiple occurrences of variables in the template", () => {
        const templateString = "${greeting}, ${name}! How are you, ${name}?";
        const templateVariables = { greeting: "Hi", name: "User" };
        const result = response.fillTemplate(templateString, templateVariables);
        expect(result).toBe("Hi, User! How are you, User?");
    });
});
describe("sendErrorResponse", () => {
    it("sends an error response with default error message and status", () => {
        response.sendErrorResponse(res, 500);
        expect(res.status).toHaveBeenCalledWith(500);
    });
    it("sends an error response with custom error message and status", () => {
        const customMessage = "error message";
        response.sendErrorResponse(res, 404, customMessage);
        expect(res.status).toHaveBeenCalledWith(404);
    });
    it("sends an error response with custom error message, status, and error details", () => {
        const customMessage = "error message";
        const errorDetails = new Error("Detailed error message");
        response.sendErrorResponse(res, 401, customMessage, errorDetails);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({
            status: "error",
            error: customMessage,
            e: errorDetails.toString(),
        });
    });
});
describe("redirect", () => {
    it("redirects to the specified path with default status 301", () => {
        const redirectHandler = response.redirect(res);
        const path = "/mentor";
        expect(redirectHandler(path)).toBeUndefined();
        expect(res.redirect).toHaveBeenCalledWith(301, "/mentor");
    });
    it("redirects to the specified path with custom status", () => {
        const redirectHandler = response.redirect(res, 302);
        const path = "/mentor";
        expect(redirectHandler(path)).toBeUndefined();
        expect(res.redirect).toHaveBeenCalledWith(302, "/mentor");
    });
    it("redirects to the default path with default status 301 when path is not provided", () => {
        const redirectHandler = response.redirect(res);
        expect(redirectHandler()).toBeUndefined();
        expect(res.redirect).toHaveBeenCalledWith("/");
    });
    it("redirects to the default path with custom status when path is not provided", () => {
        const redirectHandler = response.redirect(res, 302);
        expect(redirectHandler()).toBeUndefined();
        expect(res.redirect).toHaveBeenCalledWith("/");
    });
});
