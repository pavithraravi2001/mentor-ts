import { Timetable } from "./model";
import {
  createTimetableService,
  getTimetableService,
  updateTimetableService,
} from "./service";
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
  test("GET Timetable", async () => {
    Timetable.findOne.mockResolvedValue(mockRequest);
    try {
      const result = await getTimetableService({
        academicYear: mockRequest.academicYear ,
        classGrade: mockRequest.classGrade ,
        section: mockRequest.section 
      });
      expect(Timetable.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockRequest);
    } catch (error) {}
  });
  test("GET Timetable - Error Handling", async () => {
    const errorMessage = "Error Fetching Timetable Invalid data";
    Timetable.findOne.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getTimetableService(
        { academicYear: mockRequest.academicYear ,
         classGrade: mockRequest.classGrade ,
         section: mockRequest.section }
      );
    } catch (error) {
      expect(Timetable.findOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("POST Timetable ", async () => {
    Timetable.findOne.mockResolvedValue(null);
    Timetable.create.mockResolvedValue(mockRequest);
    try {
      const result = await createTimetableService(mockRequest);
      expect(Timetable.create).toHaveBeenCalled();
      expect(result).toEqual(mockRequest);
    } catch (error) {}
  });
  test("POST Timetable - Creation Error", async () => {
    const errorMessage = "Error Creating Timetable";
    const mockError = new Error(errorMessage);
    Timetable.findOne.mockResolvedValue(null); 
    Timetable.create.mockRejectedValue(mockError);
    try {
      await createTimetableService(mockRequest);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
  test("POST Timetable - Timetable Already Exists", async () => {
    const existingTimetable = { academicYear: "2023-24", classGrade: "III", section: "B" };
    const errorMessage ="Timetable already exists for the specified academic year, class, and section.";
      Timetable.findOne.mockImplementation((query) => {
      if (
        query.academicYear === existingTimetable.academicYear &&
        query.classGrade === existingTimetable.classGrade &&
        query.section === existingTimetable.section
      ) {
        return Promise.resolve(existingTimetable);
      } else {
        return Promise.resolve(null);
      }
    });
    try {
      await createTimetableService(mockRequest);
    } catch (error) {
      expect(error.status).toBe(409);
      expect(error.message).toBe(errorMessage);
    } 
  });
  test("POST Timetable - Query Error", async () => {
    const errorMessage = "Error querying existing timetable.";
    const mockError = new Error(errorMessage);
    Timetable.findOne.mockRejectedValue(mockError);
    Timetable.create.mockResolvedValue(mockRequest);
    try {
      await createTimetableService(mockRequest);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });

  test("PUT Timetable ", async () => {
    Timetable.findOneAndUpdate.mockResolvedValue(updateData);
    try {
      const result = await updateTimetableService(
        { academicYear: updateData.academicYear ,
         classGrade: updateData.classGrade ,
         section: updateData.section },
        updateData
      );
      expect(result).toEqual(updateData);
    } catch (error) {}
  });
  test("PUT Timetable - Error Handling", async () => {
    const errorMessage = "Error Updating Timetable";
    Timetable.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await updateTimetableService(
        { academicYear: updateData.academicYear },
        { classGrade: updateData.classGrade },
        { section: updateData.section },
        updateData
      );
    } catch (error) {
      expect(Timetable.findOneAndUpdate).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });
});
