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
    MetadataFeeConcession: {
        find: jest.fn(),
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
    concessionKey: "Bloomlync123",
    description: "admission12",
    isPercentage: true,
    percentage: 40,
    isFixedAmount: true,
    fixedAmount: 50,
};
const updateData = {
    concessionKey: "Bloomlync",
    description: "admission2",
    isPercentage: true,
    percentage: 40,
    isFixedAmount: true,
    fixedAmount: 50,
};
const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
};
const mockFeeconcession = [
    {
        concessionKey: "BloomlyncMadurai",
        description: "Admission",
        isPercentage: true,
        percentage: 40,
        isFixedAmount: true,
        fixedAmount: 50,
    },
    {
        concessionKey: "Technology",
        description: "Admission3",
        isPercentage: true,
        percentage: 40,
        isFixedAmount: true,
        fixedAmount: 50,
    },
];
describe("MetadataFeeConcession API - Mock Testing", () => {
    test("GET MetadataFeeConcession  ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataFeeConcession.find.mockResolvedValue(mockFeeconcession);
        try {
            const result = yield (0, service_1.getMetadataFeeConcessionService)();
            expect(model_1.MetadataFeeConcession.find).toHaveBeenCalled();
            expect(result).toEqual(mockFeeconcession);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET MetadataFeeConcession - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "An error occurred while fetching FeeConcession.";
        model_1.MetadataFeeConcession.find.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getMetadataFeeConcessionService)();
        }
        catch (error) {
            expect(model_1.MetadataFeeConcession.find).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("GET MetadataFeeConcessionbyconcessionkey ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataFeeConcession.findOne.mockResolvedValue(mockRequest);
        try {
            const result = yield (0, service_1.getMetadataFeeConcessionByConcessionKeyService)(mockRequest.concessionKey);
            expect(model_1.MetadataFeeConcession.findOne).toHaveBeenCalled();
            expect(result).toEqual(mockRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test('GET MetadataFeeConcessionbyconcessionkey 404 error', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new Error(`Fee concession with key ${mockRequest.concessionKey} not found`);
        model_1.MetadataFeeConcession.findOne.mockResolvedValue(null);
        yield expect((0, service_1.getMetadataFeeConcessionByConcessionKeyService)(mockRequest)).rejects.toEqual(error);
    }));
    test("GET MetadataFeeConcessionbyconcessionkey - Invalid ConcessionKey", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Invalid ConcessionKey";
        model_1.MetadataFeeConcession.findOne.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getMetadataFeeConcessionByConcessionKeyService)(mockRequest.concessionKey);
        }
        catch (error) {
            expect(model_1.MetadataFeeConcession.findOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("POST MetadataFeeConcession", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataFeeConcession.create.mockResolvedValue(mockRequest);
        try {
            const result = yield (0, service_1.createFeeConcessionService)(mockRequest);
            expect(model_1.MetadataFeeConcession.create).toHaveBeenCalled();
            expect(result).toEqual(mockRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("POST MetadataFeeConcession - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "ContentKey is already registered";
        const mockMongoError = new Error();
        mockMongoError.name = "MongoError";
        mockMongoError.code = 11000;
        model_1.MetadataFeeConcession.create.mockRejectedValue(mockMongoError);
        try {
            const result = yield (0, service_1.createFeeConcessionService)(mockRequest);
        }
        catch (error) {
            expect(model_1.MetadataFeeConcession.create).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
            expect(error.status).toBe(409);
        }
    }));
    test("POST MetadataFeeConcession - Error Handling - Generic Error", () => __awaiter(void 0, void 0, void 0, function* () {
        const genericErrorMessage = "err";
        const mockGenericError = new Error(genericErrorMessage);
        model_1.MetadataFeeConcession.create.mockRejectedValue(mockGenericError);
        try {
            yield (0, service_1.createFeeConcessionService)(mockRequest);
        }
        catch (error) {
            expect(model_1.MetadataFeeConcession.create).toHaveBeenCalled();
            expect(error.message).toBe(genericErrorMessage);
        }
    }));
    test("PUT MetadataFeeConcession", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataFeeConcession.findOneAndUpdate.mockResolvedValue(updateData);
        try {
            const result = yield (0, service_1.updateFeeConcessionService)(updateData);
            expect(result).toEqual(updateData);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("PUT MetadataFeeConcession", () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new Error(`${mockRequest.concessionKey} not found`);
        model_1.MetadataFeeConcession.findOneAndUpdate.mockResolvedValue(null);
        try {
            const result = yield (0, service_1.updateFeeConcessionService)(updateData);
        }
        catch (error) {
            expect(error).toEqual(error);
        }
    }));
    test("PUT MetadataFeeConcession - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error updating FeeConcession Invalid Data";
        model_1.MetadataFeeConcession.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.updateFeeConcessionService)(updateData);
        }
        catch (error) {
            expect(model_1.MetadataFeeConcession.findOneAndUpdate).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test('DELETE deleteFeeConcessionService', () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataFeeConcession.deleteOne.mockResolvedValue({ deletedCount: 1 });
        const result = yield (0, service_1.deleteFeeConcessionService)(mockRequest);
        expect(result).toEqual({ status: 200, message: 'Metadata fee concession deleted successfully' });
    }));
    test('DELETE deleteFeeConcessionService metadata fee concession key not found', () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataFeeConcession.deleteOne.mockResolvedValue({ deletedCount: 0 });
        try {
            yield (0, service_1.deleteFeeConcessionService)(mockRequest);
        }
        catch (error) {
            expect(error.status).toBe(404);
            expect(error.message).toBe("Metadata fee concession content key not found");
        }
    }));
    test("DELETE MetadataFeeConcession  - Invalid ConcessionKey", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Invalid ConcessionKey";
        model_1.MetadataFeeConcession.deleteOne.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.deleteFeeConcessionService)(mockRequest.concessionKey);
        }
        catch (error) {
            expect(model_1.MetadataFeeConcession.deleteOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
});
