import { success } from "../../common/response/";
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

export const getInstituteRoles = ({ params, query }, res) => {
  getInstituteRolesService(params, query)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateInstituteRoles = ({ params, body }, res) => {
  updateInstituteRolesService(params, {
    instituteId: params.instituteId,
    ...body,
  })
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const deleteInstituteRole = ({ params }, res) => {
  deleteInstituteRoleService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getInstituteFeature = ({ params, query }, res) => {
  getInstituteFeatureService(params, query)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateInstituteFeature = ({ params, body }, res) => {
  updateInstituteFeatureService(params, {
    instituteId: params.instituteId,
    ...body,
  })
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateUserRole = ({ params, body }, res) => {
  updateUserRoleService(params, { instituteId: params.instituteId, ...body })
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const deleteUserRole = ({ params }, res) => {
  deleteUserRoleService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getUsersByRoleId = ({ params, body }, res) => {
  getUsersByRoleIdService({ roleId: params.roleId, ...body })
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getRolesByUserId = ({ params, body }, res) => {
  getRolesByUserIdService({ userId: params.userId, ...body })
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
