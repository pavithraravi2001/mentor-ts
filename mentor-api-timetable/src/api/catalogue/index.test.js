import { Catalogue } from "./model";
import {
  createCatalogueService,
  deleteCatalogueService,
  getBranchesByGroupNameService,
  updateCatalogueService,
} from "./service";

jest.mock("./model", () => ({
  Catalogue: {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  },
}));

const mockRequest = {
  _id: "65151ae7ed1968322c86e611",
  groupName: "studentname",
  instituteName: "bloomlync",
  branch: "madurai",
  board: "CBSE",
  addressLine1: "369 mainroad",
  addressLine2: "natham main road",
  addressLine3: "madurai",
};

const updateData = {
  _id: "65151ae7ed1968322c86e611",
  groupName: "studentname",
  instituteName: "bloomlync technology",
  branch: "madurai",
  board: "CBSE",
  addressLine1: "369 mainroad",
  addressLine2: "natham main road",
  addressLine3: "madurai",
};

describe("Catalogue API", () => {
  test("GET catalogue", async () => {
    Catalogue.find.mockResolvedValue(mockRequest);
    try {
      const result = await getBranchesByGroupNameService(mockRequest.groupName);
      expect(Catalogue.find).toHaveBeenCalled();
      expect(result).toEqual(mockRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET catalogue - Error Handling", async () => {
    Catalogue.find.mockRejectedValue(new Error("Failed to fetch data"));
    try {
      const result = await getBranchesByGroupNameService("");
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error.message).toEqual("Failed to fetch data");
      expect(Catalogue.find).toHaveBeenCalled();
    }
  });

  test("POST catalogue", async () => {
    Catalogue.create.mockResolvedValue(mockRequest);
    try {
      const result = await createCatalogueService(mockRequest);
      expect(Catalogue.create).toHaveBeenCalled();
      expect(result).toEqual(mockRequest);
    } catch (error) {
      console.log(error);
    }
  });

  test("POST createCatalogueService duplicate InstituteName", async () => {
    const body = {
      InstituteName: "Demo Institute",
    };
    Catalogue.create = jest.fn(() => {
      const err = new Error("Duplicate key error");
      err.name = "MongoError";
      err.code = 11000;
      return Promise.reject(err);
    });
    try {
      await createCatalogueService(body);
    } catch (error) {
      expect(error.status).toBe(409);
      expect(error.message).toBe("InstituteName is already exists");
    }
  });

  test("POST catalogue - Error Handling", async () => {
    Catalogue.create.mockRejectedValue(
      new Error("Failed to create a new item")
    );
    try {
      const result = await createCatalogueService(mockRequest);
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error.message).toEqual("Failed to create a new item");
      expect(Catalogue.create).toHaveBeenCalled();
    }
  });

  test("PUT Catalogue", async () => {
    Catalogue.findByIdAndUpdate.mockResolvedValue(updateData);
    try {
      const result = await updateCatalogueService(
        { _id: updateData._id },
        updateData
      );
      expect(result).toEqual(updateData);
    } catch (error) {
      console.error(error);
    }
  });

  test('PUT updateCatalogueService should update a catalogue successfully', async () => {
    jest.spyOn(Catalogue, 'findById').mockResolvedValue(mockRequest);
    jest.spyOn(Catalogue, 'findByIdAndUpdate').mockResolvedValue(mockRequest);
    const result = await updateCatalogueService(mockRequest);
    expect(result).toEqual(mockRequest);
  });

  test('PUT updateCatalogueService Failed to update', async () => {
    jest.spyOn(Catalogue, 'findById').mockResolvedValue(mockRequest);
    jest.spyOn(Catalogue, 'findByIdAndUpdate').mockResolvedValue(null);
    await expect(updateCatalogueService(mockRequest)).rejects.toThrow(
      `Failed to update catalogue with _id '${mockRequest._id}'`
    );
  });
  

  test("DELETE Catalogue should delete a catalogue successfully", async () => {
    Catalogue.deleteOne.mockResolvedValue({ deletedCount: 1 });
    try {
      const result = await deleteCatalogueService(mockRequest);
      expect(result).toEqual({ status: 200, message: 'Catalogue deleted successfully' });
    } catch (error) {
      throw error;
    }
  });

  test('DELETE deleteCatalogueService Catalogue not found', async () => {
    Catalogue.deleteOne.mockResolvedValue({ deletedCount: 0 });
    try {
      await deleteCatalogueService(mockRequest);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe('not found');
    }
  });

  test('DELETE deleteCatalogueService Error Handling', async () => {
    Catalogue.deleteOne.mockRejectedValue(new Error('Failed to delete'));
    try {
      await deleteCatalogueService(mockRequest);
    } catch (error) {
      expect(error.message).toBe('Failed to delete');
    }
  });

});
