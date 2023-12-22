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
    LeaveForm: {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
        findOneAndUpdate: jest.fn(),
        findByIdAndRemove: jest.fn(),
        deleteOne: jest.fn(),
    },
}));
const mockLeaveForm = {
    body: {
        _id: "65151ae7ed1968322c86e611",
        name: "solomon.rajaps",
        leaveType: "vacation",
        userId: "5f2e8c9608ddde00182ab054",
        dateFrom: "2023-03-22",
        dateTo: "2023-04-15",
        leaveReason: "Holiday",
    },
};
const mockLeaveForms = [
    {
        _id: 2,
        name: "solomon.rajaps",
        leaveType: "vacation",
        userId: "5f2e8c9608ddde00182ab054",
        dateFrom: "2023-03-22",
        dateTo: "2023-04-15",
        leaveReason: "Fever",
    },
    {
        _id: 3,
        name: "Bob.elstan",
        leaveType: "sick",
        userId: "5f2e8c9608ddde00182ab055",
        dateFrom: "2023-03-22",
        dateTo: "2023-04-15",
        leaveReason: "Fever",
    },
];
describe("Leave-Form API", () => {
    test("GET getLeaveFormService", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.LeaveForm.find.mockResolvedValue(mockLeaveForms);
        const result = yield (0, service_1.getLeaveFormService)();
        expect(model_1.LeaveForm.find).toHaveBeenCalled();
        expect(result).toEqual(mockLeaveForms);
    }));
    test("GET getLeaveFormService - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Failed to fetch leave forms";
        const error = new Error(errorMessage);
        model_1.LeaveForm.find.mockRejectedValue(error);
        try {
            yield (0, service_1.getLeaveFormService)();
        }
        catch (err) {
            expect(model_1.LeaveForm.find).toHaveBeenCalled();
            expect(err.message).toBe(errorMessage);
        }
    }));
    test("GET Leave form by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.LeaveForm.findById.mockResolvedValue(mockLeaveForm.body);
        try {
            const result = yield (0, service_1.getLeaveFormByIdService)(mockLeaveForm.body._id);
            expect(result).toEqual(mockLeaveForm.body);
        }
        catch (error) {
            console.error(error);
        }
    }));
    test("GET Leave form by ID - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const leaveFormId = "652e508c0c2d5415de9d9612";
        const errorMessage = "Failed to fetch leave form by ID";
        const error = new Error(errorMessage);
        model_1.LeaveForm.findById.mockRejectedValue(error);
        try {
            yield (0, service_1.getLeaveFormByIdService)(leaveFormId);
        }
        catch (err) {
            expect(err.message).toBe(errorMessage);
        }
    }));
    test("POST Leave form", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.LeaveForm.create.mockResolvedValue(mockLeaveForm.body);
        try {
            const result = yield (0, service_1.createLeaveFormService)(mockLeaveForm.body);
            expect(model_1.LeaveForm.create).toHaveBeenCalledWith(mockLeaveForm.body);
            expect(result).toEqual(mockLeaveForm.body);
        }
        catch (error) {
            console.error(error);
        }
    }));
    test("POST Leave form - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Failed to create leave form";
        const error = new Error(errorMessage);
        model_1.LeaveForm.create.mockRejectedValue(error);
        try {
            yield (0, service_1.createLeaveFormService)(mockLeaveForm.body);
        }
        catch (err) {
            expect(model_1.LeaveForm.create).toHaveBeenCalledWith(mockLeaveForm.body);
            expect(err.message).toBe(errorMessage);
        }
    }));
    test("PUT Leave form", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.LeaveForm.findOneAndUpdate.mockResolvedValue(mockLeaveForm.body);
        try {
            const result = yield (0, service_1.updateLeaveFormService)({ _id: "65151ae7ed1968322c86e611" }, mockLeaveForm);
            expect(result).toEqual(mockLeaveForm);
        }
        catch (error) {
            console.error(error);
        }
    }));
    test("PUT Leave form - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.LeaveForm.findOneAndUpdate.mockRejectedValue(new Error("Failed to update leave form"));
        try {
            const result = yield (0, service_1.updateLeaveFormService)({ _id: "65151ae7ed1968322c86e611" }, mockLeaveForm);
            expect(result).toEqual(mockLeaveForm);
        }
        catch (error) {
            expect(error.message).toBe("Failed to update leave form");
        }
    }));
    test("DELETE Leave forms", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.LeaveForm.deleteOne.mockResolvedValue({ deletedCount: 1 });
        try {
            const result = yield (0, service_1.deleteLeaveFormService)({
                id: mockLeaveForm.body._id,
            });
            expect(model_1.LeaveForm.deleteOne).toHaveBeenCalled();
            expect(result).toEqual({
                status: 200,
                message: "LeaveForm deleted successfully",
            });
            console.log(result);
        }
        catch (error) {
            console.error(error);
        }
    }));
    test("DELETE Leave forms - Not Found", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.LeaveForm.deleteOne.mockResolvedValue({ deletedCount: 0 });
        try {
            yield (0, service_1.deleteLeaveFormService)({ id: mockLeaveForm.body._id });
        }
        catch (error) {
            expect(model_1.LeaveForm.deleteOne).toHaveBeenCalled();
            expect(error.status).toBe(404);
            expect(error.message).toBe("LeaveForm not found");
            console.log(error);
        }
    }));
    test("DELETE Leave forms - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new Error("Failed to delete leave form");
        model_1.LeaveForm.deleteOne.mockRejectedValue(error);
        try {
            yield (0, service_1.deleteLeaveFormService)({ id: mockLeaveForm.body._id });
        }
        catch (error) {
            expect(model_1.LeaveForm.deleteOne).toHaveBeenCalled();
            expect(error.message).toBe("Failed to delete leave form");
            console.log(error);
        }
    }));
    test("GET Leave form by User ID", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.LeaveForm.findOne.mockResolvedValue(mockLeaveForm.body);
        const params = { userId: mockLeaveForm.body.userId };
        try {
            const result = yield (0, service_1.getUserIdService)(params);
            expect(model_1.LeaveForm.findOne).toHaveBeenCalledWith(mockLeaveForm.body);
            expect(result).toEqual(mockLeaveForm.body);
        }
        catch (error) {
            console.error(error);
        }
    }));
    test("GET Leave form by User ID - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new Error("Failed to fetch leave forms");
        const params = { userId: mockLeaveForm.body.userId };
        model_1.LeaveForm.findOne.mockRejectedValue(error);
        try {
            const result = yield (0, service_1.getUserIdService)(params);
        }
        catch (error) {
            expect(error.message).toBe("Failed to fetch leave forms");
        }
    }));
});
