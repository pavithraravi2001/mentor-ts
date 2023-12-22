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
const model_1 = require("./model");
const service_1 = require("./service");
jest.mock("./model", () => ({
    MetadataContent: {
        findOne: jest.fn(),
        view: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findOneAndUpdate: jest.fn(),
        deleteOne: jest.fn(),
    },
}));
const mockRequest = {
    contentKey: "school",
    content: "madurai",
};
const updateData = {
    contentKey: "school123",
    content: "madurai",
};
const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
};
describe("MetadataContent API - MockTesting", () => {
    test("GET getMetadataContentByKeyService", () => __awaiter(void 0, void 0, void 0, function* () {
        const contentKey = "sample-key";
        const mockMetadataContent = {
            contentKey: contentKey,
            view: jest.fn(),
        };
        model_1.MetadataContent.findOne.mockResolvedValue(mockMetadataContent);
        const result = yield (0, service_1.getMetadataContentByKeyService)({ contentKey });
        expect(result).toEqual(mockMetadataContent.view());
        expect(mockMetadataContent.view).toHaveBeenCalled();
        expect(model_1.MetadataContent.findOne).toHaveBeenCalledWith({ contentKey });
    }));
    test("GET getMetadataContentByKeyService - Contentkey not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contentKey = "non-existent-key";
        const errorMessage = "Content not found";
        model_1.MetadataContent.findOne.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getMetadataContentByKeyService)({ contentKey });
        }
        catch (error) {
            expect(model_1.MetadataContent.findOne).toHaveBeenCalledWith({ contentKey });
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("POST MetadataContent  ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataContent.create.mockResolvedValue(mockRequest);
        try {
            const result = yield (0, service_1.createMetadataContentService)(mockRequest);
            expect(model_1.MetadataContent.create).toHaveBeenCalledWith(mockRequest);
            expect(result).toEqual(mockRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("POST MetadataContent - Error Handling ", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "ContentKey is already registered";
        const mockMongoError = new Error();
        mockMongoError.name = "MongoError";
        mockMongoError.code = 11000;
        model_1.MetadataContent.create.mockRejectedValue(mockMongoError);
        try {
            const result = yield (0, service_1.createMetadataContentService)(mockRequest);
        }
        catch (error) {
            expect(model_1.MetadataContent.create).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
            expect(error.status).toBe(409);
        }
    }));
    test("POST MetadataContent - Error Handling - Generic Error", () => __awaiter(void 0, void 0, void 0, function* () {
        const genericErrorMessage = "err";
        const mockGenericError = new Error(genericErrorMessage);
        model_1.MetadataContent.create.mockRejectedValue(mockGenericError);
        try {
            yield (0, service_1.createMetadataContentService)(mockRequest);
        }
        catch (error) {
            expect(model_1.MetadataContent.create).toHaveBeenCalled();
            expect(error.message).toBe(genericErrorMessage);
        }
    }));
    test("PUT MetadataContent  ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataContent.findOneAndUpdate.mockResolvedValue(updateData);
        try {
            const result = yield (0, service_1.updateMetadataContentService)({ contentKey: updateData.contentKey }, updateData);
            expect(result).toEqual(updateData);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("PUT MetadataContent - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error updating Schema Invalid contentKey";
        model_1.MetadataContent.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.updateMetadataContentService)({ contentKey: updateData.contentKey }, updateData);
        }
        catch (error) {
            expect(model_1.MetadataContent.findOneAndUpdate).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test('PUT MetadataContent 404 error content key is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new Error("Content key not found");
        model_1.MetadataContent.findOneAndUpdate.mockResolvedValue(null);
        yield expect((0, service_1.updateMetadataContentService)({ contentKey: "123" }, updateData)).rejects.toEqual(error);
    }));
    test('DELETE deleteMetadataContentService', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockRequest = { contentKey: '123' };
        model_1.MetadataContent.deleteOne.mockResolvedValue({ deletedCount: 1 });
        const result = yield (0, service_1.deleteMetadataContentService)(mockRequest);
        expect(result).toEqual({ status: 200, message: 'Metadata content deleted successfully' });
    }));
    test('DELETE deleteMetadataContentService metadata content not found', () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataContent.deleteOne.mockResolvedValue({ deletedCount: 0 });
        try {
            yield (0, service_1.deleteMetadataContentService)(mockRequest);
        }
        catch (error) {
            expect(error.status).toBe(404);
            expect(error.message).toBe('Metadata content not found');
        }
    }));
    test("DELETE MetadataContent - Invalid Contentkey", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Invalid Contentkey Unable to Delete";
        model_1.MetadataContent.deleteOne.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.deleteMetadataContentService)(mockRequest.contentKey);
        }
        catch (error) {
            expect(model_1.MetadataContent.deleteOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
});
