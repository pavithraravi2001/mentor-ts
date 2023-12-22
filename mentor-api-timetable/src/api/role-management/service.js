import { error } from "console";
import { notFoundError } from "../../common/response";
import { User } from "../user/model";
import { InstituteFeature, InstituteRoles, UserRoles } from "./model";

export const getInstituteRolesService = async ({ instituteId }) => {
  const roleList = [];
  const roles = await InstituteRoles.find({ instituteId: instituteId });
  for (const role of roles) {
    const userRoles = await UserRoles.findOne({ roleId: role._id });
    const count = userRoles?.users.length || 0;
    const obj = {
      _id: role._id,
      roleName: role.roleName,
      noofUsers: count,
      roles: role.roles,
    };
    roleList.push(obj);
  }
  return roleList;
};

export const updateInstituteRolesService = async ({ instituteId }, body) => {
  const obj = body.id
    ? { instituteId: instituteId, _id: body.id }
    : { instituteId: instituteId, roleName: body.roleName };
  return new Promise((resolve, reject) => {
    return InstituteRoles.findOneAndUpdate(obj, body, { upsert: true })
      .then((doc) => {
        return { message: "Roles updated successfully!!" };
      })
      .then(resolve)
      .catch(reject);
  });
};

export const deleteInstituteRoleService = (params) => {
  return new Promise((resolve, reject) => {
    InstituteRoles.deleteOne({ _id: params.id })
      .then((result) => {
        if (result.deletedCount > 0) {
          return UserRoles.deleteOne({ roleId: params.id })
            .then(() => {
              resolve({
                status: 200,
                message: "Role deleted successfully",
              });
            })
            .catch(reject);
        } else {
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

export const getInstituteFeatureService = async ({ instituteId }) => {
  return new Promise((resolve, reject) => {
    return InstituteFeature.find({ instituteId: instituteId })
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const updateInstituteFeatureService = async ({ instituteId }, body) => {
  return new Promise((resolve, reject) => {
    return InstituteFeature.findOneAndUpdate(
      { instituteId, featureCode: body.featureCode },
      body,
      { upsert: true }
    )
      .then((doc) => {
        return { message: "Feature updated successfully!!" };
      })
      .then(resolve)
      .catch(reject);
  });
};

export const deleteUserRoleService = (params) => {
  return new Promise((resolve, reject) => {
    UserRoles.updateOne(
      { roleId: params.roleId },
      { $pull: { users: { userId: params.userId } } }
    )
      .then((result) => {
        if (result.nModified > 0) {
          resolve({
            status: 200,
            message: "User role deleted successfully",
          });
        } else {
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

export const updateUserRoleService = async ({ instituteId }, body) => {
  const arrayUserId = body.users || [];
  return new Promise((resolve, reject) => {
    UserRoles.findOne({ instituteId, roleId: body.roleId }).then((user) => {
      const userIds = user?.users || [];
      const userIdOld = arrayUserId.filter((obj) =>
        userIds.filter((x) => x.userId === obj.userId)
      );
      const userIdNew = userIds.filter((obj) =>
        arrayUserId.filter((x) => x.userId != obj.userId)
      );
      body.users = userIdNew.concat(userIdOld) || [];
      return UserRoles.findOneAndUpdate(
        { instituteId, roleId: body.roleId },
        body,
        { upsert: true }
      )
        .then((doc) => {
          return { message: "Role updated successfully!!" };
        })
        .then(resolve)
        .catch(reject);
    });
  });
};

export const getUsersByRoleIdService = async ({ roleId }) => {
  return new Promise((resolve, reject) => {
    UserRoles.findOne({ roleId: roleId })
      .then(notFoundError(reject))
      .then((role) => {
        const userIds = role?.users?.map((x) => x.userId) || [];
        return User.find({ _id: { $in: userIds } })
          .then(notFoundError(reject))
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
};

export const getRolesByUserIdService = async ({ userId }) => {
  return new Promise((resolve, reject) => {
    UserRoles.find({ "users.userId": userId })
      .then((users) => {
        const roleIds = users?.map((x) => x.roleId) || [];
        return InstituteRoles.find({ _id: { $in: roleIds } })
          .then(notFoundError(reject))
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
};
