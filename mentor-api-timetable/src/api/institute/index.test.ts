import { result } from "lodash";
import sinon from "sinon";
import {
  Institute,
  InstituteAnnouncement,
  InstituteClasses,
  InstituteFaculties,
  InstituteHoliday,
  InstituteSubjects,
} from "./model";
import {
  addInstituteAnnouncementService,
  createInstituteService,
  getHolidayNameService,
  getInstituteAnnouncementService,
  getInstituteByIdService,
  getInstituteClassesService,
  getInstituteFacultiesService,
  getInstituteHolidaysService,
  getInstitutePeriodTimesService,
  getInstituteSubjectsService,
  getInstitutesService,
  getPeriodNameService,
  updateInstituteClassesService,
  updateInstituteFacultiesService,
  updateInstituteHolidaysService,
  updateInstitutePeriodTimesService,
  updateInstituteService,
  updateInstituteSubjectsService,
  deleteInstituteService,
} from "./service";
import * as adminConfigService from "../admin-config/service";

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
    sinon.restore();
  });

  test("GET Institute ", async () => {
    Institute.find.mockResolvedValue(mockInstituteRequest);
    try {
      const result = await getInstitutesService();
      expect(Institute.find).toHaveBeenCalled();
      expect(result).toEqual(mockInstituteRequest);
    } catch (error) {}
  });

  test("GET Institute - Error Handling", async () => {
    const errorMessage = "Institute Not Found.";
    Institute.find.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getInstitutesService();
    } catch (error) {
      expect(Institute.find).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("GET Institute:id ", async () => {
    Institute.findById.mockResolvedValue(mockInstituteRequest);
    try {
      const result = await getInstituteByIdService({
        id: mockInstituteRequest._id,
      });
      expect(Institute.findById).toHaveBeenCalled();
      expect(result).toEqual(mockInstituteRequest);
    } catch (error) {}
  });

  test("GET Institute:id - ID not found", async () => {
    const errorMessage = "Institute_id not Found";
    Institute.findById.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getInstituteByIdService({
        id: mockInstituteRequest._id,
      });
    } catch (error) {
      expect(Institute.findById).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("GET Institute:id - Invalid ID", async () => {
    Institute.findOne.mockResolvedValue(mockInstituteRequest);
    try {
      const result = await getInstituteByIdService({
        id: "invalidID",
      });
      expect(Institute.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockInstituteRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test("POST Institute - without email Template", async () => {
    Institute.create.mockResolvedValue(mockInstituteRequest);
    try {
      const result = await createInstituteService(mockInstituteRequest);
      expect(Institute.create).toHaveBeenCalled();
      expect(result).toEqual(mockInstituteRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test("POST Institute - with email Template ", async () => {
    Institute.create.mockResolvedValue(mockInstituteRequest);
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
      const result = await createInstituteService(mockInstituteRequest);
      expect(Institute.create).toHaveBeenCalled();
      await adminConfigService.getEmailTemplateConfigByNameService({
        name: "InstituteSetupCompleteEmailTemplate",
      });
      expect(result).toEqual(mockInstituteRequest);
    } catch (error) {}
  });

  test("POST Institute - InstituteCode exists ", async () => {
    const errorMessage = "InstituteCode is already exist";
    const mockMongoError = new Error();
    mockMongoError.name = "MongoError";
    mockMongoError.code = 11000;
    Institute.create.mockRejectedValue(mockMongoError);
    try {
      const result = await createInstituteService(mockInstituteRequest);
    } catch (error) {
      expect(Institute.create).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
      expect(error.status).toBe(409);
    }
  });

  test("POST Institute - Error Handling", async () => {
    const errorMessage = "Error creating Institute";
    const mockError = new Error(errorMessage);
    Institute.create.mockRejectedValue(mockError);
    try {
      await createInstituteService(mockInstituteRequest);
    } catch (error) {
      expect(Institute.create).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("POST Institute - Missing groupId in request", async () => {
    delete mockInstituteRequest.groupId;
    Institute.create.mockResolvedValue(mockInstituteRequest);
    try {
      const result = await createInstituteService(mockInstituteRequest);
      expect(Institute.create).toHaveBeenCalled();
      expect(result).toEqual(mockInstituteRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test("PUT Institute/:id ", async () => {
    Institute.findOneAndUpdate.mockResolvedValue(updatedInstituteData);
    try {
      const result = await updateInstituteService(updatedInstituteData._id);
      expect(result).toEqual(updatedInstituteData);
    } catch (error) {
      console.log(error);
    }
  });

  test("PUT Institute/:id - Invalid _id", async () => {
    const errorMessage = "Invalid Institute_id";
    Institute.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await updateInstituteService(updatedInstituteData._id);
    } catch (error) {
      expect(Institute.findOneAndUpdate).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("DELETE Institute/:id", async () => {
    Institute.deleteOne.mockResolvedValue({ deletedCount: 1 });
    try {
      const result = await deleteInstituteService({
        id: updatedInstituteData._id,
      });
      expect(Institute.deleteOne).toHaveBeenCalled();
      expect(result).toEqual({
        status: 200,
        message: "Institute deleted successfully",
      });
    } catch (error) {
      console.error(error);
    }
  });

  test("DELETE Institute/:id - Not Found", async () => {
    Institute.deleteOne.mockResolvedValue({ deletedCount: 0 });
    try {
      await deleteInstituteService({ id: updatedInstituteData._id });
    } catch (error) {
      expect(Institute.deleteOne).toHaveBeenCalled();
      expect(error.status).toBe(404);
      expect(error.message).toBe("Institute not found");
    }
  });

  test("DELETE Institute/:id - Error Handling", async () => {
    const error = new Error("Failed to delete Institute");
    Institute.deleteOne.mockRejectedValue(error);
    try {
      await deleteInstituteService({ id: updatedInstituteData._id });
    } catch (error) {
      expect(Institute.deleteOne).toHaveBeenCalled();
      expect(error.message).toBe("Failed to delete Institute");
    }
  });

  test("GET InstitutePeriodNameService - True ", async () => {
    Institute.find.mockResolvedValue(updatedInstituteData.institutePeriodTimes);
    try {
      const result = await getPeriodNameService(
        updatedInstituteData.institutePeriodTimes
      );
      expect(Institute.find).toHaveBeenCalled();
      expect(result).toEqual(true);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET InstitutePeriodNameService - False ", async () => {
    Institute.find.mockResolvedValue([]);
    try {
      const result = await getPeriodNameService(
        updatedInstituteData.institutePeriodTimes
      );
      expect(Institute.find).toHaveBeenCalled();
      expect(result).toEqual(false);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET InstitutePeriodNameService - Error Handling", async () => {
    const errorMessage = "PeriodTimes Not Found";
    Institute.find.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getPeriodNameService(
        updatedInstituteData.institutePeriodTimes
      );
    } catch (error) {
      expect(Institute.find).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("GET InstituteHolidayNameService - True ", async () => {
    InstituteHoliday.find = jest.fn().mockReturnValue({
      find: jest.fn().mockResolvedValue(mockInstituteholidaysRequest),
    });
    try {
      const result = await getHolidayNameService(
        { academicYear: mockInstituteholidaysRequest[0].academicYear },
        mockInstituteholidaysRequest
      );
      expect(result).toEqual(true);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET InstituteHolidayNameService - False ", async () => {
    InstituteHoliday.find = jest.fn().mockReturnValue({
      find: jest.fn().mockResolvedValue([]),
    });
    try {
      const result = await getHolidayNameService(
        { academicYear: mockInstituteholidaysRequest[0].academicYear },
        mockInstituteholidaysRequest
      );
      expect(result).toEqual(false);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET InstituteHolidayNameService - Error Handling", async () => {
    const errorMessage = "HolidayName Not Found";
    InstituteHoliday.find = jest.fn().mockReturnValue({
      find: jest.fn().mockRejectedValue(new Error(errorMessage)),
    });
    try {
      const result = await getHolidayNameService(
        { academicYear: mockInstituteholidaysRequest[0].academicYear },
        mockInstituteholidaysRequest
      );
    } catch (error) {
      expect(InstituteHoliday.find).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("GET InstituteClasses/:id ", async () => {
    InstituteClasses.findOne.mockResolvedValue(mockInstituteclassesRequest);
    try {
      const result = await getInstituteClassesService(
        mockInstituteclassesRequest.instituteId,
        mockInstituteclassesRequest.academicYear
      );
      expect(InstituteClasses.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockInstituteclassesRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET InstituteClasses:/id - Institute_id or Academic Year Not Found", async () => {
    const errorMessage = "Institute_id or Academic Year not Found";
    InstituteClasses.findOne.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getInstituteClassesService(
        mockInstituteclassesRequest.instituteId,
        mockInstituteclassesRequest.academicYear
      );
    } catch (error) {
      expect(InstituteClasses.findOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("PUT InstituteClasses/:id", async () => {
    InstituteClasses.findOneAndUpdate.mockResolvedValue(
      updatedInstituteclassesData
    );
    try {
      const result = await updateInstituteClassesService(
        updatedInstituteclassesData.instituteId,
        { academicYear: mockInstituteFacultiesRequest.academicYear }
      );
      expect(result).toEqual({ message: "Class updated successfully!!" });
    } catch (error) {
      console.log(error);
    }
  });

  test("PUT InstituteClasses/:id - Error Handling", async () => {
    const errorMessage = "Error on Updating InstituteClasses ";
    InstituteClasses.findOneAndUpdate.mockRejectedValue(
      new Error(errorMessage)
    );
    try {
      const result = await updateInstituteClassesService(
        updatedInstituteclassesData.instituteId,
        { academicYear: mockInstituteFacultiesRequest.academicYear }
      );
    } catch (error) {
      expect(InstituteClasses.findOneAndUpdate).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("GET InstitutePeriodtimes/:id  ", async () => {
    Institute.findOne = jest.fn().mockReturnValue({
      select: jest
        .fn()
        .mockResolvedValue(mockInstituteRequest.institutePeriodTimes),
    });
    try {
      const result = await getInstitutePeriodTimesService({
        _id: mockInstituteRequest._id,
      });
      expect(Institute.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockInstituteRequest.institutePeriodTimes);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET InstitutePeriodtimes:/ id - Error Handling", async () => {
    const errorMessage = "Invalid Institute_id";
    Institute.findOne = jest.fn().mockReturnValue({
      select: jest.fn().mockRejectedValue(new Error(errorMessage)),
    });
    try {
      const result = await getInstitutePeriodTimesService({
        _id: mockInstituteRequest._id,
      });
    } catch (error) {
      expect(Institute.findOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("PUT InstitutePeriodtimes/:id ", async () => {
    Institute.findOneAndUpdate.mockResolvedValue(updatedInstituteData);
    try {
      const result = await updateInstitutePeriodTimesService(
        { _id: updatedInstituteData._id },
        updatedInstituteData.institutePeriodTimes
      );
      expect(result).toEqual({ message: "success" });
    } catch (error) {
      console.log(error);
    }
  });

  test("PUT InstitutePeriodtimes/:id - Error Handling", async () => {
    const errorMessage = "Error Updating Periodtimes, Invalid Institute_Id";
    Institute.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await updateInstitutePeriodTimesService(
        { _id: updatedInstituteData._id },
        updatedInstituteData.institutePeriodTimes
      );
    } catch (error) {
      expect(Institute.findOneAndUpdate).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("GET Instituteholidays/:id ", async () => {
    InstituteHoliday.findOne.mockResolvedValue(mockInstituteholidaysRequest);
    try {
      const result = await getInstituteHolidaysService(
        mockInstituteholidaysRequest[0].instituteId,
        mockInstituteclassesRequest.academicYear
      );
      expect(InstituteHoliday.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockInstituteholidaysRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET Instituteholidays:/ id - Error Handling", async () => {
    const errorMessage = "Invalid Institute_id or Academic Year";
    InstituteHoliday.findOne.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getInstituteHolidaysService(
        mockInstituteholidaysRequest[0].instituteId,
        mockInstituteclassesRequest.academicYear
      );
    } catch (error) {
      expect(InstituteHoliday.findOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("PUT Instituteholidays/:id ", async () => {
    InstituteHoliday.findOneAndUpdate.mockResolvedValue(
      updatedInstituteholidaysData
    );
    try {
      const result = await updateInstituteHolidaysService(
        updatedInstituteholidaysData.instituteId,
        { academicYear: updatedInstituteData.academicYear }
      );
      expect(result).toEqual({ message: "success" });
    } catch (error) {
      console.log(error);
    }
  });

  test("PUT Instituteholidays/:id - Error Handling", async () => {
    const errorMessage =
      "Error Updating Instituteholidays, Invalid Institute_Id";
    InstituteHoliday.findOneAndUpdate.mockRejectedValue(
      new Error(errorMessage)
    );
    try {
      const result = await updateInstituteHolidaysService(
        updatedInstituteholidaysData.instituteId,
        { academicYear: updatedInstituteData.academicYear }
      );
    } catch (error) {
      expect(InstituteHoliday.findOneAndUpdate).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("GET InstituteSubjects/:id ", async () => {
    InstituteSubjects.findOne.mockResolvedValue(mockInstituteSubjectsRequest);
    try {
      const result = await getInstituteSubjectsService(
        { instituteId: mockInstituteSubjectsRequest.instituteId },
        { academicYear: mockInstituteSubjectsRequest.academicYear }
      );
      expect(InstituteSubjects.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockInstituteSubjectsRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET InstituteSubjects:/ id - Institute_id or Academic Year Not Found ", async () => {
    const errorMessage = "Institute_id or Academic Year Not Found ";
    InstituteSubjects.findOne.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getInstituteSubjectsService(
        { instituteId: mockInstituteSubjectsRequest.instituteId },
        { academicYear: mockInstituteSubjectsRequest.academicYear }
      );
    } catch (error) {
      expect(InstituteSubjects.findOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("PUT InstituteSubjects/:id ", async () => {
    InstituteSubjects.findOneAndUpdate.mockResolvedValue(
      updatedInstituteSubjectsData
    );
    try {
      const result = await updateInstituteSubjectsService(
        { instituteId: updatedInstituteSubjectsData.instituteId },
        { academicYear: updatedInstituteSubjectsData.academicYear }
      );
      expect(result).toEqual({ message: "Subject updated successfully!!" });
    } catch (error) {
      console.log(error);
    }
  });

  test("PUT InstituteSubjects/:id - Error Handling ", async () => {
    const errorMessage =
      "Error Updating InstituteSubjects, Invalid Institute_Id or academicyear";
    InstituteSubjects.findOneAndUpdate.mockRejectedValue(
      new Error(errorMessage)
    );
    try {
      const result = await updateInstituteSubjectsService(
        { instituteId: updatedInstituteSubjectsData.instituteId },
        { academicYear: updatedInstituteSubjectsData.academicYear }
      );
    } catch (error) {
      expect(InstituteSubjects.findOneAndUpdate).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("GET InstituteFaculties/:id  ", async () => {
    InstituteFaculties.find.mockResolvedValue(mockInstituteFacultiesRequest);
    try {
      const result = await getInstituteFacultiesService(
        { instituteId: mockInstituteFacultiesRequest.instituteId },
        mockInstituteFacultiesRequest
      );
      expect(InstituteFaculties.find).toHaveBeenCalled();
      expect(result).toEqual(mockInstituteFacultiesRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET InstituteFaculties:/ id - Error Handling", async () => {
    const errorMessage = "Institute_id or Academic Year Not Found ";
    InstituteFaculties.find.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getInstituteFacultiesService(
        { instituteId: mockInstituteFacultiesRequest.instituteId },
        mockInstituteFacultiesRequest
      );
    } catch (error) {
      expect(InstituteFaculties.find).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("PUT InstituteFaculties/:id ", async () => {
    InstituteFaculties.findOneAndUpdate.mockResolvedValue(
      updatedInstituteFacultiesData
    );
    try {
      const result = await updateInstituteFacultiesService(
        updatedInstituteFacultiesData.instituteId,
        { academicYear: updatedInstituteFacultiesData.academicYear },
        { class: updatedInstituteFacultiesData.class }
      );
      expect(result).toEqual({ message: "Faculties updated successfully!!" });
    } catch (error) {
      console.log(error);
    }
  });

  test("PUT InstituteFaculties/:id - Error Handling", async () => {
    const errorMessage = "Error Updating Faculties, Invalid request data";
    InstituteFaculties.findOneAndUpdate.mockRejectedValue(
      new Error(errorMessage)
    );
    try {
      const result = await updateInstituteFacultiesService(
        updatedInstituteFacultiesData.instituteId,
        { academicYear: updatedInstituteFacultiesData.academicYear },
        { class: updatedInstituteFacultiesData.class }
      );
    } catch (error) {
      expect(InstituteFaculties.findOneAndUpdate).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("GET InstituteAnnouncement/:id  ", async () => {
    InstituteAnnouncement.find.mockResolvedValue(
      mockInstituteAnnouncementRequest
    );
    try {
      const result = await getInstituteAnnouncementService(
        { instituteId: mockInstituteAnnouncementRequest.instituteId },
        { academicYear: mockInstituteAnnouncementRequest.academicYear }
      );
      expect(InstituteAnnouncement.find).toHaveBeenCalled();
      expect(result).toEqual(mockInstituteAnnouncementRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET InstituteAnnouncement:/ id - Not Found", async () => {
    const errorMessage = "Institute_id or Academic Year Not Found ";
    InstituteAnnouncement.find.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getInstituteAnnouncementService(
        { instituteId: mockInstituteAnnouncementRequest.instituteId },
        { academicYear: mockInstituteAnnouncementRequest.academicYear }
      );
    } catch (error) {
      expect(InstituteAnnouncement.find).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("POST InstituteAnnouncement ", async () => {
    InstituteAnnouncement.insertMany.mockResolvedValue(
      addInstituteAnnouncementData
    );
    try {
      const result = await addInstituteAnnouncementService(
        addInstituteAnnouncementData
      );
      expect(InstituteAnnouncement.insertMany).toHaveBeenCalled();
      expect(result).toEqual({ message: "Announcement added successfully!!" });
    } catch (error) {
      console.log(error);
    }
  });

  test("POST InstituteAnnouncement - Error Handling", async () => {
    const errorMessage = "Error adding Announcement";
    InstituteAnnouncement.insertMany.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await addInstituteAnnouncementService(
        addInstituteAnnouncementData
      );
    } catch (error) {
      expect(InstituteAnnouncement.insertMany).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });
});
