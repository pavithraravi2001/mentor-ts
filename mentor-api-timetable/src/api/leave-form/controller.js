"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = exports.deleteLeaveForm = exports.updateLeaveForm = exports.getLeaveFormById = exports.getLeaveForm = exports.createLeaveForm = void 0;
const response_1 = require("../../common/response/");
const service_1 = require("./service");
const { validationResult } = require("express-validator");
function doValidation(req) {
    const errors = validationResult(req);
    const validErrors = errors.array();
    if (!req.body.leaveType ||
        !req.body.dateFrom ||
        !req.body.dateTo ||
        !req.body.leaveReason) {
        const error = {
            msg: "It is mandatory",
        };
        validErrors.push(error);
    }
    return validErrors;
}
const createLeaveForm = (req, res) => {
    (0, service_1.createLeaveFormService)(req.body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => {
        res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.createLeaveForm = createLeaveForm;
const getLeaveForm = (req, res) => {
    (0, service_1.getLeaveFormService)()
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getLeaveForm = getLeaveForm;
const getLeaveFormById = ({ params }, res) => {
    (0, service_1.getLeaveFormByIdService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getLeaveFormById = getLeaveFormById;
const updateLeaveForm = ({ params, body }, res) => {
    (0, service_1.updateLeaveFormService)(params, body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.updateLeaveForm = updateLeaveForm;
const deleteLeaveForm = ({ params }, res) => {
    (0, service_1.deleteLeaveFormService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.deleteLeaveForm = deleteLeaveForm;
const getUserId = ({ params }, res) => {
    (0, service_1.getUserIdService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getUserId = getUserId;
