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
exports.schema = exports.Student = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoosePaginate = require("mongoose-paginate-v2");
const supportDocument = new mongoose_1.Schema({
    documentUrl: String,
    documentType: String,
    fileKey: String,
    originalFileName: String,
}, {
    _id: false,
});
const studentInterest = new mongoose_1.Schema({
    sportsEvent: String,
    skillLevel: String,
    nameOfTheEvent: String,
    competitionInterest: String,
    competitionType: String,
    nameOfTheLanguage: String,
    level: String,
}, {
    _id: false,
});
const studentAchievement = new mongoose_1.Schema({
    eventName: String,
    winnerLevel: String,
    location: String,
    year: String,
    description: String,
}, {
    _id: false,
});
const StudentSchema = new mongoose_1.Schema({
    userId: mongoose_1.default.Schema.Types.ObjectId,
    applicationNumber: Number,
    _enrollNo: Number,
    enrollNumber: String,
    isActive: {
        type: Boolean,
        default: true,
    },
    instituteId: mongoose_1.default.Schema.Types.ObjectId,
    boardName: String,
    schoolName: String,
    classGrade: {
        type: String,
        alias: "admissionFor",
    },
    section: String,
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
    emergencyContactPerson: String,
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
    weight: String,
    height: String,
    bmi: String,
    HadSurgery: String,
    needSpecialAttention: String,
    needToObserveAnySymptoms: String,
    allergies: String,
    problems: String,
    sibliingClass: String,
    sibilingName: String,
    sibilingRelationship: String,
    sibilingSection: String,
    sibilingStudyingAtThisSchool: String,
    sibilingEnrollmentNumbers: [],
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
    interests: [studentInterest],
    achievements: [studentAchievement],
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
    interviewTime: String,
    interviewerNote: String,
    candidatePercentage: Number,
    candidatePerformance: String,
    parentInput: String,
    tag: Object,
    studentPhoto: supportDocument,
    otherDocument: [supportDocument],
}, {
    strict: true,
    timestamps: {
        updatedAt: "lastUpdated",
    },
    toJSON: {
        virtuals: true,
    },
});
StudentSchema.plugin(mongoosePaginate);
exports.Student = mongoose_1.default.model("Student", StudentSchema);
exports.schema = exports.Student.schema;
//export default model;
