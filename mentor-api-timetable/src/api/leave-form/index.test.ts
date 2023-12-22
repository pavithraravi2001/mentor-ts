import mongoose from "../../common/mongoose";
import { LeaveForm } from "./model";
import {
  createLeaveFormService,
  deleteLeaveFormService,
  getLeaveFormByIdService,
  getLeaveFormService,
  getUserIdService,
  updateLeaveFormService,
} from "./service";

jest.mock("./model", () => ({
  LeaveForm: {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
    deleteOne: jest.fn(),
  },
}));

const mockLeaveForm = {
  body: {
    _id: "65151ae7ed1968322c86e611",
    name: "solomon.rajaps",
    leaveType: "vacation",
    userId: "5f2e8c9608ddde00182ab054",
    dateFrom: "2023-03-22",
    dateTo: "2023-04-15",
    leaveReason: "Holiday",
  },
};

const mockLeaveForms = [
  {
    _id: 2,
    name: "solomon.rajaps",
    leaveType: "vacation",
    userId: "5f2e8c9608ddde00182ab054",
    dateFrom: "2023-03-22",
    dateTo: "2023-04-15",
    leaveReason: "Fever",
  },
  {
    _id: 3,
    name: "Bob.elstan",
    leaveType: "sick",
    userId: "5f2e8c9608ddde00182ab055",
    dateFrom: "2023-03-22",
    dateTo: "2023-04-15",
    leaveReason: "Fever",
  },
];

describe("Leave-Form API", () => {
  test("GET getLeaveFormService", async () => {
    LeaveForm.find.mockResolvedValue(mockLeaveForms);
    const result = await getLeaveFormService();
    expect(LeaveForm.find).toHaveBeenCalled();
    expect(result).toEqual(mockLeaveForms);
  });

  test("GET getLeaveFormService - Error Handling", async () => {
    const errorMessage = "Failed to fetch leave forms";
    const error = new Error(errorMessage);
    LeaveForm.find.mockRejectedValue(error);
    try {
      await getLeaveFormService();
    } catch (err) {
      expect(LeaveForm.find).toHaveBeenCalled();
      expect(err.message).toBe(errorMessage);
    }
  });

  test("GET Leave form by ID", async () => {
    LeaveForm.findById.mockResolvedValue(mockLeaveForm.body);
    try {
      const result = await getLeaveFormByIdService(mockLeaveForm.body._id);
      expect(result).toEqual(mockLeaveForm.body);
    } catch (error) {
      console.error(error);
    }
  });

  test("GET Leave form by ID - Error Handling", async () => {
    const leaveFormId = "652e508c0c2d5415de9d9612";
    const errorMessage = "Failed to fetch leave form by ID";
    const error = new Error(errorMessage);
    LeaveForm.findById.mockRejectedValue(error);
    try {
      await getLeaveFormByIdService(leaveFormId);
    } catch (err) {
      expect(err.message).toBe(errorMessage);
    }
  });

  test("POST Leave form", async () => {
    LeaveForm.create.mockResolvedValue(mockLeaveForm.body);
    try {
      const result = await createLeaveFormService(mockLeaveForm.body);
      expect(LeaveForm.create).toHaveBeenCalledWith(mockLeaveForm.body);
      expect(result).toEqual(mockLeaveForm.body);
    } catch (error) {
      console.error(error);
    }
  });

  test("POST Leave form - Error Handling", async () => {
    const errorMessage = "Failed to create leave form";
    const error = new Error(errorMessage);
    LeaveForm.create.mockRejectedValue(error);
    try {
      await createLeaveFormService(mockLeaveForm.body);
    } catch (err) {
      expect(LeaveForm.create).toHaveBeenCalledWith(mockLeaveForm.body);
      expect(err.message).toBe(errorMessage);
    }
  });

  test("PUT Leave form", async () => {
    LeaveForm.findOneAndUpdate.mockResolvedValue(mockLeaveForm.body);
    try {
      const result = await updateLeaveFormService(
        { _id: "65151ae7ed1968322c86e611" },
        mockLeaveForm
      );
      expect(result).toEqual(mockLeaveForm);
    } catch (error) {
      console.error(error);
    }
  });

  test("PUT Leave form - Error Handling", async () => {
    LeaveForm.findOneAndUpdate.mockRejectedValue(
      new Error("Failed to update leave form")
    );
    try {
      const result = await updateLeaveFormService(
        { _id: "65151ae7ed1968322c86e611" },
        mockLeaveForm
      );
      expect(result).toEqual(mockLeaveForm);
    } catch (error) {
      expect(error.message).toBe("Failed to update leave form");
    }
  });

  test("DELETE Leave forms", async () => {
    LeaveForm.deleteOne.mockResolvedValue({ deletedCount: 1 });
    try {
      const result = await deleteLeaveFormService({
        id: mockLeaveForm.body._id,
      });
      expect(LeaveForm.deleteOne).toHaveBeenCalled();
      expect(result).toEqual({
        status: 200,
        message: "LeaveForm deleted successfully",
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  });

  test("DELETE Leave forms - Not Found", async () => {
    LeaveForm.deleteOne.mockResolvedValue({ deletedCount: 0 });
    try {
      await deleteLeaveFormService({ id: mockLeaveForm.body._id });
    } catch (error) {
      expect(LeaveForm.deleteOne).toHaveBeenCalled();
      expect(error.status).toBe(404);
      expect(error.message).toBe("LeaveForm not found");
      console.log(error);
    }
  });

  test("DELETE Leave forms - Error Handling", async () => {
    const error = new Error("Failed to delete leave form");
    LeaveForm.deleteOne.mockRejectedValue(error);
    try {
      await deleteLeaveFormService({ id: mockLeaveForm.body._id });
    } catch (error) {
      expect(LeaveForm.deleteOne).toHaveBeenCalled();
      expect(error.message).toBe("Failed to delete leave form");
      console.log(error);
    }
  });

  test("GET Leave form by User ID", async () => {
    LeaveForm.findOne.mockResolvedValue(mockLeaveForm.body);
    const params = { userId: mockLeaveForm.body.userId };
    try {
      const result = await getUserIdService(params);
      expect(LeaveForm.findOne).toHaveBeenCalledWith(mockLeaveForm.body);
      expect(result).toEqual(mockLeaveForm.body);
    } catch (error) {
      console.error(error);
    }
  });

  test("GET Leave form by User ID - Error Handling", async () => {
    const error = new Error("Failed to fetch leave forms");
    const params = { userId: mockLeaveForm.body.userId };
    LeaveForm.findOne.mockRejectedValue(error);
    try {
      const result = await getUserIdService(params);
    } catch (error) {
      expect(error.message).toBe("Failed to fetch leave forms");
    }
  });
});
