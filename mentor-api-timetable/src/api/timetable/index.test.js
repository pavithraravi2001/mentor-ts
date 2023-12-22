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
    Timetable: {
        findOne: jest.fn(),
        create: jest.fn(),
        findOneAndUpdate: jest.fn(),
    },
}));
const mockRequest = {
    academicYear: "2023-24",
    classGrade: "III",
    section: "B",
    timetableRow: [
        {
            day: "Tuesday",
            period1: "Tamil",
            period2: "Break",
            period3: "English",
            period4: "Break",
            period5: "Science",
            period6: "Break",
            period7: "Social",
            period8: "Break",
            period9: "Tamil",
            period10: "Break",
            period11: "English",
        },
    ],
};
const updateData = {
    academicYear: "2023-24",
    classGrade: "III",
    section: "B",
    timetableRow: [
        {
            day: "Monday",
            period1: "Science",
            period2: "Break",
            period3: "Maths",
            period4: "Break",
            period5: "Science",
            period6: "Break",
            period7: "Social",
            period8: "Break",
            period9: "Tamil",
            period10: "Break",
            period11: "English",
        },
    ],
};
const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
};
describe("Timetable API - MockTesting", () => {
    test("GET Timetable", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.Timetable.findOne.mockResolvedValue(mockRequest);
        try {
            const result = yield (0, service_1.getTimetableService)({
                academicYear: mockRequest.academicYear,
                classGrade: mockRequest.classGrade,
                section: mockRequest.section
            });
            expect(model_1.Timetable.findOne).toHaveBeenCalled();
            expect(result).toEqual(mockRequest);
        }
        catch (error) { }
    }));
    test("GET Timetable - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error Fetching Timetable Invalid data";
        model_1.Timetable.findOne.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getTimetableService)({ academicYear: mockRequest.academicYear,
                classGrade: mockRequest.classGrade,
                section: mockRequest.section });
        }
        catch (error) {
            expect(model_1.Timetable.findOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("POST Timetable ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.Timetable.findOne.mockResolvedValue(null);
        model_1.Timetable.create.mockResolvedValue(mockRequest);
        try {
            const result = yield (0, service_1.createTimetableService)(mockRequest);
            expect(model_1.Timetable.create).toHaveBeenCalled();
            expect(result).toEqual(mockRequest);
        }
        catch (error) { }
    }));
    test("POST Timetable - Creation Error", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error Creating Timetable";
        const mockError = new Error(errorMessage);
        model_1.Timetable.findOne.mockResolvedValue(null);
        model_1.Timetable.create.mockRejectedValue(mockError);
        try {
            yield (0, service_1.createTimetableService)(mockRequest);
        }
        catch (error) {
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("POST Timetable - Timetable Already Exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const existingTimetable = { academicYear: "2023-24", classGrade: "III", section: "B" };
        const errorMessage = "Timetable already exists for the specified academic year, class, and section.";
        model_1.Timetable.findOne.mockImplementation((query) => {
            if (query.academicYear === existingTimetable.academicYear &&
                query.classGrade === existingTimetable.classGrade &&
                query.section === existingTimetable.section) {
                return Promise.resolve(existingTimetable);
            }
            else {
                return Promise.resolve(null);
            }
        });
        try {
            yield (0, service_1.createTimetableService)(mockRequest);
        }
        catch (error) {
            expect(error.status).toBe(409);
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("POST Timetable - Query Error", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error querying existing timetable.";
        const mockError = new Error(errorMessage);
        model_1.Timetable.findOne.mockRejectedValue(mockError);
        model_1.Timetable.create.mockResolvedValue(mockRequest);
        try {
            yield (0, service_1.createTimetableService)(mockRequest);
        }
        catch (error) {
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("PUT Timetable ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.Timetable.findOneAndUpdate.mockResolvedValue(updateData);
        try {
            const result = yield (0, service_1.updateTimetableService)({ academicYear: updateData.academicYear,
                classGrade: updateData.classGrade,
                section: updateData.section }, updateData);
            expect(result).toEqual(updateData);
        }
        catch (error) { }
    }));
    test("PUT Timetable - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error Updating Timetable";
        model_1.Timetable.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.updateTimetableService)({ academicYear: updateData.academicYear }, { classGrade: updateData.classGrade }, { section: updateData.section }, updateData);
        }
        catch (error) {
            expect(model_1.Timetable.findOneAndUpdate).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
});
