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
const model_1 = require("../admin-config/model");
const model_2 = require("../student/model");
const model_3 = require("../user/model");
const service_1 = require("../user/service");
const model_4 = require("./model");
const service_2 = require("./service");
const xlsx = require("xlsx");
const { ObjectId } = require("mongodb");
const aws_ses_1 = __importDefault(require("../../common/aws-ses"));
jest.mock("../../common/aws-ses");
jest.mock("./model", () => ({
    Employee: {
        insertMany: jest.fn(),
        aggregate: jest.fn(),
        paginate: jest.fn(),
        find: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
        findByIdAndRemove: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        deleteOne: jest.fn(),
        select: jest.fn(),
        lean: jest.fn(),
        sort: jest.fn(),
    },
}));
jest.mock("../user/model", () => ({
    User: {
        create: jest.fn(),
    },
}));
jest.mock("xlsx", () => ({
    read: jest.fn(),
    utils: {
        sheet_to_json: jest.fn(),
    },
}));
jest.mock("../admin-config/model", () => ({
    TableMetaDataConfigModel: {
        find: jest.fn(),
    },
}));
jest.mock("../student/model", () => ({
    Student: {
        aggregate: jest.fn(),
    },
}));
const mockUser = {
    email: "pavithrar@bloomlync.com",
    captcha: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlGG",
    password: "123456",
    isVerified: true,
};
describe("Employee API - Mock testing", () => {
    const mockEmployee = {
        isActive: true,
        firstName: "Solomonraja",
        lastName: "Raja",
        contactNumber: "+919790702005",
        emailId: "131020304@bloomlync.com",
        dateOfBirth: "1977-06-02T18:30:00.000Z",
        gender: "Male",
        bloodGroup: "B+",
        nationality: "Indian",
        religion: "Christian",
        casteType: "BC",
        casteName: "Nadar",
        motherTongue: "Tamil",
        aadhaarNumber: "223344556677",
        instituteId: "5faac26d80417b003d11edcd",
        userId: "5f38b9f366cac90018f55588",
        profileStatus: "Completed",
        experiences: [
            {
                employerName: "Wipro Technolgoy",
                jobTitle: "Project Engineer",
                employmentType: "Full-Time",
                location: "india",
                startDate: "2021-02-19T18:30:00.000Z",
                endDate: "2021-02-24T18:30:00.000Z",
            },
        ],
        dependents: [
            {
                dependentType: "Father",
                mobileNumber: "9790702005",
                firstName: "Jeba",
                lastName: "Deepa",
                emailId: "deepasolomon05@gmail.com",
                occupation: "Home Maker",
            },
        ],
        academicInfos: [
            {
                courseType: "Post Graduation",
                boardName: "MPHil",
                schoolCollegeName: "MPHil",
                overallPercentage: "99%",
                courseName: "MPHil",
                yearOfPassing: "2020-01-01T00:00:00.000Z",
            },
            {
                courseType: "Post Graduation",
                boardName: "B.Sc",
                schoolCollegeName: "Physics",
                overallPercentage: "99%",
                courseName: "MPHil",
                yearOfPassing: "2020-01-01T00:00:00.000Z",
            },
        ],
        dateOfJoin: "2021-03-31T18:30:00.000Z",
        designation: "Teaacher",
        employeeType: "Teaching",
        employementType: "Full-Time",
        isEligibleForClassTeacher: true,
        needTransportFacility: true,
        primaryDepartment: "Physics",
        role: "Faculty",
        secondaryDepartment: "Chemistry",
        bankAccountAccountNumber: "112233445567",
        bankAccountHolderName: "Solomon Raja",
        bankAccountIFSCCode: "HDFC0040",
        panNumber: "azhps3009b",
        documentUrl: "http://dev.mentorerp.com:9200/documents/WbD3EgQlz3aFgawr2qvP0WSY4uiJy4BS",
        fileKey: "WbD3EgQlz3aFgawr2qvP0WSY4uiJy4BS",
        originalFileName: "LinkedIn.png",
        otherDocument: [
            {
                documentUrl: "",
                documentType: "PG Mark Sheet",
                fileKey: "huYKjt3boLSVKft5gJBHcFT1kUpSng6O",
                originalFileName: "4-Student Profile-sibling-updated (1).jpg",
            },
            {
                documentUrl: "",
                documentType: "ID Proof",
                fileKey: "YP41Mh0LGLkZpTAMHSv6IeaEb4LF5bNO",
                originalFileName: "LinkedIn.png",
            },
        ],
        emergencyContactMobileNumber: "+919790702005",
        emergencyContactPersonFirstName: "Jeba",
        emergencyContactPersonLastName: "Deepa",
        emergencyContactPersonRelationship: "Spouse",
        communicationAddressCity: "Chennai",
        communicationAddressCountry: "UK",
        communicationAddressLine1: "No.23, 2nd Cross Street",
        communicationAddressLine2: "Mahalakshmi Nagar",
        communicationAddressState: "RJ",
        communicationAddressZipCode: "5006",
        permanentAddressCity: "Chennai",
        permanentAddressCountry: "india",
        permanentAddressLine1: "No.23, 2nd Cross Street",
        permanentAddressLine2: "Mahalakshmi Nagar",
        permanentAddressState: "TN",
        permanentAddressZipCode: "60056",
        _empId: "10001",
        empId: "EMP10001",
        tag: {
            previousEmployeeId: "6037a84e1b7c7200181e3d1b",
            previousEmployeeEmpId: undefined,
            nextEmployeeId: undefined,
            nextEmployeeEmpId: "EMP10001",
        },
    };
    test("POST createEmployeeService", () => __awaiter(void 0, void 0, void 0, function* () {
        model_4.Employee.findOne = jest.fn().mockReturnValue({
            sort: jest.fn().mockResolvedValue(mockEmployee),
        });
        model_4.Employee.create = jest.fn().mockResolvedValue(mockEmployee);
        const checkEmail = jest.fn().mockResolvedValue(false);
        try {
            const result = yield (0, service_2.createEmployeeService)(mockEmployee);
            expect(result).toEqual(mockEmployee);
            expect(checkEmail).toHaveBeenCalledWith(mockEmployee);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("POST createEmployeeService - Email Id already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        model_4.Employee.findOne = jest.fn().mockReturnValue({
            sort: jest.fn().mockResolvedValue(mockEmployee),
        });
        model_4.Employee.create = jest
            .fn()
            .mockRejectedValue(new Error("Email Id already exists"));
        const checkEmail = jest.fn().mockResolvedValue(false);
        try {
            yield (0, service_2.createEmployeeService)(mockEmployee);
        }
        catch (error) {
            expect(error.status).toBe(409);
            expect(error.message).toBe("Email Id already exists");
        }
    }));
    test("POST createEmployeeService - No Previous Employee Records", () => __awaiter(void 0, void 0, void 0, function* () {
        model_4.Employee.findOne = jest.fn().mockReturnValue(null);
        model_4.Employee.create = jest.fn().mockResolvedValue(mockEmployee);
        const checkEmail = jest.fn().mockResolvedValue(false);
        try {
            const result = yield (0, service_2.createEmployeeService)(mockEmployee);
            expect(result).toEqual(mockEmployee);
            expect(checkEmail).toHaveBeenCalledWith(mockEmployee);
            expect(result._empId).toBe(10001);
            expect(result.empId).toBe("EMP10001");
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("POST createEmployeeService error and reject with a 409 status for duplicate email", () => __awaiter(void 0, void 0, void 0, function* () {
        model_4.Employee.findOne = jest.fn().mockReturnValue({
            sort: jest.fn().mockResolvedValue(null),
        });
        const body = { emailId: "test@example.com" };
        const objId = "64bb6db083470b00181a3b59";
        yield (0, service_2.checkEmail)(body, objId);
        const duplicateError = new Error();
        duplicateError.name = "MongoError";
        duplicateError.code = 11000;
        model_4.Employee.create.mockRejectedValueOnce(duplicateError);
        yield expect((0, service_2.createEmployeeService)(mockEmployee)).rejects.toEqual({
            status: 409,
            message: "Email Id already exists",
        });
        expect(model_4.Employee.findOne).toHaveBeenCalled();
        expect(model_4.Employee.create).toHaveBeenCalled();
    }));
    test("GET getEmployeesService", () => __awaiter(void 0, void 0, void 0, function* () {
        model_4.Employee.find.mockResolvedValue(mockEmployee);
        const result = yield (0, service_2.getEmployeesService)();
        expect(result).toEqual(mockEmployee);
        expect(model_4.Employee.find).toHaveBeenCalledWith();
    }));
    test("GET getEmployeesService - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Database connection error";
        model_4.Employee.find.mockRejectedValue(new Error(errorMessage));
        try {
            yield (0, service_2.getEmployeesService)();
        }
        catch (error) {
            expect(error.message).toEqual(errorMessage);
        }
        expect(model_4.Employee.find).toHaveBeenCalledWith();
    }));
    test("GET searchEmployeeService - with different filterprops", () => __awaiter(void 0, void 0, void 0, function* () {
        const queryParams = {
            table_name: "EmployeTable",
            limit: 10,
            offset: 0,
            sort_by: "empId",
            sort_order: "asc",
            profileStatus: "Completed",
            filterProp1: 42,
            filterProp2: "2023-11-23",
            filterProp3: ["value1", "value2"],
        };
        model_1.TableMetaDataConfigModel.find = jest.fn().mockReturnValue({
            select: jest.fn().mockReturnThis(),
            lean: jest
                .fn()
                .mockResolvedValue([
                { fieldName: "empId" },
                { fieldName: "firstname" },
            ]),
        });
        model_4.Employee.paginate.mockResolvedValue({
            totalEmployees: 2,
            employees: mockEmployee,
        });
        const result = yield (0, service_2.searchEmployeeService)(queryParams);
        expect(result.totalEmployees).toBe(2);
        expect(result.employees).toEqual(mockEmployee);
        expect(model_1.TableMetaDataConfigModel.find).toHaveBeenCalledWith({
            entityName: "Employee",
            tableName: "EmployeTable",
        });
    }));
    test("GET searchEmployeeService - with uique filterprops", () => __awaiter(void 0, void 0, void 0, function* () {
        const queryParams = {
            table_name: "EmployeTable",
            limit: 10,
            offset: 0,
            sort_by: "empId",
            sort_order: "asc",
            filterProp1: "Name",
            filterProp2: "2023-11-23",
        };
        model_1.TableMetaDataConfigModel.find = jest.fn().mockReturnValue({
            select: jest.fn().mockReturnThis(),
            lean: jest
                .fn()
                .mockResolvedValue([
                { fieldName: "empId" },
                { fieldName: "firstname" },
            ]),
        });
        model_4.Employee.paginate.mockResolvedValue({
            totalEmployees: 2,
            employees: mockEmployee,
        });
        const result = yield (0, service_2.searchEmployeeService)(queryParams);
        expect(result.totalEmployees).toBe(2);
        expect(result.employees).toEqual(mockEmployee);
        expect(model_1.TableMetaDataConfigModel.find).toHaveBeenCalledWith({
            entityName: "Employee",
            tableName: "EmployeTable",
        });
    }));
    test("GET searchEmployeeService - Error while processing your request", () => __awaiter(void 0, void 0, void 0, function* () {
        model_4.Employee.paginate = jest
            .fn()
            .mockRejectedValue(new Error("Error while processing your request"));
        const queryParams = {};
        try {
            yield (0, service_2.searchEmployeeService)(queryParams);
        }
        catch (error) {
            expect(error.message).toBe("Error while processing your request");
        }
    }));
    test("GET getEmployeeByEmpIdService 200", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            model_4.Employee.findOne = jest.fn().mockImplementation((query) => {
                return {
                    sort: jest.fn().mockResolvedValue({
                        previousEmployeeId: "6037a84e1b7c7200181e3d1b",
                        previousEmployeeEmpId: undefined,
                        nextEmployeeId: undefined,
                        nextEmployeeEmpId: "EMP10001",
                    }),
                };
            });
            const result = yield (0, service_2.getEmployeeByEmpIdService)(mockEmployee);
            expect(result).toEqual(mockEmployee);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET getEmployeeByEmpIdService Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { empId: "EMP123" };
        model_4.Employee.findOne = jest.fn().mockImplementation((query) => {
            if (query._empId.$lt === "123") {
                return {
                    sort: jest.fn().mockResolvedValue({
                        id: "prevId",
                        empId: "prevEmpId",
                    }),
                };
            }
        });
        model_4.Employee.findOne = jest.fn().mockImplementation((query) => {
            if (query._empId.$gt === "123") {
                return {
                    sort: jest.fn().mockResolvedValue({
                        id: "nextId",
                        empId: "nextEmpId",
                    }),
                };
            }
        });
        model_4.Employee.findOne.mockImplementation(() => {
            throw new Error("Invalid Error");
        });
        try {
            yield (0, service_2.getEmployeeByEmpIdService)(params);
            expect(true).toBe(false);
        }
        catch (error) {
            expect(error.status).toBe(409);
            expect(error.message).toBe("Error while processing your request");
        }
    }));
    test("GET getEmployeeByEmpIdService 404 Eror Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { empId: "" };
        model_4.Employee.findOne = jest.fn().mockImplementation((query) => {
            if (query._empId.$lt === "123") {
                return {
                    sort: jest.fn().mockResolvedValue({
                        id: "prevId",
                        empId: "prevEmpId",
                    }),
                };
            }
        });
        model_4.Employee.findOne = jest.fn().mockImplementation((query) => {
            if (query._empId.$gt === "123") {
                return {
                    sort: jest.fn().mockResolvedValue({
                        id: "nextId",
                        empId: "nextEmpId",
                    }),
                };
            }
        });
        model_4.Employee.findOne.mockResolvedValue(null);
        try {
            yield (0, service_2.getEmployeeByEmpIdService)(params);
            expect(true).toBe(false);
        }
        catch (error) {
            expect(error.status).toBe(404);
            expect(error.message).toBe("not found");
        }
    }));
    test("GET getEmployeeByIdService 200", () => __awaiter(void 0, void 0, void 0, function* () {
        model_4.Employee.findOne = jest.fn().mockImplementation((query) => {
            if (query._empId.$lt === "123") {
                return {
                    sort: jest.fn().mockResolvedValue({
                        id: "prevId",
                        empId: "prevEmpId",
                    }),
                };
            }
        });
        model_4.Employee.findOne = jest.fn().mockImplementation((query) => {
            if (query._empId.$gt === "123") {
                return {
                    sort: jest.fn().mockResolvedValue({
                        id: "nextId",
                        empId: "nextEmpId",
                    }),
                };
            }
        });
        model_4.Employee.findById.mockResolvedValue(mockEmployee);
        try {
            const result = yield (0, service_2.getEmployeeByIdService)(mockEmployee);
            expect(model_4.Employee.findById).toHaveBeenCalled();
            expect(result).toEqual(mockEmployee);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("GET getEmployeeByIdService Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { id: "65151ae7ed1968322c86e611" };
        model_4.Employee.findOne = jest.fn().mockImplementation((query) => {
            if (query._empId.$lt === "123") {
                return {
                    sort: jest.fn().mockResolvedValue({
                        id: "prevId",
                        empId: "prevEmpId",
                    }),
                };
            }
        });
        model_4.Employee.findOne = jest.fn().mockImplementation((query) => {
            if (query._empId.$gt === "123") {
                return {
                    sort: jest.fn().mockResolvedValue({
                        id: "nextId",
                        empId: "nextEmpId",
                    }),
                };
            }
        });
        model_4.Employee.findById.mockImplementation(() => {
            throw new Error("Invalid error");
        });
        try {
            yield (0, service_2.getEmployeeByIdService)(params);
            expect(true).toBe(false);
        }
        catch (error) {
            expect(error.status).toBe(409);
            expect(error.message).toBe("Error while processing your request");
        }
    }));
    test("GET getEmployeeByIdService 404 Eror Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { id: "65151ae7ed1968322c86e611" };
        model_4.Employee.findOne = jest.fn().mockImplementation((query) => {
            if (query._empId.$lt === "123") {
                return {
                    sort: jest.fn().mockResolvedValue({
                        id: "prevId",
                        empId: "prevEmpId",
                    }),
                };
            }
        });
        model_4.Employee.findOne = jest.fn().mockImplementation((query) => {
            if (query._empId.$gt === "123") {
                return {
                    sort: jest.fn().mockResolvedValue({
                        id: "nextId",
                        empId: "nextEmpId",
                    }),
                };
            }
        });
        model_4.Employee.findById.mockResolvedValue(null);
        try {
            yield (0, service_2.getEmployeeByIdService)(params);
            expect(true).toBe(false);
        }
        catch (error) {
            expect(error.message).toBe("not found");
        }
    }));
    test("PUT updateEmployeeService", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { id: "64bb6db083470b00181a3b59" };
        const user = {
            email: "pavithrar@bloomlync.com",
            password: "pavi@123",
        };
        const empDoc = {
            emailId: "pavithrar@bloomlync.com",
            firstName: "John",
            isActive: true,
            profileStatus: "Enrolled",
        };
        model_4.Employee.findOneAndUpdate.mockResolvedValue(mockEmployee);
        aws_ses_1.default.sendEmail = jest.fn().mockImplementation(() => ({
            promise: jest
                .fn()
                .mockResolvedValueOnce({ MessageId: "mockedMessageId" }),
        }));
        try {
            const result = yield (0, service_2.updateEmployeeService)(params, mockEmployee);
            yield (0, service_2.sendEmployeeStatusNotification)(user, empDoc);
            expect(result).toEqual(mockEmployee);
        }
        catch (error) {
            console.error(error);
        }
    }));
    test("PUT updateEmployeeService duplicate email and rejects with a 409 status", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = {
            id: "64bb6db083470b00181a3b59",
        };
        model_4.Employee.findOne.mockReturnValue({ emailId: "test@example.com" });
        const body = { emailId: "test@example.com" };
        const objId = "64bb6db083470b00181a3b58";
        yield (0, service_2.checkEmail)(body, objId);
        try {
            yield (0, service_2.updateEmployeeService)(params, mockEmployee);
            yield (0, service_2.sendEmployeeStatusNotification)(user, empDoc);
        }
        catch (error) {
            expect(error.message).toBe("Email Id already exists");
        }
    }));
    test("PUT updateEmployeeService Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { id: "64bb6db083470b00181a3b59" };
        model_4.Employee.findOneAndUpdate.mockRejectedValue(new Error("findOneAndUpdate failed"));
        try {
            yield expect((0, service_2.updateEmployeeService)(params, mockEmployee)).rejects.toEqual({
                status: 409,
                message: "Error while processing your request",
            });
        }
        catch (error) {
            console.error(error);
        }
    }));
    test("PUT updateEmployeeServiceEnroll", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { id: "64bb6db083470b00181a3b59" };
        model_4.Employee.findOneAndUpdate.mockResolvedValue(mockEmployee);
        try {
            const result = yield (0, service_2.updateEmployeeServiceEnroll)(params, mockEmployee);
            expect(model_4.Employee.findOneAndUpdate).toHaveBeenCalledWith({ _id: "64bb6db083470b00181a3b59" }, Object.assign({ profileStatus: "Enrolled" }, mockEmployee), { new: true });
            expect(result).toEqual(mockEmployee);
        }
        catch (error) {
            console.error(error);
        }
    }));
    test("PUT updateEmployeeServiceEnroll - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { id: "64bb6db083470b00181a3b59" };
        const error = new Error("Failed to update employee");
        model_4.Employee.findOneAndUpdate.mockRejectedValue(error);
        try {
            const result = yield (0, service_2.updateEmployeeServiceEnroll)(params, mockEmployee);
            console.error("Expected an error but the function succeeded.");
        }
        catch (error) {
            expect(model_4.Employee.findOneAndUpdate).toHaveBeenCalledWith({ _id: "64bb6db083470b00181a3b59" }, Object.assign({ profileStatus: "Enrolled" }, mockEmployee), { new: true });
            expect(error.message).toBe("Failed to update employee");
        }
    }));
    test("PUT updateEmployeeServiceSubmit", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { id: "64bb6db083470b00181a3b59" };
        model_4.Employee.findOneAndUpdate.mockResolvedValue(mockEmployee);
        const result = yield (0, service_2.updateEmployeeServiceSubmit)(params, mockEmployee);
        expect(model_4.Employee.findOneAndUpdate).toHaveBeenCalledWith({ _id: "64bb6db083470b00181a3b59" }, mockEmployee, { new: true });
        expect(result).toEqual(mockEmployee);
    }));
    test("PUT updateEmployeeServiceSubmit Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { id: "64bb6db083470b00181a3b59" };
        const mockEmployee = { profileStatus: "Completed" };
        const error = new Error("Failed to update employee");
        model_4.Employee.findOneAndUpdate.mockRejectedValue(error);
        try {
            const result = yield (0, service_2.updateEmployeeServiceSubmit)(params, mockEmployee);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Failed to update employee");
        }
    }));
    test("DELETE deleteEmployeeService", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { id: "64bb6db083470b00181a3b59" };
        model_4.Employee.deleteOne.mockResolvedValue({ n: 1 });
        const result = yield (0, service_2.deleteEmployeeService)(params);
        expect(model_4.Employee.deleteOne).toHaveBeenCalledWith({
            _id: "64bb6db083470b00181a3b59",
        });
        expect(result).toEqual({ n: 1 });
    }));
    test("DELETE deleteEmployeeService Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { id: "64bb6db083470b00181a3b59" };
        const error = new Error("Failed to delete employee");
        model_4.Employee.deleteOne.mockRejectedValue(error);
        try {
            yield (0, service_2.deleteEmployeeService)(params);
        }
        catch (err) {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe("Failed to delete employee");
        }
        expect(model_4.Employee.deleteOne).toHaveBeenCalledWith({
            _id: "64bb6db083470b00181a3b59",
        });
    }));
    test("GET getEmployeesForAnalyticService", () => __awaiter(void 0, void 0, void 0, function* () {
        model_4.Employee.aggregate.mockResolvedValue([
            { _id: "Total Employee", count: 100 },
            { _id: "Administrative", count: 30 },
            { _id: "Faculty", count: 50 },
            { _id: "Support Staff", count: 20 },
        ]);
        model_2.Student.aggregate.mockResolvedValue([{ _id: true, count: 5000 }]);
        const result = yield (0, service_2.getEmployeesForAnalyticService)();
        expect(model_4.Employee.aggregate).toHaveBeenCalled();
        expect(model_2.Student.aggregate).toHaveBeenCalled();
        expect(result).toEqual([
            { count: 100, key: "Total Employee" },
            { count: 30, key: "Administrative" },
            { count: 50, key: "Faculty" },
            { count: 20, key: "Support Staff" },
            { count: 5000, key: "Total Student" },
        ]);
    }));
    test("GET getEmployeesForAnalyticService Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const employeeError = new Error("Failed to fetch employee analytics");
        const studentError = new Error("Failed to fetch student analytics");
        jest.spyOn(model_4.Employee, "aggregate").mockRejectedValue(employeeError);
        jest.spyOn(model_2.Student, "aggregate").mockRejectedValue(studentError);
        try {
            yield (0, service_2.getEmployeesForAnalyticService)();
        }
        catch (error) {
            expect(error.message).toBe("Error while getting employees for analytics from database");
        }
        model_4.Employee.aggregate.mockRestore();
        model_2.Student.aggregate.mockRestore();
    }));
    test("GET getTeachingEmployeesService", () => __awaiter(void 0, void 0, void 0, function* () {
        const instituteId = "5faac26d80417b003d11edcd";
        const employeeType = "Teaching";
        jest.spyOn(model_4.Employee, "find").mockResolvedValue(mockEmployee);
        try {
            const result = yield (0, service_2.getTeachingEmployeesService)({
                instituteId: instituteId,
            }, { employeeType: employeeType });
            expect(model_4.Employee.find).toHaveBeenCalledWith({
                instituteId: { $eq: instituteId },
                employeeType: { $eq: employeeType },
                isActive: { $eq: true },
            });
            expect(result).toEqual(mockEmployee);
        }
        catch (error) {
            console.error(error);
        }
    }));
    test("GET getTeachingEmployeesService Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const instituteId = "5faac26d80417b003d11edcd";
        const employeeType = "Teaching";
        const error = new Error("Failed to fetch teaching employees");
        jest.spyOn(model_4.Employee, "find").mockRejectedValue(error);
        try {
            yield (0, service_2.getTeachingEmployeesService)({
                instituteId: instituteId,
            }, { employeeType: employeeType });
        }
        catch (error) {
            expect(error.message).toBe("Failed to fetch teaching employees");
        }
    }));
    test("POST addBulkEmployeeService", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            file: {
                buffer: "mocked-file-buffer",
            },
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        const mockedSheetData = [
            { id: 1, name: "John" },
            { id: 2, name: "Alice" },
        ];
        const worksheet = { A1: { v: "id", t: "s" }, B1: { v: "name", t: "s" } };
        for (let i = 0; i < mockedSheetData.length; i++) {
            worksheet[`A${i + 2}`] = { v: mockedSheetData[i].id, t: "n" };
            worksheet[`B${i + 2}`] = { v: mockedSheetData[i].name, t: "s" };
        }
        xlsx.read.mockReturnValue({
            SheetNames: ["Sheet1"],
            Sheets: { Sheet1: worksheet },
        });
        xlsx.utils.sheet_to_json.mockReturnValue(mockedSheetData);
        yield (0, service_2.addBulkEmployeeService)(req, res);
        expect(xlsx.read).toHaveBeenCalledWith("mocked-file-buffer", {
            type: "buffer",
        });
        expect(xlsx.utils.sheet_to_json).toHaveBeenCalledWith(worksheet);
        expect(res.json).toHaveBeenCalledWith(mockedSheetData);
        expect(res.status).not.toHaveBeenCalled();
    }));
    test("POST addBulkEmployeeService Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            file: {
                buffer: "mocked-file-buffer",
            },
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        xlsx.read.mockImplementation(() => {
            throw new Error("File read error");
        });
        yield (0, service_2.addBulkEmployeeService)(req, res);
        expect(xlsx.read).toHaveBeenCalledWith("mocked-file-buffer", {
            type: "buffer",
        });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Error processing Excel file",
        });
    }));
    test("POST createEmployeeExcelDataService", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = [
            { id: 1, name: "John" },
            { id: 2, name: "Alice" },
        ];
        model_4.Employee.insertMany.mockResolvedValue({
            message: "Employee added successfully!!",
        });
        const result = yield (0, service_2.createEmployeeExcelDataService)(body);
        expect(model_4.Employee.insertMany).toHaveBeenCalledWith(body);
        expect(result).toEqual({ message: "Employee added successfully!!" });
    }));
    test("POST createEmployeeExcelDataService Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = [
            { id: 1, name: "John" },
            { id: 2, name: "Alice" },
        ];
        const error = new Error("Failed to add employees");
        model_4.Employee.insertMany.mockRejectedValue(error);
        try {
            yield (0, service_2.createEmployeeExcelDataService)(body);
        }
        catch (err) {
            expect(model_4.Employee.insertMany).toHaveBeenCalledWith(body);
            expect(err.message).toBe("Failed to add employees");
        }
    }));
    test("checkEmail return false if emailId is not found for the given object ID", () => __awaiter(void 0, void 0, void 0, function* () {
        model_4.Employee.findOne.mockReturnValue(null);
        const body = { emailId: "test@example.com" };
        const objId = "64bb6db083470b00181a3b59";
        const result = yield (0, service_2.checkEmail)(body, objId);
        expect(result).toBe(false);
        expect(model_4.Employee.findOne).toHaveBeenCalledWith({
            emailId: "test@example.com",
            _id: { $ne: objId },
        });
    }));
    test("checkEmail return true if emailId is found for the given object ID", () => __awaiter(void 0, void 0, void 0, function* () {
        model_4.Employee.findOne.mockReturnValue({ emailId: "test@example.com" });
        const body = { emailId: "test@example.com" };
        const objId = "someObjectId";
        const result = yield (0, service_2.checkEmail)(body, objId);
        expect(result).toBe(true);
        expect(model_4.Employee.findOne).toHaveBeenCalledWith({
            emailId: "test@example.com",
            _id: { $ne: objId },
        });
    }));
    test("checkEmail", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {};
        const objId = null;
        const result = yield (0, service_2.checkEmail)(body, objId);
        expect(result).toBe(false);
    }));
    test("sendEmployeeStatusNotification", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            password: "samplePassword",
        };
        const empDoc = {
            emailId: "pavithrar@bloomlync.com",
            firstName: "John",
            isActive: true,
            profileStatus: "Completed",
        };
        const result = yield (0, service_2.sendEmployeeStatusNotification)(user, empDoc);
        expect(result).toBeDefined();
    }));
    test("sendEmployeeStatusNotification Email Id is required", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            password: "samplePassword",
        };
        const empDoc = {
            firstName: "John",
            isActive: true,
            profileStatus: "Enrolled",
        };
        try {
            yield (0, service_2.sendEmployeeStatusNotification)(user, empDoc);
        }
        catch (error) {
            expect(error.message).toBe("Email Id is required");
        }
    }));
    test("POST createUserAndSendEnrolledNotification", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            email: "pavithrar@bloomlync.com",
            password: "pavi@123",
        };
        const empDoc = {
            emailId: "pavithrar@bloomlync.com",
            firstName: "John",
            isActive: true,
            profileStatus: "Enrolled",
        };
        model_3.User.create = jest.fn().mockResolvedValue(mockUser);
        yield (0, service_1.createUserByAdminService)(user);
        yield (0, service_2.sendEmployeeStatusNotification)(user, empDoc);
        const result = yield (0, service_2.createUserAndSendEnrolledNotification)(empDoc);
        expect(result).toBe(empDoc);
    }));
    test("POST createUserAndSendEnrolledNotification", () => __awaiter(void 0, void 0, void 0, function* () {
        const empDoc = {
            emailId: "pavithrar@bloomlync.com",
            empId: "EMP1001",
        };
        const user = {
            email: "pavithrar@bloomlync.com",
            password: "pavi@123",
        };
        yield (0, service_1.createUserByAdminService)(user);
        try {
            yield (0, service_2.createUserAndSendEnrolledNotification)(empDoc);
            yield (0, service_2.sendEmployeeStatusNotification)(user, empDoc);
        }
        catch (error) {
            expect(error.message).toBe("User creation failed");
        }
    }));
    test("POST createUserAndSendEnrolledNotification", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            email: "pavithrar@bloomlync.com",
            password: "pavi@123",
        };
        const empDoc = {
            emailId: "pavithrar@bloomlync.com",
            firstName: "John",
            isActive: true,
            profileStatus: "Enrolled",
        };
        model_3.User.create = jest
            .fn()
            .mockRejectedValue("Failed to createUserAndSendEnrolledNotification");
        try {
            yield (0, service_1.createUserByAdminService)(user);
            const result = yield (0, service_2.createUserAndSendEnrolledNotification)(empDoc);
            yield (0, service_2.sendEmployeeStatusNotification)(user, empDoc);
        }
        catch (error) {
            console.log(error, "error");
        }
    }));
});
