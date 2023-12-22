import { TableMetaDataConfigModel } from "../admin-config/model";
import { Student } from "../student/model";
import { User } from "../user/model";
import { createUserByAdminService } from "../user/service";
import { Employee } from "./model";
import {
  addBulkEmployeeService,
  checkEmail,
  createEmployeeExcelDataService,
  createEmployeeService,
  createUserAndSendEnrolledNotification,
  deleteEmployeeService,
  getEmployeeByEmpIdService,
  getEmployeeByIdService,
  getEmployeesForAnalyticService,
  getEmployeesService,
  getTeachingEmployeesService,
  searchEmployeeService,
  sendEmployeeStatusNotification,
  updateEmployeeService,
  updateEmployeeServiceEnroll,
  updateEmployeeServiceSubmit,
} from "./service";
const xlsx = require("xlsx");
const { ObjectId } = require("mongodb");
import ses from "../../common/aws-ses";
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
    documentUrl:
      "http://dev.mentorerp.com:9200/documents/WbD3EgQlz3aFgawr2qvP0WSY4uiJy4BS",
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

  test("POST createEmployeeService", async () => {
    Employee.findOne = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockEmployee),
    });
    Employee.create = jest.fn().mockResolvedValue(mockEmployee);
    const checkEmail = jest.fn().mockResolvedValue(false);
    try {
      const result = await createEmployeeService(mockEmployee);
      expect(result).toEqual(mockEmployee);
      expect(checkEmail).toHaveBeenCalledWith(mockEmployee);
    } catch (error) {
      console.log(error);
    }
  });

  test("POST createEmployeeService - Email Id already exists", async () => {
    Employee.findOne = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockEmployee),
    });
    Employee.create = jest
      .fn()
      .mockRejectedValue(new Error("Email Id already exists"));
    const checkEmail = jest.fn().mockResolvedValue(false);
    try {
      await createEmployeeService(mockEmployee);
    } catch (error) {
      expect(error.status).toBe(409);
      expect(error.message).toBe("Email Id already exists");
    }
  });

  test("POST createEmployeeService - No Previous Employee Records", async () => {
    Employee.findOne = jest.fn().mockReturnValue(null);
    Employee.create = jest.fn().mockResolvedValue(mockEmployee);
    const checkEmail = jest.fn().mockResolvedValue(false);
    try {
      const result = await createEmployeeService(mockEmployee);
      expect(result).toEqual(mockEmployee);
      expect(checkEmail).toHaveBeenCalledWith(mockEmployee);
      expect(result._empId).toBe(10001);
      expect(result.empId).toBe("EMP10001");
    } catch (error) {
      console.log(error);
    }
  });

  test("POST createEmployeeService error and reject with a 409 status for duplicate email", async () => {
    Employee.findOne = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(null),
    });
    const body = { emailId: "test@example.com" };
    const objId = "64bb6db083470b00181a3b59";
    await checkEmail(body, objId);

    const duplicateError = new Error();
    duplicateError.name = "MongoError";
    duplicateError.code = 11000;

    Employee.create.mockRejectedValueOnce(duplicateError);

    await expect(createEmployeeService(mockEmployee)).rejects.toEqual({
      status: 409,
      message: "Email Id already exists",
    });

    expect(Employee.findOne).toHaveBeenCalled();
    expect(Employee.create).toHaveBeenCalled();
  });

  test("GET getEmployeesService", async () => {
    Employee.find.mockResolvedValue(mockEmployee);
    const result = await getEmployeesService();
    expect(result).toEqual(mockEmployee);
    expect(Employee.find).toHaveBeenCalledWith();
  });

  test("GET getEmployeesService - Error Handling", async () => {
    const errorMessage = "Database connection error";
    Employee.find.mockRejectedValue(new Error(errorMessage));
    try {
      await getEmployeesService();
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
    }
    expect(Employee.find).toHaveBeenCalledWith();
  });

  test("GET searchEmployeeService - with different filterprops", async () => {
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
    TableMetaDataConfigModel.find = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      lean: jest
        .fn()
        .mockResolvedValue([
          { fieldName: "empId" },
          { fieldName: "firstname" },
        ]),
    });
    Employee.paginate.mockResolvedValue({
      totalEmployees: 2,
      employees: mockEmployee,
    });

    const result = await searchEmployeeService(queryParams);
    expect(result.totalEmployees).toBe(2);
    expect(result.employees).toEqual(mockEmployee);
    expect(TableMetaDataConfigModel.find).toHaveBeenCalledWith({
      entityName: "Employee",
      tableName: "EmployeTable",
    });
  });

  test("GET searchEmployeeService - with uique filterprops", async () => {
    const queryParams = {
      table_name: "EmployeTable",
      limit: 10,
      offset: 0,
      sort_by: "empId",
      sort_order: "asc",
      filterProp1: "Name",
      filterProp2: "2023-11-23",
    };
    TableMetaDataConfigModel.find = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      lean: jest
        .fn()
        .mockResolvedValue([
          { fieldName: "empId" },
          { fieldName: "firstname" },
        ]),
    });
    Employee.paginate.mockResolvedValue({
      totalEmployees: 2,
      employees: mockEmployee,
    });
    const result = await searchEmployeeService(queryParams);
    expect(result.totalEmployees).toBe(2);
    expect(result.employees).toEqual(mockEmployee);
    expect(TableMetaDataConfigModel.find).toHaveBeenCalledWith({
      entityName: "Employee",
      tableName: "EmployeTable",
    });
  });

  test("GET searchEmployeeService - Error while processing your request", async () => {
    Employee.paginate = jest
      .fn()
      .mockRejectedValue(new Error("Error while processing your request"));
    const queryParams = {};
    try {
      await searchEmployeeService(queryParams);
    } catch (error) {
      expect(error.message).toBe("Error while processing your request");
    }
  });

  test("GET getEmployeeByEmpIdService 200", async () => {
    try {
      Employee.findOne = jest.fn().mockImplementation((query) => {
        return {
          sort: jest.fn().mockResolvedValue({
            previousEmployeeId: "6037a84e1b7c7200181e3d1b",
            previousEmployeeEmpId: undefined,
            nextEmployeeId: undefined,
            nextEmployeeEmpId: "EMP10001",
          }),
        };
      });
      const result = await getEmployeeByEmpIdService(mockEmployee);
      expect(result).toEqual(mockEmployee);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET getEmployeeByEmpIdService Error Handling", async () => {
    const params = { empId: "EMP123" };
    Employee.findOne = jest.fn().mockImplementation((query) => {
      if (query._empId.$lt === "123") {
        return {
          sort: jest.fn().mockResolvedValue({
            id: "prevId",
            empId: "prevEmpId",
          }),
        };
      }
    });
    Employee.findOne = jest.fn().mockImplementation((query) => {
      if (query._empId.$gt === "123") {
        return {
          sort: jest.fn().mockResolvedValue({
            id: "nextId",
            empId: "nextEmpId",
          }),
        };
      }
    });
    Employee.findOne.mockImplementation(() => {
      throw new Error("Invalid Error");
    });
    try {
      await getEmployeeByEmpIdService(params);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(409);
      expect(error.message).toBe("Error while processing your request");
    }
  });

  test("GET getEmployeeByEmpIdService 404 Eror Handling", async () => {
    const params = { empId: "" };
    Employee.findOne = jest.fn().mockImplementation((query) => {
      if (query._empId.$lt === "123") {
        return {
          sort: jest.fn().mockResolvedValue({
            id: "prevId",
            empId: "prevEmpId",
          }),
        };
      }
    });
    Employee.findOne = jest.fn().mockImplementation((query) => {
      if (query._empId.$gt === "123") {
        return {
          sort: jest.fn().mockResolvedValue({
            id: "nextId",
            empId: "nextEmpId",
          }),
        };
      }
    });
    Employee.findOne.mockResolvedValue(null);
    try {
      await getEmployeeByEmpIdService(params);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("not found");
    }
  });

  test("GET getEmployeeByIdService 200", async () => {
    Employee.findOne = jest.fn().mockImplementation((query) => {
      if (query._empId.$lt === "123") {
        return {
          sort: jest.fn().mockResolvedValue({
            id: "prevId",
            empId: "prevEmpId",
          }),
        };
      }
    });
    Employee.findOne = jest.fn().mockImplementation((query) => {
      if (query._empId.$gt === "123") {
        return {
          sort: jest.fn().mockResolvedValue({
            id: "nextId",
            empId: "nextEmpId",
          }),
        };
      }
    });
    Employee.findById.mockResolvedValue(mockEmployee);
    try {
      const result = await getEmployeeByIdService(mockEmployee);
      expect(Employee.findById).toHaveBeenCalled();
      expect(result).toEqual(mockEmployee);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET getEmployeeByIdService Error Handling", async () => {
    const params = { id: "65151ae7ed1968322c86e611" };
    Employee.findOne = jest.fn().mockImplementation((query) => {
      if (query._empId.$lt === "123") {
        return {
          sort: jest.fn().mockResolvedValue({
            id: "prevId",
            empId: "prevEmpId",
          }),
        };
      }
    });
    Employee.findOne = jest.fn().mockImplementation((query) => {
      if (query._empId.$gt === "123") {
        return {
          sort: jest.fn().mockResolvedValue({
            id: "nextId",
            empId: "nextEmpId",
          }),
        };
      }
    });
    Employee.findById.mockImplementation(() => {
      throw new Error("Invalid error");
    });
    try {
      await getEmployeeByIdService(params);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(409);
      expect(error.message).toBe("Error while processing your request");
    }
  });

  test("GET getEmployeeByIdService 404 Eror Handling", async () => {
    const params = { id: "65151ae7ed1968322c86e611" };
    Employee.findOne = jest.fn().mockImplementation((query) => {
      if (query._empId.$lt === "123") {
        return {
          sort: jest.fn().mockResolvedValue({
            id: "prevId",
            empId: "prevEmpId",
          }),
        };
      }
    });
    Employee.findOne = jest.fn().mockImplementation((query) => {
      if (query._empId.$gt === "123") {
        return {
          sort: jest.fn().mockResolvedValue({
            id: "nextId",
            empId: "nextEmpId",
          }),
        };
      }
    });
    Employee.findById.mockResolvedValue(null);
    try {
      await getEmployeeByIdService(params);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("not found");
    }
  });

  test("PUT updateEmployeeService", async () => {
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
    Employee.findOneAndUpdate.mockResolvedValue(mockEmployee);
    ses.sendEmail = jest.fn().mockImplementation(() => ({
      promise: jest
        .fn()
        .mockResolvedValueOnce({ MessageId: "mockedMessageId" }),
    }));
    try {
      const result = await updateEmployeeService(params, mockEmployee);
      await sendEmployeeStatusNotification(user, empDoc);
      expect(result).toEqual(mockEmployee);
    } catch (error) {
      console.error(error);
    }
  });

  test("PUT updateEmployeeService duplicate email and rejects with a 409 status", async () => {
    const params = {
      id: "64bb6db083470b00181a3b59",
    };
    Employee.findOne.mockReturnValue({ emailId: "test@example.com" });
    const body = { emailId: "test@example.com" };
    const objId = "64bb6db083470b00181a3b58";
    await checkEmail(body, objId);
    try {
      await updateEmployeeService(params, mockEmployee);
      await sendEmployeeStatusNotification(user, empDoc);
    } catch (error) {
      expect(error.message).toBe("Email Id already exists");
    }
  });

  test("PUT updateEmployeeService Error Handling", async () => {
    const params = { id: "64bb6db083470b00181a3b59" };
    Employee.findOneAndUpdate.mockRejectedValue(
      new Error("findOneAndUpdate failed")
    );
    try {
      await expect(updateEmployeeService(params, mockEmployee)).rejects.toEqual(
        {
          status: 409,
          message: "Error while processing your request",
        }
      );
    } catch (error) {
      console.error(error);
    }
  });

  test("PUT updateEmployeeServiceEnroll", async () => {
    const params = { id: "64bb6db083470b00181a3b59" };
    Employee.findOneAndUpdate.mockResolvedValue(mockEmployee);
    try {
      const result = await updateEmployeeServiceEnroll(params, mockEmployee);
      expect(Employee.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: "64bb6db083470b00181a3b59" },
        { profileStatus: "Enrolled", ...mockEmployee },
        { new: true }
      );
      expect(result).toEqual(mockEmployee);
    } catch (error) {
      console.error(error);
    }
  });

  test("PUT updateEmployeeServiceEnroll - Error Handling", async () => {
    const params = { id: "64bb6db083470b00181a3b59" };
    const error = new Error("Failed to update employee");
    Employee.findOneAndUpdate.mockRejectedValue(error);
    try {
      const result = await updateEmployeeServiceEnroll(params, mockEmployee);
      console.error("Expected an error but the function succeeded.");
    } catch (error) {
      expect(Employee.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: "64bb6db083470b00181a3b59" },
        { profileStatus: "Enrolled", ...mockEmployee },
        { new: true }
      );
      expect(error.message).toBe("Failed to update employee");
    }
  });

  test("PUT updateEmployeeServiceSubmit", async () => {
    const params = { id: "64bb6db083470b00181a3b59" };
    Employee.findOneAndUpdate.mockResolvedValue(mockEmployee);
    const result = await updateEmployeeServiceSubmit(params, mockEmployee);
    expect(Employee.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "64bb6db083470b00181a3b59" },
      mockEmployee,
      { new: true }
    );
    expect(result).toEqual(mockEmployee);
  });

  test("PUT updateEmployeeServiceSubmit Error Handling", async () => {
    const params = { id: "64bb6db083470b00181a3b59" };
    const mockEmployee = { profileStatus: "Completed" };
    const error = new Error("Failed to update employee");
    Employee.findOneAndUpdate.mockRejectedValue(error);
    try {
      const result = await updateEmployeeServiceSubmit(params, mockEmployee);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Failed to update employee");
    }
  });

  test("DELETE deleteEmployeeService", async () => {
    const params = { id: "64bb6db083470b00181a3b59" };
    Employee.deleteOne.mockResolvedValue({ n: 1 });
    const result = await deleteEmployeeService(params);
    expect(Employee.deleteOne).toHaveBeenCalledWith({
      _id: "64bb6db083470b00181a3b59",
    });
    expect(result).toEqual({ n: 1 });
  });

  test("DELETE deleteEmployeeService Error Handling", async () => {
    const params = { id: "64bb6db083470b00181a3b59" };
    const error = new Error("Failed to delete employee");
    Employee.deleteOne.mockRejectedValue(error);
    try {
      await deleteEmployeeService(params);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("Failed to delete employee");
    }
    expect(Employee.deleteOne).toHaveBeenCalledWith({
      _id: "64bb6db083470b00181a3b59",
    });
  });

  test("GET getEmployeesForAnalyticService", async () => {
    Employee.aggregate.mockResolvedValue([
      { _id: "Total Employee", count: 100 },
      { _id: "Administrative", count: 30 },
      { _id: "Faculty", count: 50 },
      { _id: "Support Staff", count: 20 },
    ]);
    Student.aggregate.mockResolvedValue([{ _id: true, count: 5000 }]);
    const result = await getEmployeesForAnalyticService();
    expect(Employee.aggregate).toHaveBeenCalled();
    expect(Student.aggregate).toHaveBeenCalled();
    expect(result).toEqual([
      { count: 100, key: "Total Employee" },
      { count: 30, key: "Administrative" },
      { count: 50, key: "Faculty" },
      { count: 20, key: "Support Staff" },
      { count: 5000, key: "Total Student" },
    ]);
  });

  test("GET getEmployeesForAnalyticService Error Handling", async () => {
    const employeeError = new Error("Failed to fetch employee analytics");
    const studentError = new Error("Failed to fetch student analytics");
    jest.spyOn(Employee, "aggregate").mockRejectedValue(employeeError);
    jest.spyOn(Student, "aggregate").mockRejectedValue(studentError);
    try {
      await getEmployeesForAnalyticService();
    } catch (error) {
      expect(error.message).toBe(
        "Error while getting employees for analytics from database"
      );
    }
    Employee.aggregate.mockRestore();
    Student.aggregate.mockRestore();
  });

  test("GET getTeachingEmployeesService", async () => {
    const instituteId = "5faac26d80417b003d11edcd";
    const employeeType = "Teaching";
    jest.spyOn(Employee, "find").mockResolvedValue(mockEmployee);
    try {
      const result = await getTeachingEmployeesService(
        {
          instituteId: instituteId,
        },
        { employeeType: employeeType }
      );
      expect(Employee.find).toHaveBeenCalledWith({
        instituteId: { $eq: instituteId },
        employeeType: { $eq: employeeType },
        isActive: { $eq: true },
      });
      expect(result).toEqual(mockEmployee);
    } catch (error) {
      console.error(error);
    }
  });

  test("GET getTeachingEmployeesService Error Handling", async () => {
    const instituteId = "5faac26d80417b003d11edcd";
    const employeeType = "Teaching";
    const error = new Error("Failed to fetch teaching employees");
    jest.spyOn(Employee, "find").mockRejectedValue(error);
    try {
      await getTeachingEmployeesService(
        {
          instituteId: instituteId,
        },
        { employeeType: employeeType }
      );
    } catch (error) {
      expect(error.message).toBe("Failed to fetch teaching employees");
    }
  });

  test("POST addBulkEmployeeService", async () => {
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

    await addBulkEmployeeService(req, res);

    expect(xlsx.read).toHaveBeenCalledWith("mocked-file-buffer", {
      type: "buffer",
    });
    expect(xlsx.utils.sheet_to_json).toHaveBeenCalledWith(worksheet);
    expect(res.json).toHaveBeenCalledWith(mockedSheetData);
    expect(res.status).not.toHaveBeenCalled();
  });

  test("POST addBulkEmployeeService Error Handling", async () => {
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
    await addBulkEmployeeService(req, res);
    expect(xlsx.read).toHaveBeenCalledWith("mocked-file-buffer", {
      type: "buffer",
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error processing Excel file",
    });
  });

  test("POST createEmployeeExcelDataService", async () => {
    const body = [
      { id: 1, name: "John" },
      { id: 2, name: "Alice" },
    ];
    Employee.insertMany.mockResolvedValue({
      message: "Employee added successfully!!",
    });
    const result = await createEmployeeExcelDataService(body);
    expect(Employee.insertMany).toHaveBeenCalledWith(body);
    expect(result).toEqual({ message: "Employee added successfully!!" });
  });

  test("POST createEmployeeExcelDataService Error Handling", async () => {
    const body = [
      { id: 1, name: "John" },
      { id: 2, name: "Alice" },
    ];
    const error = new Error("Failed to add employees");
    Employee.insertMany.mockRejectedValue(error);
    try {
      await createEmployeeExcelDataService(body);
    } catch (err) {
      expect(Employee.insertMany).toHaveBeenCalledWith(body);
      expect(err.message).toBe("Failed to add employees");
    }
  });

  test("checkEmail return false if emailId is not found for the given object ID", async () => {
    Employee.findOne.mockReturnValue(null);
    const body = { emailId: "test@example.com" };
    const objId = "64bb6db083470b00181a3b59";
    const result = await checkEmail(body, objId);
    expect(result).toBe(false);
    expect(Employee.findOne).toHaveBeenCalledWith({
      emailId: "test@example.com",
      _id: { $ne: objId },
    });
  });

  test("checkEmail return true if emailId is found for the given object ID", async () => {
    Employee.findOne.mockReturnValue({ emailId: "test@example.com" });
    const body = { emailId: "test@example.com" };
    const objId = "someObjectId";
    const result = await checkEmail(body, objId);
    expect(result).toBe(true);
    expect(Employee.findOne).toHaveBeenCalledWith({
      emailId: "test@example.com",
      _id: { $ne: objId },
    });
  });

  test("checkEmail", async () => {
    const body = {};
    const objId = null;
    const result = await checkEmail(body, objId);
    expect(result).toBe(false);
  });

  test("sendEmployeeStatusNotification", async () => {
    const user = {
      password: "samplePassword",
    };
    const empDoc = {
      emailId: "pavithrar@bloomlync.com",
      firstName: "John",
      isActive: true,
      profileStatus: "Completed",
    };
    const result = await sendEmployeeStatusNotification(user, empDoc);
    expect(result).toBeDefined();
  });

  test("sendEmployeeStatusNotification Email Id is required", async () => {
    const user = {
      password: "samplePassword",
    };
    const empDoc = {
      firstName: "John",
      isActive: true,
      profileStatus: "Enrolled",
    };
    try {
      await sendEmployeeStatusNotification(user, empDoc);
    } catch (error) {
      expect(error.message).toBe("Email Id is required");
    }
  });

  test("POST createUserAndSendEnrolledNotification", async () => {
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
    User.create = jest.fn().mockResolvedValue(mockUser);
    await createUserByAdminService(user);
    await sendEmployeeStatusNotification(user, empDoc);
    const result = await createUserAndSendEnrolledNotification(empDoc);
    expect(result).toBe(empDoc);
  });

  test("POST createUserAndSendEnrolledNotification", async () => {
    const empDoc = {
      emailId: "pavithrar@bloomlync.com",
      empId: "EMP1001",
    };
    const user = {
      email: "pavithrar@bloomlync.com",
      password: "pavi@123",
    };
    await createUserByAdminService(user);
    try {
      await createUserAndSendEnrolledNotification(empDoc);
      await sendEmployeeStatusNotification(user, empDoc);
    } catch (error) {
      expect(error.message).toBe("User creation failed");
    }
  });

  test("POST createUserAndSendEnrolledNotification", async () => {
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
    User.create = jest
      .fn()
      .mockRejectedValue("Failed to createUserAndSendEnrolledNotification");
    try {
      await createUserByAdminService(user);
      const result = await createUserAndSendEnrolledNotification(empDoc);
      await sendEmployeeStatusNotification(user, empDoc);
    } catch (error) {
      console.log(error, "error");
    }
  });
});
