import { ObjectId } from "mongodb";
import { LeaveForm } from "./model";
import { notFoundError } from "../../common/response";

export const createLeaveFormService = async (body) => {
  return new Promise((resolve, reject) => {
    return LeaveForm.create(body)
      .then(resolve)
      .catch((err) => {
        reject(err);
      });
  });
};

export const getLeaveFormService = () => {
  return new Promise((resolve, reject) => {
    return LeaveForm.find()
      .then(resolve)
      .catch((err) => {
        reject(err);
      });
  });
};

export const getLeaveFormByIdService = (params) => {
  var objId = new ObjectId(params._id);
  return new Promise((resolve, reject) => {
    return LeaveForm.findById(objId)
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const updateLeaveFormService = (params, body) => {
  return new Promise((resolve, reject) => {
    return LeaveForm.findOneAndUpdate({ _id: params.id }, body)
      .then(resolve)
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteLeaveFormService = (params) => {
  return new Promise((resolve, reject) => {
    LeaveForm.deleteOne({ _id: params.id })
      .then((result) => {
        if (result.deletedCount > 0) {
          resolve({ status: 200, message: "LeaveForm deleted successfully" });
        } else {
          const error = new Error();
          error.status = 404;
          error.message = "LeaveForm not found";
          reject(error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUserIdService = (params) => {
  return new Promise((resolve, reject) => {
    return LeaveForm.findOne({ userId: params.userId })
      .then(resolve)
      .catch((err) => {
        reject(err);
      });
  });
};
