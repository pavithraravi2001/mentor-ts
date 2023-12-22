"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const validator_1 = require("./validator");
const { query, body } = require("express-validator");
const router = new express_1.Router();
//Institute
//...@api {post} /institutes Create metadataContent
router.post("/", validator_1.validateInstitute, controller_1.createInstitute);
//...@api {get} /institutes/ Retrieve Institutes for logged-in user
router.get("/", controller_1.getInstitutes);
/**

/**
* @api {get} /institutes/:id Retrieve metadataContent
*/
router.get("/:id", controller_1.getInstituteById);
/**
 * @api {put} /institutes/:id Update Institute
 */
router.put("/:id", validator_1.validateInstitute, controller_1.updateInstitute);
//Institute-period-times
//... @api {get} /institutes/:instituteId/period-times Retrieve Institute Period Times
router.get("/:instituteId/period-times", controller_1.getInstitutePeriodTimes);
//@api {put} /institutes/:instituteId/period-times Update Institute Period Times
router.put("/:instituteId/period-times", controller_1.updateInstitutePeriodTimes);
/**
 * @api {get} /institutes/:instituteId/holidays Retrieve Institute holidays
 */
router.get("/:instituteId/holidays", query("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the query string"), controller_1.getInstituteHolidays);
/***
@api {get} /institutes/holidays Retrieve holidayName
***/
router.post("/holidays", body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"), controller_1.getHolidayName);
/***
@api {get} /institutes/periods Retrieve holidayName
***/
router.post("/periods", body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"), controller_1.getPeriodName);
/**
 * @api {put} /institutes/:instituteId/holidays Update Institute holidays
 */
router.put("/:instituteId/holidays", body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"), controller_1.updateInstituteHolidays);
/**  Institute classes
 * @api {get} /institutes/:instituteId/classes Retrieve Institute classes
 */
router.get("/:instituteId/classes", query("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the query string"), controller_1.getInstituteClasses);
/**
 * @api {put} /institutes/:instituteId/classes Update Institute classes
 */
router.put("/:instituteId/classes", body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"), controller_1.updateInstituteClasses);
/**    **** INSTITUTE SUBJECT ***
 * @api {get} /institutes/:instituteId/subjects Retrieve Institute subjects
 */
router.get("/:instituteId/subjects", query("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the query string"), controller_1.getInstituteSubjects);
/**
 * @api {put} /institutes/:instituteId/subjects Update Institute subjects
 */
router.put("/:instituteId/subjects", body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"), controller_1.updateInstituteSubjects);
/***         ***INSTITUTE ANNOUNCEMENT***
 @api { get } /institutes/: instituteId / announcement Retrieve Institute announcement
 */
router.get("/:instituteId/announcement", controller_1.getInstituteAnnouncement);
/**
 * @api {post} /institutes/:instituteId/announcement Update Institute announcement
 */
router.post("/:instituteId/announcement", body("announcementType")
    .exists()
    .notEmpty()
    .withMessage("announcementType is required in the body"), body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"), body("subject")
    .exists()
    .notEmpty()
    .withMessage("subject is required in the body"), body("message")
    .exists()
    .notEmpty()
    .withMessage("message is required in the body"), controller_1.addInstituteAnnouncement);
/**             INSTITUTE FACULTIES
 * @api {get} /institutes/:instituteId/faculties Retrieve Institute faculties
 */
router.post("/:instituteId/faculties", body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"), controller_1.getInstituteFaculties);
/**
 * @api {put} /institutes/:instituteId/faculties Update Institute faculties
 */
router.put("/:instituteId/faculties", body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"), controller_1.updateInstituteFaculties);
/**
 * @api {delete} /institutes/:id Delete Institute
 */
router.delete("/:id", controller_1.deleteInstitute);
exports.default = router;
