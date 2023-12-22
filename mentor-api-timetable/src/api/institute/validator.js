"use strict";
const { check, validationResult } = require("express-validator");
exports.validateInstitute = [
    check([
        "instituteName",
        "boardName",
        "addressLine1",
        "addressCountry",
        "addressState",
        "addressCity",
        "addressZipCode",
        "mobileNumber1",
        "landlineNumber1",
        "contactPersonName",
        "email",
        "academicYear",
        "startingMonthName",
        "attendenceType",
        "needBiometric",
        "language",
        "dateFormat",
        "needOnlineAdmission",
        "needAdmissionNumberPrefix",
        "admissionNumberPrefix",
        "admissionNumberDigits",
        "needAdmissionNumberAutoGeneration",
        "teacherRestrictedMode",
        "currencySymbol",
        "interestedInMobileApp",
        "mapUrl",
    ])
        .trim()
        .not()
        .isEmpty()
        .withMessage("It is mandatory")
        .bail(),
    check(["instituteLogo", "instituteImage"])
        .notEmpty()
        .withMessage("It is mandatory"),
    check("email").trim().isEmail().withMessage("Invalid email address"),
    (req, res, next) => {
        next();
    },
];
