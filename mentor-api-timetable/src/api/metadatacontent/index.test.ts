import { MetadataContent } from "./model";
import {
  createMetadataContentService,
  deleteMetadataContentService,
  getMetadataContentByKeyService,
  updateMetadataContentService,
} from "./service";
jest.mock("./model", () => ({
  MetadataContent: {
    findOne: jest.fn(),
    view: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  },
}));

const mockRequest = {
  contentKey: "school",
  content: "madurai",
};

const updateData = {
  contentKey: "school123",
  content: "madurai",
};

const mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(),
};

describe("MetadataContent API - MockTesting", () => {
  test("GET getMetadataContentByKeyService", async () => {
    const contentKey = "sample-key";
    const mockMetadataContent = {
      contentKey: contentKey,
      view: jest.fn(),
    };
    MetadataContent.findOne.mockResolvedValue(mockMetadataContent);
    const result = await getMetadataContentByKeyService({ contentKey });
    expect(result).toEqual(mockMetadataContent.view());
    expect(mockMetadataContent.view).toHaveBeenCalled();
    expect(MetadataContent.findOne).toHaveBeenCalledWith({ contentKey });
  });

  test("GET getMetadataContentByKeyService - Contentkey not found", async () => {
    const contentKey = "non-existent-key";
    const errorMessage = "Content not found";
    MetadataContent.findOne.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getMetadataContentByKeyService({ contentKey });
    } catch (error) {
      expect(MetadataContent.findOne).toHaveBeenCalledWith({ contentKey });
      expect(error.message).toBe(errorMessage);
    }
  });

  test("POST MetadataContent  ", async () => {
    MetadataContent.create.mockResolvedValue(mockRequest);
    try {
      const result = await createMetadataContentService(mockRequest);
      expect(MetadataContent.create).toHaveBeenCalledWith(mockRequest);
      expect(result).toEqual(mockRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test("POST MetadataContent - Error Handling ", async () => {
    const errorMessage = "ContentKey is already registered";
    const mockMongoError = new Error();
    mockMongoError.name = "MongoError";
    mockMongoError.code = 11000;
    MetadataContent.create.mockRejectedValue(mockMongoError);
    try {
      const result = await createMetadataContentService(mockRequest);
    } catch (error) {
      expect(MetadataContent.create).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
      expect(error.status).toBe(409);
    }
  });

  test("POST MetadataContent - Error Handling - Generic Error", async () => {
    const genericErrorMessage = "err";
    const mockGenericError = new Error(genericErrorMessage);
    MetadataContent.create.mockRejectedValue(mockGenericError);
    try {
      await createMetadataContentService(mockRequest);
    } catch (error) {
      expect(MetadataContent.create).toHaveBeenCalled();
      expect(error.message).toBe(genericErrorMessage);
    }
  });

  test("PUT MetadataContent  ", async () => {
    MetadataContent.findOneAndUpdate.mockResolvedValue(updateData);
    try {
      const result = await updateMetadataContentService(
        { contentKey: updateData.contentKey },
        updateData
      );
      expect(result).toEqual(updateData);
    } catch (error) {
      console.log(error);
    }
  });

  test("PUT MetadataContent - Error Handling", async () => {
    const errorMessage = "Error updating Schema Invalid contentKey";
    MetadataContent.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await updateMetadataContentService(
        { contentKey: updateData.contentKey },
        updateData
      );
    } catch (error) {
      expect(MetadataContent.findOneAndUpdate).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test('PUT MetadataContent 404 error content key is not found', async () => {
    const error = new Error("Content key not found")
    MetadataContent.findOneAndUpdate.mockResolvedValue(null);
    await expect(
      updateMetadataContentService({ contentKey: "123" }, updateData)
    ).rejects.toEqual(error);
  });

  test('DELETE deleteMetadataContentService', async () => {
    const mockRequest = { contentKey: '123' };
    MetadataContent.deleteOne.mockResolvedValue({ deletedCount: 1 });
    const result = await deleteMetadataContentService(mockRequest);
    expect(result).toEqual({ status: 200, message: 'Metadata content deleted successfully' });
  });

  test('DELETE deleteMetadataContentService metadata content not found', async () => {
    MetadataContent.deleteOne.mockResolvedValue({ deletedCount: 0 });
    try {
      await deleteMetadataContentService(mockRequest);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe('Metadata content not found');
    }
  });

  test("DELETE MetadataContent - Invalid Contentkey", async () => {
    const errorMessage = "Invalid Contentkey Unable to Delete";
    MetadataContent.deleteOne.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await deleteMetadataContentService(mockRequest.contentKey);
    } catch (error) {
      expect(MetadataContent.deleteOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });
});
