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
exports.createEmployeeExcelData = exports.addBulkEmployee = exports.getTeachingEmployees = exports.getEmployeesForAnalytics = exports.searchEmployee = exports.deleteEmployee = exports.updateEmployeeSubmit = exports.updateEmployeeEnroll = exports.updateEmployee = exports.getEmployeeByEmpId = exports.getEmployeeById = exports.getEmployees = exports.createEmployee = void 0;
const response_1 = require("../../common/response/");
const service_1 = require("./service");
const createEmployee = (req, res) => {
    (0, service_1.createEmployeeService)(req.body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => {
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.createEmployee = createEmployee;
const getEmployees = ({ userId }, res) => {
    (0, service_1.getEmployeesService)(userId)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getEmployees = getEmployees;
const getEmployeeById = ({ params }, res) => {
    (0, service_1.getEmployeeByIdService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getEmployeeById = getEmployeeById;
const getEmployeeByEmpId = ({ params }, res) => {
    (0, service_1.getEmployeeByEmpIdService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getEmployeeByEmpId = getEmployeeByEmpId;
const updateEmployee = (req, res) => {
    (0, service_1.updateEmployeeService)(req.params, req.body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateEmployee = updateEmployee;
const updateEmployeeEnroll = (req, res) => {
    (0, service_1.updateEmployeeServiceEnroll)(req.params, req.body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateEmployeeEnroll = updateEmployeeEnroll;
const updateEmployeeSubmit = (req, res) => {
    (0, service_1.updateEmployeeServiceSubmit)(req.params, req.body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateEmployeeSubmit = updateEmployeeSubmit;
const deleteEmployee = ({ params }, res) => {
    (0, service_1.deleteEmployeeService)(params)
        .then((0, response_1.success)(res, 204))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.deleteEmployee = deleteEmployee;
const searchEmployee = ({ query }, res) => {
    (0, service_1.searchEmployeeService)(query)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.searchEmployee = searchEmployee;
const getEmployeesForAnalytics = ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    var result = yield (0, service_1.getEmployeesForAnalyticService)(params);
    res.status(200).json(result);
});
exports.getEmployeesForAnalytics = getEmployeesForAnalytics;
const getTeachingEmployees = ({ params, query }, res) => {
    (0, service_1.getTeachingEmployeesService)(params, query)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getTeachingEmployees = getTeachingEmployees;
const addBulkEmployee = (req, res) => {
    (0, service_1.addBulkEmployeeService)(req, res);
};
exports.addBulkEmployee = addBulkEmployee;
const createEmployeeExcelData = (req, res) => {
    (0, service_1.createEmployeeExcelDataService)(req.body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.createEmployeeExcelData = createEmployeeExcelData;
