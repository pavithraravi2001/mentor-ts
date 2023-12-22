import { ObjectId } from "mongodb";
import ses from "../../common/aws-ses";
import { fillTemplate, notFoundError } from "../../common/response";
import { getEmailTemplateConfigByNameService } from "../admin-config/service";
import {
  Institute,
  InstituteAnnouncement,
  InstituteClasses,
  InstituteFaculties,
  InstituteHoliday,
  InstituteSubjects,
} from "./model";

export const createInstituteService = async (body) => {
  return new Promise((resolve, reject) => {
    if (!body.groupId) {
      body.groupId = new ObjectId("602558b4e1c2a204115ba1c0");
    }
    return Institute.create(body)
      .then((response) => {
        getEmailTemplateConfigByNameService({
          name: "InstituteSetupCompleteEmailTemplate",
        })
          .then((emailTemplate) => {
            if (!emailTemplate) {
              return resolve(response);
            }
            const tempVars = {
              contactPersonName: body.contactPersonName,
            };
            const contactEmail = body.email;
            const emailContent = fillTemplate(emailTemplate.content, tempVars);
            ses.sendEmail({
              toEmail: contactEmail,
              subject: "Onboarding a new Institution",
              content: emailContent,
            });
            return resolve(response);
          })
          .catch(reject);
      })
      .catch((err) => {
        if (err.name === "MongoError" && err.code === 11000) {
          const error = new Error();
          error.status = 409;
          error.message = "InstituteCode is already exist";
          reject(error);
        } else {
          reject(err);
        }
      });
  });
};

export const getInstitutesService = (userId) => {
  return new Promise((resolve, reject) => {
    return Institute.find()
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const getInstituteByIdService = (params) => {
  return new Promise((resolve, reject) => {
    if (ObjectId.isValid(params.id)) {
      var objId = new ObjectId(params.id);
      return Institute.findById(objId)
        .then(notFoundError(reject))
        .then(resolve)
        .catch(reject);
    } else {
      return Institute.findOne({})
        .sort({ _id: 1 })
        .limit(1)
        .then(notFoundError(reject))
        .then(resolve)
        .catch(reject);
    }
  });
};

export const updateInstituteService = async (params, body) => {
  return new Promise((resolve, reject) => {
    return Institute.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((doc) => {
        return doc;
      })
      .then(resolve)
      .catch(reject);
  });
};

export const deleteInstituteService = (params) => {
  return new Promise((resolve, reject) => {
    Institute.deleteOne({ _id: params.id })
      .then((result) => {
        if (result.deletedCount > 0) {
          resolve({ status: 200, message: "Institute deleted successfully" });
        } else {
          const error = new Error();
          error.status = 404;
          error.message = "Institute not found";
          reject(error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateInstitutePeriodTimesService = async (
  { instituteId },
  institutePeriodTimes
) => {
  return new Promise((resolve, reject) => {
    return Institute.findOneAndUpdate(
      { _id: instituteId },
      { institutePeriodTimes },
      { new: true }
    )
      .then((doc) => {
        return { message: "success" };
      })
      .then(resolve)
      .catch(reject);
  });
};

export const getInstitutePeriodTimesService = async ({ instituteId }) => {
  return new Promise((resolve, reject) => {
    return Institute.findOne({ _id: instituteId })
      .select("institutePeriodTimes")
      .then(resolve)
      .catch(reject);
  });
};

export const getPeriodNameService = async (body) => {
  let existence;
  existence = await Institute.find({
    institutePeriodTimes: {
      $elemMatch: { periodName: body.periodName },
    },
  });
  if (existence.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const getHolidayNameService = async (body) => {
  const query = { academicYear: body.academicYear };
  const queryHolidayName = { holidayName: body.holidayName };
  let existence;
  existence = await InstituteHoliday.find(query).find({
    holidays: {
      $elemMatch: { holidayName: body.holidayName },
    },
  });
  if (existence.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const updateInstituteHolidaysService = async ({ instituteId }, body) => {
  return new Promise((resolve, reject) => {
    return InstituteHoliday.findOneAndUpdate(
      { instituteId, academicYear: body.academicYear },
      body,
      { upsert: true }
    )
      .then((doc) => {
        return { message: "success" };
      })
      .then(resolve)
      .catch(reject);
  });
};

export const getInstituteHolidaysService = async (
  { instituteId },
  { academicYear }
) => {
  return new Promise((resolve, reject) => {
    return InstituteHoliday.findOne({
      instituteId: instituteId,
      academicYear: academicYear,
    })
      .then(resolve)
      .catch(reject);
  });
};

export const updateInstituteClassesService = async ({ instituteId }, body) => {
  return new Promise((resolve, reject) => {
    return InstituteClasses.findOneAndUpdate(
      { instituteId, academicYear: body.academicYear },
      body,
      { upsert: true }
    )
      .then((doc) => {
        return { message: "Class updated successfully!!" };
      })
      .then(resolve)
      .catch(reject);
  });
};

export const getInstituteClassesService = async (
  { instituteId },
  { academicYear }
) => {
  return new Promise((resolve, reject) => {
    return InstituteClasses.findOne({
      instituteId: instituteId,
      academicYear: academicYear,
    })
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const updateInstituteSubjectsService = async ({ instituteId }, body) => {
  return new Promise((resolve, reject) => {
    return InstituteSubjects.findOneAndUpdate(
      { instituteId, academicYear: body.academicYear },
      body,
      { upsert: true }
    )
      .then((doc) => {
        return { message: "Subject updated successfully!!" };
      })
      .then(resolve)
      .catch(reject);
  });
};

export const getInstituteSubjectsService = async (
  { instituteId },
  { academicYear }
) => {
  return new Promise((resolve, reject) => {
    return InstituteSubjects.findOne({
      instituteId: instituteId,
      academicYear: academicYear,
    })
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const updateInstituteFacultiesService = async (
  { instituteId },
  body
) => {
  return new Promise((resolve, reject) => {
    return InstituteFaculties.findOneAndUpdate(
      { instituteId, academicYear: body.academicYear, class: body.class },
      body,
      { upsert: true }
    )
      .then((doc) => {
        return { message: "Faculties updated successfully!!" };
      })
      .then(resolve)
      .catch(reject);
  });
};

export const getInstituteFacultiesService = async ({ instituteId }, body) => {
  const query = { instituteId: instituteId, academicYear: body.academicYear };
  if (body.class.length > 0) {
    query.class = { $in: body.class };
  }
  return new Promise((resolve, reject) => {
    return InstituteFaculties.find(query)
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const addInstituteAnnouncementService = async (body) => {
  return new Promise((resolve, reject) => {
    // await getAnnouncementEmailIds(body)
    return InstituteAnnouncement.insertMany(body)
      .then((doc) => {
        return { message: "Announcement added successfully!!" };
      })
      .then(resolve)
      .catch(reject);
  });
};

// const getAnnouncementEmailIds = async (body) => {
// console.log(body)
// const student = await Student.find({ classGrade: [], instituteId: body.instituteId }, { fatherEmailAddress: 1, motherEmailAddress: 1 })
// const teacher = await InstituteFaculties.find({ class: [], sectionName: [], instituteId: body.instituteId })
// const employee = await Employee.find({ empId: [], instituteId: body.instituteId }, { emailId: 1 })
// await sendAnnouncementNotification(['prathap.vel5@gmail.com', 'test', 'test'])
// }

// const sendAnnouncementNotification = async (emailIds, subject, content) => {
//   try {
//     const sendEmailTo = emailIds
//     if (!sendEmailTo) {
//       throw new Error('Email Id is required')
//     }
//     // TODO: Need to put right candidate email
//     return ses.sendEmail({ toEmail: sendEmailTo, subject: subject, content })
//   } catch (exception) {
//     throw new Error('Error while sending announcement email notification')
//   }
// }

export const getInstituteAnnouncementService = async (
  { instituteId },
  { academicYear }
) => {
  return new Promise((resolve, reject) => {
    return InstituteAnnouncement.find({
      instituteId: instituteId,
      academicYear: academicYear,
    })
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};
