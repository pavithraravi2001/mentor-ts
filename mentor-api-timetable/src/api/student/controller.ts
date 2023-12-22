import { success } from "../../common/response";
import {
  addBulkStudentService,
  createStudentExcelDataService,
  createStudentFromApplicationService,
  createStudentService,
  getStudentAchievementsByIdService,
  getStudentByEnrollNumberService,
  getStudentByIdService,
  getStudentInterstsByIdService,
  getStudentListService,
  getStudentsService,
  searchStudentService,
  updateStudentService,
} from "./service";

export const createStudent = (req, res) => {
  createStudentService(req.body)
    .then(success(res, 201))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const createStudentExcelData = (req, res) => {
  createStudentExcelDataService(req.body)
    .then(success(res, 201))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const addBulkStudent = (req, res) => {
  addBulkStudentService(req, res);
};

export const createStudentFromApplication = (req, res) => {
  createStudentFromApplicationService(req.body)
    .then(success(res, 200))
    .catch((err) =>
      res
        .status(err && err.status ? err.status : 400)
        .json({ message: err.message })
    );
};

export const getStudentByEnrollNumber = ({ params }, res) => {
  getStudentByEnrollNumberService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getStudentById = ({ params }, res) => {
  getStudentByIdService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getStudentInterstsById = ({ params }, res) => {
  getStudentInterstsByIdService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
export const getStudentAchievementsById = ({ params }, res) => {
  getStudentAchievementsByIdService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getStudents = ({ params }, res) => {
  getStudentsService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateStudent = (req, res) => {
  updateStudentService(req.params, req.body)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const searchStudent = ({ query }, res) => {
  searchStudentService(query)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getStudentList = ({ params }, res) => {
  getStudentListService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getStudentsForAnalytics = async ({ params }, res) => {
  var result = await getStudentsForAnalyticService(params);
  res.status(200).json(result);
};
