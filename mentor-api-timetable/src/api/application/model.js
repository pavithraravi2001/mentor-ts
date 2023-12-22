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
exports.InterviewScheduler = exports.schema = exports.Application = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoosePaginate = require("mongoose-paginate-v2");
const ApplicationSchema = new mongoose_1.Schema({
    userId: mongoose_1.default.Schema.Types.ObjectId,
    submitted: Boolean,
    parentGuardianName: String,
    parentGuardianMobileNumber: String,
    applicationNumber: Number,
    instituteId: mongoose_1.default.Schema.Types.ObjectId,
    boardName: String,
    schoolName: String,
    classGrade: { type: String, alias: "admissionFor" },
    firstName: String,
    middleName: String,
    lastName: String,
    candidateName: String,
    dob: Date,
    gender: String,
    bloodGroup: String,
    nationality: String,
    religion: String,
    casteType: String,
    casteName: String,
    motherTongue: String,
    aadhaarNumber: String,
    fatherFirstName: String,
    fatherLastName: String,
    fatherMobileNumber: String,
    fatherEmailAddress: String,
    fatherOccupation: String,
    fatherEmployer: String,
    fatherJobTitle: String,
    fatherAnnualSalary: Number,
    motherFirstName: String,
    motherLastName: String,
    motherMobileNumber: String,
    motherEmailAddress: String,
    motherOccupation: String,
    motherEmployer: String,
    motherJobTitle: String,
    motherAnnualSalary: Number,
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
    previousAcademicInformationSchoolName: String,
    previousAcademicInformationSchoolBoard: String,
    previousAcademicInformationClass: String,
    previousAcademicInformationOverallPercentage: Number,
    previousAcademicInformationYearOfPassing: Date,
    previousAcademicInformationReasonForLeaving: String,
    eligibleForFeeConcession: Boolean,
    feeConcessionCategory: String,
    needTransportFacility: Boolean,
    transportationMoreInformation: String,
    needHostelFacility: Boolean,
    hostelMoreInformation: String,
    applicationFee: String,
    paymentStatus: String,
    paymentNote: String,
    paymentMode: String,
    admissionFee: String,
    admissionPaymentId: {
        type: String,
        index: true,
    },
    admissionPaymentStatus: String,
    admissionStatus: String,
    admissionPaymentNote: String,
    admissionPaymentMode: String,
    applicationStatus: String,
    interviewDate: Date,
    interviewTimeIn: String,
    interviewTimeOut: String,
    interviewTime: String,
    interviewerNote: String,
    reportUrl: {
        type: Object,
        required: false,
    },
    passPercentage: Number,
    candidatePercentage: Number,
    candidatePerformance: String,
    parentInput: String,
    enrollNumber: String,
    birthCertificate: {
        type: Object,
        required: false,
    },
    parentAadhaarCard: {
        type: Object,
        required: false,
    },
    parentAddressProof: {
        type: Object,
        required: false,
    },
    immunisationCard: {
        type: Object,
        required: false,
    },
    transferCertificate: {
        type: Object,
        required: false,
    },
    previousReportCard: {
        type: Object,
        required: false,
    },
    studentAadhaarCard: {
        type: Object,
        required: false,
    },
    studentPhoto: {
        type: Object,
        required: false,
    },
}, {
    strict: true,
    timestamps: { updatedAt: "lastUpdated" },
    toJSON: { virtuals: true },
});
ApplicationSchema.pre("find", function () {
    if (this._userProvidedFields && this._userProvidedFields.age) {
        this._userProvidedFields.dob = 1;
        this._fields.dob = 1;
    }
});
ApplicationSchema.virtual("paymentFailed").get(function () {
    return this.paymentMode === "online"
        ? this.paymentStatus !== "TXN_SUCCESS"
        : null;
});
ApplicationSchema.virtual("age").get(function () {
    if (!this.dob) {
        return -1;
    }
    const birthday = this.dob;
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
ApplicationSchema.plugin(mongoosePaginate);
exports.Application = mongoose_1.default.model("Application", ApplicationSchema);
exports.schema = exports.Application.schema;
const InterviewSchedulerModel = new mongoose_1.Schema({
    applicationIds: {
        type: [String],
        required: true,
    },
    applicantCount: Number,
    interviewDate: {
        type: Date,
        required: true,
        index: true,
    },
    interviewTimeIn: String,
    interviewTimeOut: String,
    interviewTime: String,
    interviewerNote: String,
    applicationStatus: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose_1.Schema.ObjectId,
        ref: "User",
    },
    lastModifiedBy: {
        type: mongoose_1.Schema.ObjectId,
        ref: "User",
    },
}, {
    strict: false,
    timestamps: true,
});
InterviewSchedulerModel.plugin(mongoosePaginate);
exports.InterviewScheduler = mongoose_1.default.model("InterviewScheduler", InterviewSchedulerModel);
