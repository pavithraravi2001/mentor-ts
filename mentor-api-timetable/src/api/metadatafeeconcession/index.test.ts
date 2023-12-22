import { MetadataFeeConcession } from "./model";
import {
  createFeeConcessionService,
  deleteFeeConcessionService,
  getMetadataFeeConcessionByConcessionKeyService,
  getMetadataFeeConcessionService,
  updateFeeConcessionService,
} from "./service";

jest.mock("./model", () => ({
  MetadataFeeConcession: {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  },
}));

const mockRequest = {
  concessionKey: "Bloomlync123",
  description: "admission12",
  isPercentage: true,
  percentage: 40,
  isFixedAmount: true,
  fixedAmount: 50,
};

const updateData = {
  concessionKey: "Bloomlync",
  description: "admission2",
  isPercentage: true,
  percentage: 40,
  isFixedAmount: true,
  fixedAmount: 50,
};

const mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(),
};

const mockFeeconcession = [
  {
    concessionKey: "BloomlyncMadurai",
    description: "Admission",
    isPercentage: true,
    percentage: 40,
    isFixedAmount: true,
    fixedAmount: 50,
  },
  {
    concessionKey: "Technology",
    description: "Admission3",
    isPercentage: true,
    percentage: 40,
    isFixedAmount: true,
    fixedAmount: 50,
  },
];

describe("MetadataFeeConcession API - Mock Testing", () => {
  test("GET MetadataFeeConcession  ", async () => {
    MetadataFeeConcession.find.mockResolvedValue(mockFeeconcession);
    try {
      const result = await getMetadataFeeConcessionService();
      expect(MetadataFeeConcession.find).toHaveBeenCalled();
      expect(result).toEqual(mockFeeconcession);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET MetadataFeeConcession - Error Handling", async () => {
    const errorMessage = "An error occurred while fetching FeeConcession.";
    MetadataFeeConcession.find.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getMetadataFeeConcessionService();
    } catch (error) {
      expect(MetadataFeeConcession.find).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("GET MetadataFeeConcessionbyconcessionkey ", async () => {
    MetadataFeeConcession.findOne.mockResolvedValue(mockRequest);
    try {
      const result = await getMetadataFeeConcessionByConcessionKeyService(
        mockRequest.concessionKey
      );
      expect(MetadataFeeConcession.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test('GET MetadataFeeConcessionbyconcessionkey 404 error', async () => {
    const error = new Error(`Fee concession with key ${mockRequest.concessionKey} not found`);
    MetadataFeeConcession.findOne.mockResolvedValue(null);
    await expect(
      getMetadataFeeConcessionByConcessionKeyService(mockRequest)
    ).rejects.toEqual(error);
  });

  test("GET MetadataFeeConcessionbyconcessionkey - Invalid ConcessionKey", async () => {
    const errorMessage = "Invalid ConcessionKey";
    MetadataFeeConcession.findOne.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getMetadataFeeConcessionByConcessionKeyService(
        mockRequest.concessionKey
      );
    } catch (error) {
      expect(MetadataFeeConcession.findOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("POST MetadataFeeConcession", async () => {
    MetadataFeeConcession.create.mockResolvedValue(mockRequest);
    try {
      const result = await createFeeConcessionService(mockRequest);
      expect(MetadataFeeConcession.create).toHaveBeenCalled();
      expect(result).toEqual(mockRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test("POST MetadataFeeConcession - Error Handling", async () => {
    const errorMessage = "ContentKey is already registered";
    const mockMongoError = new Error();
    mockMongoError.name = "MongoError";
    mockMongoError.code = 11000;
    MetadataFeeConcession.create.mockRejectedValue(mockMongoError);
    try {
      const result = await createFeeConcessionService(mockRequest);
    } catch (error) {
      expect(MetadataFeeConcession.create).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
      expect(error.status).toBe(409);
    }
  });
  test("POST MetadataFeeConcession - Error Handling - Generic Error", async () => {
    const genericErrorMessage = "err";
    const mockGenericError = new Error(genericErrorMessage);
    MetadataFeeConcession.create.mockRejectedValue(mockGenericError);
    try {
      await createFeeConcessionService(mockRequest);
    } catch (error) {
      expect(MetadataFeeConcession.create).toHaveBeenCalled();
      expect(error.message).toBe(genericErrorMessage);
    }
  });

  test("PUT MetadataFeeConcession", async () => {
    MetadataFeeConcession.findOneAndUpdate.mockResolvedValue(updateData);
    try {
      const result = await updateFeeConcessionService(updateData);
      expect(result).toEqual(updateData);
    } catch (error) {
      console.log(error);
    }
  });

  test("PUT MetadataFeeConcession", async () => {
    const error = new Error(`${mockRequest.concessionKey} not found`)
    MetadataFeeConcession.findOneAndUpdate.mockResolvedValue(null);
    try {
      const result = await updateFeeConcessionService(updateData);
    } catch (error) {
      expect(error).toEqual(error);
    }
  });

  test("PUT MetadataFeeConcession - Error Handling", async () => {
    const errorMessage = "Error updating FeeConcession Invalid Data";
    MetadataFeeConcession.findOneAndUpdate.mockRejectedValue(
      new Error(errorMessage)
    );
    try {
      const result = await updateFeeConcessionService(updateData);
    } catch (error) {
      expect(MetadataFeeConcession.findOneAndUpdate).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test('DELETE deleteFeeConcessionService', async () => {
    MetadataFeeConcession.deleteOne.mockResolvedValue({ deletedCount: 1 });
    const result = await deleteFeeConcessionService(mockRequest);
    expect(result).toEqual({ status: 200, message: 'Metadata fee concession deleted successfully' });
  });

  test('DELETE deleteFeeConcessionService metadata fee concession key not found', async () => {
    MetadataFeeConcession.deleteOne.mockResolvedValue({ deletedCount: 0 });
    try {
      await deleteFeeConcessionService(mockRequest);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("Metadata fee concession content key not found");
    }
  });

  test("DELETE MetadataFeeConcession  - Invalid ConcessionKey", async () => {
    const errorMessage = "Invalid ConcessionKey";
    MetadataFeeConcession.deleteOne.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await deleteFeeConcessionService(
        mockRequest.concessionKey
      );
    } catch (error) {
      expect(MetadataFeeConcession.deleteOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });
});
