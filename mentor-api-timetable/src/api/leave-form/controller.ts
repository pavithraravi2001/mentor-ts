import { success } from "../../common/response";
import {
  createLeaveFormService,
  deleteLeaveFormService,
  getLeaveFormByIdService,
  getLeaveFormService,
  getUserIdService,
  updateLeaveFormService,
} from "./service";
const { validationResult } = require("express-validator");

function doValidation(req) {
  const errors = validationResult(req);
  const validErrors = errors.array();
  if (
    !req.body.leaveType ||
    !req.body.dateFrom ||
    !req.body.dateTo ||
    !req.body.leaveReason
  ) {
    const error = {
      msg: "It is mandatory",
    };
    validErrors.push(error);
  }
  return validErrors;
}

export const createLeaveForm = (req, res) => {
  createLeaveFormService(req.body)
    .then(success(res, 201))
    .catch((err) => {
      res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getLeaveForm = (req, res) => {
  getLeaveFormService()
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getLeaveFormById = ({ params }, res) => {
  getLeaveFormByIdService(params)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const updateLeaveForm = ({ params, body }, res) => {
  updateLeaveFormService(params, body)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const deleteLeaveForm = ({ params }, res) => {
  deleteLeaveFormService(params)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getUserId = ({ params }, res) => {
  getUserIdService(params)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};
