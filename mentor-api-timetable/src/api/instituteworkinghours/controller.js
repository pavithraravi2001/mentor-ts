"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInstituteWorkingHours = exports.updateInstituteWorkingHours = exports.getInstituteWorkingHours = void 0;
const response_1 = require("../../common/response/");
const service_1 = require("./service");
const getInstituteWorkingHours = ({}, res) => {
    (0, service_1.getInstituteWorkingHoursService)()
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getInstituteWorkingHours = getInstituteWorkingHours;
const updateInstituteWorkingHours = (req, res) => {
    (0, service_1.updateInstituteWorkingHoursService)(req.params, req.body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateInstituteWorkingHours = updateInstituteWorkingHours;
const deleteInstituteWorkingHours = (req, res) => {
    (0, service_1.deleteInstituteWorkingHoursService)()
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.deleteInstituteWorkingHours = deleteInstituteWorkingHours;
