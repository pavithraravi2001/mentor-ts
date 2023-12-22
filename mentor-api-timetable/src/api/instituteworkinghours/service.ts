import { notFoundError } from "../../common/response";
import { InstituteWorkHours } from "./model";

export const getInstituteWorkingHoursService = (userId) => {
  return new Promise((resolve, reject) => {
    return InstituteWorkHours.findOne()
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const updateInstituteWorkingHoursService = async (params, body) => {
  return new Promise((resolve, reject) => {
    return InstituteWorkHours.findOneAndUpdate({}, body, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    })
      .then((doc) => {
        return doc;
      })
      .then(resolve)
      .catch(reject);
  });
};

export const deleteInstituteWorkingHoursService = (params) => {
  return new Promise((resolve, reject) => {
    return InstituteWorkHours.deleteOne({}).then(resolve).catch(reject);
  });
};
