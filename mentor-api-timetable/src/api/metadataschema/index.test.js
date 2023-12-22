import { MetadataSchema } from "./model";
import {
  createSchemaService,
  deleteSchemaService,
  getSchemaByEntityNameService,
  updateSchemaService,
} from "./service";

jest.mock("./model", () => ({
  MetadataSchema: {
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
  entityName: "appSchema",
  fields: [
    {
      fieldName: "firstName",
      dataType: "String",
      caption: "First Name",
      mandatory: true,
      size: 10,
      order: 5,
      dataPoint: "school-collection",
    },
  ],
  formFields: [],
};

const updateData = {
  entityName: "appSchema1",
  fields: [
    {
      fieldName: "firstName",
      dataType: "String",
      caption: "First Name",
      mandatory: true,
      size: 10,
      order: 5,
      dataPoint: "school-collection",
    },
  ],
  formFields: [],
};

const mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(),
};

describe("MetadataSchema API - MockTesting", () => {
  test("GET MetadataSchema", async () => {
    MetadataSchema.findOne.mockResolvedValue(mockRequest);
    try {
      const result = await getSchemaByEntityNameService(mockRequest.entityName);
      expect(MetadataSchema.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test('GET getSchemaByEntityNameService 404 error when the entity is not found', async () => {
    MetadataSchema.findOne.mockResolvedValue(null); 
    await expect(getSchemaByEntityNameService({ entityName: mockRequest.entityName })).rejects.toEqual(
      expect.objectContaining({
        status: 404,
        message: `${mockRequest.entityName} not found`,
      })
    );
  });

  test("GET MetadataSchema - Invalid EntityName", async () => {
    const errorMessage = "Invalid EntityName";
    MetadataSchema.findOne.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getSchemaByEntityNameService(mockRequest.entityName);
    } catch (error) {
      expect(MetadataSchema.findOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("POST MetadataSchema", async () => {
    MetadataSchema.create.mockResolvedValue(mockRequest);
    try {
      const result = await createSchemaService(mockRequest);
      expect(MetadataSchema.create).toHaveBeenCalled();
      expect(result).toEqual(mockRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test('POST createSchemaService entity does not exist', async () => {
    try {
      const mockRequest = { entityName: 'newEntityName' };
      MetadataSchema.findOne.mockResolvedValue(null);
      MetadataSchema.create.mockResolvedValue(mockRequest);
      const result = await createSchemaService(mockRequest);
      expect(MetadataSchema.findOne).toHaveBeenCalled();
      expect(MetadataSchema.create).toHaveBeenCalledWith(mockRequest);
      expect(result).toEqual(mockRequest);
    } catch (error) {
      console.error(error); 
      throw error; 
    }
  });
  

  test('POST createSchemaService 409 entity already exists', async () => {
    const existingEntityName = 'existingEntityName';
    const mockRequest = { entityName: existingEntityName };
    MetadataSchema.findOne.mockResolvedValue({ entityName: existingEntityName });
    await expect(createSchemaService(mockRequest)).rejects.toEqual(
      expect.objectContaining({
        status: 409,
        message: `${existingEntityName} already exists`,
      })
    );
  });

  test("PUT MetadataSchema", async () => {
    MetadataSchema.findOneAndUpdate.mockResolvedValue(updateData);
    try {
      const result = await updateSchemaService(updateData);
      expect(result).toEqual(updateData);
    } catch (error) {
      console.log(error);
    }
  });

  test("PUT MetadataSchema - Error Handling", async () => {
    const errorMessage = "Error updating Schema Invalid Entityname";
    MetadataSchema.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await updateSchemaService(updateData);
    } catch (error) {
      expect(MetadataSchema.findOneAndUpdate).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("DELETE MetadataSchema", async () => {
    MetadataSchema.deleteOne.mockResolvedValue(mockRequest);
    try {
      const result = await deleteSchemaService(mockRequest.entityName);
      expect(typeof result).toBe("object");
    } catch (error) {
      console.log(error);
    }
  });

  test('DELETE deleteSchemaService', async () => {
    MetadataSchema.deleteOne.mockResolvedValue({ deletedCount: 1 });
    const result = await deleteSchemaService(mockRequest);
    expect(result).toEqual({ status: 200, message: `${mockRequest.entityName} deleted successfully` });
  });

  test('DELETE deleteSchemaService  not found', async () => {
    MetadataSchema.deleteOne.mockResolvedValue({ deletedCount: 0 });
    try {
      await deleteSchemaService(mockRequest);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe(`${mockRequest.entityName} not found`);
    }
  });

  test("DELETE deleteSchemaService - Invalid EntityName", async () => {
    const errorMessage = "Invalid EntityName Unable to Delete";
    MetadataSchema.deleteOne.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await deleteSchemaService(mockRequest.entityName);
    } catch (error) {
      expect(MetadataSchema.deleteOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

});
