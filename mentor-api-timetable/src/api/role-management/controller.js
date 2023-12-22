"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRolesByUserId = exports.getUsersByRoleId = exports.deleteUserRole = exports.updateUserRole = exports.updateInstituteFeature = exports.getInstituteFeature = exports.deleteInstituteRole = exports.updateInstituteRoles = exports.getInstituteRoles = void 0;
const response_1 = require("../../common/response/");
const service_1 = require("./service");
const getInstituteRoles = ({ params, query }, res) => {
    (0, service_1.getInstituteRolesService)(params, query)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getInstituteRoles = getInstituteRoles;
const updateInstituteRoles = ({ params, body }, res) => {
    (0, service_1.updateInstituteRolesService)(params, Object.assign({ instituteId: params.instituteId }, body))
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateInstituteRoles = updateInstituteRoles;
const deleteInstituteRole = ({ params }, res) => {
    (0, service_1.deleteInstituteRoleService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.deleteInstituteRole = deleteInstituteRole;
const getInstituteFeature = ({ params, query }, res) => {
    (0, service_1.getInstituteFeatureService)(params, query)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getInstituteFeature = getInstituteFeature;
const updateInstituteFeature = ({ params, body }, res) => {
    (0, service_1.updateInstituteFeatureService)(params, Object.assign({ instituteId: params.instituteId }, body))
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateInstituteFeature = updateInstituteFeature;
const updateUserRole = ({ params, body }, res) => {
    (0, service_1.updateUserRoleService)(params, Object.assign({ instituteId: params.instituteId }, body))
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateUserRole = updateUserRole;
const deleteUserRole = ({ params }, res) => {
    (0, service_1.deleteUserRoleService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.deleteUserRole = deleteUserRole;
const getUsersByRoleId = ({ params, body }, res) => {
    (0, service_1.getUsersByRoleIdService)(Object.assign({ roleId: params.roleId }, body))
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getUsersByRoleId = getUsersByRoleId;
const getRolesByUserId = ({ params, body }, res) => {
    (0, service_1.getRolesByUserIdService)(Object.assign({ userId: params.userId }, body))
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getRolesByUserId = getRolesByUserId;
