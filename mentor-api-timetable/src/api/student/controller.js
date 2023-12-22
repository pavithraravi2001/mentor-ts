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
exports.getStudentsForAnalytics = exports.getStudentList = exports.searchStudent = exports.updateStudent = exports.getStudents = exports.getStudentAchievementsById = exports.getStudentInterstsById = exports.getStudentById = exports.getStudentByEnrollNumber = exports.createStudentFromApplication = exports.addBulkStudent = exports.createStudentExcelData = exports.createStudent = void 0;
const response_1 = require("../../common/response/");
const service_1 = require("./service");
const createStudent = (req, res) => {
    (0, service_1.createStudentService)(req.body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.createStudent = createStudent;
const createStudentExcelData = (req, res) => {
    (0, service_1.createStudentExcelDataService)(req.body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.createStudentExcelData = createStudentExcelData;
const addBulkStudent = (req, res) => {
    (0, service_1.addBulkStudentService)(req, res);
};
exports.addBulkStudent = addBulkStudent;
const createStudentFromApplication = (req, res) => {
    (0, service_1.createStudentFromApplicationService)(req.body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res
        .status(err && err.status ? err.status : 400)
        .json({ message: err.message }));
};
exports.createStudentFromApplication = createStudentFromApplication;
const getStudentByEnrollNumber = ({ params }, res) => {
    (0, service_1.getStudentByEnrollNumberService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getStudentByEnrollNumber = getStudentByEnrollNumber;
const getStudentById = ({ params }, res) => {
    (0, service_1.getStudentByIdService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getStudentById = getStudentById;
const getStudentInterstsById = ({ params }, res) => {
    (0, service_1.getStudentInterstsByIdService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getStudentInterstsById = getStudentInterstsById;
const getStudentAchievementsById = ({ params }, res) => {
    (0, service_1.getStudentAchievementsByIdService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getStudentAchievementsById = getStudentAchievementsById;
const getStudents = ({ params }, res) => {
    (0, service_1.getStudentsService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getStudents = getStudents;
const updateStudent = (req, res) => {
    (0, service_1.updateStudentService)(req.params, req.body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateStudent = updateStudent;
const searchStudent = ({ query }, res) => {
    (0, service_1.searchStudentService)(query)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.searchStudent = searchStudent;
const getStudentList = ({ params }, res) => {
    (0, service_1.getStudentListService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getStudentList = getStudentList;
const getStudentsForAnalytics = ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    var result = yield getStudentsForAnalyticService(params);
    res.status(200).json(result);
});
exports.getStudentsForAnalytics = getStudentsForAnalytics;
