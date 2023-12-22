"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rand_token_1 = require("rand-token");
const controller_1 = require("./controller");
const router = new express_1.Router();
/**
 * @api {get} /applications/admissions Search applications
 */
router.put("/admissions", controller_1.updateApplicationsAdmissionStatus);
/**
 * @api {get} /applications/admissions/status-reports get status-reports
 */
router.get("/admissions/status-reports/:applicationId", controller_1.getApplicationsAdmissionStatus);
/**
 * @api {put} /applications/admissions/schedulers Add schedule
 */
router.put("/admissions/schedulers/:scheduleId/notifications", controller_1.sendInterviewRemainderNotification);
/**
 * @api {post} /applications/admissions/schedulers Add schedule
 */
router.post("/admissions/schedulers", controller_1.createInterviewSchedule);
/**
 * @api {put} /applications/admissions/schedulers Add schedule
 */
router.put("/admissions/schedulers/:scheduleId", controller_1.updateInterviewSchedule);
router.put("/admissions/schedulers", controller_1.updateInterviewReSchedule);
/**
 * @api {delete} /applications/admissions/schedulers/:scheduleId Cancel schedule
 */
router.delete("/admissions/schedulers/:scheduleId", controller_1.cancelInterviewSchedule);
/**
 * @api {get} /applications/admissions/schedulers/:interviewDate Add schedule
 */
router.get("/admissions/schedulers/:interviewDate", controller_1.getInterviewScheduleByDate);
/**
 * @api {get} /applications/admissions/schedulers/:interviewDate Add schedule
 */
router.get("/admissions/schedulers", controller_1.searchInterviewSchedules);
/**
 * @api {get} /applications/admissions Search applications
 */
router.get("/admissions", controller_1.searchApplications);
/**
 * @api {post} /metadatacontents Create metadataContent
 */
router.post("/", controller_1.createApplication);
/**
 * @api {get} /applications/user/:userId Retrieve applications
 */
router.get("/user/:userId", controller_1.getApplicationByUserId);
/**
 * @api {get} /applications/ Retrieve applications for logged-in user
 */
router.get("/", controller_1.getApplications);
/**
 * @api {get} /applicationsbygrade/:type Retrieve applications
 */
router.get("/analytics/:type", controller_1.getApplicationsForAnalytics);
/**
 * @api {get} /applicationsbygrade/:type Retrieve applications
 */
router.get("/analytics/calendar/:type", controller_1.getApplicationsForAnalyticCalendar);
/**
 * @api {get} /applications/:id Retrieve application
 */
router.get("/:id", controller_1.getApplication);
// Dummy file upload
router.post("/dummy-post", (req, res) => {
    res.json({ fileName: "test", fileId: (0, rand_token_1.uid)(32) });
});
// Dummy file upload
router.post("/dummy-post", (req, res) => {
    res.json({ fileName: "test", fileId: (0, rand_token_1.uid)(32) });
});
/**
 * @api {get} /metadatacontents Update metadataContent
 */
router.put("/:id", controller_1.updateApplication);
/**
 * @api {get} /metadatacontents/:contentKey Delete metadataContent
 */
router.delete("/:id", controller_1.deleteApplication);
exports.default = router;
