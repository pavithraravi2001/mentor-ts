import { InstituteWorkHours } from "./model";
import {
  deleteInstituteWorkingHoursService,
  getInstituteWorkingHoursService,
  updateInstituteWorkingHoursService,
} from "./service";

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
  test("GET InstituteWorkHours  ", async () => {
    InstituteWorkHours.findOne.mockResolvedValue(mockRequest);
    try {
      const result = await getInstituteWorkingHoursService(mockRequest);
      expect(InstituteWorkHours.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET InstituteWorkHours - Error Handling", async () => {
    const errorMessage = "Error Fetching WorkingHours";
    InstituteWorkHours.findOne.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getInstituteWorkingHoursService(mockRequest);
    } catch (error) {
      expect(InstituteWorkHours.findOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("PUT InstituteWorkHours  ", async () => {
    InstituteWorkHours.findOneAndUpdate.mockResolvedValue(updateData);
    try {
      const result = await updateInstituteWorkingHoursService(updateData);
      expect(result).toEqual(updateData);
    } catch (error) {
      console.log(error);
    }
  });

  test("PUT MetadataContent - Error Handling", async () => {
    const errorMessage = "Error updating WorkingHours";
    InstituteWorkHours.findOneAndUpdate.mockRejectedValue(
      new Error(errorMessage)
    );
    try {
      const result = await updateInstituteWorkingHoursService(updateData);
    } catch (error) {
      expect(InstituteWorkHours.findOneAndUpdate).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("DELETE InstituteWorkHours", async () => {
    InstituteWorkHours.deleteOne.mockResolvedValue(mockRequest);
    try {
      const result = await deleteInstituteWorkingHoursService();
      expect(typeof result).toBe("object");
    } catch (error) {
      console.log(error);
    }
  });

  test("DELETE InstituteWorkHours - Error Handling", async () => {
    const errorMessage = "Unable to Delete WorkingHours";
    InstituteWorkHours.deleteOne.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await deleteInstituteWorkingHoursService();
    } catch (error) {
      expect(InstituteWorkHours.deleteOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });
});
