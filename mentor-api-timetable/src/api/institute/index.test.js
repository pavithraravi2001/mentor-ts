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
const sinon_1 = __importDefault(require("sinon"));
const model_1 = require("./model");
const service_1 = require("./service");
const adminConfigService = __importStar(require("../admin-config/service"));
jest.mock("./model", () => ({
    Institute: {
        find: jest.fn(),
        findOne: jest.fn(),
        findById: jest.fn(),
        select: jest.fn(),
        sort: jest.fn(),
        create: jest.fn(),
        findOneAndUpdate: jest.fn(),
        deleteOne: jest.fn(),
    },
    InstituteHoliday: {
        find: jest.fn(),
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
    },
    InstituteClasses: {
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
    },
    InstituteSubjects: {
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
    },
    InstituteAnnouncement: {
        find: jest.fn(),
        insertMany: jest.fn(),
    },
    InstituteFaculties: {
        find: jest.fn(),
        findOneAndUpdate: jest.fn(),
    },
}));
const mockInstituteRequest = {
    isActive: true,
    needBiometric: true,
    needOnlineAdmission: true,
    needAdmissionNumberAutoGeneration: true,
    needAdmissionNumberPrefix: true,
    teacherRestrictedMode: true,
    interestedInMobileApp: false,
    _id: "604e130f37ae9600ee786a30",
    instituteCode: "IN1001",
    instituteName: "Vidyalaya",
    boardName: "CBSE",
    addressLine1: "120, Park Street",
    addressLine2: "Behind RTO Office",
    addressCountry: "India",
    addressState: "TamilNadu",
    addressCity: "Chennai",
    addressZipCode: "637002",
    landlineNumber1: "223345566",
    landlineNumber2: "223345566",
    mobileNumber1: "9994334657",
    mobileNumber2: "9994334658",
    contactPersonName: "Akila",
    email: "maheshkumarv@bloomlync.com",
    academicYear: "2022-23",
    startingMonthName: "March",
    attendenceType: "OneTime",
    language: "English",
    dateFormat: "dd/mmm/yyyy",
    admissionNumberPrefix: "AD",
    admissionNumberDigits: 5,
    currencySymbol: "Indian Rupee",
    feeDueDays: 30,
    instituteLogo: {
        documentUrl: "",
        documentType: "Student Photo",
        fileKey: "HoGhkigsGBHmF5GM79KHUkCWedfZRZ4B",
        originalFileName: "LinkedIn.png",
    },
    instituteImage: {
        documentUrl: "",
        documentType: "Student Photo",
        fileKey: "HoGhkigsGBHmF5GM79KHUkCWedfZRZ4B",
        originalFileName: "LinkedIn.png",
    },
    instituteMobileLogo: {
        documentUrl: "",
        documentType: "Student Photo",
        fileKey: "HoGhkigsGBHmF5GM79KHUkCWedfZRZ4B",
        originalFileName: "LinkedIn.png",
    },
    mapUrl: "https://goo.gl/maps/mjsq8U9Lwwazdn6E6",
    mapEmbedded: "<iframe></iframe>",
    groupId: "602558b4e1c2a204115ba1c0",
    institutePeriodTimes: [
        {
            periodName: "English",
            startTime: "12:00",
            endTime: "12:30",
            duration: "30",
        },
    ],
};
const updatedInstituteData = {
    _id: "604e130f37ae9600ee786a30",
    instituteName: "Vivekananda Vidyalaya",
    boardName: "CBSE",
    addressLine1: "120, Park Street",
    addressLine2: "Behind RTO Office",
    addressCountry: "India",
    addressState: "TamilNadu",
    addressCity: "Chennai",
    addressZipCode: "637002",
    landlineNumber1: "223345566",
    landlineNumber2: "223345566",
    mobileNumber1: "9994334657",
    mobileNumber2: "9994334658",
    contactPersonName: "Akila",
    email: "contact@knschool.com",
    academicYear: "2021-2022",
    startingMonthName: "March",
    attendenceType: "OneTime",
    language: "English",
    dateFormat: "dd/mmm/yyyy",
    admissionNumberPrefix: "AD",
    admissionNumberDigits: 5,
    currencySymbol: "Indian Rupee",
    feeDueDays: 30,
    instituteLogo: {
        documentUrl: "",
        documentType: "Student Photo",
        fileKey: "HoGhkigsGBHmF5GM79KHUkCWedfZRZ4B",
        originalFileName: "LinkedIn.png",
    },
    instituteImage: {
        documentUrl: "",
        documentType: "Student Photo",
        fileKey: "HoGhkigsGBHmF5GM79KHUkCWedfZRZ4B",
        originalFileName: "LinkedIn.png",
    },
    instituteMobileLogo: {
        documentUrl: "",
        documentType: "Student Photo",
        fileKey: "HoGhkigsGBHmF5GM79KHUkCWedfZRZ4B",
        originalFileName: "LinkedIn.png",
    },
    mapUrl: "https://goo.gl/maps/mjsq8U9Lwwazdn6E6",
    mapEmbedded: "<iframe></iframe>",
    groupId: "602558b4e1c2a204115ba1c0",
    institutePeriodTimes: [
        {
            periodName: "Maths",
            startTime: "6:00",
            endTime: "6:30",
            duration: "30",
        },
    ],
};
const mockInstituteclassesRequest = {
    academicYear: "2022-23",
    instituteId: "604e130f37ae9600ee786a30",
    classes: [
        {
            gradeName: "V",
            section: "A",
            startDate: "2023-09-05",
            endDate: "2023-09-06",
        },
    ],
};
const updatedInstituteclassesData = {
    academicYear: "2022-23",
    instituteId: "604e130f37ae9600ee786a30",
    classes: [
        {
            gradeName: "VI",
            section: "B",
            startDate: "2023-09-05",
            endDate: "2023-09-06",
        },
    ],
};
const mockInstituteholidaysRequest = [
    {
        academicYear: "2022-23",
        instituteId: "604e130f37ae9600ee786a30",
        holidays: [
            {
                holidayName: "Good Friday",
                holidayDate: "2023-05-23T00:00:00.000Z",
            },
        ],
    },
];
const updatedInstituteholidaysData = {
    academicYear: "2022-23",
    instituteId: "604e130f37ae9600ee786a30",
    holidays: [
        {
            holidayName: "New Year",
            holidayDate: "2024-01-01T00:00:00.000Z",
        },
    ],
};
const mockInstituteSubjectsRequest = {
    academicYear: "2022-23",
    instituteId: "604e130f37ae9600ee786a30",
    subjects: [
        {
            subjectName: "social science",
            subjectCode: "12344",
            subjectType: "Theory",
            classification: "Scholastic",
            status: null,
        },
    ],
};
const updatedInstituteSubjectsData = {
    academicYear: "2022-23",
    instituteId: "604e130f37ae9600ee786a30",
    subjects: [
        {
            subjectName: "Maths",
            subjectCode: "M31",
            subjectType: "Theory",
            classification: "Mathematics",
            status: null,
        },
    ],
};
const mockInstituteFacultiesRequest = {
    instituteId: "604e130f37ae9600ee786a30",
    academicYear: "2022-23",
    class: ["V"],
    sections: [
        {
            sectionName: "A",
            faculties: [
                {
                    subjectName: "English",
                    empId: "EMP1001",
                },
            ],
        },
    ],
};
const updatedInstituteFacultiesData = {
    instituteId: "604e130f37ae9600ee786a30",
    academicYear: "2022-23",
    class: "V",
    sections: [
        {
            sectionName: "A",
            faculties: [
                {
                    subjectName: "English",
                    empId: "EMP1001",
                },
                {
                    subjectName: "Tamil",
                    empId: "EMP1002",
                },
            ],
        },
    ],
};
const mockInstituteAnnouncementRequest = {
    instituteId: "604dfb61be00390018cee629",
    academicYear: "2022-23",
    announcementType: "School announcement",
    subject: "English",
    message: "Ready for exam",
    email: true,
    sms: true,
    push: true,
    class: [
        { section: "A", class: "V", student: true, parent: true, teacher: true },
    ],
    individualClass: ["Diyashree"],
    individualTeacher: ["Jayashree"],
    individualStudent: ["Yamuna"],
    publishedOn: ["2023-02-02"],
};
const addInstituteAnnouncementData = {
    instituteId: "604dfb61be00390018cee629",
    academicYear: "2022-23",
    announcementType: "School announcement",
    subject: "Maths",
    message: "Ready for exam",
    email: true,
    sms: true,
    push: true,
    class: [
        { section: "A", class: "V", student: true, parent: true, teacher: true },
    ],
    individualClass: ["Rubashree"],
    individualTeacher: ["Shree"],
    individualStudent: ["Guna"],
    publishedOn: ["2023-02-02"],
};
const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
};
jest.mock("../../common/aws-ses");
describe("Institute API - MockTesting", () => {
    afterEach(() => {
        sinon_1.default.restore();
    });
    test("GET Institute ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.Institute.find.mockResolvedValue(mockInstituteRequest);
        try {
            const result = yield (0, service_1.getInstitutesService)();
            expect(model_1.Institute.find).toHaveBeenCalled();
            expect(result).toEqual(mockInstituteRequest);
        }
        catch (error) { }
    }));
    test("GET Institute - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Institute Not Found.";
        model_1.Institute.find.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getInstitutesService)();
        }
        catch (error) {
            expect(model_1.Institute.find).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("GET Institute:id ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.Institute.findById.mockResolvedValue(mockInstituteRequest);
        try {
            const result = yield (0, service_1.getInstituteByIdService)({
                id: mockInstituteRequest._id,
            });
            expect(model_1.Institute.findById).toHaveBeenCalled();
            expect(result).toEqual(mockInstituteRequest);
        }
        catch (error) { }
    }));
    test("GET Institute:id - ID not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Institute_id not Found";
        model_1.Institute.findById.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getInstituteByIdService)({
                id: mockInstituteRequest._id,
            });
        }
        catch (error) {
            expect(model_1.Institute.findById).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("GET Institute:id - Invalid ID", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.Institute.findOne.mockResolvedValue(mockInstituteRequest);
        try {
            const result = yield (0, service_1.getInstituteByIdService)({
                id: "invalidID",
            });
            expect(model_1.Institute.findOne).toHaveBeenCalled();
            expect(result).toEqual(mockInstituteRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("POST Institute - without email Template", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.Institute.create.mockResolvedValue(mockInstituteRequest);
        try {
            const result = yield (0, service_1.createInstituteService)(mockInstituteRequest);
            expect(model_1.Institute.create).toHaveBeenCalled();
            expect(result).toEqual(mockInstituteRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("POST Institute - with email Template ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.Institute.create.mockResolvedValue(mockInstituteRequest);
        jest
            .spyOn(adminConfigService, "getEmailTemplateConfigByNameService")
            .mockResolvedValue({
            content: "Mock email template content",
            subject: "Onboarding a new Institution",
            toEmail: "maheshkumarv@bloomlync.com",
        });
        const sendEmailMock = jest.fn();
        sendEmailMock.mockImplementation(() => ({
            promise: jest
                .fn()
                .mockResolvedValueOnce({ MessageId: "mockedMessageId" }),
        }));
        try {
            const result = yield (0, service_1.createInstituteService)(mockInstituteRequest);
            expect(model_1.Institute.create).toHaveBeenCalled();
            yield adminConfigService.getEmailTemplateConfigByNameService({
                name: "InstituteSetupCompleteEmailTemplate",
            });
            expect(result).toEqual(mockInstituteRequest);
        }
        catch (error) { }
    }));
    test("POST Institute - InstituteCode exists ", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "InstituteCode is already exist";
        const mockMongoError = new Error();
        mockMongoError.name = "MongoError";
        mockMongoError.code = 11000;
        model_1.Institute.create.mockRejectedValue(mockMongoError);
        try {
            const result = yield (0, service_1.createInstituteService)(mockInstituteRequest);
        }
        catch (error) {
            expect(model_1.Institute.create).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
            expect(error.status).toBe(409);
        }
    }));
    test("POST Institute - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error creating Institute";
        const mockError = new Error(errorMessage);
        model_1.Institute.create.mockRejectedValue(mockError);
        try {
            yield (0, service_1.createInstituteService)(mockInstituteRequest);
        }
        catch (error) {
            expect(model_1.Institute.create).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("POST Institute - Missing groupId in request", () => __awaiter(void 0, void 0, void 0, function* () {
        delete mockInstituteRequest.groupId;
        model_1.Institute.create.mockResolvedValue(mockInstituteRequest);
        try {
            const result = yield (0, service_1.createInstituteService)(mockInstituteRequest);
            expect(model_1.Institute.create).toHaveBeenCalled();
            expect(result).toEqual(mockInstituteRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("PUT Institute/:id ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.Institute.findOneAndUpdate.mockResolvedValue(updatedInstituteData);
        try {
            const result = yield (0, service_1.updateInstituteService)(updatedInstituteData._id);
            expect(result).toEqual(updatedInstituteData);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("PUT Institute/:id - Invalid _id", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Invalid Institute_id";
        model_1.Institute.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.updateInstituteService)(updatedInstituteData._id);
        }
        catch (error) {
            expect(model_1.Institute.findOneAndUpdate).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("DELETE Institute/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.Institute.deleteOne.mockResolvedValue({ deletedCount: 1 });
        try {
            const result = yield (0, service_1.deleteInstituteService)({
                id: updatedInstituteData._id,
            });
            expect(model_1.Institute.deleteOne).toHaveBeenCalled();
            expect(result).toEqual({
                status: 200,
                message: "Institute deleted successfully",
            });
        }
        catch (error) {
            console.error(error);
        }
    }));
    test("DELETE Institute/:id - Not Found", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.Institute.deleteOne.mockResolvedValue({ deletedCount: 0 });
        try {
            yield (0, service_1.deleteInstituteService)({ id: updatedInstituteData._id });
        }
        catch (error) {
            expect(model_1.Institute.deleteOne).toHaveBeenCalled();
            expect(error.status).toBe(404);
            expect(error.message).toBe("Institute not found");
        }
    }));
    test("DELETE Institute/:id - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new Error("Failed to delete Institute");
        model_1.Institute.deleteOne.mockRejectedValue(error);
        try {
            yield (0, service_1.deleteInstituteService)({ id: updatedInstituteData._id });
        }
        catch (error) {
            expect(model_1.Institute.deleteOne).toHaveBeenCalled();
            expect(error.message).toBe("Failed to delete Institute");
        }
    }));
    test("GET InstitutePeriodNameService - True ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.Institute.find.mockResolvedValue(updatedInstituteData.institutePeriodTimes);
        try {
            const result = yield (0, service_1.getPeriodNameService)(updatedInstituteData.institutePeriodTimes);
            expect(model_1.Institute.find).toHaveBeenCalled();
            expect(result).toEqual(true);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET InstitutePeriodNameService - False ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.Institute.find.mockResolvedValue([]);
        try {
            const result = yield (0, service_1.getPeriodNameService)(updatedInstituteData.institutePeriodTimes);
            expect(model_1.Institute.find).toHaveBeenCalled();
            expect(result).toEqual(false);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET InstitutePeriodNameService - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "PeriodTimes Not Found";
        model_1.Institute.find.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getPeriodNameService)(updatedInstituteData.institutePeriodTimes);
        }
        catch (error) {
            expect(model_1.Institute.find).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("GET InstituteHolidayNameService - True ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteHoliday.find = jest.fn().mockReturnValue({
            find: jest.fn().mockResolvedValue(mockInstituteholidaysRequest),
        });
        try {
            const result = yield (0, service_1.getHolidayNameService)({ academicYear: mockInstituteholidaysRequest[0].academicYear }, mockInstituteholidaysRequest);
            expect(result).toEqual(true);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET InstituteHolidayNameService - False ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteHoliday.find = jest.fn().mockReturnValue({
            find: jest.fn().mockResolvedValue([]),
        });
        try {
            const result = yield (0, service_1.getHolidayNameService)({ academicYear: mockInstituteholidaysRequest[0].academicYear }, mockInstituteholidaysRequest);
            expect(result).toEqual(false);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET InstituteHolidayNameService - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "HolidayName Not Found";
        model_1.InstituteHoliday.find = jest.fn().mockReturnValue({
            find: jest.fn().mockRejectedValue(new Error(errorMessage)),
        });
        try {
            const result = yield (0, service_1.getHolidayNameService)({ academicYear: mockInstituteholidaysRequest[0].academicYear }, mockInstituteholidaysRequest);
        }
        catch (error) {
            expect(model_1.InstituteHoliday.find).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("GET InstituteClasses/:id ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteClasses.findOne.mockResolvedValue(mockInstituteclassesRequest);
        try {
            const result = yield (0, service_1.getInstituteClassesService)(mockInstituteclassesRequest.instituteId, mockInstituteclassesRequest.academicYear);
            expect(model_1.InstituteClasses.findOne).toHaveBeenCalled();
            expect(result).toEqual(mockInstituteclassesRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET InstituteClasses:/id - Institute_id or Academic Year Not Found", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Institute_id or Academic Year not Found";
        model_1.InstituteClasses.findOne.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getInstituteClassesService)(mockInstituteclassesRequest.instituteId, mockInstituteclassesRequest.academicYear);
        }
        catch (error) {
            expect(model_1.InstituteClasses.findOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("PUT InstituteClasses/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteClasses.findOneAndUpdate.mockResolvedValue(updatedInstituteclassesData);
        try {
            const result = yield (0, service_1.updateInstituteClassesService)(updatedInstituteclassesData.instituteId, { academicYear: mockInstituteFacultiesRequest.academicYear });
            expect(result).toEqual({ message: "Class updated successfully!!" });
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("PUT InstituteClasses/:id - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error on Updating InstituteClasses ";
        model_1.InstituteClasses.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.updateInstituteClassesService)(updatedInstituteclassesData.instituteId, { academicYear: mockInstituteFacultiesRequest.academicYear });
        }
        catch (error) {
            expect(model_1.InstituteClasses.findOneAndUpdate).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("GET InstitutePeriodtimes/:id  ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.Institute.findOne = jest.fn().mockReturnValue({
            select: jest
                .fn()
                .mockResolvedValue(mockInstituteRequest.institutePeriodTimes),
        });
        try {
            const result = yield (0, service_1.getInstitutePeriodTimesService)({
                _id: mockInstituteRequest._id,
            });
            expect(model_1.Institute.findOne).toHaveBeenCalled();
            expect(result).toEqual(mockInstituteRequest.institutePeriodTimes);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET InstitutePeriodtimes:/ id - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Invalid Institute_id";
        model_1.Institute.findOne = jest.fn().mockReturnValue({
            select: jest.fn().mockRejectedValue(new Error(errorMessage)),
        });
        try {
            const result = yield (0, service_1.getInstitutePeriodTimesService)({
                _id: mockInstituteRequest._id,
            });
        }
        catch (error) {
            expect(model_1.Institute.findOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("PUT InstitutePeriodtimes/:id ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.Institute.findOneAndUpdate.mockResolvedValue(updatedInstituteData);
        try {
            const result = yield (0, service_1.updateInstitutePeriodTimesService)({ _id: updatedInstituteData._id }, updatedInstituteData.institutePeriodTimes);
            expect(result).toEqual({ message: "success" });
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("PUT InstitutePeriodtimes/:id - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error Updating Periodtimes, Invalid Institute_Id";
        model_1.Institute.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.updateInstitutePeriodTimesService)({ _id: updatedInstituteData._id }, updatedInstituteData.institutePeriodTimes);
        }
        catch (error) {
            expect(model_1.Institute.findOneAndUpdate).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("GET Instituteholidays/:id ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteHoliday.findOne.mockResolvedValue(mockInstituteholidaysRequest);
        try {
            const result = yield (0, service_1.getInstituteHolidaysService)(mockInstituteholidaysRequest[0].instituteId, mockInstituteclassesRequest.academicYear);
            expect(model_1.InstituteHoliday.findOne).toHaveBeenCalled();
            expect(result).toEqual(mockInstituteholidaysRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET Instituteholidays:/ id - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Invalid Institute_id or Academic Year";
        model_1.InstituteHoliday.findOne.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getInstituteHolidaysService)(mockInstituteholidaysRequest[0].instituteId, mockInstituteclassesRequest.academicYear);
        }
        catch (error) {
            expect(model_1.InstituteHoliday.findOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("PUT Instituteholidays/:id ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteHoliday.findOneAndUpdate.mockResolvedValue(updatedInstituteholidaysData);
        try {
            const result = yield (0, service_1.updateInstituteHolidaysService)(updatedInstituteholidaysData.instituteId, { academicYear: updatedInstituteData.academicYear });
            expect(result).toEqual({ message: "success" });
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("PUT Instituteholidays/:id - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error Updating Instituteholidays, Invalid Institute_Id";
        model_1.InstituteHoliday.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.updateInstituteHolidaysService)(updatedInstituteholidaysData.instituteId, { academicYear: updatedInstituteData.academicYear });
        }
        catch (error) {
            expect(model_1.InstituteHoliday.findOneAndUpdate).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("GET InstituteSubjects/:id ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteSubjects.findOne.mockResolvedValue(mockInstituteSubjectsRequest);
        try {
            const result = yield (0, service_1.getInstituteSubjectsService)({ instituteId: mockInstituteSubjectsRequest.instituteId }, { academicYear: mockInstituteSubjectsRequest.academicYear });
            expect(model_1.InstituteSubjects.findOne).toHaveBeenCalled();
            expect(result).toEqual(mockInstituteSubjectsRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET InstituteSubjects:/ id - Institute_id or Academic Year Not Found ", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Institute_id or Academic Year Not Found ";
        model_1.InstituteSubjects.findOne.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getInstituteSubjectsService)({ instituteId: mockInstituteSubjectsRequest.instituteId }, { academicYear: mockInstituteSubjectsRequest.academicYear });
        }
        catch (error) {
            expect(model_1.InstituteSubjects.findOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("PUT InstituteSubjects/:id ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteSubjects.findOneAndUpdate.mockResolvedValue(updatedInstituteSubjectsData);
        try {
            const result = yield (0, service_1.updateInstituteSubjectsService)({ instituteId: updatedInstituteSubjectsData.instituteId }, { academicYear: updatedInstituteSubjectsData.academicYear });
            expect(result).toEqual({ message: "Subject updated successfully!!" });
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("PUT InstituteSubjects/:id - Error Handling ", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error Updating InstituteSubjects, Invalid Institute_Id or academicyear";
        model_1.InstituteSubjects.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.updateInstituteSubjectsService)({ instituteId: updatedInstituteSubjectsData.instituteId }, { academicYear: updatedInstituteSubjectsData.academicYear });
        }
        catch (error) {
            expect(model_1.InstituteSubjects.findOneAndUpdate).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("GET InstituteFaculties/:id  ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteFaculties.find.mockResolvedValue(mockInstituteFacultiesRequest);
        try {
            const result = yield (0, service_1.getInstituteFacultiesService)({ instituteId: mockInstituteFacultiesRequest.instituteId }, mockInstituteFacultiesRequest);
            expect(model_1.InstituteFaculties.find).toHaveBeenCalled();
            expect(result).toEqual(mockInstituteFacultiesRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET InstituteFaculties:/ id - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Institute_id or Academic Year Not Found ";
        model_1.InstituteFaculties.find.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getInstituteFacultiesService)({ instituteId: mockInstituteFacultiesRequest.instituteId }, mockInstituteFacultiesRequest);
        }
        catch (error) {
            expect(model_1.InstituteFaculties.find).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("PUT InstituteFaculties/:id ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteFaculties.findOneAndUpdate.mockResolvedValue(updatedInstituteFacultiesData);
        try {
            const result = yield (0, service_1.updateInstituteFacultiesService)(updatedInstituteFacultiesData.instituteId, { academicYear: updatedInstituteFacultiesData.academicYear }, { class: updatedInstituteFacultiesData.class });
            expect(result).toEqual({ message: "Faculties updated successfully!!" });
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("PUT InstituteFaculties/:id - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error Updating Faculties, Invalid request data";
        model_1.InstituteFaculties.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.updateInstituteFacultiesService)(updatedInstituteFacultiesData.instituteId, { academicYear: updatedInstituteFacultiesData.academicYear }, { class: updatedInstituteFacultiesData.class });
        }
        catch (error) {
            expect(model_1.InstituteFaculties.findOneAndUpdate).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("GET InstituteAnnouncement/:id  ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteAnnouncement.find.mockResolvedValue(mockInstituteAnnouncementRequest);
        try {
            const result = yield (0, service_1.getInstituteAnnouncementService)({ instituteId: mockInstituteAnnouncementRequest.instituteId }, { academicYear: mockInstituteAnnouncementRequest.academicYear });
            expect(model_1.InstituteAnnouncement.find).toHaveBeenCalled();
            expect(result).toEqual(mockInstituteAnnouncementRequest);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET InstituteAnnouncement:/ id - Not Found", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Institute_id or Academic Year Not Found ";
        model_1.InstituteAnnouncement.find.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.getInstituteAnnouncementService)({ instituteId: mockInstituteAnnouncementRequest.instituteId }, { academicYear: mockInstituteAnnouncementRequest.academicYear });
        }
        catch (error) {
            expect(model_1.InstituteAnnouncement.find).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("POST InstituteAnnouncement ", () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.InstituteAnnouncement.insertMany.mockResolvedValue(addInstituteAnnouncementData);
        try {
            const result = yield (0, service_1.addInstituteAnnouncementService)(addInstituteAnnouncementData);
            expect(model_1.InstituteAnnouncement.insertMany).toHaveBeenCalled();
            expect(result).toEqual({ message: "Announcement added successfully!!" });
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("POST InstituteAnnouncement - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error adding Announcement";
        model_1.InstituteAnnouncement.insertMany.mockRejectedValue(new Error(errorMessage));
        try {
            const result = yield (0, service_1.addInstituteAnnouncementService)(addInstituteAnnouncementData);
        }
        catch (error) {
            expect(model_1.InstituteAnnouncement.insertMany).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
});
