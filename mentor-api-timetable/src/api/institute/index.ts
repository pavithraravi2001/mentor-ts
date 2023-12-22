import { Router } from "express";
import {
  addInstituteAnnouncement,
  createInstitute,
  getHolidayName,
  getInstituteAnnouncement,
  getInstituteById,
  getInstituteClasses,
  getInstituteFaculties,
  getInstituteHolidays,
  getInstitutePeriodTimes,
  getInstituteSubjects,
  getInstitutes,
  getPeriodName,
  updateInstitute,
  updateInstituteClasses,
  updateInstituteFaculties,
  updateInstituteHolidays,
  updateInstitutePeriodTimes,
  updateInstituteSubjects,
  deleteInstitute,
} from "./controller";
import { validateInstitute } from "./validator";
const { query, body } = require("express-validator");

const router = new Router();

//Institute

//...@api {post} /institutes Create metadataContent

router.post("/", validateInstitute, createInstitute);

//...@api {get} /institutes/ Retrieve Institutes for logged-in user

router.get("/", getInstitutes);

/**

/**
* @api {get} /institutes/:id Retrieve metadataContent
*/
router.get("/:id", getInstituteById);

/**
 * @api {put} /institutes/:id Update Institute
 */
router.put("/:id", validateInstitute, updateInstitute);

//Institute-period-times

//... @api {get} /institutes/:instituteId/period-times Retrieve Institute Period Times
router.get("/:instituteId/period-times", getInstitutePeriodTimes);

//@api {put} /institutes/:instituteId/period-times Update Institute Period Times
router.put("/:instituteId/period-times", updateInstitutePeriodTimes);

/**
 * @api {get} /institutes/:instituteId/holidays Retrieve Institute holidays
 */
router.get(
  "/:instituteId/holidays",
  query("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the query string"),
  getInstituteHolidays
);

/***
@api {get} /institutes/holidays Retrieve holidayName
***/
router.post(
  "/holidays",
  body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"),
  getHolidayName
);

/***
@api {get} /institutes/periods Retrieve holidayName
***/
router.post(
  "/periods",
  body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"),
  getPeriodName
);

/**
 * @api {put} /institutes/:instituteId/holidays Update Institute holidays
 */
router.put(
  "/:instituteId/holidays",
  body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"),
  updateInstituteHolidays
);

/**  Institute classes
 * @api {get} /institutes/:instituteId/classes Retrieve Institute classes
 */
router.get(
  "/:instituteId/classes",
  query("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the query string"),
  getInstituteClasses
);

/**
 * @api {put} /institutes/:instituteId/classes Update Institute classes
 */
router.put(
  "/:instituteId/classes",
  body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"),
  updateInstituteClasses
);

/**    **** INSTITUTE SUBJECT ***
 * @api {get} /institutes/:instituteId/subjects Retrieve Institute subjects
 */
router.get(
  "/:instituteId/subjects",
  query("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the query string"),
  getInstituteSubjects
);

/**
 * @api {put} /institutes/:instituteId/subjects Update Institute subjects
 */
router.put(
  "/:instituteId/subjects",
  body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"),
  updateInstituteSubjects
);

/***         ***INSTITUTE ANNOUNCEMENT***
 @api { get } /institutes/: instituteId / announcement Retrieve Institute announcement 
 */
router.get("/:instituteId/announcement", getInstituteAnnouncement);
/**
 * @api {post} /institutes/:instituteId/announcement Update Institute announcement
 */
router.post(
  "/:instituteId/announcement",
  body("announcementType")
    .exists()
    .notEmpty()
    .withMessage("announcementType is required in the body"),
  body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"),
  body("subject")
    .exists()
    .notEmpty()
    .withMessage("subject is required in the body"),
  body("message")
    .exists()
    .notEmpty()
    .withMessage("message is required in the body"),
  addInstituteAnnouncement
);

/**             INSTITUTE FACULTIES
 * @api {get} /institutes/:instituteId/faculties Retrieve Institute faculties
 */
router.post(
  "/:instituteId/faculties",
  body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"),
  getInstituteFaculties
);

/**
 * @api {put} /institutes/:instituteId/faculties Update Institute faculties
 */
router.put(
  "/:instituteId/faculties",
  body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"),
  updateInstituteFaculties
);
/**
 * @api {delete} /institutes/:id Delete Institute
 */
router.delete("/:id", deleteInstitute);

export default router;
