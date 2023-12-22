import { success } from "../../common/response";
import {
  addBulkEmployeeService,
  createEmployeeExcelDataService,
  createEmployeeService,
  deleteEmployeeService,
  getEmployeeByEmpIdService,
  getEmployeeByIdService,
  getEmployeesForAnalyticService,
  getEmployeesService,
  getTeachingEmployeesService,
  searchEmployeeService,
  updateEmployeeService,
  updateEmployeeServiceEnroll,
  updateEmployeeServiceSubmit,
} from "./service";

export const createEmployee = (req, res) => {
  createEmployeeService(req.body)
    .then(success(res, 201))
    .catch((err) => {
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getEmployees = ({ userId }, res) => {
  getEmployeesService(userId)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getEmployeeById = ({ params }, res) => {
  getEmployeeByIdService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getEmployeeByEmpId = ({ params }, res) => {
  getEmployeeByEmpIdService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateEmployee = (req, res) => {
  updateEmployeeService(req.params, req.body)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateEmployeeEnroll = (req, res) => {
  updateEmployeeServiceEnroll(req.params, req.body)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateEmployeeSubmit = (req, res) => {
  updateEmployeeServiceSubmit(req.params, req.body)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const deleteEmployee = ({ params }, res) => {
  deleteEmployeeService(params)
    .then(success(res, 204))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const searchEmployee = ({ query }, res) => {
  searchEmployeeService(query)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getEmployeesForAnalytics = async ({ params }, res) => {
  var result = await getEmployeesForAnalyticService(params);
  res.status(200).json(result);
};

export const getTeachingEmployees = ({ params, query }, res) => {
  getTeachingEmployeesService(params, query)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const addBulkEmployee = (req, res) => {
  addBulkEmployeeService(req, res);
};

export const createEmployeeExcelData = (req, res) => {
  createEmployeeExcelDataService(req.body)
    .then(success(res, 201))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
