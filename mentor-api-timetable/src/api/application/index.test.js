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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_ses_1 = __importDefault(require("../../common/aws-ses"));
const model_1 = require("../admin-config/model");
const model_2 = require("../user/model");
const model_3 = require("./model");
const service_1 = require("./service");
const { ObjectId } = require("mongodb");
jest.mock("../../common/aws-ses");
jest.mock("./model", () => ({
    Application: {
        findOne: jest.fn(),
        findById: jest.fn(),
        findByIdAndRemove: jest.fn(),
        find: jest.fn(),
        create: jest.fn(),
        findOneAndUpdate: jest.fn(),
        bulkWrite: jest.fn(),
        aggregate: jest.fn(),
        findOneUpdate: jest.fn(),
        sort: jest.fn(),
        paginate: jest.fn(),
    },
    InterviewScheduler: {
        paginate: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        updateMany: jest.fn(),
        findOneAndUpdate: jest.fn(),
        findByIdAndUpdate: jest.fn(),
    },
}));
jest.mock("../user/model", () => ({
    User: {
        create: jest.fn(),
        findById: jest.fn(),
    },
}));
jest.mock("../admin-config/model", () => ({
    TableMetaDataConfigModel: {
        find: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
    },
}));
describe("Application Form API - Mock testing", () => {
    const applicationMockData = [
        {
            _id: "64bb6e4583470b00181a3b11",
            userId: "5ff98104a28de700189ae6f7",
            communicationAddressLine1: "101,",
            communicationAddressLine2: "1",
            communicationAddressCountry: "India",
            communicationAddressState: "Andhra Pradesh",
            communicationAddressCity: "Chennai",
            communicationAddressZipCode: "600101",
            paymentMode: null,
            boardName: "CBSE",
            schoolName: "velammal",
            classGrade: "V",
            firstName: "Pavithra",
            middleName: "R",
            lastName: "Ravi",
            dob: "2001-02-18",
            gender: "Female",
            bloodGroup: "A+",
            nationality: "Indian",
            religion: "Hindu",
            casteType: "BC",
            casteName: "ABC",
            motherTongue: "Tamil",
            aadhaarNumber: "999999999999",
            fatherAnnualSalary: 111111,
            fatherEmailAddress: "mohanrajr@bloomlync.com",
            fatherEmployer: "Pavi",
            fatherFirstName: "Ravi",
            fatherJobTitle: "Farmer",
            fatherLastName: "M",
            fatherMobileNumber: "9999999999",
            fatherOccupation: "Farming",
            motherAnnualSalary: 888888,
            motherEmailAddress: "karthikp@bloomlync.com",
            motherEmployer: "Business women",
            motherFirstName: "Yamuna",
            motherJobTitle: "Business",
            motherLastName: "R",
            motherMobileNumber: "9999999999",
            motherOccupation: "Mom",
            copySameAddress: true,
            permanentAddressCity: "Chennai",
            permanentAddressCountry: "India",
            permanentAddressLine1: "101,",
            permanentAddressLine2: "1",
            permanentAddressState: "Andhra Pradesh",
            permanentAddressZipCode: "600101",
            eligibleForFeeConcession: false,
            needHostelFacility: false,
            needTransportFacility: false,
            previousAcademicInformationClass: "I",
            previousAcademicInformationOverallPercentage: 75,
            previousAcademicInformationReasonForLeaving: "Transfer to Chennai",
            previousAcademicInformationSchoolBoard: "CBSE",
            previousAcademicInformationSchoolName: "Andrews",
            previousAcademicInformationYearOfPassing: "2000-05-31",
            birthCertificate: {
                _id: "64bb6e4c83470b00181a3b66",
                originalFileName: "Grp Pic.jpg",
                fileKey: "P13uo43zylGM4Lzn7Do2hg1QyuOfIsFc",
                createdAt: "2023-07-22T05:51:08.450Z",
                __v: 0,
            },
            parentAadhaarCard: {
                _id: "64bb6e4f83470b00181a3b68",
                originalFileName: "Grp Pic.jpg",
                fileKey: "Vy9fgo4l4HbqEF0kyzprb7jtiX2yIof1",
                createdAt: "2023-07-22T05:51:11.685Z",
                __v: 0,
            },
            parentAddressProof: {
                _id: "64bb6e5483470b00181a3b6a",
                originalFileName: "Grp Pic.jpg",
                fileKey: "2dVrOoPiC7CEi5OLbgGIZ2XDCRoi2a0P",
                createdAt: "2023-07-22T05:51:16.345Z",
                __v: 0,
            },
            studentPhoto: {
                _id: "64bb6e4583470b00181a3b64",
                originalFileName: "Grp Pic.jpg",
                fileKey: "nqwzGWVPgXGfL6Nr7M189T8TLfbmM8xa",
                createdAt: "2023-07-22T05:51:01.780Z",
                __v: 0,
            },
            applicationFee: "345.00",
            paymentNote: "Tnx Success",
            paymentStatus: "TXN_SUCCESS",
            age: 22,
            interviewDate: "2023-02-02",
            interviewerNote: "Good",
        },
        {
            _id: "64bb6e4583470b00181a3b12",
            userId: "5ff98104a28de700189ae6f8",
            communicationAddressLine1: "101,",
            communicationAddressLine2: "1",
            communicationAddressCountry: "India",
            communicationAddressState: "Andhra Pradesh",
            communicationAddressCity: "Chennai",
            communicationAddressZipCode: "600101",
            paymentMode: null,
            boardName: "CBSE",
            schoolName: "velammal",
            classGrade: "V",
            firstName: "Diyashree",
            middleName: "M",
            lastName: "Ravi",
            dob: "2001-02-18",
            gender: "Female",
            bloodGroup: "A+",
            nationality: "Indian",
            religion: "Hindu",
            casteType: "BC",
            casteName: "ABC",
            motherTongue: "Tamil",
            aadhaarNumber: "999999999999",
            fatherAnnualSalary: 111111,
            fatherEmailAddress: "mohanrajr@bloomlync.com",
            fatherEmployer: "Pavi",
            fatherFirstName: "Ravi",
            fatherJobTitle: "Farmer",
            fatherLastName: "M",
            fatherMobileNumber: "9999999999",
            fatherOccupation: "Farming",
            motherAnnualSalary: 888888,
            motherEmailAddress: "karthikp@bloomlync.com",
            motherEmployer: "Business women",
            motherFirstName: "Yamuna",
            motherJobTitle: "Business",
            motherLastName: "R",
            motherMobileNumber: "9999999999",
            motherOccupation: "Mom",
            copySameAddress: true,
            permanentAddressCity: "Chennai",
            permanentAddressCountry: "India",
            permanentAddressLine1: "101,",
            permanentAddressLine2: "1",
            permanentAddressState: "Andhra Pradesh",
            permanentAddressZipCode: "600101",
            eligibleForFeeConcession: false,
            needHostelFacility: false,
            needTransportFacility: false,
            previousAcademicInformationClass: "I",
            previousAcademicInformationOverallPercentage: 75,
            previousAcademicInformationReasonForLeaving: "Transfer to Chennai",
            previousAcademicInformationSchoolBoard: "CBSE",
            previousAcademicInformationSchoolName: "Andrews",
            previousAcademicInformationYearOfPassing: "2000-05-31",
            birthCertificate: {
                _id: "64bb6e4c83470b00181a3b67",
                originalFileName: "Grp Pic.jpg",
                fileKey: "P13uo43zylGM4Lzn7Do2hg1QyuOfIsFc",
                createdAt: "2023-07-22T05:51:08.450Z",
                __v: 0,
            },
            parentAadhaarCard: {
                _id: "64bb6e4f83470b00181a3b69",
                originalFileName: "Grp Pic.jpg",
                fileKey: "Vy9fgo4l4HbqEF0kyzprb7jtiX2yIof1",
                createdAt: "2023-07-22T05:51:11.685Z",
                __v: 0,
            },
            parentAddressProof: {
                _id: "64bb6e5483470b00181a3b6b",
                originalFileName: "Grp Pic.jpg",
                fileKey: "2dVrOoPiC7CEi5OLbgGIZ2XDCRoi2a0P",
                createdAt: "2023-07-22T05:51:16.345Z",
                __v: 0,
            },
            studentPhoto: {
                _id: "64bb6e4583470b00181a3b65",
                originalFileName: "Grp Pic.jpg",
                fileKey: "nqwzGWVPgXGfL6Nr7M189T8TLfbmM8xa",
                createdAt: "2023-07-22T05:51:01.780Z",
                __v: 0,
            },
            applicationFee: "345.00",
            paymentNote: "Tnx Success",
            paymentStatus: "TXN_SUCCESS",
            age: 22,
            interviewDate: "2023-02-02",
            interviewerNote: "Good",
        },
    ];
    const paymentSuccessApplication = {
        _id: "6ff98104a28de700189ae6f7",
        userId: "5ff98104a28de700189ae6f7",
        communicationAddressLine1: "101,",
        communicationAddressLine2: "1",
        communicationAddressCountry: "India",
        communicationAddressState: "Andhra Pradesh",
        communicationAddressCity: "Chennai",
        communicationAddressZipCode: "600101",
        paymentMode: "online",
        boardName: "CBSE",
        schoolName: "velammal",
        classGrade: "V",
        firstName: "Pavithra",
        middleName: "R",
        lastName: "Ravi",
        dob: "2001-02-18",
        gender: "Female",
        bloodGroup: "A+",
        nationality: "Indian",
        religion: "Hindu",
        casteType: "BC",
        casteName: "ABC",
        motherTongue: "Tamil",
        aadhaarNumber: "999999999999",
        fatherAnnualSalary: 111111,
        fatherEmailAddress: "mohanrajr@bloomlync.com",
        fatherEmployer: "Pavi",
        fatherFirstName: "Ravi",
        fatherJobTitle: "Farmer",
        fatherLastName: "M",
        fatherMobileNumber: "9999999999",
        fatherOccupation: "Farming",
        motherAnnualSalary: 888888,
        motherEmailAddress: "karthikp@bloomlync.com",
        motherEmployer: "Business women",
        motherFirstName: "Yamuna",
        motherJobTitle: "Business",
        motherLastName: "R",
        motherMobileNumber: "9999999999",
        motherOccupation: "Mom",
        copySameAddress: true,
        permanentAddressCity: "Chennai",
        permanentAddressCountry: "India",
        permanentAddressLine1: "101,",
        permanentAddressLine2: "1",
        permanentAddressState: "Andhra Pradesh",
        permanentAddressZipCode: "600101",
        eligibleForFeeConcession: false,
        needHostelFacility: false,
        needTransportFacility: false,
        previousAcademicInformationClass: "I",
        previousAcademicInformationOverallPercentage: 75,
        previousAcademicInformationReasonForLeaving: "Transfer to Chennai",
        previousAcademicInformationSchoolBoard: "CBSE",
        previousAcademicInformationSchoolName: "Andrews",
        previousAcademicInformationYearOfPassing: "2000-05-31",
        birthCertificate: {
            _id: "64bb6e4c83470b00181a3b66",
            originalFileName: "Grp Pic.jpg",
            fileKey: "P13uo43zylGM4Lzn7Do2hg1QyuOfIsFc",
            createdAt: "2023-07-22T05:51:08.450Z",
            __v: 0,
        },
        parentAadhaarCard: {
            _id: "64bb6e4f83470b00181a3b68",
            originalFileName: "Grp Pic.jpg",
            fileKey: "Vy9fgo4l4HbqEF0kyzprb7jtiX2yIof1",
            createdAt: "2023-07-22T05:51:11.685Z",
            __v: 0,
        },
        parentAddressProof: {
            _id: "64bb6e5483470b00181a3b6a",
            originalFileName: "Grp Pic.jpg",
            fileKey: "2dVrOoPiC7CEi5OLbgGIZ2XDCRoi2a0P",
            createdAt: "2023-07-22T05:51:16.345Z",
            __v: 0,
        },
        studentPhoto: {
            _id: "64bb6e4583470b00181a3b64",
            originalFileName: "Grp Pic.jpg",
            fileKey: "nqwzGWVPgXGfL6Nr7M189T8TLfbmM8xa",
            createdAt: "2023-07-22T05:51:01.780Z",
            __v: 0,
        },
        applicationFee: "345.00",
        paymentNote: "Tnx Success",
        paymentStatus: "TXN_SUCCESS",
        age: 22,
        interviewDate: "2023-02-02",
        interviewerNote: "Good",
        submitted: true,
    };
    const applicationMock = {
        _id: "6ff98104a28de700189ae6f7",
        userId: "5ff98104a28de700189ae6f7",
        communicationAddressLine1: "101,",
        communicationAddressLine2: "1",
        communicationAddressCountry: "India",
        communicationAddressState: "Andhra Pradesh",
        communicationAddressCity: "Chennai",
        communicationAddressZipCode: "600101",
        paymentMode: null,
        boardName: "CBSE",
        schoolName: "velammal",
        classGrade: "V",
        firstName: "Pavithra",
        middleName: "R",
        lastName: "Ravi",
        dob: "2001-02-18",
        gender: "Female",
        bloodGroup: "A+",
        nationality: "Indian",
        religion: "Hindu",
        casteType: "BC",
        casteName: "ABC",
        motherTongue: "Tamil",
        aadhaarNumber: "999999999999",
        fatherAnnualSalary: 111111,
        fatherEmailAddress: "mohanrajr@bloomlync.com",
        fatherEmployer: "Pavi",
        fatherFirstName: "Ravi",
        fatherJobTitle: "Farmer",
        fatherLastName: "M",
        fatherMobileNumber: "9999999999",
        fatherOccupation: "Farming",
        motherAnnualSalary: 888888,
        motherEmailAddress: "karthikp@bloomlync.com",
        motherEmployer: "Business women",
        motherFirstName: "Yamuna",
        motherJobTitle: "Business",
        motherLastName: "R",
        motherMobileNumber: "9999999999",
        motherOccupation: "Mom",
        copySameAddress: true,
        permanentAddressCity: "Chennai",
        permanentAddressCountry: "India",
        permanentAddressLine1: "101,",
        permanentAddressLine2: "1",
        permanentAddressState: "Andhra Pradesh",
        permanentAddressZipCode: "600101",
        eligibleForFeeConcession: false,
        needHostelFacility: false,
        needTransportFacility: false,
        previousAcademicInformationClass: "I",
        previousAcademicInformationOverallPercentage: 75,
        previousAcademicInformationReasonForLeaving: "Transfer to Chennai",
        previousAcademicInformationSchoolBoard: "CBSE",
        previousAcademicInformationSchoolName: "Andrews",
        previousAcademicInformationYearOfPassing: "2000-05-31",
        birthCertificate: {
            _id: "64bb6e4c83470b00181a3b66",
            originalFileName: "Grp Pic.jpg",
            fileKey: "P13uo43zylGM4Lzn7Do2hg1QyuOfIsFc",
            createdAt: "2023-07-22T05:51:08.450Z",
            __v: 0,
        },
        parentAadhaarCard: {
            _id: "64bb6e4f83470b00181a3b68",
            originalFileName: "Grp Pic.jpg",
            fileKey: "Vy9fgo4l4HbqEF0kyzprb7jtiX2yIof1",
            createdAt: "2023-07-22T05:51:11.685Z",
            __v: 0,
        },
        parentAddressProof: {
            _id: "64bb6e5483470b00181a3b6a",
            originalFileName: "Grp Pic.jpg",
            fileKey: "2dVrOoPiC7CEi5OLbgGIZ2XDCRoi2a0P",
            createdAt: "2023-07-22T05:51:16.345Z",
            __v: 0,
        },
        studentPhoto: {
            _id: "64bb6e4583470b00181a3b64",
            originalFileName: "Grp Pic.jpg",
            fileKey: "nqwzGWVPgXGfL6Nr7M189T8TLfbmM8xa",
            createdAt: "2023-07-22T05:51:01.780Z",
            __v: 0,
        },
        applicationFee: "345.00",
        paymentNote: "Tnx Success",
        paymentStatus: "TXN_SUCCESS",
        age: 22,
        interviewDate: "2023-02-02",
        interviewerNote: "Good",
    };
    const interviewSchedulerMock = {
        applicationIds: [applicationMock._id],
        deleted: true,
        applicationStatus: "Interview Scheduled",
        interviewDate: "09-27-2023",
        interviewTimeIn: "09:00",
        interviewTimeOut: "09:30",
        interviewerNote: "Good",
    };
    const mockUser = {
        name: "user",
        email: "abc@gmail.com",
        password: "123456",
        isVerified: true,
    };
    const interviewScheduleReq = {
        _id: "64bb6db083470b00181a3b59",
        userId: "64bb6db083470b00181a3b77",
        applicationStatus: "Interview Scheduled",
        applicationIds: [new ObjectId("64bb6db083470b00181a3b59")],
        interviewDate: "12-10-2023",
        interviewerNote: "Good",
        interviewTimeIn: "09:00",
        interviewTimeOut: "10:00",
    };
    const interviewScheduleRes = [
        {
            _id: "64bb6db083470b00181a3b59",
            candidateName: "Pavithra Ravi",
            applicationStatus: "Interview Scheduled",
            fatherEmailAddress: "pavithrar@bloomlync.com",
            motherEmailAddress: "pavithrar@bloomlync.com",
            applicationNumber: 1002,
            interviewDate: "2023-12-09T18:30:00.000Z",
            interviewerNote: "Good",
            paymentFailed: null,
            age: -1,
            id: "64bb6db083470b00181a3b59",
        },
    ];
    test("PUT updateApplicationsAdmissionStatusService", () => __awaiter(void 0, void 0, void 0, function* () {
        model_3.Application.bulkWrite = jest.fn().mockResolvedValue(interviewScheduleRes);
        const applicationFindMock = jest
            .spyOn(model_3.Application, "find")
            .mockImplementation((filter) => {
            const expectedFilter = {
                _id: { $in: [new ObjectId("64bb6db083470b00181a3b59")] },
            };
            expect(filter).toEqual(expectedFilter);
            return {
                select: jest.fn().mockResolvedValue(interviewScheduleRes),
            };
        });
        for (const application of interviewScheduleRes) {
            aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
                promise: jest
                    .fn()
                    .mockResolvedValueOnce({ MessageId: "mockedMessageId" }),
            }));
            const result = yield (0, service_1.updateApplicationsAdmissionStatusService)(Object.assign(Object.assign({}, interviewScheduleReq), { applicationIds: [application._id], interviewerNote: application.interviewerNote }));
        }
    }));
    test("PUT updateApplicationsAdmissionStatusService - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        model_3.Application.bulkWrite = jest.fn().mockResolvedValue(null);
        try {
            yield (0, service_1.updateApplicationsAdmissionStatusService)(Object.assign(Object.assign({}, interviewScheduleReq), { applicationIds: [new ObjectId("64bb6db083470b00181a3b59")], interviewerNote: "Good" }));
        }
        catch (err) {
            expect(err.message).toBe("Updatting admission status failed");
        }
    }));
    test("PUT updateApplicationsAdmissionStatusService - Invalid ApplicationIds", () => __awaiter(void 0, void 0, void 0, function* () {
        const interviewScheduleReq = {
            _id: "64bb6db083470b00181a3b59",
            userId: "64bb6db083470b00181a3b77",
            applicationStatus: "Interview Scheduled",
            interviewDate: "12-10-2023",
            interviewerNote: "Good",
            interviewTimeIn: "09:00",
            interviewTimeOut: "10:00",
        };
        try {
            const result = yield (0, service_1.updateApplicationsAdmissionStatusService)(interviewScheduleReq);
        }
        catch (error) {
            expect(error.message).toEqual("Invalid applicationIds");
        }
    }));
    test("PUT updateApplicationsAdmissionStatusService - Missing Interviewer Note", () => __awaiter(void 0, void 0, void 0, function* () {
        const interviewScheduleReq = {
            _id: "64bb6db083470b00181a3b59",
            userId: "64bb6db083470b00181a3b77",
            applicationStatus: "Interview Scheduled",
            interviewDate: "12-10-2023",
            interviewTimeIn: "09:00",
            interviewTimeOut: "10:00",
            applicationIds: ["64bb6db083470b00181a3b59", "64bb6db083470b00181a3b58"],
        };
        try {
            yield (0, service_1.updateApplicationsAdmissionStatusService)(interviewScheduleReq);
        }
        catch (error) {
            expect(error.message).toEqual("Interview note is required");
        }
    }));
    test("PUT updateApplicationsAdmissionStatusService - update failed", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, service_1.sendApplicationStatusNotification)(interviewScheduleReq);
        }
        catch (err) {
            expect(err.message).toBe("Parents email address is required for 64bb6db083470b00181a3b59");
        }
    }));
    test("sendApplicationStatusNotification - Application Submitted", () => __awaiter(void 0, void 0, void 0, function* () {
        const application = {
            _id: "64bb6db083470b00181a3b59",
            fatherEmailAddress: "father@example.com",
            motherEmailAddress: "mother@example.com",
            applicationStatus: "Application Submitted",
        };
        try {
            yield (0, service_1.sendApplicationStatusNotification)(application);
        }
        catch (err) {
            expect(err.message).toBeFalsy();
        }
    }));
    test("sendApplicationStatusNotification - Application Rejected", () => __awaiter(void 0, void 0, void 0, function* () {
        const application = {
            _id: "64bb6db083470b00181a3b59",
            fatherEmailAddress: "father@example.com",
            motherEmailAddress: "mother@example.com",
            applicationStatus: "Application Rejected",
        };
        try {
            yield (0, service_1.sendApplicationStatusNotification)(application);
        }
        catch (err) {
            expect(err.message).toBeFalsy();
        }
    }));
    test("sendApplicationStatusNotification - On-hold", () => __awaiter(void 0, void 0, void 0, function* () {
        const application = {
            _id: "64bb6db083470b00181a3b59",
            fatherEmailAddress: "father@example.com",
            motherEmailAddress: "mother@example.com",
            applicationStatus: "On-hold",
        };
        try {
            yield (0, service_1.sendApplicationStatusNotification)(application);
        }
        catch (err) {
            expect(err.message).toBeFalsy();
        }
    }));
    test("sendApplicationStatusNotification - Application WaitingList", () => __awaiter(void 0, void 0, void 0, function* () {
        const application = {
            _id: "64bb6db083470b00181a3b59",
            fatherEmailAddress: "father@example.com",
            motherEmailAddress: "mother@example.com",
            applicationStatus: "Application WaitingList",
        };
        try {
            yield (0, service_1.sendApplicationStatusNotification)(application);
        }
        catch (err) {
            expect(err.message).toBeFalsy();
        }
    }));
    test("sendApplicationStatusNotification - Applicant Passed", () => __awaiter(void 0, void 0, void 0, function* () {
        const application = {
            _id: "64bb6db083470b00181a3b59",
            fatherEmailAddress: "father@example.com",
            motherEmailAddress: "mother@example.com",
            applicationStatus: "Applicant Passed",
        };
        try {
            yield (0, service_1.sendApplicationStatusNotification)(application);
        }
        catch (err) {
            expect(err.message).toBeFalsy();
        }
    }));
    test("sendApplicationStatusNotification - Applicant Rejected", () => __awaiter(void 0, void 0, void 0, function* () {
        const application = {
            _id: "64bb6db083470b00181a3b59",
            fatherEmailAddress: "father@example.com",
            motherEmailAddress: "mother@example.com",
            applicationStatus: "Applicant Rejected",
        };
        try {
            yield (0, service_1.sendApplicationStatusNotification)(application);
        }
        catch (err) {
            expect(err.message).toBeFalsy();
        }
    }));
    test("sendApplicationStatusNotification - Admission Fee Failed", () => __awaiter(void 0, void 0, void 0, function* () {
        const application = {
            _id: "64bb6db083470b00181a3b59",
            fatherEmailAddress: "father@example.com",
            motherEmailAddress: "mother@example.com",
            applicationStatus: "Admission Fee Failed",
        };
        try {
            yield (0, service_1.sendApplicationStatusNotification)(application);
        }
        catch (err) {
            expect(err.message).toBeFalsy();
        }
    }));
    test("sendApplicationStatusNotification - Admission Fee Paid", () => __awaiter(void 0, void 0, void 0, function* () {
        const application = {
            _id: "64bb6db083470b00181a3b59",
            fatherEmailAddress: "father@example.com",
            motherEmailAddress: "mother@example.com",
            applicationStatus: "Admission Fee Paid",
        };
        try {
            yield (0, service_1.sendApplicationStatusNotification)(application);
        }
        catch (err) {
            expect(err.message).toBeFalsy();
        }
    }));
    test("sendApplicationStatusNotification - Enrolled", () => __awaiter(void 0, void 0, void 0, function* () {
        const application = {
            _id: "64bb6db083470b00181a3b59",
            fatherEmailAddress: "father@example.com",
            motherEmailAddress: "mother@example.com",
            applicationStatus: "Enrolled",
        };
        try {
            yield (0, service_1.sendApplicationStatusNotification)(application);
        }
        catch (err) {
            expect(err.message).toBeFalsy();
        }
    }));
    test("GET getApplicationsAdmissionStatusService", () => __awaiter(void 0, void 0, void 0, function* () {
        const applicationId = "64bb6db083470b00181a3b59";
        const mockResponse = [
            {
                interviewerNote: "Sample note",
                passPercentage: 90,
                candidatePercentage: 85,
                candidatePerformance: "Good",
                parentInput: "Satisfied",
                reportUrl: "http://example.com/report",
            },
        ];
        const reqBody = {
            interviewerNote: "Sample note",
            passPercentage: 90,
            candidatePercentage: 85,
            candidatePerformance: "Good",
            parentInput: "Satisfied",
            reportUrl: "http://example.com/report",
        };
        model_3.Application.find = jest.fn().mockReturnValue({
            select: jest.fn().mockReturnThis(),
            lean: jest.fn().mockResolvedValue(mockResponse),
        });
        const result = yield (0, service_1.getApplicationsAdmissionStatusService)({
            applicationId,
        });
        expect(model_3.Application.find).toHaveBeenCalledWith({ _id: applicationId });
        expect(model_3.Application.find().select).toHaveBeenCalledWith("interviewerNote passPercentage candidatePercentage candidatePerformance parentInput reportUrl -_id");
        expect(model_3.Application.find().lean).toHaveBeenCalled();
        expect(result).toEqual(reqBody);
    }));
    test("GET getApplicationsAdmissionStatusService - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const applicationId = "64bb6db083470b00181a3b59";
        model_3.Application.find = jest.fn().mockReturnValue({
            select: jest.fn().mockReturnThis(),
            lean: jest.fn().mockResolvedValue([]),
        });
        try {
            const result = yield (0, service_1.getApplicationsAdmissionStatusService)({
                applicationId,
            });
            expect(result).toBeNull();
        }
        catch (error) {
            expect(error).toBeDefined();
        }
        expect(model_3.Application.find).toHaveBeenCalledWith({ _id: applicationId });
        expect(model_3.Application.find().select).toHaveBeenCalledWith("interviewerNote passPercentage candidatePercentage candidatePerformance parentInput reportUrl -_id");
        expect(model_3.Application.find().lean).toHaveBeenCalled();
    }));
    test("GET getApplicationsAdmissionStatusService - Application ID Not Found", () => __awaiter(void 0, void 0, void 0, function* () {
        const applicationId = "";
        model_3.Application.find = jest.fn().mockReturnValue({
            select: jest.fn().mockReturnThis(),
            lean: jest.fn().mockResolvedValue([]),
        });
        try {
            yield (0, service_1.getApplicationsAdmissionStatusService)({
                applicationId,
            });
        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toEqual("not found");
        }
        expect(model_3.Application.find).toHaveBeenCalledWith({ _id: applicationId });
        expect(model_3.Application.find().select).toHaveBeenCalledWith("interviewerNote passPercentage candidatePercentage candidatePerformance parentInput reportUrl -_id");
        expect(model_3.Application.find().lean).toHaveBeenCalled();
    }));
    test("PUT sendInterviewReminderNotificationService", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "64bb6db083470b00181a3b59";
        model_3.InterviewScheduler.findById.mockResolvedValue(interviewScheduleReq);
        jest.spyOn(model_3.Application, "find").mockImplementation(() => {
            return {
                select: jest.fn().mockResolvedValue(applicationMockData),
            };
        });
        aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
            promise: jest
                .fn()
                .mockResolvedValueOnce({ MessageId: "mockedMessageId" }),
        }));
        const result = yield (0, service_1.sendInterviewReminderNotificationService)(id);
        expect(result).toEqual({
            message: "Remainder notification is sent to all applicants.",
        });
    }));
    test("PUT sendInterviewReminderNotificationService handles the case where InterviewScheduler.findById returns null", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "e563ergs3673swfhr42wf";
        model_3.InterviewScheduler.findById.mockResolvedValue(interviewSchedulerMock);
        try {
            yield (0, service_1.sendInterviewReminderNotificationService)(id);
        }
        catch (error) {
            expect(error.message).toBe("Interview Schedule is not found");
        }
    }));
    test("POST createInterviewScheduleService", () => __awaiter(void 0, void 0, void 0, function* () {
        model_3.InterviewScheduler.findOne.mockResolvedValue(null);
        model_3.InterviewScheduler.create.mockResolvedValue(interviewScheduleReq);
        model_2.User.findById.mockResolvedValue(mockUser);
        model_3.Application.bulkWrite = jest.fn().mockResolvedValue(interviewScheduleRes);
        const applicationFindMock = jest
            .spyOn(model_3.Application, "find")
            .mockImplementation((filter) => {
            const expectedFilter = {
                _id: { $in: [new ObjectId("64bb6db083470b00181a3b59")] },
            };
            expect(filter).toEqual(expectedFilter);
            return {
                select: jest.fn().mockResolvedValue(interviewScheduleRes),
            };
        });
        for (const application of interviewScheduleRes) {
            aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
                promise: jest
                    .fn()
                    .mockResolvedValueOnce({ MessageId: "mockedMessageId" }),
            }));
            const result = yield (0, service_1.updateApplicationsAdmissionStatusService)(Object.assign(Object.assign({}, interviewScheduleReq), { applicationIds: [application._id], interviewerNote: application.interviewerNote }));
        }
        const result = yield (0, service_1.createInterviewScheduleService)(interviewScheduleReq);
        expect(result).toEqual({ message: "Interview Scheduled Successfully" });
    }));
    test("POST createInterviewScheduleService - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        model_3.InterviewScheduler.create.mockRejectedValue(new Error("Error while creating application schedule"));
        try {
            yield (0, service_1.createInterviewScheduleService)({});
        }
        catch (exception) {
            expect(exception instanceof Error).toBe(true);
            expect(exception.message).toEqual("Invalid applicationIds");
        }
    }));
    test("POST createInterviewScheduleService - Interview date & time in is required", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = {
            userId: "64bb6db083470b00181a3b60",
            applicationIds: ["64bb6db083470b00181a3b59", "64bb6db083470b00181a3b58"],
        };
        try {
            yield (0, service_1.createInterviewScheduleService)(params);
        }
        catch (error) {
            expect(error.message).toEqual("Interview date & time in is required");
        }
    }));
    test("POST createInterviewScheduleService - applicationStatus interview scheduled", () => __awaiter(void 0, void 0, void 0, function* () {
        const interviewScheduleReqs = {
            _id: "64bb6db083470b00181a3b59",
            userId: "64bb6db083470b00181a3b77",
            applicationIds: [new ObjectId("64bb6db083470b00181a3b59")],
            interviewDate: "12-10-2023",
            interviewerNote: "Good",
            interviewTimeIn: "09:00",
            interviewTimeOut: "10:00",
        };
        model_3.InterviewScheduler.create.mockResolvedValue(interviewScheduleReq);
        try {
            const result = yield (0, service_1.createInterviewScheduleService)(interviewScheduleReqs);
            expect(result).toEqual(interviewScheduleReq);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("POST createInterviewScheduleService - Updatting application admission schedule is failed", () => __awaiter(void 0, void 0, void 0, function* () {
        model_3.InterviewScheduler.findById.mockResolvedValue(null);
        model_2.User.findById.mockResolvedValue(null);
        model_3.Application.bulkWrite = jest.fn().mockResolvedValue(null);
        model_3.Application.find = jest.fn().mockResolvedValue(null);
        try {
            yield (0, service_1.updateApplicationsAdmissionStatusService)(interviewScheduleReq);
            const result = yield (0, service_1.createInterviewScheduleService)(interviewScheduleReq);
        }
        catch (error) {
            expect(error.message).toEqual("Updatting admission status failed");
        }
    }));
    test("POST createInterviewScheduleService - applicationExists", () => __awaiter(void 0, void 0, void 0, function* () {
        model_3.InterviewScheduler.findOne.mockResolvedValue({
            applicationIds: [applicationMock._id],
            interviewerNote: "Existing interviewer note",
        });
        model_3.InterviewScheduler.updateMany.mockResolvedValue({ nModified: 1 });
        model_3.Application.bulkWrite = jest.fn().mockResolvedValue(interviewScheduleRes);
        const applicationFindMock = jest
            .spyOn(model_3.Application, "find")
            .mockImplementation((filter) => {
            const expectedFilter = {
                _id: { $in: [new ObjectId("64bb6db083470b00181a3b59")] },
            };
            return {
                select: jest.fn().mockResolvedValue(interviewScheduleRes),
            };
        });
        aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
            promise: jest
                .fn()
                .mockResolvedValueOnce({ MessageId: "mockedMessageId" }),
        }));
        yield (0, service_1.updateApplicationsAdmissionStatusService)(Object.assign(Object.assign({}, interviewScheduleReq), { applicationIds: [applicationMock._id], interviewerNote: applicationMock.interviewerNote }));
        const result = yield (0, service_1.createInterviewScheduleService)(interviewScheduleReq);
    }));
    test("PUT updateInterviewScheduleService", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "64bb6db083470b00181a3b59";
        model_3.InterviewScheduler.findById.mockResolvedValue(interviewScheduleReq);
        model_2.User.findById.mockResolvedValue(mockUser);
        model_3.Application.bulkWrite = jest.fn().mockResolvedValue(interviewScheduleRes);
        const applicationFindMock = jest
            .spyOn(model_3.Application, "find")
            .mockImplementation((filter) => {
            const expectedFilter = {
                _id: { $in: [new ObjectId("64bb6db083470b00181a3b59")] },
            };
            expect(filter).toEqual(expectedFilter);
            return {
                select: jest.fn().mockResolvedValue(interviewScheduleRes),
            };
        });
        for (const application of interviewScheduleRes) {
            aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
                promise: jest
                    .fn()
                    .mockResolvedValueOnce({ MessageId: "mockedMessageId" }),
            }));
            const result = yield (0, service_1.updateApplicationsAdmissionStatusService)(Object.assign(Object.assign({}, interviewScheduleReq), { applicationIds: [application._id], interviewerNote: application.interviewerNote }));
        }
        model_3.InterviewScheduler.findByIdAndUpdate.mockResolvedValue(id, interviewScheduleReq);
        const result = yield (0, service_1.updateInterviewScheduleService)(id, interviewScheduleReq);
        expect(result).toBeTruthy();
    }));
    test("updateInterviewScheduleService - Interview date & time in is required", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "64bb6db083470b00181a3b55";
        const params = {
            userId: "64bb6db083470b00181a3b59",
        };
        try {
            yield (0, service_1.updateInterviewScheduleService)(id, params);
        }
        catch (error) {
            expect(error).toEqual(new Error("Interview date & time in is required"));
        }
    }));
    test("PUT updateInterviewScheduleService - Interview Schedule is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "64bb6db083470b00181a3b59";
        const interviewScheduleReqs = {
            _id: "64bb6db083470b00181a3b59",
            userId: "64bb6db083470b00181a3b77",
            applicationIds: [new ObjectId("64bb6db083470b00181a3b59")],
            interviewDate: "12-10-2023",
            interviewerNote: "Good",
            interviewTimeIn: "09:00",
            interviewTimeOut: "10:00",
            deleted: true,
        };
        model_3.InterviewScheduler.findById.mockResolvedValue(interviewScheduleReqs);
        model_2.User.findById.mockResolvedValue(mockUser);
        model_3.Application.bulkWrite = jest.fn().mockResolvedValue(interviewScheduleRes);
        const applicationFindMock = jest
            .spyOn(model_3.Application, "find")
            .mockImplementation((filter) => {
            const expectedFilter = {
                _id: { $in: [new ObjectId("64bb6db083470b00181a3b59")] },
            };
            expect(filter).toEqual(expectedFilter);
            return {
                select: jest.fn().mockResolvedValue(interviewScheduleRes),
            };
        });
        for (const application of interviewScheduleRes) {
            aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
                promise: jest
                    .fn()
                    .mockResolvedValueOnce({ MessageId: "mockedMessageId" }),
            }));
            const result = yield (0, service_1.updateApplicationsAdmissionStatusService)(Object.assign(Object.assign({}, interviewScheduleReq), { applicationIds: [application._id], interviewerNote: application.interviewerNote }));
        }
        model_3.InterviewScheduler.findByIdAndUpdate.mockResolvedValue(id, interviewScheduleReqs);
        try {
            const result = yield (0, service_1.updateInterviewScheduleService)(id, interviewScheduleReqs);
            expect(result).toBeTruthy();
        }
        catch (error) {
            expect(error.message).toBe("Interview Schedule is not found");
        }
    }));
    test("PUT updateInterviewReScheduleService - Interview Exists", () => __awaiter(void 0, void 0, void 0, function* () {
        model_3.InterviewScheduler.findOne.mockResolvedValue({
            applicationIds: ["64bb6db083470b00181a3b59"],
        });
        model_3.Application.bulkWrite = jest.fn().mockResolvedValue(interviewScheduleRes);
        const applicationFindMock = jest
            .spyOn(model_3.Application, "find")
            .mockImplementation((filter) => {
            const expectedFilter = {
                _id: { $in: [new ObjectId("64bb6db083470b00181a3b59")] },
            };
            expect(filter).toEqual(expectedFilter);
            return {
                select: jest.fn().mockResolvedValue(interviewScheduleRes),
            };
        });
        for (const application of interviewScheduleRes) {
            aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
                promise: jest
                    .fn()
                    .mockResolvedValueOnce({ MessageId: "mockedMessageId" }),
            }));
            const result = yield (0, service_1.updateApplicationsAdmissionStatusService)(Object.assign(Object.assign({}, interviewScheduleReq), { applicationIds: [application._id], interviewerNote: application.interviewerNote }));
        }
        model_3.InterviewScheduler.updateMany.mockResolvedValue({ nModified: 1 });
        const result = yield (0, service_1.updateInterviewReScheduleService)(interviewScheduleReq);
        expect(result).toEqual({ nModified: 1 });
    }));
    test("PUT updateInterviewReScheduleService - Interview Does Not Exist", () => __awaiter(void 0, void 0, void 0, function* () {
        model_3.InterviewScheduler.findOne.mockResolvedValue(null);
        model_3.Application.bulkWrite = jest.fn().mockResolvedValue(interviewScheduleRes);
        model_3.InterviewScheduler.updateMany.mockResolvedValue({ nModified: 0 });
        const result = yield (0, service_1.updateInterviewReScheduleService)(interviewScheduleReq);
        expect(result).toEqual("null");
    }));
    test("PUT updateInterviewReScheduleService - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        model_3.InterviewScheduler.findOne.mockResolvedValue({
            applicationIds: ["64bb6db083470b00181a3b59"],
        });
        model_3.Application.bulkWrite = jest.fn().mockResolvedValue(interviewScheduleRes);
        const applicationFindMock = jest
            .spyOn(model_3.Application, "find")
            .mockImplementation((filter) => {
            const expectedFilter = {
                _id: { $in: [new ObjectId("64bb6db083470b00181a3b59")] },
            };
            expect(filter).toEqual(expectedFilter);
            return {
                select: jest.fn().mockResolvedValue(interviewScheduleRes),
            };
        });
        for (const application of interviewScheduleRes) {
            aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
                promise: jest
                    .fn()
                    .mockResolvedValueOnce({ MessageId: "mockedMessageId" }),
            }));
            const result = yield (0, service_1.updateApplicationsAdmissionStatusService)(Object.assign(Object.assign({}, interviewScheduleReq), { applicationIds: [application._id], interviewerNote: application.interviewerNote }));
        }
        model_3.InterviewScheduler.updateMany.mockResolvedValue({ nModified: 1 });
        model_3.InterviewScheduler.updateMany.mockRejectedValue(new Error("Update Failed"));
        try {
            const result = yield (0, service_1.updateInterviewReScheduleService)(interviewScheduleReq);
            expect(result).toBeUndefined();
        }
        catch (error) {
            expect(error.message).toEqual("Update Failed");
        }
    }));
    test("PUT cancelInterviewScheduleService - Success", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "64bb6db083470b00181a3b59";
        const params = {
            userId: "64bb6db083470b00181a3b59",
        };
        model_3.InterviewScheduler.findById = jest.fn().mockReturnValue({
            lean: jest.fn().mockResolvedValue(interviewScheduleReq),
        });
        model_2.User.findById.mockResolvedValue(mockUser);
        model_3.Application.bulkWrite = jest.fn().mockResolvedValue(interviewScheduleRes);
        const applicationFindMock = jest
            .spyOn(model_3.Application, "find")
            .mockImplementation((filter) => {
            const expectedFilter = {
                _id: { $in: [new ObjectId("64bb6db083470b00181a3b59")] },
            };
            expect(filter).toEqual(expectedFilter);
            return {
                select: jest.fn().mockResolvedValue(interviewScheduleRes),
            };
        });
        for (const application of interviewScheduleRes) {
            aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
                promise: jest
                    .fn()
                    .mockResolvedValueOnce({ MessageId: "mockedMessageId" }),
            }));
            const result = yield (0, service_1.updateApplicationsAdmissionStatusService)(Object.assign(Object.assign({}, interviewScheduleReq), { applicationIds: [application._id], interviewerNote: application.interviewerNote }));
        }
        model_3.InterviewScheduler.findByIdAndUpdate.mockResolvedValue(interviewScheduleReq);
        const result = yield (0, service_1.cancelInterviewScheduleService)(id, params);
        expect(result).toEqual(interviewScheduleReq);
    }));
    test("PUT cancelInterviewScheduleService - Interview Not Found", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "64bb6db083470b00181a3b59";
        const params = {
            userId: "64bb6db083470b00181a3b59",
        };
        model_3.InterviewScheduler.findById = jest.fn().mockReturnValue({
            lean: jest.fn().mockResolvedValue(null),
        });
        try {
            yield (0, service_1.cancelInterviewScheduleService)(id, params);
            expect(true).toBe(false);
        }
        catch (error) {
            expect(error.message).toEqual("Interview Schedule is not found");
        }
    }));
    test("PUT cancelInterviewScheduleService - Interview Not Found", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "64bb6db083470b00181a3b59";
        const params = {
            userId: "64bb6db083470b00181a3b59",
        };
        const interviewScheduleReq = {
            _id: "64bb6db083470b00181a3b59",
            userId: "64bb6db083470b00181a3b77",
            deleted: false,
            applicationStatus: "Interview Scheduled",
            applicationIds: [new ObjectId("64bb6db083470b00181a3b59")],
            interviewDate: "12-10-2023",
            interviewerNote: "Good",
            interviewTimeIn: "09:00",
            interviewTimeOut: "10:00",
        };
        model_3.InterviewScheduler.findById = jest.fn().mockReturnValue({
            lean: jest.fn().mockResolvedValue(interviewScheduleReq),
        });
        try {
            yield (0, service_1.cancelInterviewScheduleService)(id, params);
            expect(true).toBe(true);
        }
        catch (error) {
            expect(error.message).toEqual("Updatting admission status failed");
        }
    }));
    test("GET getInterviewScheduleByDateService", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = {
            interviewDate: "2023-10-12",
        };
        const expectedInterviewSchedules = [
            {
                _id: "64bb6db083470b00181a3b59",
                interviewDate: "2023-10-12",
            },
            {
                _id: "64bb6db083470b00181a3b60",
                interviewDate: "2023-10-12",
            },
        ];
        model_3.InterviewScheduler.find = jest.fn(() => ({
            populate: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            then: (callback) => {
                callback(expectedInterviewSchedules);
                return {
                    catch: jest.fn(),
                };
            },
            catch: jest.fn(),
        }));
        const result = yield (0, service_1.getInterviewScheduleByDateService)(params);
        expect(result).toEqual(expectedInterviewSchedules);
    }));
    test("POST createApplicationService", () => __awaiter(void 0, void 0, void 0, function* () {
        model_3.Application.create.mockResolvedValue(applicationMock);
        const result = yield (0, service_1.createApplicationService)(applicationMock);
        expect(result).toEqual(applicationMock);
        expect(model_3.Application.create).toHaveBeenCalledWith(applicationMock);
    }));
    test("POST createApplicationService", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            firstName: "John",
            lastName: "Doe",
            interviewTimeIn: "10:00 AM",
            interviewTimeOut: "11:00 AM",
            submitted: true,
            paymentMode: "online",
            paymentStatus: "TXN_SUCCESS",
        };
        const expectedApplication = {
            candidateName: "John Doe",
            interviewTime: "10:00 AM-11:00 AM",
            applicationStatus: "Application Submitted",
            applicationNumber: "10011",
            firstName: "John",
            lastName: "Doe",
            interviewTimeIn: "10:00 AM",
            interviewTimeOut: "11:00 AM",
            submitted: true,
            paymentMode: "online",
            paymentStatus: "TXN_SUCCESS",
        };
        model_3.Application.findOne = jest.fn().mockReturnValue({
            sort: jest.fn().mockResolvedValue(expectedApplication),
        });
        yield (0, service_1.nextApplicationNumber)("1001");
        model_3.Application.create.mockResolvedValue(expectedApplication);
        const result = yield (0, service_1.createApplicationService)(body);
        expect(result).toEqual(expectedApplication);
        expect(model_3.Application.create).toHaveBeenCalledWith(expect.objectContaining(body));
    }));
    test('POST createApplicationService application is not submitted and set "Submission Pending" status', () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            firstName: "Alice",
            lastName: "Smith",
            submitted: false,
        };
        const expectedApplication = {
            candidateName: "Alice Smith",
            applicationStatus: "Submission Pending",
        };
        model_3.Application.create.mockResolvedValue(expectedApplication);
        const result = yield (0, service_1.createApplicationService)(body);
        expect(result).toEqual(expectedApplication);
    }));
    test("POST createApplicationService - application number already exists and return a 409 error", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            firstName: "Bob",
            lastName: "Johnson",
            interviewTimeIn: "9:00 AM",
            interviewTimeOut: "10:00 AM",
            submitted: true,
            paymentMode: "online",
            paymentStatus: "TXN_SUCCESS",
        };
        model_3.Application.findOne = jest.fn().mockReturnValue({
            sort: jest.fn().mockResolvedValue(body),
        });
        yield (0, service_1.nextApplicationNumber)("12345");
        const duplicateKeyError = new Error("Duplicate key error");
        duplicateKeyError.name = "MongoError";
        duplicateKeyError.code = 11000;
        model_3.Application.create.mockRejectedValue(duplicateKeyError);
        try {
            yield (0, service_1.createApplicationService)(body);
        }
        catch (error) {
            expect(error.status).toBe(409);
            expect(error.message).toBe("ApplicationNumber is already registered");
        }
    }));
    test("POST createApplicationService - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        model_3.Application.create.mockRejectedValue(new Error("Error while creating application"));
        try {
            yield (0, service_1.createApplicationService)({});
        }
        catch (exception) {
            expect(exception instanceof Error).toBe(true);
            expect(exception.message).toEqual("Error while creating application");
        }
    }));
    test("POST createApplicationService - Application not yet submitted", () => __awaiter(void 0, void 0, void 0, function* () {
        const inputBody = {
            firstName: "John",
            lastName: "Doe",
            interviewTimeIn: "10:00 AM",
            interviewTimeOut: "11:00 AM",
            submitted: true,
            paymentMode: "offline",
            paymentStatus: "TXN_FAILURE",
            applicationStatus: "Awaiting Application Fee",
        };
        model_3.Application.findOne = jest.fn().mockReturnValue({
            sort: jest.fn().mockResolvedValue(inputBody),
        });
        yield (0, service_1.nextApplicationNumber)("1001");
        model_3.Application.create.mockResolvedValue(inputBody);
        const result = yield (0, service_1.createApplicationService)(inputBody);
        expect(result).toEqual(Object.assign(Object.assign({}, inputBody), { applicationNumber: 1001, applicationStatus: "Awaiting Application Fee" }));
    }));
    test("GET getApplicationsByUserId", () => __awaiter(void 0, void 0, void 0, function* () {
        model_3.Application.find.mockResolvedValue(applicationMock);
        const result = yield (0, service_1.getApplicationsByUserId)({
            userId: applicationMock.userId,
        });
        expect(result).toEqual(applicationMock);
        expect(model_3.Application.find).toHaveBeenCalledWith({
            userId: applicationMock.userId,
        });
    }));
    test("GET getApplicationsByUserId Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const internalError = new Error("Internal Server Error");
        model_3.Application.find.mockRejectedValue(internalError);
        yield expect((0, service_1.getApplicationsByUserId)({ userId: applicationMock.userId })).rejects.toThrow("Internal Server Error");
        expect(model_3.Application.find).toHaveBeenCalledWith({
            userId: applicationMock.userId,
        });
    }));
    test("GET getApplicationsService", () => __awaiter(void 0, void 0, void 0, function* () {
        model_3.Application.find.mockResolvedValue(applicationMock);
        const result = yield (0, service_1.getApplicationsService)(applicationMock.userId);
        expect(result).toEqual(applicationMock);
        expect(model_3.Application.find).toHaveBeenCalledWith({ userId: applicationMock.userId }, {
            applicationNumber: 1,
            submitted: 1,
            firstName: 1,
            middleName: 1,
            lastName: 1,
            candidateName: 1,
            boardName: 1,
            schoolName: 1,
            classGrade: 1,
            admissionFor: 1,
            lastUpdated: 1,
            applicationStatus: 1,
            paymentMode: 1,
            paymentNode: 1,
            gender: 1,
            enrollNumber: 1,
        });
    }));
    test("GET getApplicationsService Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const internalError = new Error("Internal Server Error");
        model_3.Application.find.mockRejectedValue(internalError);
        yield expect((0, service_1.getApplicationsService)({ userId: "" })).rejects.toThrow("Internal Server Error");
        expect(model_3.Application.find).toHaveBeenCalledWith({ userId: { userId: "" } }, {
            admissionFor: 1,
            applicationNumber: 1,
            applicationStatus: 1,
            boardName: 1,
            candidateName: 1,
            classGrade: 1,
            enrollNumber: 1,
            firstName: 1,
            gender: 1,
            lastName: 1,
            lastUpdated: 1,
            middleName: 1,
            paymentMode: 1,
            paymentNode: 1,
            schoolName: 1,
            submitted: 1,
        });
    }));
    test("GET getApplicationsForAnalyticService - Dashboard", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { type: "dashboard" };
        const responseBody = [
            { count: 6, key: "Application Received" },
            { count: 2, key: "Application Submitted" },
            { count: 2, key: "Open Application" },
            { count: 4, key: "Interview Scheduled" },
            { count: 0, key: "Application WaitingList" },
            { count: 0, key: "Application Rejected" },
            { count: 2, key: "In Review" },
            { count: 0, key: "Interviewed" },
            { count: 0, key: "Applicant Passed" },
            { count: 0, key: "Applicant Rejected" },
            { count: 0, key: "Applicant OnHold" },
            { count: 0, key: "Admission Fee Paid" },
            { count: 0, key: "Payment Made" },
            { count: 0, key: "Payment Pending" },
            { count: 0, key: "Admission Payment" },
            { count: 0, key: "Interview Completed" },
            { count: 0, key: "Rejected" },
        ];
        model_3.Application.aggregate.mockResolvedValue([
            { _id: "Application Received", count: 6 },
            { _id: "Application Submitted", count: 2 },
            { _id: "Open Application", count: 2 },
            { _id: "Interview Scheduled", count: 4 },
        ]);
        const result = yield (0, service_1.getApplicationsForAnalyticService)(params);
        expect(result).toEqual(responseBody);
    }));
    test("GET getApplicationsForAnalyticService - Gradewise", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { type: "gradewise" };
        const responseBody = [
            { count: 0, key: "LKG" },
            { count: 0, key: "UKG" },
            { count: 0, key: "I" },
            { count: 0, key: "II" },
            { count: 0, key: "III" },
            { count: 0, key: "IV" },
            { count: 0, key: "V" },
            { count: 0, key: "VI" },
            { count: 0, key: "VII" },
            { count: 0, key: "VIII" },
            { count: 0, key: "IX" },
            { count: 0, key: "X" },
            { count: 0, key: "XI" },
            { count: 0, key: "XII" },
        ];
        model_3.Application.aggregate.mockResolvedValue([
            { _id: "LKG", count: 0 },
            { _id: "UKG", count: 0 },
        ]);
        const result = yield (0, service_1.getApplicationsForAnalyticService)(params);
        expect(result).toEqual(responseBody);
    }));
    test("GET getApplicationsForAnalyticService - Statuswise", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { type: "statuswise" };
        const responseBody = [
            { count: 1, key: "Application Submitted" },
            { count: 2, key: "Interview Scheduled" },
            { count: 0, key: "Application WaitingList" },
            { count: 0, key: "Application Rejected" },
            { count: 0, key: "Applicant Passed" },
            { count: 0, key: "Applicant Rejected" },
            { count: 0, key: "Applicant OnHold" },
            { count: 0, key: "Admission Fee Paid" },
        ];
        model_3.Application.aggregate.mockResolvedValue([
            { _id: "Application Submitted", count: 1 },
            { _id: "Interview Scheduled", count: 2 },
        ]);
        const result = yield (0, service_1.getApplicationsForAnalyticService)(params);
        expect(result).toEqual(responseBody);
    }));
    test("GET getApplicationsForAnalyticService - Payment", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { type: "payment" };
        const responseBody = [
            { count: 0, key: "LKG" },
            { count: 0, key: "UKG" },
            { count: 0, key: "I" },
            { count: 0, key: "II" },
            { count: 0, key: "III" },
            { count: 0, key: "IV" },
            { count: 0, key: "V" },
            { count: 0, key: "VI" },
            { count: 0, key: "VII" },
            { count: 0, key: "VIII" },
            { count: 0, key: "IX" },
            { count: 0, key: "X" },
            { count: 0, key: "XI" },
            { count: 0, key: "XII" },
        ];
        model_3.Application.aggregate.mockResolvedValue([
            { _id: "LKG", count: 0 },
            { _id: "UKG", count: 0 },
        ]);
        const result = yield (0, service_1.getApplicationsForAnalyticService)(params);
        expect(result).toEqual(responseBody);
    }));
    test("GET getApplicationsForAnalyticService - Genderwise", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { type: "genderwise" };
        const responseBody = [
            { count: 0, key: "Male" },
            { count: 0, key: "Female" },
        ];
        model_3.Application.aggregate.mockResolvedValue([
            { _id: "Male", count: 0 },
            { _id: "Female", count: 0 },
        ]);
        const result = yield (0, service_1.getApplicationsForAnalyticService)(params);
        expect(result).toEqual(responseBody);
    }));
    test("GET getApplicationsForAnalyticCalendarService", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { type: "dashboard" };
        const responseBody = [
            {
                currentYear: 0,
                previousYear: 0,
                key: "Application Received",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Application Submitted",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Open Application",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Interview Scheduled",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Application WaitingList",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Application Rejected",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "In Review",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Interviewed",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Applicant Passed",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Applicant Rejected",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Applicant OnHold",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Admission Fee Paid",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Payment Made",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Payment Pending",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Admission Payment",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Interview Completed",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Rejected",
            },
        ];
        model_3.Application.aggregate.mockResolvedValue([
            { _id: "Application Submitted", count: 0 },
            { _id: "Application Rejected", count: 0 },
        ]);
        const result = yield (0, service_1.getApplicationsForAnalyticCalendarService)(params);
        expect(result).toEqual(responseBody);
    }));
    test("GET getApplicationsForAnalyticCalendarService", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { type: "gradewise" };
        const responseBody = [
            {
                currentYear: 0,
                previousYear: 0,
                key: "LKG",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "UKG",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "I",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "II",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "III",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "IV",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "V",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "VI",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "VII",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "VIII",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "IX",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "X",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "XI",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "XII",
            },
        ];
        model_3.Application.aggregate.mockResolvedValue([
            { _id: "LKG", count: 0 },
            { _id: "UKG", count: 0 },
        ]);
        const result = yield (0, service_1.getApplicationsForAnalyticCalendarService)(params);
        expect(result).toEqual(responseBody);
    }));
    test("GET getApplicationsForAnalyticCalendarService", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { type: "statuswise" };
        const responseBody = [
            {
                currentYear: 0,
                previousYear: 0,
                key: "Application Submitted",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Interview Scheduled",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Application WaitingList",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Application Rejected",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Applicant Passed",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Applicant Rejected",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Applicant OnHold",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Admission Fee Paid",
            },
        ];
        model_3.Application.aggregate.mockResolvedValue([
            { _id: "Application Submitted", count: 0 },
            { _id: "Application Rejected", count: 0 },
        ]);
        const result = yield (0, service_1.getApplicationsForAnalyticCalendarService)(params);
        expect(result).toEqual(responseBody);
    }));
    test("GET getApplicationsForAnalyticCalendarService", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { type: "payment" };
        const responseBody = [
            {
                currentYear: 0,
                previousYear: 0,
                key: "LKG",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "UKG",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "I",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "II",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "III",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "IV",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "V",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "VI",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "VII",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "VIII",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "IX",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "X",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "XI",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "XII",
            },
        ];
        model_3.Application.aggregate.mockResolvedValue([
            { _id: "V", count: 0 },
            { _id: "VI", count: 0 },
        ]);
        const result = yield (0, service_1.getApplicationsForAnalyticCalendarService)(params);
        expect(result).toEqual(responseBody);
    }));
    test("GET getApplicationsForAnalyticCalendarService", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { type: "genderwise" };
        const responseBody = [
            {
                currentYear: 0,
                previousYear: 0,
                key: "Male",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Female",
            },
        ];
        model_3.Application.aggregate.mockResolvedValue([
            { _id: "male", count: 0 },
            { _id: "female", count: 0 },
        ]);
        const result = yield (0, service_1.getApplicationsForAnalyticCalendarService)(params);
        expect(result).toEqual(responseBody);
    }));
    test("GET getApplicationsForAnalyticService - Unsupported type", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { type: "unsupportedType" };
        const result = yield (0, service_1.getApplicationsForAnalyticService)(params);
        expect(result).toEqual([]);
    }));
    test("findElement", () => {
        const arr = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
            { id: 3, name: "Charlie" },
        ];
        const result1 = (0, service_1.findElement)(arr, "id", 2);
        const result2 = (0, service_1.findElement)(arr, "name", "Charlie");
        const result3 = (0, service_1.findElement)(arr, "name", "David");
        expect(result1).toEqual({ id: 2, name: "Bob" });
        expect(result2).toEqual({ id: 3, name: "Charlie" });
        expect(result3).toBeUndefined();
    });
    test("GET getApplicationService", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { id: applicationMock._id };
        model_3.Application.findById.mockResolvedValue(applicationMock);
        const result = yield (0, service_1.getApplicationService)(params);
        expect(result).toEqual(applicationMock);
    }));
    test("PUT updateApplicationService", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedBody = {
            submitted: true,
            paymentMode: "online",
            paymentStatus: "TXN_SUCCESS",
        };
        model_3.Application.findOne = jest.fn().mockImplementation((query) => {
            return {
                sort: jest.fn().mockResolvedValue({
                    applicationNumber: 1001,
                }),
            };
        });
        model_3.Application.findById.mockResolvedValue(paymentSuccessApplication);
        model_3.Application.findOneAndUpdate.mockResolvedValue(Object.assign(Object.assign({}, paymentSuccessApplication), updatedBody));
        const requestParams = {
            id: applicationMock._id,
        };
        const applicationMocks = [
            { applicationNumber: 1001 },
            { applicationNumber: 1002 },
        ];
        model_3.Application.find = jest.fn().mockResolvedValue(applicationMocks);
        const result = yield (0, service_1.updateApplicationService)(requestParams, updatedBody);
        expect(result).toEqual(paymentSuccessApplication);
    }));
    test("PUT updateApplicationService update candidateName if firstName and lastName are provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { id: "64bb6db083470b00181a3b59" };
        const body = {
            firstName: "John",
            lastName: "Doe",
        };
        model_3.Application.findById.mockResolvedValue({
            applicationStatus: "Submission Pending",
        });
        model_3.Application.findOneAndUpdate.mockResolvedValue({
            _id: "sampleId",
            candidateName: "John Doe",
        });
        const result = yield (0, service_1.updateApplicationService)(params, body);
        expect(result.candidateName).toBe("John Doe");
    }));
    test("PUT updateApplicationService update interviewTime if interviewTimeIn and interviewTimeOut are provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { id: "64bb6db083470b00181a3b59" };
        const body = {
            interviewTimeIn: "10:00 AM",
            interviewTimeOut: "11:00 AM",
        };
        model_3.Application.findById.mockResolvedValue({
            applicationStatus: "Submission Pending",
        });
        model_3.Application.findOneAndUpdate.mockResolvedValue({
            _id: "sampleId",
            interviewTime: "10:00 AM-11:00 AM",
        });
        const result = yield (0, service_1.updateApplicationService)(params, body);
        expect(result.interviewTime).toBe("10:00 AM-11:00 AM");
    }));
    test("PUT updateApplicationService - Awaiting Application Fee", () => __awaiter(void 0, void 0, void 0, function* () {
        const inputBody = {
            submitted: true,
            paymentMode: "cash",
            paymentStatus: "TXN_FAILURE",
            applicationStatus: "Awaiting Application Fee",
        };
        model_3.Application.findOne = jest.fn().mockImplementation((query) => {
            return {
                sort: jest.fn().mockResolvedValue({
                    applicationNumber: 1001,
                }),
            };
        });
        model_3.Application.findById.mockResolvedValue(inputBody);
        model_3.Application.findOneAndUpdate.mockResolvedValue(Object.assign({}, inputBody));
        const requestParams = {
            id: applicationMock._id,
        };
        const result = yield (0, service_1.updateApplicationService)(requestParams, inputBody);
        expect(result.applicationStatus).toEqual("Awaiting Application Fee");
    }));
    test("PUT updateApplicationService - Application Status Cannot Be Updated", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedBody = {
            submitted: true,
            paymentMode: "online",
            paymentStatus: "TXN_SUCCESS",
        };
        model_3.Application.findById.mockResolvedValue(applicationMock);
        const requestParams = {
            id: applicationMock._id,
        };
        try {
            yield (0, service_1.updateApplicationService)(requestParams, updatedBody);
        }
        catch (error) {
            expect(error.message).toBe("Error while processing your request");
            expect(model_3.Application.findOneAndUpdate).not.toHaveBeenCalled();
        }
    }));
    test("PUT updateApplicationService - Application not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedBody = {
            submitted: true,
            paymentMode: "online",
            paymentStatus: "TXN_SUCCESS",
        };
        model_3.Application.findById.mockResolvedValue(null);
        const requestParams = {
            id: applicationMock._id,
        };
        yield expect((0, service_1.updateApplicationService)(requestParams, updatedBody)).rejects.toMatchObject({
            status: 404,
            message: "Application does not exist",
        });
    }));
    test("PUT updateApplicationService - Error handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedBody = {
            submitted: true,
            paymentMode: "online",
            paymentStatus: "TXN_SUCCESS",
        };
        model_3.Application.findOne = jest.fn().mockResolvedValue(applicationMock);
        model_3.Application.findOneAndUpdate.mockRejectedValue(new Error("Error while processing"));
        const requestParams = {
            id: applicationMock._id,
        };
        yield expect((0, service_1.updateApplicationService)(requestParams, updatedBody)).rejects.toMatchObject({
            status: 404,
            message: "Application does not exist",
        });
    }));
    test("DELETE deleteApplicationService", () => __awaiter(void 0, void 0, void 0, function* () {
        const applicationToDelete = {
            _id: "6ff98104a28de700189ae6f7",
            applicationNumber: "12345",
            applicationStatus: "Submission Pending",
        };
        model_3.Application.findByIdAndRemove.mockResolvedValue(applicationToDelete);
        const requestParams = {
            id: "6ff98104a28de700189ae6f7",
        };
        const result = yield (0, service_1.deleteApplicationService)(requestParams);
        expect(result).toEqual(applicationToDelete);
    }));
    test("DELETE deleteApplicationService Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const applicationToDelete = null;
        model_3.Application.findByIdAndRemove.mockResolvedValue(applicationToDelete);
        const requestParams = {
            id: "123",
        };
        try {
            yield (0, service_1.deleteApplicationService)(requestParams);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
        }
    }));
    const applicationStatusCollection = [
        {
            status: "Interview Scheduled",
            table_name: "scheduled",
        },
        {
            status: "Application Submitted",
            table_name: "pending",
        },
        {
            status: "Application WaitingList",
            table_name: "waiting-list",
        },
        {
            status: "Applicant Passed",
            table_name: "passed",
        },
        {
            status: "Application Rejected",
            table_name: "rejected",
        },
        {
            status: "Applicant Rejected",
            table_name: "rejected",
        },
        {
            status: "Applicant OnHold",
            table_name: "on-hold",
        },
    ];
    describe("GET searchApplicationsService", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        applicationStatusCollection.forEach((statusData) => {
            test(`GET - ${statusData.status} - ${statusData.table_name}`, () => __awaiter(void 0, void 0, void 0, function* () {
                const queryParams = {
                    table_name: statusData.table_name,
                    limit: 10,
                    offset: 0,
                    status: statusData.status,
                    sort_by: "fieldName",
                    sort_order: "asc",
                    filterProp1: 42,
                    filterProp2: "2023-11-23",
                    filterProp3: ["value1", "value2"],
                    applicationStatus: "Application Submitted",
                };
                model_1.TableMetaDataConfigModel.find = jest.fn().mockReturnValue({
                    select: jest.fn().mockReturnThis(),
                    lean: jest
                        .fn()
                        .mockResolvedValue([
                        { fieldName: "Application" },
                        { fieldName: "Class" },
                    ]),
                });
                model_3.Application.paginate.mockResolvedValue({
                    totalApplications: 2,
                    applications: applicationMockData,
                });
                const result = yield (0, service_1.searchApplicationsService)(queryParams);
                expect(result.totalApplications).toBe(2);
                expect(result.applications).toEqual(applicationMockData);
                expect(model_1.TableMetaDataConfigModel.find).toHaveBeenCalledWith({
                    tableName: statusData.table_name,
                    entityName: "Application",
                });
            }));
        });
    });
    test("GET searchApplicationsService - Error Case", () => __awaiter(void 0, void 0, void 0, function* () {
        const queryParams = {
            table_name: "student",
            limit: 10,
            offset: 0,
            status: "statusData.status",
            sort_by: "fieldName",
            sort_order: "asc",
        };
        const mockException = new Error("An error occurred");
        model_3.Application.paginate = jest.fn().mockRejectedValue(mockException);
        try {
            yield (0, service_1.searchApplicationsService)(queryParams);
        }
        catch (error) {
            expect(error.message).toEqual("Error while processing your request");
        }
    }));
    test("GET searchInterviewSchedulesService - with different filterprops value", () => __awaiter(void 0, void 0, void 0, function* () {
        const queryParams = {
            table_name: "student table",
            limit: 10,
            offset: 0,
            sort_by: "fieldName",
            sort_order: "asc",
            interviewDate: "2023-10-24",
            filterProp1: 42,
            filterProp2: "2023-11-23",
            filterProp3: ["value1", "value2"],
        };
        model_1.TableMetaDataConfigModel.find = jest.fn().mockReturnValue({
            select: jest.fn().mockReturnThis(),
            lean: jest
                .fn()
                .mockResolvedValue([
                { fieldName: "Application" },
                { fieldName: "Class" },
            ]),
        });
        model_3.InterviewScheduler.paginate.mockResolvedValue({
            totalSchedules: 2,
            schedules: [{ interviewDate: new Date() }, { interviewDate: new Date() }],
        });
        const result = yield (0, service_1.searchInterviewSchedulesService)(queryParams);
        expect(result.totalSchedules).toBe(2);
        expect(result.schedules).toHaveLength(2);
        expect(model_1.TableMetaDataConfigModel.find).toHaveBeenCalledWith({
            tableName: "student table",
            entityName: "InterviewScheduler",
        });
    }));
    test("GET  searchInterviewSchedulesService - with unique filterprops value", () => __awaiter(void 0, void 0, void 0, function* () {
        const queryParams = {
            table_name: "student table",
            limit: 10,
            offset: 0,
            sort_by: "fieldName",
            sort_order: "asc",
            interviewDate: "2023-10-24",
            filterProp1: "Name",
            filterProp2: "Location",
        };
        model_1.TableMetaDataConfigModel.find = jest.fn().mockReturnValue({
            select: jest.fn().mockReturnThis(),
            lean: jest
                .fn()
                .mockResolvedValue([
                { fieldName: "Application" },
                { fieldName: "Class" },
            ]),
        });
        model_3.InterviewScheduler.paginate.mockResolvedValue({
            totalSchedules: 2,
            schedules: [{ interviewDate: new Date() }, { interviewDate: new Date() }],
        });
        const result = yield (0, service_1.searchInterviewSchedulesService)(queryParams);
        expect(result.totalSchedules).toBe(2);
        expect(result.schedules).toHaveLength(2);
        expect(model_1.TableMetaDataConfigModel.find).toHaveBeenCalledWith({
            tableName: "student table",
            entityName: "InterviewScheduler",
        });
    }));
    test("GET searchInterviewSchedulesService - Error Case", () => __awaiter(void 0, void 0, void 0, function* () {
        const queryParams = {
            table_name: "student",
            limit: 10,
            offset: 0,
            status: "statusData.status",
            sort_by: "fieldName",
            sort_order: "asc",
        };
        const mockException = new Error("An error occurred");
        model_3.Application.paginate = jest.fn().mockRejectedValue(mockException);
        try {
            yield (0, service_1.searchInterviewSchedulesService)(queryParams);
        }
        catch (error) {
            expect(error.message).toEqual("Error while processing your request");
        }
    }));
    test("getWeekDates returns the correct start and end dates for the week", () => {
        const lastDayOfWeek = new Date("2023-01-15");
        const result = (0, service_1.getWeekDates)(lastDayOfWeek);
        const expectedStartDate = new Date(lastDayOfWeek);
        expectedStartDate.setDate(lastDayOfWeek.getDate() - 6);
        const expectedStartDateString = expectedStartDate
            .toISOString()
            .slice(0, 10);
        const expectedEndDateString = lastDayOfWeek.toISOString().slice(0, 10);
        expect(result.startDate).toBe(expectedStartDateString);
        expect(result.endDate).toBe(expectedEndDateString);
    });
    test("getDatesBetween generates the correct array of dates between startDate and endDate", () => {
        const startDate = new Date("2023-01-10");
        const endDate = new Date("2023-01-15");
        const result = (0, service_1.getDatesBetween)(startDate, endDate);
        const expectedDates = [
            "2023-01-10T00:00:00.000+00:00",
            "2023-01-11T00:00:00.000+00:00",
            "2023-01-12T00:00:00.000+00:00",
            "2023-01-13T00:00:00.000+00:00",
            "2023-01-14T00:00:00.000+00:00",
            "2023-01-15T00:00:00.000+00:00",
        ];
        expect(result).toEqual(expectedDates);
    });
    test("convertToUTCDate converts a normal date to UTC date", () => {
        const normalDate = new Date("2023-01-10T12:00:00");
        const result = (0, service_1.convertToUTCDate)(normalDate);
        const expectedUTCTimestamp = normalDate.getTime() - normalDate.getTimezoneOffset() * 60000;
        const expectedUTCDate = new Date(expectedUTCTimestamp);
        expect(result).toEqual(expectedUTCDate);
    });
});
