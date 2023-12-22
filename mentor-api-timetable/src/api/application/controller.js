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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationsForAnalyticCalendar = exports.sendInterviewRemainderNotification = exports.searchInterviewSchedules = exports.getInterviewScheduleByDate = exports.cancelInterviewSchedule = exports.updateInterviewReSchedule = exports.updateInterviewSchedule = exports.createInterviewSchedule = exports.deleteApplication = exports.updateApplication = exports.getApplicationsForAnalytics = exports.getApplication = exports.getApplicationsAdmissionStatus = exports.updateApplicationsAdmissionStatus = exports.searchApplications = exports.getApplications = exports.getApplicationByUserId = exports.createApplication = void 0;
const response_1 = require("../../common/response/");
const service_1 = require("./service");
const createApplication = (req, res) => {
    (0, service_1.createApplicationService)(req.body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.createApplication = createApplication;
const getApplicationByUserId = ({ params }, res) => {
    (0, service_1.getApplicationsByUserId)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getApplicationByUserId = getApplicationByUserId;
const getApplications = ({ userId }, res) => {
    (0, service_1.getApplicationsService)(userId)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getApplications = getApplications;
const searchApplications = ({ query }, res) => {
    (0, service_1.searchApplicationsService)(query)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.searchApplications = searchApplications;
const updateApplicationsAdmissionStatus = ({ body }, res) => {
    (0, service_1.updateApplicationsAdmissionStatusService)(body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res
        .status(err && err.status ? err.status : 400)
        .json({ message: err.message }));
};
exports.updateApplicationsAdmissionStatus = updateApplicationsAdmissionStatus;
const getApplicationsAdmissionStatus = ({ params }, res) => {
    (0, service_1.getApplicationsAdmissionStatusService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res
        .status(err && err.status ? err.status : 400)
        .json({ message: err.message }));
};
exports.getApplicationsAdmissionStatus = getApplicationsAdmissionStatus;
const getApplication = ({ params }, res) => {
    (0, service_1.getApplicationService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getApplication = getApplication;
const getApplicationsForAnalytics = ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    var result = yield (0, service_1.getApplicationsForAnalyticService)(params);
    res.status(200).json(result);
});
exports.getApplicationsForAnalytics = getApplicationsForAnalytics;
const updateApplication = (req, res) => {
    (0, service_1.updateApplicationService)(req.params, req.body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateApplication = updateApplication;
const deleteApplication = ({ params }, res) => {
    (0, service_1.deleteApplicationService)(params)
        .then((0, response_1.success)(res, 410))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.deleteApplication = deleteApplication;
const createInterviewSchedule = ({ body }, res) => {
    (0, service_1.createInterviewScheduleService)(body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => res
        .status(err && err.status ? err.status : 400)
        .json({ message: err.message }));
};
exports.createInterviewSchedule = createInterviewSchedule;
const updateInterviewSchedule = ({ params, body }, res) => {
    (0, service_1.updateInterviewScheduleService)(params.scheduleId, body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res
        .status(err && err.status ? err.status : 400)
        .json({ message: err.message }));
};
exports.updateInterviewSchedule = updateInterviewSchedule;
const updateInterviewReSchedule = ({ body }, res) => {
    (0, service_1.updateInterviewReScheduleService)(body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res
        .status(err && err.status ? err.status : 400)
        .json({ message: err.message }));
};
exports.updateInterviewReSchedule = updateInterviewReSchedule;
const cancelInterviewSchedule = ({ params, userId }, res) => {
    (0, service_1.cancelInterviewScheduleService)(params.scheduleId, { userId })
        .then((0, response_1.success)(res, 200))
        .catch((err) => res
        .status(err && err.status ? err.status : 400)
        .json({ message: err.message }));
};
exports.cancelInterviewSchedule = cancelInterviewSchedule;
const getInterviewScheduleByDate = ({ params }, res) => {
    (0, service_1.getInterviewScheduleByDateService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res
        .status(err && err.status ? err.status : 400)
        .json({ message: err.message }));
};
exports.getInterviewScheduleByDate = getInterviewScheduleByDate;
const searchInterviewSchedules = ({ query }, res) => {
    (0, service_1.searchInterviewSchedulesService)(query)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.searchInterviewSchedules = searchInterviewSchedules;
const sendInterviewRemainderNotification = ({ params }, res) => {
    (0, service_1.sendInterviewReminderNotificationService)(params.scheduleId)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.sendInterviewRemainderNotification = sendInterviewRemainderNotification;
const getApplicationsForAnalyticCalendar = ({ params, body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    var result = yield (0, service_1.getApplicationsForAnalyticCalendarService)(params, body);
    res.status(200).json(result);
});
exports.getApplicationsForAnalyticCalendar = getApplicationsForAnalyticCalendar;
