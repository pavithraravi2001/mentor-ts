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
exports.getRolesByUserIdService = exports.getUsersByRoleIdService = exports.updateUserRoleService = exports.deleteUserRoleService = exports.updateInstituteFeatureService = exports.getInstituteFeatureService = exports.deleteInstituteRoleService = exports.updateInstituteRolesService = exports.getInstituteRolesService = void 0;
const response_1 = require("../../common/response");
const model_1 = require("../user/model");
const model_2 = require("./model");
const getInstituteRolesService = ({ instituteId }) => __awaiter(void 0, void 0, void 0, function* () {
    const roleList = [];
    const roles = yield model_2.InstituteRoles.find({ instituteId: instituteId });
    for (const role of roles) {
        const userRoles = yield model_2.UserRoles.findOne({ roleId: role._id });
        const count = (userRoles === null || userRoles === void 0 ? void 0 : userRoles.users.length) || 0;
        const obj = {
            _id: role._id,
            roleName: role.roleName,
            noofUsers: count,
            roles: role.roles,
        };
        roleList.push(obj);
    }
    return roleList;
});
exports.getInstituteRolesService = getInstituteRolesService;
const updateInstituteRolesService = ({ instituteId }, body) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = body.id
        ? { instituteId: instituteId, _id: body.id }
        : { instituteId: instituteId, roleName: body.roleName };
    return new Promise((resolve, reject) => {
        return model_2.InstituteRoles.findOneAndUpdate(obj, body, { upsert: true })
            .then((doc) => {
            return { message: "Roles updated successfully!!" };
        })
            .then(resolve)
            .catch(reject);
    });
});
exports.updateInstituteRolesService = updateInstituteRolesService;
const deleteInstituteRoleService = (params) => {
    return new Promise((resolve, reject) => {
        model_2.InstituteRoles.deleteOne({ _id: params.id })
            .then((result) => {
            if (result.deletedCount > 0) {
                return model_2.UserRoles.deleteOne({ roleId: params.id })
                    .then(() => {
                    resolve({
                        status: 200,
                        message: "Role deleted successfully",
                    });
                })
                    .catch(reject);
            }
            else {
                const error = new Error();
                error.status = 404;
                error.message = "ID not found";
                reject(error);
            }
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.deleteInstituteRoleService = deleteInstituteRoleService;
const getInstituteFeatureService = ({ instituteId }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_2.InstituteFeature.find({ instituteId: instituteId })
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
});
exports.getInstituteFeatureService = getInstituteFeatureService;
const updateInstituteFeatureService = ({ instituteId }, body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_2.InstituteFeature.findOneAndUpdate({ instituteId, featureCode: body.featureCode }, body, { upsert: true })
            .then((doc) => {
            return { message: "Feature updated successfully!!" };
        })
            .then(resolve)
            .catch(reject);
    });
});
exports.updateInstituteFeatureService = updateInstituteFeatureService;
const deleteUserRoleService = (params) => {
    return new Promise((resolve, reject) => {
        model_2.UserRoles.updateOne({ roleId: params.roleId }, { $pull: { users: { userId: params.userId } } })
            .then((result) => {
            if (result.nModified > 0) {
                resolve({
                    status: 200,
                    message: "User role deleted successfully",
                });
            }
            else {
                const error = new Error();
                error.status = 404;
                error.message = "User role not found";
                reject(error);
            }
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.deleteUserRoleService = deleteUserRoleService;
const updateUserRoleService = ({ instituteId }, body) => __awaiter(void 0, void 0, void 0, function* () {
    const arrayUserId = body.users || [];
    return new Promise((resolve, reject) => {
        model_2.UserRoles.findOne({ instituteId, roleId: body.roleId }).then((user) => {
            const userIds = (user === null || user === void 0 ? void 0 : user.users) || [];
            const userIdOld = arrayUserId.filter((obj) => userIds.filter((x) => x.userId === obj.userId));
            const userIdNew = userIds.filter((obj) => arrayUserId.filter((x) => x.userId != obj.userId));
            body.users = userIdNew.concat(userIdOld) || [];
            return model_2.UserRoles.findOneAndUpdate({ instituteId, roleId: body.roleId }, body, { upsert: true })
                .then((doc) => {
                return { message: "Role updated successfully!!" };
            })
                .then(resolve)
                .catch(reject);
        });
    });
});
exports.updateUserRoleService = updateUserRoleService;
const getUsersByRoleIdService = ({ roleId }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        model_2.UserRoles.findOne({ roleId: roleId })
            .then((0, response_1.notFoundError)(reject))
            .then((role) => {
            var _a;
            const userIds = ((_a = role === null || role === void 0 ? void 0 : role.users) === null || _a === void 0 ? void 0 : _a.map((x) => x.userId)) || [];
            return model_1.User.find({ _id: { $in: userIds } })
                .then((0, response_1.notFoundError)(reject))
                .then(resolve)
                .catch(reject);
        })
            .catch(reject);
    });
});
exports.getUsersByRoleIdService = getUsersByRoleIdService;
const getRolesByUserIdService = ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        model_2.UserRoles.find({ "users.userId": userId })
            .then((users) => {
            const roleIds = (users === null || users === void 0 ? void 0 : users.map((x) => x.roleId)) || [];
            return model_2.InstituteRoles.find({ _id: { $in: roleIds } })
                .then((0, response_1.notFoundError)(reject))
                .then(resolve)
                .catch(reject);
        })
            .catch(reject);
    });
});
exports.getRolesByUserIdService = getRolesByUserIdService;
