import { success } from "../../common/response";
import {
  cancelInterviewScheduleService,
  createApplicationService,
  createInterviewScheduleService,
  deleteApplicationService,
  getApplicationService,
  getApplicationsAdmissionStatusService,
  getApplicationsByUserId,
  getApplicationsForAnalyticCalendarService,
  getApplicationsForAnalyticService,
  getApplicationsService,
  getInterviewScheduleByDateService,
  searchApplicationsService,
  searchInterviewSchedulesService,
  sendInterviewReminderNotificationService,
  updateApplicationService,
  updateApplicationsAdmissionStatusService,
  updateInterviewReScheduleService,
  updateInterviewScheduleService,
} from "./service";

export const createApplication = (req, res) => {
  createApplicationService(req.body)
    .then(success(res, 201))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getApplicationByUserId = ({ params }, res) => {
  getApplicationsByUserId(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getApplications = ({ userId }, res) => {
  getApplicationsService(userId)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const searchApplications = ({ query }, res) => {
  searchApplicationsService(query)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateApplicationsAdmissionStatus = ({ body }, res) => {
  updateApplicationsAdmissionStatusService(body)
    .then(success(res, 200))
    .catch((err) =>
      res
        .status(err && err.status ? err.status : 400)
        .json({ message: err.message })
    );
};

export const getApplicationsAdmissionStatus = ({ params }, res) => {
  getApplicationsAdmissionStatusService(params)
    .then(success(res, 200))
    .catch((err) =>
      res
        .status(err && err.status ? err.status : 400)
        .json({ message: err.message })
    );
};

export const getApplication = ({ params }, res) => {
  getApplicationService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getApplicationsForAnalytics = async ({ params }, res) => {
  var result = await getApplicationsForAnalyticService(params);
  res.status(200).json(result);
};

export const updateApplication = (req, res) => {
  updateApplicationService(req.params, req.body)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const deleteApplication = ({ params }, res) => {
  deleteApplicationService(params)
    .then(success(res, 410))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const createInterviewSchedule = ({ body }, res) => {
  createInterviewScheduleService(body)
    .then(success(res, 201))
    .catch((err) =>
      res
        .status(err && err.status ? err.status : 400)
        .json({ message: err.message })
    );
};

export const updateInterviewSchedule = ({ params, body }, res) => {
  updateInterviewScheduleService(params.scheduleId, body)
    .then(success(res, 200))
    .catch((err) =>
      res
        .status(err && err.status ? err.status : 400)
        .json({ message: err.message })
    );
};

export const updateInterviewReSchedule = ({ body }, res) => {
  updateInterviewReScheduleService(body)
    .then(success(res, 200))
    .catch((err) =>
      res
        .status(err && err.status ? err.status : 400)
        .json({ message: err.message })
    );
};

export const cancelInterviewSchedule = ({ params, userId }, res) => {
  cancelInterviewScheduleService(params.scheduleId, { userId })
    .then(success(res, 200))
    .catch((err) =>
      res
        .status(err && err.status ? err.status : 400)
        .json({ message: err.message })
    );
};

export const getInterviewScheduleByDate = ({ params }, res) => {
  getInterviewScheduleByDateService(params)
    .then(success(res, 200))
    .catch((err) =>
      res
        .status(err && err.status ? err.status : 400)
        .json({ message: err.message })
    );
};

export const searchInterviewSchedules = ({ query }, res) => {
  searchInterviewSchedulesService(query)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const sendInterviewRemainderNotification = ({ params }, res) => {
  sendInterviewReminderNotificationService(params.scheduleId)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getApplicationsForAnalyticCalendar = async (
  { params, body },
  res
) => {
  var result = await getApplicationsForAnalyticCalendarService(params, body);
  res.status(200).json(result);
};
