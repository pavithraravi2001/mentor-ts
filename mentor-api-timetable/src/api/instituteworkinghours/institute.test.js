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
    InstituteWorkHours: {
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
        deleteOne: jest.fn(),
    },
}));
const mockRequest = {
    instituteId: "608180ec3ffb5c0106a16b9e",
    workingHours: [
        {
            day: "Monday",
            type: "Full Day",
            startTime: "9:30",
            endTime: "6:00",
        },
    ],
};
const updateData = {
    instituteId: "608180ec3ffb5c0106a16b9e",
    workingHours: [
        {
            day: "Wednesday",
            type: "Half Day",
            startTime: "9:30",
            endTime: "12:00",
        },
    ],
};
const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
};
describe("InstituteWorkHours API - MockTesting", () => {
    test("GET InstituteWorkHours  ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteWorkHours.findOne.mockResolvedValue(mockRequest);
        try {
            const result = yield (0, service_1.getInstituteWorkingHoursService)(mockRequest);
            expect(model_1.InstituteWorkHours.findOne).toHaveBeenCalled();
            expect(result).toEqual(mockRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET InstituteWorkHours - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error Fetching WorkingHours";
        model_1.InstituteWorkHours.findOne.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getInstituteWorkingHoursService)(mockRequest);
        }
        catch (error) {
            expect(model_1.InstituteWorkHours.findOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("PUT InstituteWorkHours  ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteWorkHours.findOneAndUpdate.mockResolvedValue(updateData);
        try {
            const result = yield (0, service_1.updateInstituteWorkingHoursService)(updateData);
            expect(result).toEqual(updateData);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("PUT MetadataContent - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error updating WorkingHours";
        model_1.InstituteWorkHours.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.updateInstituteWorkingHoursService)(updateData);
        }
        catch (error) {
            expect(model_1.InstituteWorkHours.findOneAndUpdate).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("DELETE InstituteWorkHours", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteWorkHours.deleteOne.mockResolvedValue(mockRequest);
        try {
            const result = yield (0, service_1.deleteInstituteWorkingHoursService)();
            expect(typeof result).toBe("object");
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("DELETE InstituteWorkHours - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Unable to Delete WorkingHours";
        model_1.InstituteWorkHours.deleteOne.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.deleteInstituteWorkingHoursService)();
        }
        catch (error) {
            expect(model_1.InstituteWorkHours.deleteOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
});
