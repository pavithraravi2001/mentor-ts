"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateExcelData = exports.validationRegx = void 0;
const Joi = require("joi");
/*exports.validateStudent = [
  check(['firstName', 'lastName']).trim()
    .not().isEmpty().withMessage('Cannot be empty').bail()
    .matches(/^[a-zA-Z\s\.]*$/).withMessage('First name cannot contain special character(Except .)').bail()
    .isLength({min: 2}).withMessage('Minimum 2 characters required')
    .isLength({max: 25}).withMessage('Maximum 25 characters allowed'),
  check('middleName').trim()
    .matches(/^[a-zA-Z\s\.]*$/).withMessage('Middle name cannot contain special character(Except .)').bail()
    .isLength({max: 25}).withMessage('Maximum 25 characters allowed'),
  check('dateOfBirth')
    .not().isEmpty().withMessage('Date of birth is required'),
  check(['nationality', 'gender', 'religion', 'motherTongue', 'casteName', 'fatherEmployer', 'fatherJobTitle'])
    .not().isEmpty().withMessage('Required').bail()
    .isAlpha().withMessage('Only alphabets are allowed')
    .isLength({max: 25}).withMessage('Maximum 25 characters allowed'),
  check('aadharNumber')
    .not().isEmpty().withMessage('AadharNumber is required').bail()
    .isNumeric({no_symbols: true}).withMessage('Invalid AadharNumber')
    .isLength({max: 12}).withMessage('Maximum 12 numbers allowed'),
  check(['fatherFirstName', 'fatherLastName', 'motherFirstName', 'motherLastName']).trim()
    .not().isEmpty().withMessage('Cannot be empty').bail()
    .matches(/^[a-zA-Z\s\.]*$/).withMessage('Cannot contain special character(Except .)').bail()
    .isLength({max: 25}).withMessage('Maximum 25 characters allowed'),
  check('fatherEmailAddress', 'motherEmailAddress').trim()
    .isEmail().withMessage('Invalid email address!'),
  check(['fatherOccupation', 'fatherEmployer', 'fatherJobTitle', 'motherOccupation', 'motherEmployer', 'motherJobTitle']).trim()
    .isLength({max: 25}).withMessage('Maximum 25 characters allowed'),
  check(['fatherAnnulaSalary', 'motherAnnulaSalary'])
    .not().isEmpty().withMessage('Required').bail()
    .isNumeric().withMessage('Invalid number'),
  (req, res, next) => {
    next();
  },
];*/
exports.validationRegx = {
    NAME_ALLOW_SPACE_AND_DOTS: /^[a-zA-Z\. ]*$/,
    AADHAR_REGX: /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/,
    EMAIL_REGEXP: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    MOBILE_NUMBER_REGX: /^(?!(0))([+]\d{2})?\d{10}$/,
    SALARY_REGX: /^[0-9]+$/,
    PIN_CODE_NUMBER_REGX: /^[1-9][0-9]{5}$/,
    ALPHA_NUMERIC_DOTS: /^[a-zA-Z0-9\. ]*$/,
    LAND_LINE_REGX: /^\d{5}([- ]*)\d{6}$/,
    IFSC_CODE_REGX: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    ACCOUNT_NUMBER_REGX: /^[0-9]{7,14}$/,
    PAN_NUMBER_REGX: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
};
const validateExcelData = (data) => {
    const schema = Joi.object({
        firstName: Joi.string()
            .regex(exports.validationRegx.NAME_ALLOW_SPACE_AND_DOTS)
            .required("Firstname is mandatory"),
        middleName: Joi.string().regex(exports.validationRegx.NAME_ALLOW_SPACE_AND_DOTS),
        lastName: Joi.string()
            .regex(exports.validationRegx.NAME_ALLOW_SPACE_AND_DOTS)
            .required("Lastname is mandatory"),
        dob: Joi.date().required("Date of Birth is mandatory"),
        gender: Joi.string().required("gender is mandatory"),
        bloodGroup: Joi.string().required("Blood group is mandatory"),
        nationality: Joi.string().required("Nationality is mandatory"),
        religion: Joi.string().required("Religion is mandatory"),
        casteType: Joi.string(),
        casteName: Joi.string(),
        motherTongue: Joi.string().required("Mother tongue is mandatory"),
        aadhaarNumber: Joi.string()
            .regex(exports.validationRegx.AADHAR_REGX)
            .required("AadharNumber is mandatory"),
        fatherFirstName: Joi.string()
            .regex(exports.validationRegx.NAME_ALLOW_SPACE_AND_DOTS)
            .required("father's firstname is mandatory"),
        fatherLastName: Joi.string()
            .regex(exports.validationRegx.NAME_ALLOW_SPACE_AND_DOTS)
            .required("father's lastname is mandatory"),
        fatherMobileNumber: Joi.string()
            .regex(exports.validationRegx.MOBILE_NUMBER_REGX)
            .required("father's mobile number is mandatory"),
        fatherEmailAddress: Joi.string()
            .regex(exports.validationRegx.EMAIL_REGEXP)
            .required("father's email address is mandatory"),
        fatherOccupation: Joi.string().required("father's Occupation is Mandatory"),
        fatherNameofEmployer: Joi.string(),
        fatherJobTitle: Joi.string(),
        fatherAnnualSalary: Joi.string().regex(exports.validationRegx.SALARY_REGX),
        motherFirstName: Joi.string()
            .regex(exports.validationRegx.NAME_ALLOW_SPACE_AND_DOTS)
            .required("Mother's first name is mandatory"),
        motherLastName: Joi.string()
            .regex(exports.validationRegx.NAME_ALLOW_SPACE_AND_DOTS)
            .required("Mother's Lastname is mandatory"),
        motherMobileNumber: Joi.string()
            .regex(exports.validationRegx.MOBILE_NUMBER_REGX)
            .required("Mother's mobile number is mandatory"),
        motherEmailAddress: Joi.string()
            .regex(exports.validationRegx.EMAIL_REGEXP)
            .required("Mother's email address is mandatory"),
        motherOccupation: Joi.string().required("Mother's Occupation is mandatory"),
        motherNameofEmployer: Joi.string(),
        motherJobTitle: Joi.string(),
        motherAnnualSalary: Joi.string()
            .regex(exports.validationRegx.SALARY_REGX)
            .required("Mother's Annual Salary is mandatory"),
        emergencyContactPerson: Joi.string().required("Emergency contact name is mandatory"),
        emergencyContactNumber: Joi.string()
            .regex(exports.validationRegx.MOBILE_NUMBER_REGX)
            .required("Emergency Contact number is mandatory"),
        emergencyContactRelationship: Joi.string().required("Emergency Contact relationship is mandatory"),
        emergencyDoctorName: Joi.string()
            .regex(exports.validationRegx.NAME_ALLOW_SPACE_AND_DOTS)
            .required("Emergency doctor name is mandatory"),
        emergencyDoctorContactNumber: Joi.string()
            .regex(exports.validationRegx.MOBILE_NUMBER_REGX)
            .required("Contact Number is mandatory"),
        emergencyDoctorAddress: Joi.string().required("Address is mandatory"),
        permanentAddressLine1: Joi.string().required("Permanent Address is mandatory"),
        permanentAddressLine2: Joi.string().required("Permanent Address is mandatory"),
        permanentAddressCountry: Joi.string().required("Country is mandatory"),
        permanentAddressState: Joi.string().required("State is mandatory"),
        permanentAddressCity: Joi.string().required("City is mandatory"),
        permanentAddressZipCode: Joi.string()
            .regex(exports.validationRegx.PIN_CODE_NUMBER_REGX)
            .required("Pincode is mandatory"),
        communicationAddressLine1: Joi.string().required("Communication Address is mandatory"),
        communicationAddressLine2: Joi.string().required("Communication Address mandatory"),
        communicationAddressCountry: Joi.string().required("Country is mandatory"),
        communicationAddressState: Joi.string().required("State is mandatory"),
        communicationAddressCity: Joi.string().required("City is mandatory"),
        communicationAddressZipCode: Joi.string()
            .regex(exports.validationRegx.PIN_CODE_NUMBER_REGX)
            .required("Pincode is mandatory"),
    });
    const validData = [];
    const errorCollection = [];
    data.forEach((value) => {
        const { error, value: validatedValue } = schema.validate(value);
        if (error) {
            errorCollection.push({
                field: error.details[0].context.key,
                error: error.details[0].message,
            });
        }
        else {
            validData.push(validatedValue);
        }
    });
    return { validData, errorCollection };
};
exports.validateExcelData = validateExcelData;
