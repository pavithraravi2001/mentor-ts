import { success } from "../../common/response/";
import {
  addInstituteAnnouncementService,
  createInstituteService,
  getHolidayNameService,
  getInstituteAnnouncementService,
  getInstituteByIdService,
  getInstituteClassesService,
  getInstituteFacultiesService,
  getInstituteHolidaysService,
  getInstitutePeriodTimesService,
  getInstituteSubjectsService,
  getInstitutesService,
  getPeriodNameService,
  updateInstituteClassesService,
  updateInstituteFacultiesService,
  updateInstituteHolidaysService,
  updateInstitutePeriodTimesService,
  updateInstituteService,
  updateInstituteSubjectsService,
  deleteInstituteService,
} from "./service";
const { validationResult } = require("express-validator");

function doValidation(req) {
  const errors = validationResult(req);
  const validErrors = errors.array();
  if (req.body.interestedInMobileApp == "true") {
    if (
      !req.body.instituteMobileLogo ||
      !req.body.instituteMobileLogo.fileKey
    ) {
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

export const createInstitute = (req, res) => {
  const validErrors = doValidation(req);
  if (validErrors.length > 0) {
    return res.status(422).json({ errors: validErrors });
  }

  createInstituteService(req.body)
    .then(success(res, 201))
    .catch((err) => {
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getInstitutes = ({ userId }, res) => {
  getInstitutesService(userId)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getInstitutePeriodTimes = ({ params }, res) => {
  getInstitutePeriodTimesService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getPeriodName = ({ body }, res) => {
  getPeriodNameService({ ...body })
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateInstitutePeriodTimes = ({ params, body }, res) => {
  updateInstitutePeriodTimesService(params, body)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getInstituteHolidays = ({ params, query }, res) => {
  getInstituteHolidaysService(params, query)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getHolidayName = ({ body }, res) => {
  getHolidayNameService({ ...body })
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateInstituteHolidays = ({ params, body }, res) => {
  updateInstituteHolidaysService(params, {
    instituteId: params.instituteId,
    ...body,
  })
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getInstituteClasses = ({ params, query }, res) => {
  getInstituteClassesService(params, query)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateInstituteClasses = ({ params, body }, res) => {
  updateInstituteClassesService(params, {
    instituteId: params.instituteId,
    ...body,
  })
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getInstituteSubjects = ({ params, query }, res) => {
  getInstituteSubjectsService(params, query)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateInstituteSubjects = ({ params, body }, res) => {
  updateInstituteSubjectsService(params, {
    instituteId: params.instituteId,
    ...body,
  })
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getInstituteFaculties = ({ params, body }, res) => {
  getInstituteFacultiesService(params, {
    instituteId: params.instituteId,
    ...body,
  })
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const addInstituteAnnouncement = ({ params, body }, res) => {
  addInstituteAnnouncementService(params, {
    instituteId: params.instituteId,
    ...body,
  })
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getInstituteAnnouncement = ({ params, query }, res) => {
  getInstituteAnnouncementService(params, query)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateInstituteFaculties = ({ params, body }, res) => {
  updateInstituteFacultiesService(params, {
    instituteId: params.instituteId,
    ...body,
  })
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getInstituteById = ({ params }, res) => {
  getInstituteByIdService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateInstitute = (req, res) => {
  const validErrors = doValidation(req);
  if (validErrors.length > 0) {
    return res.status(400).json({ errors: validErrors });
  }

  updateInstituteService(req.params, req.body)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const deleteInstitute = ({ params }, res) => {
  deleteInstituteService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
