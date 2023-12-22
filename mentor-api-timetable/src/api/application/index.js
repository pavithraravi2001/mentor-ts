import { Router } from "express";
import { uid } from "rand-token";
import {
  cancelInterviewSchedule,
  createApplication,
  createInterviewSchedule,
  deleteApplication,
  getApplication,
  getApplicationByUserId,
  getApplications,
  getApplicationsAdmissionStatus,
  getApplicationsForAnalyticCalendar,
  getApplicationsForAnalytics,
  getInterviewScheduleByDate,
  searchApplications,
  searchInterviewSchedules,
  sendInterviewRemainderNotification,
  updateApplication,
  updateApplicationsAdmissionStatus,
  updateInterviewReSchedule,
  updateInterviewSchedule,
} from "./controller";

const router = new Router();

/**
 * @api {get} /applications/admissions Search applications
 */
router.put("/admissions", updateApplicationsAdmissionStatus);

/**
 * @api {get} /applications/admissions/status-reports get status-reports
 */
router.get(
  "/admissions/status-reports/:applicationId",
  getApplicationsAdmissionStatus
);

/**
 * @api {put} /applications/admissions/schedulers Add schedule
 */
router.put(
  "/admissions/schedulers/:scheduleId/notifications",
  sendInterviewRemainderNotification
);

/**
 * @api {post} /applications/admissions/schedulers Add schedule
 */
router.post("/admissions/schedulers", createInterviewSchedule);

/**
 * @api {put} /applications/admissions/schedulers Add schedule
 */
router.put("/admissions/schedulers/:scheduleId", updateInterviewSchedule);

router.put("/admissions/schedulers", updateInterviewReSchedule);

/**
 * @api {delete} /applications/admissions/schedulers/:scheduleId Cancel schedule
 */
router.delete("/admissions/schedulers/:scheduleId", cancelInterviewSchedule);

/**
 * @api {get} /applications/admissions/schedulers/:interviewDate Add schedule
 */
router.get("/admissions/schedulers/:interviewDate", getInterviewScheduleByDate);

/**
 * @api {get} /applications/admissions/schedulers/:interviewDate Add schedule
 */
router.get("/admissions/schedulers", searchInterviewSchedules);

/**
 * @api {get} /applications/admissions Search applications
 */
router.get("/admissions", searchApplications);

/**
 * @api {post} /metadatacontents Create metadataContent
 */
router.post("/", createApplication);

/**
 * @api {get} /applications/user/:userId Retrieve applications
 */
router.get("/user/:userId", getApplicationByUserId);

/**
 * @api {get} /applications/ Retrieve applications for logged-in user
 */
router.get("/", getApplications);

/**
 * @api {get} /applicationsbygrade/:type Retrieve applications
 */
router.get("/analytics/:type", getApplicationsForAnalytics);

/**
 * @api {get} /applicationsbygrade/:type Retrieve applications
 */
router.get("/analytics/calendar/:type", getApplicationsForAnalyticCalendar);

/**
 * @api {get} /applications/:id Retrieve application
 */
router.get("/:id", getApplication);

// Dummy file upload
router.post("/dummy-post", (req, res) => {
  res.json({ fileName: "test", fileId: uid(32) });
});

// Dummy file upload
router.post("/dummy-post", (req, res) => {
  res.json({ fileName: "test", fileId: uid(32) });
});

/**
 * @api {get} /metadatacontents Update metadataContent
 */
router.put("/:id", updateApplication);

/**
 * @api {get} /metadatacontents/:contentKey Delete metadataContent
 */
router.delete("/:id", deleteApplication);

export default router;
