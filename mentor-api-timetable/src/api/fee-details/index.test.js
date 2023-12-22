import {
  InstituteFeeConfiguration,
  InstituteFeeMaster,
  InstituteFeeTerm,
} from "./model";
import {
  deleteInstituteFeeConfigurationService,
  getInstituteFeeConfigurationService,
  getInstituteFeeService,
  getInstituteFeeTermService,
  removeArrayItemInstituteFeeConfigurationService,
  updateInstituteFeeConfigurationService,
  updateInstituteFeeService,
  updateInstituteFeeTermService,
} from "./service";

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
  test("GET InstituteFeeMaster ", async () => {
    InstituteFeeMaster.findOne.mockResolvedValue(mockMasterRequest);
    try {
      const result = await getInstituteFeeService(
        mockMasterRequest.instituteId,
        mockMasterRequest.academicYear
      );
      expect(InstituteFeeMaster.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockMasterRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET InstituteFeeMaster - Error Handling ", async () => {
    const errorMessage = "InsituteId Not Found";
    InstituteFeeMaster.findOne.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getInstituteFeeService(
        mockMasterRequest.instituteId,
        mockMasterRequest.academicYear
      );
    } catch (error) {
      expect(InstituteFeeMaster.findOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("PUT InstituteFeeMaster ", async () => {
    InstituteFeeMaster.findOneAndUpdate.mockResolvedValue(updateMasterData);
    try {
      const result = await updateInstituteFeeService(
        { instituteId: updateMasterData.instituteId },
        updateMasterData
      );
      expect(result).toEqual({ message: "Fee updated successfully!!" });
    } catch (error) {
      console.log(error);
    }
  });

  test("PUT InstituteFeeMaster - Error Handling", async () => {
    const errorMessage = "Error updating Institute Fee ";
    InstituteFeeMaster.findOneAndUpdate.mockRejectedValue(
      new Error(errorMessage)
    );
    try {
      const result = await updateInstituteFeeService(
        { instituteId: updateMasterData.instituteId },
        updateMasterData
      );
    } catch (error) {
      expect(InstituteFeeMaster.findOneAndUpdate).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("GET InstituteFeeTerm", async () => {
    InstituteFeeTerm.findOne.mockResolvedValue(mockTermRequest);
    try {
      const result = await getInstituteFeeTermService(
        mockTermRequest.instituteId,
        mockTermRequest.academicYear
      );
      expect(InstituteFeeTerm.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockTermRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET InstituteFeeTerm - Error Handling  ", async () => {
    const errorMessage = "InsituteId or Academicyear Not Found";
    InstituteFeeTerm.findOne.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getInstituteFeeTermService(
        mockTermRequest.instituteId,
        mockTermRequest.academicYear
      );
    } catch (error) {
      expect(InstituteFeeTerm.findOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("PUT InstituteFeeTerm", async () => {
    InstituteFeeTerm.findOneAndUpdate.mockResolvedValue(updateTermData);
    try {
      const result = await updateInstituteFeeTermService(
        { instituteId: updateTermData.instituteId },
        updateTermData
      );
      expect(result).toEqual({ message: "Fee term updated successfully!!" });
    } catch (error) {
      console.log(error);
    }
  });

  test("PUT InstituteFeeTerm - Error Handling", async () => {
    const errorMessage = "Error updating Institute Fee ";
    InstituteFeeTerm.findOneAndUpdate.mockRejectedValue(
      new Error(errorMessage)
    );
    try {
      const result = await updateInstituteFeeTermService(
        { instituteId: updateTermData.instituteId },
        updateTermData
      );
    } catch (error) {
      expect(InstituteFeeMaster.findOneAndUpdate).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("GET InstituteFeeConfig", async () => {
    InstituteFeeConfiguration.find.mockResolvedValue(mockconfigRequest);
    try {
      const result = await getInstituteFeeConfigurationService(
        mockconfigRequest.instituteId,
        mockconfigRequest.academicYear
      );
      expect(InstituteFeeConfiguration.find).toHaveBeenCalled();
      expect(result).toEqual(mockconfigRequest);
    } catch (error) {}
  });

  test("GET InstituteFeeConfig - Error Handling", async () => {
    const errorMessage = "InsituteId or Academicyear Not Found";
    InstituteFeeConfiguration.find.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getInstituteFeeConfigurationService(
        mockconfigRequest.instituteId,
        mockconfigRequest.academicYear
      );
    } catch (error) {
      expect(InstituteFeeConfiguration.find).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("PUT InstituteFeeConfig", async () => {
    InstituteFeeConfiguration.findOneAndUpdate.mockResolvedValue(
      updateConfigData
    );
    try {
      const result = await updateInstituteFeeConfigurationService(
        updateConfigData.instituteId,
        updateConfigData.academicYear
      );
      expect(result).toEqual({
        message: "Fee configuration updated successfully!!",
      });
    } catch (error) {
      console.log(error);
    }
  });

  test("PUT InstituteFeeConfig - Section exists", async () => {
    const existingSection = {
      instituteId: "604dfb61be00390018cee629",
      academicYear: "2023-24",
      grade: "I",
      section: "All",
    };
    InstituteFeeConfiguration.findOne.mockResolvedValue(existingSection);
    try {
      const result = await updateInstituteFeeConfigurationService(
        { instituteId: existingSection.instituteId },
        {
          academicYear: existingSection.academicYear,
          grade: existingSection.grade,
          section: existingSection.section,
        }
      );
    } catch (error) {
      expect(InstituteFeeConfiguration.findOne).toHaveBeenCalled();
      expect(error.status).toBe(409);
      expect(error.message).toContain(
        "Fee configuration Grade and Section already exists. kindly update existing section"
      );
    }
  });

  test("PUT InstituteFeeConfig - Existing Section - False", async () => {
    const errorMessage =
      "Fee configuration Grade and Section already exists. kindly update existing section";
    const existingSection = {
      _id: "604dfb61be00390018cee629",
      academicYear: "2022-2023",
      grade: "10",
      section: "A",
    };
    InstituteFeeConfiguration.findOne.mockResolvedValue(existingSection);
    try {
      const result = await updateInstituteFeeConfigurationService(
        { instituteId: updateConfigData.instituteId },
        updateConfigData
      );
    } catch (error) {
      expect(InstituteFeeConfiguration.findOne).toHaveBeenCalled();
      expect(error.status).toBe(409);
      expect(error.message).toBe(errorMessage);
    }
  });

  test("PUT InstituteFeeConfig - Existing Section - True", async () => {
    const errorMessage =
      "Fee configuration Grade and Section already exists. kindly update existing section";
    const existingSection = {
      _id: "604dfb61be00390018cee618",
      academicYear: "2022-2023",
      grade: "10",
      section: "B",
    };
    InstituteFeeConfiguration.findOne.mockResolvedValue(existingSection);
    try {
      const result = await updateInstituteFeeConfigurationService(
        { instituteId: updateConfigData.instituteId },
        updateConfigData
      );
    } catch (error) {
      console.log(error);
    }
  });

  test("DELETE InstituteFeeConfig", async () => {
    InstituteFeeConfiguration.deleteOne.mockResolvedValue({ deletedCount: 1 });
    try {
      const result = await deleteInstituteFeeConfigurationService(
        mockconfigRequest
      );
      expect(result).toEqual({
        status: 200,
        message: "Fee Configuration deleted successfully",
      });
    } catch (error) {
      console.log(error);
    }
  });

  test("DELETE InstituteFeeConfig - ID not found", async () => {
    InstituteFeeConfiguration.deleteOne.mockResolvedValue({ deletedCount: 0 });
    try {
      await deleteInstituteFeeConfigurationService(mockconfigRequest);
      fail("Expected an error but got success");
    } catch (error) {
      expect(InstituteFeeConfiguration.deleteOne).toHaveBeenCalled();
      expect(error.status).toBe(404);
      expect(error.message).toBe("ID not found");
    }
  });

  test("DELETE InstituteFeeConfig - Error Handling", async () => {
    const errorMessage = "Unable to Delete, Invalid instituteId";
    InstituteFeeConfiguration.deleteOne.mockRejectedValue(
      new Error(errorMessage)
    );
    try {
      await deleteInstituteFeeConfigurationService(mockconfigRequest);
    } catch (error) {
      expect(InstituteFeeConfiguration.deleteOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("DELETE InstituteFeeConfig:termid", async () => {
    InstituteFeeConfiguration.findOneAndUpdate.mockResolvedValue(
      mockconfigRequest
    );
    try {
      const result = await removeArrayItemInstituteFeeConfigurationService(
        mockconfigRequest.instituteId,
        mockconfigRequest.terms[0].termId
      );
      expect(result).toEqual(mockconfigRequest);
    } catch (error) {
      console.log(error);
    }
  });
  test("DELETE InstituteFeeConfig: termid - Term ID not found", async () => {
    InstituteFeeConfiguration.findOneAndUpdate.mockResolvedValue(null);
    try {
      await removeArrayItemInstituteFeeConfigurationService(
        mockconfigRequest.instituteId,
        mockconfigRequest.terms[0].termId
      );
    } catch (error) {
      expect(InstituteFeeConfiguration.findOneAndUpdate).toHaveBeenCalled();
      expect(error.status).toBe(404);
      expect(error.message).toBe("Term ID not found");
      console.log(error);
    }
  });
  test("DELETE InstituteFeeConfiguration: termid - Error Handling", async () => {
    const errorMessage = "Invalid instituteId or Termid";
    InstituteFeeConfiguration.findOneAndUpdate.mockRejectedValue(
      new Error(errorMessage)
    );
    try {
      const result = await removeArrayItemInstituteFeeConfigurationService(
        mockconfigRequest.instituteId,
        mockconfigRequest.terms[0].termId
      );
    } catch (error) {
      expect(InstituteFeeConfiguration.findOneAndUpdate).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });
});
