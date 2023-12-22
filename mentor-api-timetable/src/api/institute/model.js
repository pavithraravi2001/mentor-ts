import mongoose, { Schema } from "mongoose";

const supportDocument = new Schema(
  {
    documentUrl: String,
    documentType: String,
    fileKey: String,
    originalFileName: String,
  },
  {
    _id: false,
  }
);

const institutePeriodTime = new Schema(
  {
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
  },
  {
    _id: false,
  }
);

const InstituteModel = new Schema(
  {
    groupId: mongoose.Schema.Types.ObjectId,
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
  },
  {
    strict: true,
    timestamps: {
      updatedAt: "lastUpdated",
    },
    toJSON: {
      virtuals: true,
    },
  }
);

export const Institute = mongoose.model("Institute", InstituteModel);
export const schema = Institute.schema;

const HolidayModel = new Schema(
  {
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
  },
  {
    _id: false,
  }
);

const InstituteHolidayModel = new Schema(
  {
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
  },
  {
    strict: true,
    timestamps: true,
  }
);

export const InstituteHoliday = mongoose.model(
  "InstituteHoliday",
  InstituteHolidayModel
);

const ClassModel = new Schema(
  {
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
  },
  {
    _id: false,
  }
);

const InstituteClassModel = new Schema(
  {
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
  },
  {
    strict: true,
    timestamps: true,
  }
);

export const InstituteClasses = mongoose.model(
  "InstituteClasses",
  InstituteClassModel
);

const SubjectModel = new Schema(
  {
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
  },
  {
    _id: false,
  }
);

const InstituteSubjectModel = new Schema(
  {
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
  },
  {
    strict: true,
    timestamps: true,
  }
);

export const InstituteSubjects = mongoose.model(
  "InstituteSubjects",
  InstituteSubjectModel
);

const FacultyModel = new Schema(
  {
    subjectName: {
      type: String,
      required: true,
    },
    empId: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

const FacultySectionModel = new Schema(
  {
    sectionName: {
      type: String,
      required: true,
    },
    faculties: [FacultyModel],
    status: String,
  },
  {
    _id: false,
  }
);

const InstituteFacultiesModel = new Schema(
  {
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
  },
  {
    strict: true,
    timestamps: true,
  }
);

export const InstituteFaculties = mongoose.model(
  "InstituteFaculties",
  InstituteFacultiesModel
);

const AnnouncementClassModel = new Schema(
  {
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
  },
  {
    _id: false,
  }
);

const InstituteAnnouncementModel = new Schema(
  {
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
  },
  {
    strict: true,
    timestamps: true,
  }
);

export const InstituteAnnouncement = mongoose.model(
  "InstituteAnnouncement",
  InstituteAnnouncementModel
);
