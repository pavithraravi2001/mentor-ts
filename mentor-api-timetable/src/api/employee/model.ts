import mongoose, { Schema } from "mongoose";
const mongoosePaginate = require("mongoose-paginate-v2");

const supportingDocument = new Schema(
  {
    documentType: String,
    documentUrl: String,
    fileKey: String,
    originalFileName: String,
  },
  { _id: true }
);

const employeeAcademicInfo = new Schema(
  {
    courseType: String,
    boardName: String,
    schoolCollegeName: String,
    overallPercentage: String,
    courseName: String,
    yearOfPassing: Date,
  },
  { _id: false }
);

const employeeDependent = new Schema(
  {
    dependentType: String,
    mobileNumber: String,
    firstName: String,
    lastName: String,
    emailId: String,
    occupation: String,
  },
  { _id: false }
);

const employeeExperience = new Schema(
  {
    employerName: String,
    jobTitle: String,
    employmentType: String,
    location: String,
    startDate: Date,
    endDate: Date,
  },
  { _id: false }
);

const EmployeeModel = new Schema(
  {
    instituteId: mongoose.Schema.Types.ObjectId,
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
  },
  {
    strict: true,
    timestamps: { updatedAt: "lastUpdated" },
    toJSON: { virtuals: true },
  }
);

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
  } else if (
    today.getMonth() === birthday.getMonth() &&
    today.getDate() < birthday.getDate()
  ) {
    thisYear = 1;
  }
  const age = today.getFullYear() - birthday.getFullYear() - thisYear;
  return age;
});

EmployeeModel.plugin(mongoosePaginate);

export const Employee = mongoose.model("Employee", EmployeeModel);
export const schema = Employee.schema;
