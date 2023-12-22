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
    InstituteFeeMaster: {
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
        deleteOne: jest.fn(),
    },
    InstituteFeeTerm: {
        findOne: jest.fn(),
        create: jest.fn(),
        findOneAndUpdate: jest.fn(),
        deleteOne: jest.fn(),
    },
    InstituteFeeConfiguration: {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        findOneAndUpdate: jest.fn(),
        deleteOne: jest.fn(),
    },
}));
const mockMasterRequest = {
    instituteId: "604dfb61be00390018cee629",
    academicYear: "2023-24",
    fees: [
        {
            feeName: "Academicfee",
            feeCode: "A-20",
        },
    ],
};
const updateMasterData = {
    instituteId: "604dfb61be00390018cee629",
    academicYear: "2023-24",
    fees: [
        {
            feeName: "Sportfee",
            feeCode: "B-20",
        },
    ],
};
const mockTermRequest = {
    instituteId: "604dfb61be00390018cee629",
    academicYear: "2023-24",
    terms: [
        {
            termName: "Term-2",
            feeDate: "2023-03-31T18:30:00.000Z",
            dueDate: "2023-06-29T18:30:00.000Z",
        },
    ],
};
const updateTermData = {
    instituteId: "604dfb61be00390018cee629",
    academicYear: "2023-24",
    terms: [
        {
            termName: "Term-3",
            feeDate: "2023-01-31T18:30:00.000Z",
            dueDate: "2023-01-29T18:30:00.000Z",
        },
    ],
};
const mockconfigRequest = {
    instituteId: "604dfb61be00390018cee629",
    academicYear: "2023-24",
    grade: "I",
    section: "All",
    totalAmount: "200",
    terms: [
        {
            termId: "63a097b50a3a482d448a28fb",
            feeType: "Uniform Fee",
            feeAmount: "500",
            term: "Term-2",
            startDate: "2023-03-31T18:30:00.000Z",
            endDate: "2023-06-29T18:30:00.000Z",
        },
        {
            termId: "63a097b50a3a482d448a28bv",
            feeType: "Tution Fee",
            feeAmount: "700",
            term: "Term-3",
            startDate: "2023-03-31T18:30:00.000Z",
            endDate: "2023-06-29T18:30:00.000Z",
        },
    ],
};
const updateConfigData = {
    _id: "604dfb61be00390018cee629",
    instituteId: "604dfb61be00390018cee629",
    academicYear: "2023-24",
    grade: "I",
    section: "A",
    totalAmount: "200",
    terms: [
        {
            termId: "63a097b50a3a482d448a28fb",
            feeType: "Swimming Fee",
            feeAmount: "700",
            term: "Term-3",
            startDate: "2023-03-31T18:30:00.000Z",
            endDate: "2023-06-29T18:30:00.000Z",
        },
        {
            termId: "63a097b50a3a482d448a28bv",
            feeType: "Tution Fee",
            feeAmount: "700",
            term: "Term-3",
            startDate: "2023-03-31T18:30:00.000Z",
            endDate: "2023-06-29T18:30:00.000Z",
        },
    ],
};
const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
};
describe("InstituteFeeMaster API - MockTesting", () => {
    test("GET InstituteFeeMaster ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteFeeMaster.findOne.mockResolvedValue(mockMasterRequest);
        try {
            const result = yield (0, service_1.getInstituteFeeService)(mockMasterRequest.instituteId, mockMasterRequest.academicYear);
            expect(model_1.InstituteFeeMaster.findOne).toHaveBeenCalled();
            expect(result).toEqual(mockMasterRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET InstituteFeeMaster - Error Handling ", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "InsituteId Not Found";
        model_1.InstituteFeeMaster.findOne.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getInstituteFeeService)(mockMasterRequest.instituteId, mockMasterRequest.academicYear);
        }
        catch (error) {
            expect(model_1.InstituteFeeMaster.findOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("PUT InstituteFeeMaster ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteFeeMaster.findOneAndUpdate.mockResolvedValue(updateMasterData);
        try {
            const result = yield (0, service_1.updateInstituteFeeService)({ instituteId: updateMasterData.instituteId }, updateMasterData);
            expect(result).toEqual({ message: "Fee updated successfully!!" });
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("PUT InstituteFeeMaster - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error updating Institute Fee ";
        model_1.InstituteFeeMaster.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.updateInstituteFeeService)({ instituteId: updateMasterData.instituteId }, updateMasterData);
        }
        catch (error) {
            expect(model_1.InstituteFeeMaster.findOneAndUpdate).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("GET InstituteFeeTerm", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteFeeTerm.findOne.mockResolvedValue(mockTermRequest);
        try {
            const result = yield (0, service_1.getInstituteFeeTermService)(mockTermRequest.instituteId, mockTermRequest.academicYear);
            expect(model_1.InstituteFeeTerm.findOne).toHaveBeenCalled();
            expect(result).toEqual(mockTermRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET InstituteFeeTerm - Error Handling  ", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "InsituteId or Academicyear Not Found";
        model_1.InstituteFeeTerm.findOne.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getInstituteFeeTermService)(mockTermRequest.instituteId, mockTermRequest.academicYear);
        }
        catch (error) {
            expect(model_1.InstituteFeeTerm.findOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("PUT InstituteFeeTerm", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteFeeTerm.findOneAndUpdate.mockResolvedValue(updateTermData);
        try {
            const result = yield (0, service_1.updateInstituteFeeTermService)({ instituteId: updateTermData.instituteId }, updateTermData);
            expect(result).toEqual({ message: "Fee term updated successfully!!" });
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("PUT InstituteFeeTerm - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error updating Institute Fee ";
        model_1.InstituteFeeTerm.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.updateInstituteFeeTermService)({ instituteId: updateTermData.instituteId }, updateTermData);
        }
        catch (error) {
            expect(model_1.InstituteFeeMaster.findOneAndUpdate).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("GET InstituteFeeConfig", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteFeeConfiguration.find.mockResolvedValue(mockconfigRequest);
        try {
            const result = yield (0, service_1.getInstituteFeeConfigurationService)(mockconfigRequest.instituteId, mockconfigRequest.academicYear);
            expect(model_1.InstituteFeeConfiguration.find).toHaveBeenCalled();
            expect(result).toEqual(mockconfigRequest);
        }
        catch (error) { }
    }));
    test("GET InstituteFeeConfig - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "InsituteId or Academicyear Not Found";
        model_1.InstituteFeeConfiguration.find.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getInstituteFeeConfigurationService)(mockconfigRequest.instituteId, mockconfigRequest.academicYear);
        }
        catch (error) {
            expect(model_1.InstituteFeeConfiguration.find).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("PUT InstituteFeeConfig", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteFeeConfiguration.findOneAndUpdate.mockResolvedValue(updateConfigData);
        try {
            const result = yield (0, service_1.updateInstituteFeeConfigurationService)(updateConfigData.instituteId, updateConfigData.academicYear);
            expect(result).toEqual({
                message: "Fee configuration updated successfully!!",
            });
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("PUT InstituteFeeConfig - Section exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const existingSection = {
            instituteId: "604dfb61be00390018cee629",
            academicYear: "2023-24",
            grade: "I",
            section: "All",
        };
        model_1.InstituteFeeConfiguration.findOne.mockResolvedValue(existingSection);
        try {
            const result = yield (0, service_1.updateInstituteFeeConfigurationService)({ instituteId: existingSection.instituteId }, {
                academicYear: existingSection.academicYear,
                grade: existingSection.grade,
                section: existingSection.section,
            });
        }
        catch (error) {
            expect(model_1.InstituteFeeConfiguration.findOne).toHaveBeenCalled();
            expect(error.status).toBe(409);
            expect(error.message).toContain("Fee configuration Grade and Section already exists. kindly update existing section");
        }
    }));
    test("PUT InstituteFeeConfig - Existing Section - False", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Fee configuration Grade and Section already exists. kindly update existing section";
        const existingSection = {
            _id: "604dfb61be00390018cee629",
            academicYear: "2022-2023",
            grade: "10",
            section: "A",
        };
        model_1.InstituteFeeConfiguration.findOne.mockResolvedValue(existingSection);
        try {
            const result = yield (0, service_1.updateInstituteFeeConfigurationService)({ instituteId: updateConfigData.instituteId }, updateConfigData);
        }
        catch (error) {
            expect(model_1.InstituteFeeConfiguration.findOne).toHaveBeenCalled();
            expect(error.status).toBe(409);
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("PUT InstituteFeeConfig - Existing Section - True", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Fee configuration Grade and Section already exists. kindly update existing section";
        const existingSection = {
            _id: "604dfb61be00390018cee618",
            academicYear: "2022-2023",
            grade: "10",
            section: "B",
        };
        model_1.InstituteFeeConfiguration.findOne.mockResolvedValue(existingSection);
        try {
            const result = yield (0, service_1.updateInstituteFeeConfigurationService)({ instituteId: updateConfigData.instituteId }, updateConfigData);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("DELETE InstituteFeeConfig", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteFeeConfiguration.deleteOne.mockResolvedValue({ deletedCount: 1 });
        try {
            const result = yield (0, service_1.deleteInstituteFeeConfigurationService)(mockconfigRequest);
            expect(result).toEqual({
                status: 200,
                message: "Fee Configuration deleted successfully",
            });
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("DELETE InstituteFeeConfig - ID not found", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteFeeConfiguration.deleteOne.mockResolvedValue({ deletedCount: 0 });
        try {
            yield (0, service_1.deleteInstituteFeeConfigurationService)(mockconfigRequest);
            fail("Expected an error but got success");
        }
        catch (error) {
            expect(model_1.InstituteFeeConfiguration.deleteOne).toHaveBeenCalled();
            expect(error.status).toBe(404);
            expect(error.message).toBe("ID not found");
        }
    }));
    test("DELETE InstituteFeeConfig - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Unable to Delete, Invalid instituteId";
        model_1.InstituteFeeConfiguration.deleteOne.mockRejectedValue(new Error(errorMessage));
        try {
            yield (0, service_1.deleteInstituteFeeConfigurationService)(mockconfigRequest);
        }
        catch (error) {
            expect(model_1.InstituteFeeConfiguration.deleteOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("DELETE InstituteFeeConfig:termid", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteFeeConfiguration.findOneAndUpdate.mockResolvedValue(mockconfigRequest);
        try {
            const result = yield (0, service_1.removeArrayItemInstituteFeeConfigurationService)(mockconfigRequest.instituteId, mockconfigRequest.terms[0].termId);
            expect(result).toEqual(mockconfigRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("DELETE InstituteFeeConfig: termid - Term ID not found", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteFeeConfiguration.findOneAndUpdate.mockResolvedValue(null);
        try {
            yield (0, service_1.removeArrayItemInstituteFeeConfigurationService)(mockconfigRequest.instituteId, mockconfigRequest.terms[0].termId);
        }
        catch (error) {
            expect(model_1.InstituteFeeConfiguration.findOneAndUpdate).toHaveBeenCalled();
            expect(error.status).toBe(404);
            expect(error.message).toBe("Term ID not found");
            console.log(error);
        }
    }));
    test("DELETE InstituteFeeConfiguration: termid - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Invalid instituteId or Termid";
        model_1.InstituteFeeConfiguration.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.removeArrayItemInstituteFeeConfigurationService)(mockconfigRequest.instituteId, mockconfigRequest.terms[0].termId);
        }
        catch (error) {
            expect(model_1.InstituteFeeConfiguration.findOneAndUpdate).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
});
