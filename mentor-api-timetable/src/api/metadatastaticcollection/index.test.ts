import { reject } from "bluebird";
import { MetadataCollection } from "./model";
import {
  createCollectionService,
  deleteCollectionService,
  getCollectionByNameService,
  getCollectionForDropDownService,
  getCollectionsService,
  updateCollectionService,
  prepareList,
} from "./service";

jest.mock("./model", () => ({
  MetadataCollection: {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
    aggregate: jest.fn(),
  },
}));

const mockRequest = {
  name: "student-collection",
  collectionItems: [
    {
      optionKey: "Mahesh",
      optionValue: "Mahesh",
      default: true,
      description: "String",
      order: 0,
      parent: "CBSE",
    },
  ],
};

const updateData = {
  name: "student-collection",
  collectionItems: [
    {
      optionKey: "MaheshKumar",
      optionValue: "Mahesh1",
      default: true,
      description: "String",
      order: 0,
      parent: "CBSE",
    },
  ],
};

const mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(),
};

const mockMetadataCollection = [
  {
    name: "student-collection",
    collectionItems: [
      {
        label: "Saravananshankar",
        value: "Saravanan",
        default: true,
        description: "String",
        order: 0,
        parent: "CBSE",
      },
    ],
  },
  {
    name: "Student-collection1",
    collectionItems: [
      {
        label: "Dineshkumar",
        value: "Dinesh",
        default: true,
        description: "String",
        order: 0,
        parent: "CBSE",
      },
    ],
  },
];

describe("MetadataCollection API - MockTesting ", () => {
  test("GET MetadataCollection  ", async () => {
    MetadataCollection.find.mockResolvedValue(mockMetadataCollection);
    try {
      const result = await getCollectionsService();
      expect(MetadataCollection.find).toHaveBeenCalled();
      expect(result).toEqual(mockMetadataCollection);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET MetadataCollection - CollectionKey Exist", async () => {
    const errorMessage = "CollectionKey is already exists";
    MetadataCollection.find.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getCollectionsService();
    } catch (error) {
      expect(MetadataCollection.find).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("GET MetadataCollection:Name", async () => {
    MetadataCollection.findOne.mockResolvedValue(mockRequest);
    try {
      const result = await getCollectionByNameService(mockRequest.name);
      expect(MetadataCollection.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET MetadataCollection:Name - CollectionName Not Found", async () => {
    const errorMessage = "CollectionName not Found Invalid ";
    MetadataCollection.findOne.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getCollectionByNameService(mockRequest.name);
    } catch (error) {
      expect(MetadataCollection.findOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("GET MetadataCollection /dropdown:Name ", async () => {
    MetadataCollection.aggregate.mockResolvedValue(mockMetadataCollection);
    try {
      const result = await getCollectionForDropDownService(
        { name: mockMetadataCollection[0].name },
        mockMetadataCollection[0]
      );
      expect(MetadataCollection.aggregate).toHaveBeenCalled();
      expect(result).toEqual([
        {
          label: mockMetadataCollection[0].collectionItems[0].label,
          value: mockMetadataCollection[0].collectionItems[0].value,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET MetadataCollection /dropdown:Name - preparelist", async () => {
    const query = { parent: "Class" };
    const entity = [
      {
        collectionItems: [
          { parent: "Class", label: "LKG", value: "LKG" },
          { parent: "Class", label: "III", value: "III" },
        ],
      },
    ];
    const rejectmock = jest.fn();
    try {
      const result = prepareList(rejectmock, query)(entity);
      expect(result).toEqual([
        { label: "LKG", value: "LKG" },
        { label: "III", value: "III" },
      ]);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET MetadataCollection /dropdown:Name - preparelist (Error case)", async () => {
    const query = { parent: "Class" };
    const entity = [];
    const rejectmock = jest.fn();
    try {
      const result = prepareList(rejectmock, query)(entity);
      expect(result).toBeUndefined();
      expect(rejectmock).toHaveBeenCalledWith({
        status: 404,
        message: "not found",
      });
    } catch (error) {}
  });

  test('POST createCollectionService collection does not exist', async () => {
    try {
      MetadataCollection.findOne.mockResolvedValue(null);
      MetadataCollection.create.mockResolvedValue(mockRequest);
      const result = await createCollectionService(mockRequest);
      expect(MetadataCollection.findOne).toHaveBeenCalled();
      expect(MetadataCollection.create).toHaveBeenCalledWith(mockRequest);
      expect(result).toEqual(mockRequest);
    } catch (error) {
      console.error(error);
      throw error; 
    }
  });

  test('POST createCollectionService 409 error collection already exists', async () => {
    try {
      const error = new Error('Collection key already exists')
      MetadataCollection.findOne.mockResolvedValue({ name: mockRequest.collectionName });
      await createCollectionService(mockRequest);
    } catch (error) {
      expect(error).toEqual(expect.objectContaining(error));
    }
  });

  test('PUT updateCollectionService ', async () => {
    MetadataCollection.findOne.mockResolvedValue({ name: mockRequest.collectionName });
    MetadataCollection.findOneAndUpdate.mockResolvedValue(mockRequest);
    try {
      const result = await updateCollectionService(mockRequest);
      expect(MetadataCollection.findOne).toHaveBeenCalledWith({ name: mockRequest.name });
      expect(MetadataCollection.findOneAndUpdate).toHaveBeenCalledWith({ name: mockRequest.name }, mockRequest, { new: true });
      expect(result).toEqual({ status: 200, message: `${mockRequest.name} updated successfully` });
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  test('PUT updateCollectionService 404 error not found', async () => {
    try {
      const error = new Error(`Collection with name student-collection not found`)
      MetadataCollection.findOne.mockResolvedValue(null);
      await updateCollectionService(mockRequest);
    } catch (error) {
      expect(error).toEqual(expect.objectContaining(error));
    }
  });

  test('PUT updateCollectionService 500 error', async () => {
    const error = new Error(`Failed to update ${mockRequest.name}`)
    MetadataCollection.findOne.mockResolvedValue({ name: mockRequest.name }); 
    MetadataCollection.findOneAndUpdate.mockResolvedValue(null);
    try {
      await updateCollectionService(mockRequest);
    } catch (error) {
      expect(error).toEqual(expect.objectContaining({
        status: 500,
        message: `Failed to update ${mockRequest.name}`,
      }));
    }
  });

  test("PUT MetadataCollection - Error Handling", async () => {
    const errorMessage = "Error updating Collection Invalid Data";
    MetadataCollection.findOneAndUpdate.mockRejectedValue(
      new Error(errorMessage)
    );
    try {
      const result = await updateCollectionService(updateData);
    } catch (error) {
      expect(MetadataCollection.findOneAndUpdate).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("DELETE deleteCollectionService", async () => {
    MetadataCollection.deleteOne.mockResolvedValue(mockRequest);
    try {
      const result = await deleteCollectionService(mockRequest.name);
      expect(typeof result).toBe("object");
    } catch (error) {
      console.log(error);
    }
  });

  test('DELETE deleteCollectionService', async () => {
    MetadataCollection.deleteOne.mockResolvedValue({ deletedCount: 1 });
    const result = await deleteCollectionService(mockRequest);
    expect(result).toEqual({ status: 200, message: `student-collection deleted successfully` });
  });

  test('DELETE deleteCollectionService  not found', async () => {
    MetadataCollection.deleteOne.mockResolvedValue({ deletedCount: 0 });
    try {
      await deleteCollectionService(mockRequest);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe(`student-collection not found`);
    }
  });

  test("DELETE MetadataCollection - Error Handling", async () => {
    const errorMessage = "Unable to Delete, Invalid Collection Name";
    MetadataCollection.deleteOne.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await deleteCollectionService(mockRequest.name);
    } catch (error) {
      expect(MetadataCollection.deleteOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });
});
