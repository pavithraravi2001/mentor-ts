"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../user/model");
const model_2 = require("./model");
const service_1 = require("./service");
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
    test("GET getInstituteRolesService", () => __awaiter(void 0, void 0, void 0, function* () {
        model_2.InstituteRoles.find = jest.fn().mockResolvedValue(rolesData);
        model_2.UserRoles.findOne = jest.fn().mockImplementation((filter) => {
            const userRole = userRolesData.find((ur) => ur.roleId === filter.roleId);
            return Promise.resolve(userRole);
        });
        const result = yield (0, service_1.getInstituteRolesService)({ instituteId });
        expect(model_2.InstituteRoles.find).toHaveBeenCalledWith({ instituteId });
        expect(model_2.UserRoles.findOne).toHaveBeenCalledTimes(1);
        expect(result).toEqual(rolesData);
    }));
    test("GET getInstituteRolesService - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        model_2.InstituteRoles.find = jest
            .fn()
            .mockRejectedValue(new Error("Database error"));
        yield expect((0, service_1.getInstituteRolesService)({ instituteId })).rejects.toThrow("Database error");
    }));
    test("GET getInstituteRolesService - Empty Result", () => __awaiter(void 0, void 0, void 0, function* () {
        model_2.InstituteRoles.find = jest.fn().mockResolvedValue([]);
        const result = yield (0, service_1.getInstituteRolesService)({ instituteId });
        expect(result).toEqual([]);
    }));
    test("PUT updateInstituteRolesService", () => __awaiter(void 0, void 0, void 0, function* () {
        const instituteId = "604dfb61be00390018cee629";
        model_2.InstituteRoles.findOneAndUpdate = jest.fn().mockResolvedValue(rolesData);
        const result = yield (0, service_1.updateInstituteRolesService)({ instituteId }, rolesData);
        expect(result).toEqual({ message: "Roles updated successfully!!" });
        expect(model_2.InstituteRoles.findOneAndUpdate).toHaveBeenCalledWith({ instituteId: "604dfb61be00390018cee629", roleName: undefined }, [
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
        ], { upsert: true });
    }));
    test("PUT updateInstituteRolesService - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const instituteId = "604dfb61be00390018cee629";
        model_2.InstituteRoles.findOneAndUpdate = jest
            .fn()
            .mockRejectedValue(new Error("Database error"));
        try {
            const result = yield (0, service_1.updateInstituteRolesService)({ instituteId }, rolesData);
            expect(result).toBeUndefined();
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Database error");
        }
        expect(model_2.InstituteRoles.findOneAndUpdate).toHaveBeenCalledWith({ instituteId: "604dfb61be00390018cee629", roleName: undefined }, expect.any(Object), { upsert: true });
    }));
    test("DELETE deleteInstituteRoleService", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { id: "604dfb61be00390018cee629" };
        model_2.InstituteRoles.deleteOne.mockReturnValueOnce({
            then: (callback) => {
                const result = { deletedCount: 1 };
                callback(result);
                return Promise.resolve(result);
            },
        });
        model_2.UserRoles.deleteOne.mockResolvedValueOnce();
        try {
            const result = yield (0, service_1.deleteInstituteRoleService)(params);
            expect(result).toEqual({
                status: 200,
                message: "Role deleted successfully",
            });
        }
        catch (error) {
            console.error(error);
        }
    }));
    test("DELETE deleteInstituteRoleService - ID not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { id: "604dfb61be00390018cee629" };
        model_2.InstituteRoles.deleteOne.mockResolvedValue({ deletedCount: 0 });
        try {
            yield (0, service_1.deleteInstituteRoleService)(params);
        }
        catch (error) {
            expect(model_2.InstituteRoles.deleteOne).toHaveBeenCalled();
            expect(error.status).toBe(404);
            expect(error.message).toBe("ID not found");
        }
    }));
    test("DELETE deleteInstituteRoleService - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Unable to Delete, Invalid Id";
        const params = { id: "604dfb61be00390018cee629" };
        model_2.InstituteRoles.deleteOne.mockRejectedValue(new Error(errorMessage));
        try {
            yield (0, service_1.deleteInstituteRoleService)(params);
        }
        catch (error) {
            expect(model_2.InstituteRoles.deleteOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
        }
    }));
    test("PUT updateUserRoleService", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            roleId: "123",
            users: [{ userId: "user1" }, { userId: "user2" }],
        };
        const userRolesData = {
            instituteId,
            roleId: body.roleId,
            users: [{ userId: "user1" }],
        };
        model_2.UserRoles.findOne = jest.fn().mockResolvedValue(userRolesData);
        model_2.UserRoles.findOneAndUpdate = jest.fn().mockResolvedValue();
        const result = yield (0, service_1.updateUserRoleService)({ instituteId }, body);
        const expectedMessage = "Role updated successfully!!";
        expect(result).toEqual({ message: expectedMessage });
        expect(model_2.UserRoles.findOne).toHaveBeenCalledWith({
            instituteId,
            roleId: body.roleId,
        });
        expect(model_2.UserRoles.findOneAndUpdate).toHaveBeenCalledWith({ instituteId, roleId: body.roleId }, expect.objectContaining(body), { upsert: true });
    }));
    test("DELETE deleteUserRoleService", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { roleId: "123", userId: "user1" };
        model_2.UserRoles.updateOne.mockResolvedValue({ nModified: 1 });
        try {
            const result = yield (0, service_1.deleteUserRoleService)(params);
            expect(result).toEqual({
                status: 200,
                message: "User role deleted successfully",
            });
            console.log(result);
        }
        catch (error) {
            console.log(error);
        }
    }));
    test("DELETE deleteUserRoleService - ID not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { roleId: "123", userId: "user1" };
        model_2.UserRoles.updateOne.mockResolvedValue({ nModified: 0 });
        try {
            yield (0, service_1.deleteUserRoleService)(params);
        }
        catch (error) {
            expect(model_2.UserRoles.updateOne).toHaveBeenCalled();
            expect(error.status).toBe(404);
            expect(error.message).toBe("User role not found");
            console.log(error);
        }
    }));
    test("DELETE deleteUserRoleService - Error Handling", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { roleId: "123", userId: "user1" };
        const errorMessage = "Unable to Delete, Invalid UserId";
        model_2.UserRoles.updateOne.mockRejectedValue(new Error(errorMessage));
        try {
            yield (0, service_1.deleteUserRoleService)(params);
        }
        catch (error) {
            expect(model_2.UserRoles.updateOne).toHaveBeenCalled();
            expect(error.message).toBe(errorMessage);
            console.log(error);
        }
    }));
    test("GET getUsersByRoleIdService", () => __awaiter(void 0, void 0, void 0, function* () {
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
        model_2.UserRoles.findOne = jest.fn().mockResolvedValue(userRolesData);
        model_1.User.find = jest.fn().mockResolvedValue(userData);
        const result = yield (0, service_1.getUsersByRoleIdService)({ roleId });
        expect(model_2.UserRoles.findOne).toHaveBeenCalledWith({ roleId });
        expect(result).toEqual(userData);
    }));
    test("GET getUsersByRoleIdService handles null users array in role", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockParams = {
            roleId: "64bb6db083470b00181a3b59",
        };
        model_2.UserRoles.findOne.mockResolvedValue({
            roleId: "64bb6db083470b00181a3b59",
            users: null,
        });
        const result = yield (0, service_1.getUsersByRoleIdService)(mockParams);
    }));
    test("GET getUsersByRoleIdService - Role not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const roleId = "nonExistentRoleId";
        model_2.UserRoles.findOne = jest.fn().mockResolvedValue(null);
        try {
            yield (0, service_1.getUsersByRoleIdService)({ roleId });
        }
        catch (error) {
            expect(error.message).toBe("not found");
        }
    }));
    test("GET getRolesByUserIdService", () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = "644caad02f66ea2957e09eb5";
        const userRolesData = [
            { roleId: "644caad02f66ea2957e09eb8" },
            { roleId: "644caad02f66ea2957e09eb9" },
        ];
        const rolesData = [
            { _id: "644caad02f66ea2957e09eb8", roleName: "Role 1" },
            { _id: "644caad02f66ea2957e09eb9", roleName: "Role 2" },
        ];
        model_2.UserRoles.find = jest.fn().mockResolvedValue(userRolesData);
        model_2.InstituteRoles.find = jest.fn().mockResolvedValue(rolesData);
        const result = yield (0, service_1.getRolesByUserIdService)({ userId });
        expect(model_2.UserRoles.find).toHaveBeenCalledWith({ "users.userId": userId });
        expect(model_2.InstituteRoles.find).toHaveBeenCalledWith({
            _id: { $in: ["644caad02f66ea2957e09eb8", "644caad02f66ea2957e09eb9"] },
        });
        expect(result).toEqual(rolesData);
    }));
    test("GET getRolesByUserIdService - No User Roles Found", () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = "644caad02f66ea2957e09eb5";
        model_2.UserRoles.find = jest.fn().mockResolvedValue([]);
        try {
            yield (0, service_1.getRolesByUserIdService)({ userId });
        }
        catch (error) {
            expect(model_2.UserRoles.find).toHaveBeenCalledWith({ "users.userId": userId });
            expect(model_2.InstituteRoles.find).not.toHaveBeenCalled();
            expect(error.message).toBe("User roles not found");
        }
    }));
    test("GET getInstituteFeatureService", () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedFeatures = [
            { _id: "feature1", name: "Feature 1" },
            { _id: "feature2", name: "Feature 2" },
        ];
        model_2.InstituteFeature.find = jest.fn().mockResolvedValue(expectedFeatures);
        const result = yield (0, service_1.getInstituteFeatureService)({ instituteId });
        expect(model_2.InstituteFeature.find).toHaveBeenCalledWith({ instituteId });
        expect(result).toEqual(expectedFeatures);
    }));
    test("GET getInstituteFeatureService", () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedFeatures = [
            {
                instituteId: "644caad02f66ea2957e09eb9",
                featureName: "Dashboard",
                featureCode: "MENE-02",
                publish: true,
            },
        ];
        model_2.InstituteFeature.find = jest.fn().mockResolvedValue(expectedFeatures);
        const result = yield (0, service_1.getInstituteFeatureService)({ instituteId });
        expect(model_2.InstituteFeature.find).toHaveBeenCalledWith({ instituteId });
        expect(result).toEqual(expectedFeatures);
    }));
    test("updateInstituteFeatureService updates feature successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockParams = {
            instituteId: "644caad02f66ea2957e09eb5",
        };
        const mockBody = {
            featureCode: "101",
        };
        model_2.InstituteFeature.findOneAndUpdate.mockResolvedValue();
        const result = yield (0, service_1.updateInstituteFeatureService)(mockParams, mockBody);
        expect(model_2.InstituteFeature.findOneAndUpdate).toHaveBeenCalledWith({ instituteId: "644caad02f66ea2957e09eb5", featureCode: "101" }, mockBody, { upsert: true });
        expect(result).toEqual({ message: "Feature updated successfully!!" });
    }));
});
