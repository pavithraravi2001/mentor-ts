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
    MetadataCollection: {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        findOneAndUpdate: jest.fn(),
        deleteOne: jest.fn(),
        aggregate: jest.fn(),
    },
}));
const mockRequest = {
    name: "student-collection",
    collectionItems: [
        {
            optionKey: "Mahesh",
            optionValue: "Mahesh",
            default: true,
            description: "String",
            order: 0,
            parent: "CBSE",
        },
    ],
};
const updateData = {
    name: "student-collection",
    collectionItems: [
        {
            optionKey: "MaheshKumar",
            optionValue: "Mahesh1",
            default: true,
            description: "String",
            order: 0,
            parent: "CBSE",
        },
    ],
};
const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
};
const mockMetadataCollection = [
    {
        name: "student-collection",
        collectionItems: [
            {
                label: "Saravananshankar",
                value: "Saravanan",
                default: true,
                description: "String",
                order: 0,
                parent: "CBSE",
            },
        ],
    },
    {
        name: "Student-collection1",
        collectionItems: [
            {
                label: "Dineshkumar",
                value: "Dinesh",
                default: true,
                description: "String",
                order: 0,
                parent: "CBSE",
            },
        ],
    },
];
describe("MetadataCollection API - MockTesting ", () => {
    test("GET MetadataCollection  ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataCollection.find.mockResolvedValue(mockMetadataCollection);
        try {
            const result = yield (0, service_1.getCollectionsService)();
            expect(model_1.MetadataCollection.find).toHaveBeenCalled();
            expect(result).toEqual(mockMetadataCollection);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET MetadataCollection - CollectionKey Exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "CollectionKey is already exists";
        model_1.MetadataCollection.find.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getCollectionsService)();
        }
        catch (error) {
            expect(model_1.MetadataCollection.find).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("GET MetadataCollection:Name", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataCollection.findOne.mockResolvedValue(mockRequest);
        try {
            const result = yield (0, service_1.getCollectionByNameService)(mockRequest.name);
            expect(model_1.MetadataCollection.findOne).toHaveBeenCalled();
            expect(result).toEqual(mockRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET MetadataCollection:Name - CollectionName Not Found", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "CollectionName not Found Invalid ";
        model_1.MetadataCollection.findOne.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getCollectionByNameService)(mockRequest.name);
        }
        catch (error) {
            expect(model_1.MetadataCollection.findOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("GET MetadataCollection /dropdown:Name ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataCollection.aggregate.mockResolvedValue(mockMetadataCollection);
        try {
            const result = yield (0, service_1.getCollectionForDropDownService)({ name: mockMetadataCollection[0].name }, mockMetadataCollection[0]);
            expect(model_1.MetadataCollection.aggregate).toHaveBeenCalled();
            expect(result).toEqual([
                {
                    label: mockMetadataCollection[0].collectionItems[0].label,
                    value: mockMetadataCollection[0].collectionItems[0].value,
                },
            ]);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET MetadataCollection /dropdown:Name - preparelist", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = { parent: "Class" };
        const entity = [
            {
                collectionItems: [
                    { parent: "Class", label: "LKG", value: "LKG" },
                    { parent: "Class", label: "III", value: "III" },
                ],
            },
        ];
        const rejectmock = jest.fn();
        try {
            const result = (0, service_1.prepareList)(rejectmock, query)(entity);
            expect(result).toEqual([
                { label: "LKG", value: "LKG" },
                { label: "III", value: "III" },
            ]);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET MetadataCollection /dropdown:Name - preparelist (Error case)", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = { parent: "Class" };
        const entity = [];
        const rejectmock = jest.fn();
        try {
            const result = (0, service_1.prepareList)(rejectmock, query)(entity);
            expect(result).toBeUndefined();
            expect(rejectmock).toHaveBeenCalledWith({
                status: 404,
                message: "not found",
            });
        }
        catch (error) { }
    }));
    test('POST createCollectionService collection does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            model_1.MetadataCollection.findOne.mockResolvedValue(null);
            model_1.MetadataCollection.create.mockResolvedValue(mockRequest);
            const result = yield (0, service_1.createCollectionService)(mockRequest);
            expect(model_1.MetadataCollection.findOne).toHaveBeenCalled();
            expect(model_1.MetadataCollection.create).toHaveBeenCalledWith(mockRequest);
            expect(result).toEqual(mockRequest);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }));
    test('POST createCollectionService 409 error collection already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const error = new Error('Collection key already exists');
            model_1.MetadataCollection.findOne.mockResolvedValue({ name: mockRequest.collectionName });
            yield (0, service_1.createCollectionService)(mockRequest);
        }
        catch (error) {
            expect(error).toEqual(expect.objectContaining(error));
        }
    }));
    test('PUT updateCollectionService ', () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataCollection.findOne.mockResolvedValue({ name: mockRequest.collectionName });
        model_1.MetadataCollection.findOneAndUpdate.mockResolvedValue(mockRequest);
        try {
            const result = yield (0, service_1.updateCollectionService)(mockRequest);
            expect(model_1.MetadataCollection.findOne).toHaveBeenCalledWith({ name: mockRequest.name });
            expect(model_1.MetadataCollection.findOneAndUpdate).toHaveBeenCalledWith({ name: mockRequest.name }, mockRequest, { new: true });
            expect(result).toEqual({ status: 200, message: `${mockRequest.name} updated successfully` });
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }));
    test('PUT updateCollectionService 404 error not found', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const error = new Error(`Collection with name student-collection not found`);
            model_1.MetadataCollection.findOne.mockResolvedValue(null);
            yield (0, service_1.updateCollectionService)(mockRequest);
        }
        catch (error) {
            expect(error).toEqual(expect.objectContaining(error));
        }
    }));
    test('PUT updateCollectionService 500 error', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new Error(`Failed to update ${mockRequest.name}`);
        model_1.MetadataCollection.findOne.mockResolvedValue({ name: mockRequest.name });
        model_1.MetadataCollection.findOneAndUpdate.mockResolvedValue(null);
        try {
            yield (0, service_1.updateCollectionService)(mockRequest);
        }
        catch (error) {
            expect(error).toEqual(expect.objectContaining({
                status: 500,
                message: `Failed to update ${mockRequest.name}`,
            }));
        }
    }));
    test("PUT MetadataCollection - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error updating Collection Invalid Data";
        model_1.MetadataCollection.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.updateCollectionService)(updateData);
        }
        catch (error) {
            expect(model_1.MetadataCollection.findOneAndUpdate).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("DELETE deleteCollectionService", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataCollection.deleteOne.mockResolvedValue(mockRequest);
        try {
            const result = yield (0, service_1.deleteCollectionService)(mockRequest.name);
            expect(typeof result).toBe("object");
        }
        catch (error) {
            console.log(error);
        }
    }));
    test('DELETE deleteCollectionService', () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataCollection.deleteOne.mockResolvedValue({ deletedCount: 1 });
        const result = yield (0, service_1.deleteCollectionService)(mockRequest);
        expect(result).toEqual({ status: 200, message: `student-collection deleted successfully` });
    }));
    test('DELETE deleteCollectionService  not found', () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.MetadataCollection.deleteOne.mockResolvedValue({ deletedCount: 0 });
        try {
            yield (0, service_1.deleteCollectionService)(mockRequest);
        }
        catch (error) {
            expect(error.status).toBe(404);
            expect(error.message).toBe(`student-collection not found`);
        }
    }));
    test("DELETE MetadataCollection - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Unable to Delete, Invalid Collection Name";
        model_1.MetadataCollection.deleteOne.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.deleteCollectionService)(mockRequest.name);
        }
        catch (error) {
            expect(model_1.MetadataCollection.deleteOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
});
