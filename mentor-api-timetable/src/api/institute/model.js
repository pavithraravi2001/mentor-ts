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
exports.InstituteAnnouncement = exports.InstituteFaculties = exports.InstituteSubjects = exports.InstituteClasses = exports.InstituteHoliday = exports.schema = exports.Institute = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const supportDocument = new mongoose_1.Schema({
    documentUrl: String,
    documentType: String,
    fileKey: String,
    originalFileName: String,
}, {
    _id: false,
});
const institutePeriodTime = new mongoose_1.Schema({
    periodName: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    status: String,
}, {
    _id: false,
});
const InstituteModel = new mongoose_1.Schema({
    groupId: mongoose_1.default.Schema.Types.ObjectId,
    instituteCode: String,
    instituteName: String,
    boardName: String,
    isActive: {
        type: Boolean,
        default: true,
    },
    addressLine1: String,
    addressLine2: String,
    addressCountry: String,
    addressState: String,
    addressCity: String,
    addressZipCode: String,
    landlineNumber1: String,
    landlineNumber2: String,
    mobileNumber1: String,
    mobileNumber2: String,
    contactPersonName: String,
    email: String,
    academicYear: String,
    startingMonthName: String,
    needBiometric: {
        type: Boolean,
        default: false,
    },
    needOnlineAdmission: {
        type: Boolean,
        default: false,
    },
    attendenceType: String,
    language: String,
    dateFormat: String,
    needAdmissionNumberAutoGeneration: {
        type: Boolean,
        default: true,
    },
    needAdmissionNumberPrefix: {
        type: Boolean,
        default: false,
    },
    admissionNumberPrefix: String,
    admissionNumberDigits: Number,
    currencySymbol: String,
    feeDueDays: Number,
    teacherRestrictedMode: {
        type: Boolean,
        default: false,
    },
    instituteLogo: supportDocument,
    instituteImage: supportDocument,
    instituteMobileLogo: supportDocument,
    interestedInMobileApp: {
        type: Boolean,
        default: false,
    },
    institutePeriodTimes: [institutePeriodTime],
    mapUrl: String,
    mapEmbedded: String,
    tag: Object,
}, {
    strict: true,
    timestamps: {
        updatedAt: "lastUpdated",
    },
    toJSON: {
        virtuals: true,
    },
});
exports.Institute = mongoose_1.default.model("Institute", InstituteModel);
exports.schema = exports.Institute.schema;
const HolidayModel = new mongoose_1.Schema({
    holidayName: {
        type: String,
        required: true,
    },
    holidayDate: {
        type: Date,
        required: true,
        index: true,
    },
    status: String,
}, {
    _id: false,
});
const InstituteHolidayModel = new mongoose_1.Schema({
    instituteId: {
        type: String,
        required: true,
    },
    academicYear: {
        type: String,
        required: true,
        unique: true,
    },
    holidays: [HolidayModel],
}, {
    strict: true,
    timestamps: true,
});
exports.InstituteHoliday = mongoose_1.default.model("InstituteHoliday", InstituteHolidayModel);
const ClassModel = new mongoose_1.Schema({
    gradeName: {
        type: String,
        required: true,
    },
    section: {
        type: [String],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
        index: true,
    },
    endDate: {
        type: Date,
        required: true,
        index: true,
    },
    status: String,
}, {
    _id: false,
});
const InstituteClassModel = new mongoose_1.Schema({
    instituteId: {
        type: String,
        required: true,
    },
    academicYear: {
        type: String,
        required: true,
        unique: true,
    },
    classes: [ClassModel],
}, {
    strict: true,
    timestamps: true,
});
exports.InstituteClasses = mongoose_1.default.model("InstituteClasses", InstituteClassModel);
const SubjectModel = new mongoose_1.Schema({
    subjectName: {
        type: String,
        required: true,
    },
    subjectCode: {
        type: String,
    },
    subjectType: {
        type: String,
        required: true,
        index: true,
    },
    classification: {
        type: String,
        required: true,
        index: true,
    },
    status: String,
}, {
    _id: false,
});
const InstituteSubjectModel = new mongoose_1.Schema({
    instituteId: {
        type: String,
        required: true,
    },
    academicYear: {
        type: String,
        required: true,
        unique: true,
    },
    subjects: [SubjectModel],
}, {
    strict: true,
    timestamps: true,
});
exports.InstituteSubjects = mongoose_1.default.model("InstituteSubjects", InstituteSubjectModel);
const FacultyModel = new mongoose_1.Schema({
    subjectName: {
        type: String,
        required: true,
    },
    empId: {
        type: String,
    },
}, {
    _id: false,
});
const FacultySectionModel = new mongoose_1.Schema({
    sectionName: {
        type: String,
        required: true,
    },
    faculties: [FacultyModel],
    status: String,
}, {
    _id: false,
});
const InstituteFacultiesModel = new mongoose_1.Schema({
    instituteId: {
        type: String,
        required: true,
    },
    academicYear: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    sections: [FacultySectionModel],
}, {
    strict: true,
    timestamps: true,
});
exports.InstituteFaculties = mongoose_1.default.model("InstituteFaculties", InstituteFacultiesModel);
const AnnouncementClassModel = new mongoose_1.Schema({
    section: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    student: {
        type: Boolean,
        required: true,
    },
    parent: {
        type: Boolean,
        required: true,
    },
    teacher: {
        type: Boolean,
        required: true,
    },
}, {
    _id: false,
});
const InstituteAnnouncementModel = new mongoose_1.Schema({
    instituteId: {
        type: String,
        required: true,
    },
    academicYear: {
        type: String,
        required: true,
    },
    announcementType: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    email: {
        type: Boolean,
        default: false,
    },
    sms: {
        type: Boolean,
        default: false,
    },
    push: {
        type: Boolean,
        default: false,
    },
    class: [AnnouncementClassModel],
    individualClass: {
        type: [String],
    },
    individualTeacher: {
        type: [String],
    },
    individualStudent: {
        type: [String],
    },
    publishedOn: {
        type: Date,
        required: true,
        index: true,
        default: Date.now,
    },
}, {
    strict: true,
    timestamps: true,
});
exports.InstituteAnnouncement = mongoose_1.default.model("InstituteAnnouncement", InstituteAnnouncementModel);
