"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.Employee = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoosePaginate = require("mongoose-paginate-v2");
const supportingDocument = new mongoose_1.Schema({
    documentType: String,
    documentUrl: String,
    fileKey: String,
    originalFileName: String,
}, { _id: true });
const employeeAcademicInfo = new mongoose_1.Schema({
    courseType: String,
    boardName: String,
    schoolCollegeName: String,
    overallPercentage: String,
    courseName: String,
    yearOfPassing: Date,
}, { _id: false });
const employeeDependent = new mongoose_1.Schema({
    dependentType: String,
    mobileNumber: String,
    firstName: String,
    lastName: String,
    emailId: String,
    occupation: String,
}, { _id: false });
const employeeExperience = new mongoose_1.Schema({
    employerName: String,
    jobTitle: String,
    employmentType: String,
    location: String,
    startDate: Date,
    endDate: Date,
}, { _id: false });
const EmployeeModel = new mongoose_1.Schema({
    instituteId: mongoose_1.default.Schema.Types.ObjectId,
    _empId: Number,
    empId: String,
    isActive: {
        type: Boolean,
        default: true,
    },
    employeeType: String,
    firstName: String,
    lastName: String,
    contactNumber: String,
    emailId: String,
    dateOfBirth: Date,
    gender: String,
    nationality: String,
    bloodGroup: String,
    religion: String,
    casteType: String,
    casteName: String,
    motherTongue: String,
    aadhaarNumber: String,
    emergencyContactPersonFirstName: String,
    emergencyContactPersonLastName: String,
    emergencyContactNumber: String,
    emergencyContactRelationship: String,
    emergencyDoctorName: String,
    emergencyDoctorContactNumber: String,
    emergencyDoctorAddress: String,
    permanentAddressLine1: String,
    permanentAddressLine2: String,
    permanentAddressCountry: String,
    permanentAddressState: String,
    permanentAddressCity: String,
    permanentAddressZipCode: String,
    copySameAddress: Boolean,
    communicationAddressLine1: String,
    communicationAddressLine2: String,
    communicationAddressCountry: String,
    communicationAddressState: String,
    communicationAddressCity: String,
    communicationAddressZipCode: String,
    bankAccountHolderName: String,
    bankAccountAccountNumber: String,
    bankAccountIFSCCode: String,
    panNumber: String,
    experiences: [employeeExperience],
    dependents: [employeeDependent],
    academicInfos: [employeeAcademicInfo],
    otherDocument: [supportingDocument],
    documentType: String,
    documentUrl: String,
    fileKey: String,
    originalFileName: String,
    dateOfJoin: Date,
    employementType: String,
    designation: String,
    employeeType: String,
    primaryDepartment: String,
    role: String,
    isEligibleForClassTeacher: Boolean,
    secondaryDepartment: String,
    needTransportFacility: Boolean,
    profileStatus: String,
    tag: Object,
}, {
    strict: true,
    timestamps: { updatedAt: "lastUpdated" },
    toJSON: { virtuals: true },
});
EmployeeModel.pre("find", function () {
    if (this._userProvidedFields && this._userProvidedFields.age) {
        this._userProvidedFields.dateOfBirth = 1;
        this._fields.dateOfBirth = 1;
    }
});
EmployeeModel.virtual("age").get(function () {
    if (!this.dateOfBirth) {
        return -1;
    }
    const birthday = this.dateOfBirth;
    if (!birthday) {
        return null;
    }
    const today = new Date();
    let thisYear = 0;
    if (today.getMonth() < birthday.getMonth()) {
        thisYear = 1;
    }
    else if (today.getMonth() === birthday.getMonth() &&
        today.getDate() < birthday.getDate()) {
        thisYear = 1;
    }
    const age = today.getFullYear() - birthday.getFullYear() - thisYear;
    return age;
});
EmployeeModel.plugin(mongoosePaginate);
exports.Employee = mongoose_1.default.model("Employee", EmployeeModel);
exports.schema = exports.Employee.schema;
