"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInstitute = exports.updateInstitute = exports.getInstituteById = exports.updateInstituteFaculties = exports.getInstituteAnnouncement = exports.addInstituteAnnouncement = exports.getInstituteFaculties = exports.updateInstituteSubjects = exports.getInstituteSubjects = exports.updateInstituteClasses = exports.getInstituteClasses = exports.updateInstituteHolidays = exports.getHolidayName = exports.getInstituteHolidays = exports.updateInstitutePeriodTimes = exports.getPeriodName = exports.getInstitutePeriodTimes = exports.getInstitutes = exports.createInstitute = void 0;
const response_1 = require("../../common/response/");
const service_1 = require("./service");
const { validationResult } = require("express-validator");
function doValidation(req) {
    const errors = validationResult(req);
    const validErrors = errors.array();
    if (req.body.interestedInMobileApp == "true") {
        if (!req.body.instituteMobileLogo ||
            !req.body.instituteMobileLogo.fileKey) {
            const error = {
                msg: "It is mandatory",
                param: "instituteMobileLogo",
                location: "body",
            };
            validErrors.push(error);
        }
    }
    return validErrors;
}
const createInstitute = (req, res) => {
    const validErrors = doValidation(req);
    if (validErrors.length > 0) {
        return res.status(422).json({ errors: validErrors });
    }
    (0, service_1.createInstituteService)(req.body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => {
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.createInstitute = createInstitute;
const getInstitutes = ({ userId }, res) => {
    (0, service_1.getInstitutesService)(userId)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getInstitutes = getInstitutes;
const getInstitutePeriodTimes = ({ params }, res) => {
    (0, service_1.getInstitutePeriodTimesService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getInstitutePeriodTimes = getInstitutePeriodTimes;
const getPeriodName = ({ body }, res) => {
    (0, service_1.getPeriodNameService)(Object.assign({}, body))
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getPeriodName = getPeriodName;
const updateInstitutePeriodTimes = ({ params, body }, res) => {
    (0, service_1.updateInstitutePeriodTimesService)(params, body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateInstitutePeriodTimes = updateInstitutePeriodTimes;
const getInstituteHolidays = ({ params, query }, res) => {
    (0, service_1.getInstituteHolidaysService)(params, query)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getInstituteHolidays = getInstituteHolidays;
const getHolidayName = ({ body }, res) => {
    (0, service_1.getHolidayNameService)(Object.assign({}, body))
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getHolidayName = getHolidayName;
const updateInstituteHolidays = ({ params, body }, res) => {
    (0, service_1.updateInstituteHolidaysService)(params, Object.assign({ instituteId: params.instituteId }, body))
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateInstituteHolidays = updateInstituteHolidays;
const getInstituteClasses = ({ params, query }, res) => {
    (0, service_1.getInstituteClassesService)(params, query)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getInstituteClasses = getInstituteClasses;
const updateInstituteClasses = ({ params, body }, res) => {
    (0, service_1.updateInstituteClassesService)(params, Object.assign({ instituteId: params.instituteId }, body))
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateInstituteClasses = updateInstituteClasses;
const getInstituteSubjects = ({ params, query }, res) => {
    (0, service_1.getInstituteSubjectsService)(params, query)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getInstituteSubjects = getInstituteSubjects;
const updateInstituteSubjects = ({ params, body }, res) => {
    (0, service_1.updateInstituteSubjectsService)(params, Object.assign({ instituteId: params.instituteId }, body))
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateInstituteSubjects = updateInstituteSubjects;
const getInstituteFaculties = ({ params, body }, res) => {
    (0, service_1.getInstituteFacultiesService)(params, Object.assign({ instituteId: params.instituteId }, body))
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getInstituteFaculties = getInstituteFaculties;
const addInstituteAnnouncement = ({ params, body }, res) => {
    (0, service_1.addInstituteAnnouncementService)(params, Object.assign({ instituteId: params.instituteId }, body))
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.addInstituteAnnouncement = addInstituteAnnouncement;
const getInstituteAnnouncement = ({ params, query }, res) => {
    (0, service_1.getInstituteAnnouncementService)(params, query)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getInstituteAnnouncement = getInstituteAnnouncement;
const updateInstituteFaculties = ({ params, body }, res) => {
    (0, service_1.updateInstituteFacultiesService)(params, Object.assign({ instituteId: params.instituteId }, body))
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateInstituteFaculties = updateInstituteFaculties;
const getInstituteById = ({ params }, res) => {
    (0, service_1.getInstituteByIdService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getInstituteById = getInstituteById;
const updateInstitute = (req, res) => {
    const validErrors = doValidation(req);
    if (validErrors.length > 0) {
        return res.status(400).json({ errors: validErrors });
    }
    (0, service_1.updateInstituteService)(req.params, req.body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateInstitute = updateInstitute;
const deleteInstitute = ({ params }, res) => {
    (0, service_1.deleteInstituteService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.deleteInstitute = deleteInstitute;
