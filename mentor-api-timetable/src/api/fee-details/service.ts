import { notFoundError } from "../../common/response";
import {
  InstituteFeeConfiguration,
  InstituteFeeMaster,
  InstituteFeeTerm,
} from "./model";

export const updateInstituteFeeService = async ({ instituteId }, body) => {
  return new Promise((resolve, reject) => {
    return InstituteFeeMaster.findOneAndUpdate(
      { instituteId, academicYear: body.academicYear },
      body,
      { upsert: true }
    )
      .then((doc) => {
        return { message: "Fee updated successfully!!" };
      })
      .then(resolve)
      .catch(reject);
  });
};

export const getInstituteFeeService = async (
  { instituteId },
  { academicYear }
) => {
  return new Promise((resolve, reject) => {
    return InstituteFeeMaster.findOne({
      instituteId: instituteId,
      academicYear: academicYear,
    })
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const updateInstituteFeeTermService = async ({ instituteId }, body) => {
  return new Promise((resolve, reject) => {
    return InstituteFeeTerm.findOneAndUpdate(
      { instituteId, academicYear: body.academicYear },
      body,
      { upsert: true }
    )
      .then((doc) => {
        return { message: "Fee term updated successfully!!" };
      })
      .then(resolve)
      .catch(reject);
  });
};

export const getInstituteFeeTermService = async (
  { instituteId },
  { academicYear }
) => {
  return new Promise((resolve, reject) => {
    return InstituteFeeTerm.findOne({
      instituteId: instituteId,
      academicYear: academicYear,
    })
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const updateInstituteFeeConfigurationService = async (
  { instituteId },
  body
) => {
  const query = {
    instituteId,
    academicYear: body.academicYear,
    grade: body.grade,
    section: "All",
  };
  const section = await InstituteFeeConfiguration.findOne(query);
  let existSection;
  if (body._id && section) {
    if (
      section._id.toString() === body._id.toString() &&
      section.section === body.section
    ) {
      existSection = false;
    } else {
      existSection = true;
    }
  } else if (section) {
    existSection = true;
  }
  delete body._id;
  return new Promise((resolve, reject) => {
    if (existSection) {
      return reject({
        status: 409,
        message:
          "Fee configuration Grade and Section already exists. kindly update existing section",
      });
    } else {
      // section: body.section
      return InstituteFeeConfiguration.findOneAndUpdate(
        {
          instituteId,
          academicYear: body.academicYear,
          grade: body.grade,
          section: body.section,
        },
        body,
        { upsert: true }
      )
        .then((doc) => {
          return { message: "Fee configuration updated successfully!!" };
        })
        .then(resolve)
        .catch(reject);
    }
  });
};

export const getInstituteFeeConfigurationService = async (
  { instituteId },
  { academicYear }
) => {
  return new Promise((resolve, reject) => {
    return InstituteFeeConfiguration.find({
      instituteId: instituteId,
      academicYear: academicYear,
    })
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const deleteInstituteFeeConfigurationService = (params) => {
  return new Promise((resolve, reject) => {
    InstituteFeeConfiguration.deleteOne({ _id: params.id })
      .then((result) => {
        console.log(result);
        if (result.deletedCount > 0) {
          resolve({
            status: 200,
            message: "Fee Configuration deleted successfully",
          });
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

export const removeArrayItemInstituteFeeConfigurationService = (params) => {
  return new Promise((resolve, reject) => {
    InstituteFeeConfiguration.findOneAndUpdate(
      { _id: params.id },
      { $pull: { terms: { _id: params.termId } } }
    )
      .then((result) => {
        console.log(result);
        if (result) {
          resolve({
            status: 200,
            message: "Fee Term deleted successfully",
          });
        } else {
          const error = new Error();
          error.status = 404;
          error.message = "Term ID not found";
          reject(error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
