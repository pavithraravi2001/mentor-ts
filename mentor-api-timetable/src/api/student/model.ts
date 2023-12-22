import mongoose, { Schema } from "mongoose";
const mongoosePaginate = require("mongoose-paginate-v2");

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

const studentInterest = new Schema(
  {
    sportsEvent: String,
    skillLevel: String,
    nameOfTheEvent: String,
    competitionInterest: String,
    competitionType: String,
    nameOfTheLanguage: String,
    level: String,
  },
  {
    _id: false,
  }
);

const studentAchievement = new Schema(
  {
    eventName: String,
    winnerLevel: String,
    location: String,
    year: String,
    description: String,
  },
  {
    _id: false,
  }
);

const StudentSchema = new Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    applicationNumber: Number,
    _enrollNo: Number,
    enrollNumber: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    instituteId: mongoose.Schema.Types.ObjectId,
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

StudentSchema.plugin(mongoosePaginate);
export const Student = mongoose.model("Student", StudentSchema);

export const schema = Student.schema;
//export default model;
