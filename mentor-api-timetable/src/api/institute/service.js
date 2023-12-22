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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstituteAnnouncementService = exports.addInstituteAnnouncementService = exports.getInstituteFacultiesService = exports.updateInstituteFacultiesService = exports.getInstituteSubjectsService = exports.updateInstituteSubjectsService = exports.getInstituteClassesService = exports.updateInstituteClassesService = exports.getInstituteHolidaysService = exports.updateInstituteHolidaysService = exports.getHolidayNameService = exports.getPeriodNameService = exports.getInstitutePeriodTimesService = exports.updateInstitutePeriodTimesService = exports.deleteInstituteService = exports.updateInstituteService = exports.getInstituteByIdService = exports.getInstitutesService = exports.createInstituteService = void 0;
const mongodb_1 = require("mongodb");
const aws_ses_1 = __importDefault(require("../../common/aws-ses"));
const response_1 = require("../../common/response");
const service_1 = require("../admin-config/service");
const model_1 = require("./model");
const createInstituteService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        if (!body.groupId) {
            body.groupId = new mongodb_1.ObjectId("602558b4e1c2a204115ba1c0");
        }
        return model_1.Institute.create(body)
            .then((response) => {
            (0, service_1.getEmailTemplateConfigByNameService)({
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
                const emailContent = (0, response_1.fillTemplate)(emailTemplate.content, tempVars);
                aws_ses_1.default.sendEmail({
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
            }
            else {
                reject(err);
            }
        });
    });
});
exports.createInstituteService = createInstituteService;
const getInstitutesService = (userId) => {
    return new Promise((resolve, reject) => {
        return model_1.Institute.find()
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
};
exports.getInstitutesService = getInstitutesService;
const getInstituteByIdService = (params) => {
    return new Promise((resolve, reject) => {
        if (mongodb_1.ObjectId.isValid(params.id)) {
            var objId = new mongodb_1.ObjectId(params.id);
            return model_1.Institute.findById(objId)
                .then((0, response_1.notFoundError)(reject))
                .then(resolve)
                .catch(reject);
        }
        else {
            return model_1.Institute.findOne({})
                .sort({ _id: 1 })
                .limit(1)
                .then((0, response_1.notFoundError)(reject))
                .then(resolve)
                .catch(reject);
        }
    });
};
exports.getInstituteByIdService = getInstituteByIdService;
const updateInstituteService = (params, body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.Institute.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((doc) => {
            return doc;
        })
            .then(resolve)
            .catch(reject);
    });
});
exports.updateInstituteService = updateInstituteService;
const deleteInstituteService = (params) => {
    return new Promise((resolve, reject) => {
        model_1.Institute.deleteOne({ _id: params.id })
            .then((result) => {
            if (result.deletedCount > 0) {
                resolve({ status: 200, message: "Institute deleted successfully" });
            }
            else {
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
exports.deleteInstituteService = deleteInstituteService;
const updateInstitutePeriodTimesService = ({ instituteId }, institutePeriodTimes) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.Institute.findOneAndUpdate({ _id: instituteId }, { institutePeriodTimes }, { new: true })
            .then((doc) => {
            return { message: "success" };
        })
            .then(resolve)
            .catch(reject);
    });
});
exports.updateInstitutePeriodTimesService = updateInstitutePeriodTimesService;
const getInstitutePeriodTimesService = ({ instituteId }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.Institute.findOne({ _id: instituteId })
            .select("institutePeriodTimes")
            .then(resolve)
            .catch(reject);
    });
});
exports.getInstitutePeriodTimesService = getInstitutePeriodTimesService;
const getPeriodNameService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    let existence;
    existence = yield model_1.Institute.find({
        institutePeriodTimes: {
            $elemMatch: { periodName: body.periodName },
        },
    });
    if (existence.length > 0) {
        return true;
    }
    else {
        return false;
    }
});
exports.getPeriodNameService = getPeriodNameService;
const getHolidayNameService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { academicYear: body.academicYear };
    const queryHolidayName = { holidayName: body.holidayName };
    let existence;
    existence = yield model_1.InstituteHoliday.find(query).find({
        holidays: {
            $elemMatch: { holidayName: body.holidayName },
        },
    });
    if (existence.length > 0) {
        return true;
    }
    else {
        return false;
    }
});
exports.getHolidayNameService = getHolidayNameService;
const updateInstituteHolidaysService = ({ instituteId }, body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.InstituteHoliday.findOneAndUpdate({ instituteId, academicYear: body.academicYear }, body, { upsert: true })
            .then((doc) => {
            return { message: "success" };
        })
            .then(resolve)
            .catch(reject);
    });
});
exports.updateInstituteHolidaysService = updateInstituteHolidaysService;
const getInstituteHolidaysService = ({ instituteId }, { academicYear }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.InstituteHoliday.findOne({
            instituteId: instituteId,
            academicYear: academicYear,
        })
            .then(resolve)
            .catch(reject);
    });
});
exports.getInstituteHolidaysService = getInstituteHolidaysService;
const updateInstituteClassesService = ({ instituteId }, body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.InstituteClasses.findOneAndUpdate({ instituteId, academicYear: body.academicYear }, body, { upsert: true })
            .then((doc) => {
            return { message: "Class updated successfully!!" };
        })
            .then(resolve)
            .catch(reject);
    });
});
exports.updateInstituteClassesService = updateInstituteClassesService;
const getInstituteClassesService = ({ instituteId }, { academicYear }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.InstituteClasses.findOne({
            instituteId: instituteId,
            academicYear: academicYear,
        })
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
});
exports.getInstituteClassesService = getInstituteClassesService;
const updateInstituteSubjectsService = ({ instituteId }, body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.InstituteSubjects.findOneAndUpdate({ instituteId, academicYear: body.academicYear }, body, { upsert: true })
            .then((doc) => {
            return { message: "Subject updated successfully!!" };
        })
            .then(resolve)
            .catch(reject);
    });
});
exports.updateInstituteSubjectsService = updateInstituteSubjectsService;
const getInstituteSubjectsService = ({ instituteId }, { academicYear }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.InstituteSubjects.findOne({
            instituteId: instituteId,
            academicYear: academicYear,
        })
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
});
exports.getInstituteSubjectsService = getInstituteSubjectsService;
const updateInstituteFacultiesService = ({ instituteId }, body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.InstituteFaculties.findOneAndUpdate({ instituteId, academicYear: body.academicYear, class: body.class }, body, { upsert: true })
            .then((doc) => {
            return { message: "Faculties updated successfully!!" };
        })
            .then(resolve)
            .catch(reject);
    });
});
exports.updateInstituteFacultiesService = updateInstituteFacultiesService;
const getInstituteFacultiesService = ({ instituteId }, body) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { instituteId: instituteId, academicYear: body.academicYear };
    if (body.class.length > 0) {
        query.class = { $in: body.class };
    }
    return new Promise((resolve, reject) => {
        return model_1.InstituteFaculties.find(query)
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
});
exports.getInstituteFacultiesService = getInstituteFacultiesService;
const addInstituteAnnouncementService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        // await getAnnouncementEmailIds(body)
        return model_1.InstituteAnnouncement.insertMany(body)
            .then((doc) => {
            return { message: "Announcement added successfully!!" };
        })
            .then(resolve)
            .catch(reject);
    });
});
exports.addInstituteAnnouncementService = addInstituteAnnouncementService;
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
const getInstituteAnnouncementService = ({ instituteId }, { academicYear }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.InstituteAnnouncement.find({
            instituteId: instituteId,
            academicYear: academicYear,
        })
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
});
exports.getInstituteAnnouncementService = getInstituteAnnouncementService;
