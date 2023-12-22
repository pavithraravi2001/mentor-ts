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
    MetadataSchema: {
        findOne: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
        findOneAndUpdate: jest.fn(),
        findByIdAndRemove: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        deleteOne: jest.fn(),
    },
}));
const mockRequest = {
    entityName: "appSchema",
    fields: [
        {
            fieldName: "firstName",
            dataType: "String",
            caption: "First Name",
            mandatory: true,
            size: 10,
            order: 5,
            dataPoint: "school-collection",
        },
    ],
    formFields: [],
};
const updateData = {
    entityName: "appSchema1",
    fields: [
        {
            fieldName: "firstName",
            dataType: "String",
            caption: "First Name",
            mandatory: true,
            size: 10,
            order: 5,
            dataPoint: "school-collection",
        },
    ],
    formFields: [],
};
const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
};
describe("MetadataSchema API - MockTesting", () => {
    test("GET MetadataSchema", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataSchema.findOne.mockResolvedValue(mockRequest);
        try {
            const result = yield (0, service_1.getSchemaByEntityNameService)(mockRequest.entityName);
            expect(model_1.MetadataSchema.findOne).toHaveBeenCalled();
            expect(result).toEqual(mockRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test('GET getSchemaByEntityNameService 404 error when the entity is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataSchema.findOne.mockResolvedValue(null);
        yield expect((0, service_1.getSchemaByEntityNameService)({ entityName: mockRequest.entityName })).rejects.toEqual(expect.objectContaining({
            status: 404,
            message: `${mockRequest.entityName} not found`,
        }));
    }));
    test("GET MetadataSchema - Invalid EntityName", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Invalid EntityName";
        model_1.MetadataSchema.findOne.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getSchemaByEntityNameService)(mockRequest.entityName);
        }
        catch (error) {
            expect(model_1.MetadataSchema.findOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("POST MetadataSchema", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataSchema.create.mockResolvedValue(mockRequest);
        try {
            const result = yield (0, service_1.createSchemaService)(mockRequest);
            expect(model_1.MetadataSchema.create).toHaveBeenCalled();
            expect(result).toEqual(mockRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test('POST createSchemaService entity does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mockRequest = { entityName: 'newEntityName' };
            model_1.MetadataSchema.findOne.mockResolvedValue(null);
            model_1.MetadataSchema.create.mockResolvedValue(mockRequest);
            const result = yield (0, service_1.createSchemaService)(mockRequest);
            expect(model_1.MetadataSchema.findOne).toHaveBeenCalled();
            expect(model_1.MetadataSchema.create).toHaveBeenCalledWith(mockRequest);
            expect(result).toEqual(mockRequest);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }));
    test('POST createSchemaService 409 entity already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const existingEntityName = 'existingEntityName';
        const mockRequest = { entityName: existingEntityName };
        model_1.MetadataSchema.findOne.mockResolvedValue({ entityName: existingEntityName });
        yield expect((0, service_1.createSchemaService)(mockRequest)).rejects.toEqual(expect.objectContaining({
            status: 409,
            message: `${existingEntityName} already exists`,
        }));
    }));
    test("PUT MetadataSchema", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataSchema.findOneAndUpdate.mockResolvedValue(updateData);
        try {
            const result = yield (0, service_1.updateSchemaService)(updateData);
            expect(result).toEqual(updateData);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("PUT MetadataSchema - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error updating Schema Invalid Entityname";
        model_1.MetadataSchema.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.updateSchemaService)(updateData);
        }
        catch (error) {
            expect(model_1.MetadataSchema.findOneAndUpdate).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("DELETE MetadataSchema", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataSchema.deleteOne.mockResolvedValue(mockRequest);
        try {
            const result = yield (0, service_1.deleteSchemaService)(mockRequest.entityName);
            expect(typeof result).toBe("object");
        }
        catch (error) {
            console.log(error);
        }
    }));
    test('DELETE deleteSchemaService', () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataSchema.deleteOne.mockResolvedValue({ deletedCount: 1 });
        const result = yield (0, service_1.deleteSchemaService)(mockRequest);
        expect(result).toEqual({ status: 200, message: `${mockRequest.entityName} deleted successfully` });
    }));
    test('DELETE deleteSchemaService  not found', () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataSchema.deleteOne.mockResolvedValue({ deletedCount: 0 });
        try {
            yield (0, service_1.deleteSchemaService)(mockRequest);
        }
        catch (error) {
            expect(error.status).toBe(404);
            expect(error.message).toBe(`${mockRequest.entityName} not found`);
        }
    }));
    test("DELETE deleteSchemaService - Invalid EntityName", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Invalid EntityName Unable to Delete";
        model_1.MetadataSchema.deleteOne.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.deleteSchemaService)(mockRequest.entityName);
        }
        catch (error) {
            expect(model_1.MetadataSchema.deleteOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
});
