"use strict";
const { check } = require("express-validator");
exports.validateInstitute = [
    check(["leaveType", "dateFrom", "dateTo", "leaveReason"])
        .trim()
        .not()
        .isEmpty()
        .withMessage("It is mandatory"),
    (req, res, next) => {
        next();
    },
];
