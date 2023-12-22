import { User } from "../user/model";
import { InstituteFeature, InstituteRoles, UserRoles } from "./model";
import {
  deleteInstituteRoleService,
  deleteUserRoleService,
  getInstituteFeatureService,
  getInstituteRolesService,
  getRolesByUserIdService,
  getUsersByRoleIdService,
  updateInstituteFeatureService,
  updateInstituteRolesService,
  updateUserRoleService,
} from "./service";

jest.mock("./model", () => ({
  User: {
    find: jest.fn(),
  },
}));

jest.mock("./model", () => ({
  UserRoles: {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
    deleteOne: jest.fn(),
    updateOne: jest.fn(),
  },
  InstituteRoles: {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
    deleteOne: jest.fn(),
  },
  InstituteFeature: {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
  },
}));

describe("Role Management API - Mock testing", () => {
  const instituteId = "604dfb61be00390018cee629";
  const rolesData = [
    {
      _id: "644caad02f66ea2957e09eb5",
      noofUsers: 1,
      roleName: "Parent",
      roles: [
        {
          featureCode: "MENE-02",
          all: true,
          read: true,
          write: true,
          delete: true,
          publish: true,
        },
      ],
    },
  ];
  const userRolesData = [
    {
      instituteId: "604dfb61be00390018cee629",
      roleId: "644caad02f66ea2957e09eb5",
      users: [{ userId: "5ff98104a28de700189ae6f7" }],
    },
  ];
  test("GET getInstituteRolesService", async () => {
    InstituteRoles.find = jest.fn().mockResolvedValue(rolesData);
    UserRoles.findOne = jest.fn().mockImplementation((filter) => {
      const userRole = userRolesData.find((ur) => ur.roleId === filter.roleId);
      return Promise.resolve(userRole);
    });
    const result = await getInstituteRolesService({ instituteId });
    expect(InstituteRoles.find).toHaveBeenCalledWith({ instituteId });
    expect(UserRoles.findOne).toHaveBeenCalledTimes(1);
    expect(result).toEqual(rolesData);
  });

  test("GET getInstituteRolesService - Error Handling", async () => {
    InstituteRoles.find = jest
      .fn()
      .mockRejectedValue(new Error("Database error"));
    await expect(getInstituteRolesService({ instituteId })).rejects.toThrow(
      "Database error"
    );
  });

  test("GET getInstituteRolesService - Empty Result", async () => {
    InstituteRoles.find = jest.fn().mockResolvedValue([]);
    const result = await getInstituteRolesService({ instituteId });
    expect(result).toEqual([]);
  });

  test("PUT updateInstituteRolesService", async () => {
    const instituteId = "604dfb61be00390018cee629";
    InstituteRoles.findOneAndUpdate = jest.fn().mockResolvedValue(rolesData);
    const result = await updateInstituteRolesService(
      { instituteId },
      rolesData
    );
    expect(result).toEqual({ message: "Roles updated successfully!!" });
    expect(InstituteRoles.findOneAndUpdate).toHaveBeenCalledWith(
      { instituteId: "604dfb61be00390018cee629", roleName: undefined },
      [
        {
          _id: "644caad02f66ea2957e09eb5",
          noofUsers: 1,
          roleName: "Parent",
          roles: [
            {
              all: true,
              delete: true,
              featureCode: "MENE-02",
              publish: true,
              read: true,
              write: true,
            },
          ],
        },
      ],
      { upsert: true }
    );
  });

  test("PUT updateInstituteRolesService - Error Handling", async () => {
    const instituteId = "604dfb61be00390018cee629";
    InstituteRoles.findOneAndUpdate = jest
      .fn()
      .mockRejectedValue(new Error("Database error"));
    try {
      const result = await updateInstituteRolesService(
        { instituteId },
        rolesData
      );
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Database error");
    }
    expect(InstituteRoles.findOneAndUpdate).toHaveBeenCalledWith(
      { instituteId: "604dfb61be00390018cee629", roleName: undefined },
      expect.any(Object),
      { upsert: true }
    );
  });

  test("DELETE deleteInstituteRoleService", async () => {
    const params = { id: "604dfb61be00390018cee629" };
    InstituteRoles.deleteOne.mockReturnValueOnce({
      then: (callback) => {
        const result = { deletedCount: 1 };
        callback(result);
        return Promise.resolve(result);
      },
    });
    UserRoles.deleteOne.mockResolvedValueOnce();
    try {
      const result = await deleteInstituteRoleService(params);
      expect(result).toEqual({
        status: 200,
        message: "Role deleted successfully",
      });
    } catch (error) {
      console.error(error);
    }
  });

  test("DELETE deleteInstituteRoleService - ID not found", async () => {
    const params = { id: "604dfb61be00390018cee629" };
    InstituteRoles.deleteOne.mockResolvedValue({ deletedCount: 0 });
    try {
      await deleteInstituteRoleService(params);
    } catch (error) {
      expect(InstituteRoles.deleteOne).toHaveBeenCalled();
      expect(error.status).toBe(404);
      expect(error.message).toBe("ID not found");
    }
  });

  test("DELETE deleteInstituteRoleService - Error Handling", async () => {
    const errorMessage = "Unable to Delete, Invalid Id";
    const params = { id: "604dfb61be00390018cee629" };
    InstituteRoles.deleteOne.mockRejectedValue(new Error(errorMessage));
    try {
      await deleteInstituteRoleService(params);
    } catch (error) {
      expect(InstituteRoles.deleteOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("PUT updateUserRoleService", async () => {
    const body = {
      roleId: "123",
      users: [{ userId: "user1" }, { userId: "user2" }],
    };
    const userRolesData = {
      instituteId,
      roleId: body.roleId,
      users: [{ userId: "user1" }],
    };
    UserRoles.findOne = jest.fn().mockResolvedValue(userRolesData);
    UserRoles.findOneAndUpdate = jest.fn().mockResolvedValue();
    const result = await updateUserRoleService({ instituteId }, body);
    const expectedMessage = "Role updated successfully!!";
    expect(result).toEqual({ message: expectedMessage });
    expect(UserRoles.findOne).toHaveBeenCalledWith({
      instituteId,
      roleId: body.roleId,
    });
    expect(UserRoles.findOneAndUpdate).toHaveBeenCalledWith(
      { instituteId, roleId: body.roleId },
      expect.objectContaining(body),
      { upsert: true }
    );
  });
  test("DELETE deleteUserRoleService", async () => {
    const params = { roleId: "123", userId: "user1" };
    UserRoles.updateOne.mockResolvedValue({ nModified: 1 });
    try {
      const result = await deleteUserRoleService(params);
      expect(result).toEqual({
        status: 200,
        message: "User role deleted successfully",
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  });

  test("DELETE deleteUserRoleService - ID not found", async () => {
    const params = { roleId: "123", userId: "user1" };
    UserRoles.updateOne.mockResolvedValue({ nModified: 0 });
    try {
      await deleteUserRoleService(params);
    } catch (error) {
      expect(UserRoles.updateOne).toHaveBeenCalled();
      expect(error.status).toBe(404);
      expect(error.message).toBe("User role not found");
      console.log(error);
    }
  });

  test("DELETE deleteUserRoleService - Error Handling", async () => {
    const params = { roleId: "123", userId: "user1" };
    const errorMessage = "Unable to Delete, Invalid UserId";
    UserRoles.updateOne.mockRejectedValue(new Error(errorMessage));
    try {
      await deleteUserRoleService(params);
    } catch (error) {
      expect(UserRoles.updateOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
      console.log(error);
    }
  });

  test("GET getUsersByRoleIdService", async () => {
    const roleId = "644caad02f66ea2957e09eb5";
    const userData = [
      { _id: "user1", name: "User 1" },
      { _id: "user2", name: "User 2" },
    ];
    const userRolesData = {
      instituteId: "604dfb61be00390018cee629",
      roleId: "644caad02f66ea2957e09eb5",
      users: userData,
    };
    UserRoles.findOne = jest.fn().mockResolvedValue(userRolesData);
    User.find = jest.fn().mockResolvedValue(userData);
    const result = await getUsersByRoleIdService({ roleId });
    expect(UserRoles.findOne).toHaveBeenCalledWith({ roleId });
    expect(result).toEqual(userData);
  });

  test("GET getUsersByRoleIdService handles null users array in role", async () => {
    const mockParams = {
      roleId: "64bb6db083470b00181a3b59",
    };
    UserRoles.findOne.mockResolvedValue({
      roleId: "64bb6db083470b00181a3b59",
      users: null,
    });
    const result = await getUsersByRoleIdService(mockParams);
  });

  test("GET getUsersByRoleIdService - Role not found", async () => {
    const roleId = "nonExistentRoleId";
    UserRoles.findOne = jest.fn().mockResolvedValue(null);
    try {
      await getUsersByRoleIdService({ roleId });
    } catch (error) {
      expect(error.message).toBe("not found");
    }
  });

  test("GET getRolesByUserIdService", async () => {
    const userId = "644caad02f66ea2957e09eb5";
    const userRolesData = [
      { roleId: "644caad02f66ea2957e09eb8" },
      { roleId: "644caad02f66ea2957e09eb9" },
    ];
    const rolesData = [
      { _id: "644caad02f66ea2957e09eb8", roleName: "Role 1" },
      { _id: "644caad02f66ea2957e09eb9", roleName: "Role 2" },
    ];
    UserRoles.find = jest.fn().mockResolvedValue(userRolesData);
    InstituteRoles.find = jest.fn().mockResolvedValue(rolesData);
    const result = await getRolesByUserIdService({ userId });
    expect(UserRoles.find).toHaveBeenCalledWith({ "users.userId": userId });
    expect(InstituteRoles.find).toHaveBeenCalledWith({
      _id: { $in: ["644caad02f66ea2957e09eb8", "644caad02f66ea2957e09eb9"] },
    });
    expect(result).toEqual(rolesData);
  });

  test("GET getRolesByUserIdService - No User Roles Found", async () => {
    const userId = "644caad02f66ea2957e09eb5";
    UserRoles.find = jest.fn().mockResolvedValue([]);
    try {
      await getRolesByUserIdService({ userId });
    } catch (error) {
      expect(UserRoles.find).toHaveBeenCalledWith({ "users.userId": userId });
      expect(InstituteRoles.find).not.toHaveBeenCalled();
      expect(error.message).toBe("User roles not found");
    }
  });

  test("GET getInstituteFeatureService", async () => {
    const expectedFeatures = [
      { _id: "feature1", name: "Feature 1" },
      { _id: "feature2", name: "Feature 2" },
    ];
    InstituteFeature.find = jest.fn().mockResolvedValue(expectedFeatures);
    const result = await getInstituteFeatureService({ instituteId });
    expect(InstituteFeature.find).toHaveBeenCalledWith({ instituteId });
    expect(result).toEqual(expectedFeatures);
  });

  test("GET getInstituteFeatureService", async () => {
    const expectedFeatures = [
      {
        instituteId: "644caad02f66ea2957e09eb9",
        featureName: "Dashboard",
        featureCode: "MENE-02",
        publish: true,
      },
    ];
    InstituteFeature.find = jest.fn().mockResolvedValue(expectedFeatures);
    const result = await getInstituteFeatureService({ instituteId });
    expect(InstituteFeature.find).toHaveBeenCalledWith({ instituteId });
    expect(result).toEqual(expectedFeatures);
  });

  test("updateInstituteFeatureService updates feature successfully", async () => {
    const mockParams = {
      instituteId: "644caad02f66ea2957e09eb5",
    };
    const mockBody = {
      featureCode: "101",
    };
    InstituteFeature.findOneAndUpdate.mockResolvedValue();
    const result = await updateInstituteFeatureService(mockParams, mockBody);
    expect(InstituteFeature.findOneAndUpdate).toHaveBeenCalledWith(
      { instituteId: "644caad02f66ea2957e09eb5", featureCode: "101" },
      mockBody,
      { upsert: true }
    );
    expect(result).toEqual({ message: "Feature updated successfully!!" });
  });
});
