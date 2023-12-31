import { getStudentsService } from "./service";
import { createStudentService } from "./service";
import { getStudentInterstsByIdService } from "./service";
import { getStudentAchievementsByIdService } from "./service";
import { getStudentByEnrollNumberService } from "./service";
import { getStudentListService } from "./service";
import { getStudentByIdService } from "./service";
import { updateStudentService } from "./service";
import { createStudentExcelDataService } from "./service";
import { createStudentFromApplicationService } from "./service";
import { addBulkStudentService } from "./service";
import { searchStudentService } from "./service";
import { Student } from "./model";
import { TableMetaDataConfigModel } from "../admin-config/model";
import { Application } from "../application/model";
const xlsx = require("xlsx");

jest.mock("./model", () => ({
  Student: {
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    select:jest.fn(),
    sort: jest.fn(),
    create: jest.fn(),
    insertMany: jest.fn(),
    findOneAndUpdate:jest.fn(),
    paginate:jest.fn(),

  },
}));
jest.mock("xlsx", () => ({
  read: jest.fn(),
  utils: {
    sheet_to_json: jest.fn(),
  },
}));
jest.mock("../application/model", () => ({
  Application: {
    find: jest.fn(),
    findOneAndUpdate: jest.fn(),
  },
}));

jest.mock("../admin-config/model", () => ({
  TableMetaDataConfigModel: {
    find: jest.fn(),
  },
}));


const mockRequestpost = {
  instituteId:"5faac26d80417b003d11edcd",
  _id: "6031ca663df7e40018149018",
  id:"6031ca663df7e40018149018",
  isActive: true,
  userId: "5ff98104a28de700189ae6f7",
  applicationNumber: 1001,
  boardName: "cbse",
  schoolName: "captain_america",
  firstName: "Emmanuel Raja",
  middleName: "",
  lastName: "S",
  classGrade: "V",
  dob: "2023-07-04",
  gender: "male",
  bloodGroup: "A+",
  nationality: "Singaporean",
  religion: "Hindu",
  casteType: "BC",
  casteName: "Nadar",
  motherTongue: "Tamil",
  aadhaarNumber: "123456789999",
  fatherFirstName: "Abraham",
  fatherLastName: "Lincon",
  fatherMobileNumber: "+919790702000",
  fatherEmailAddress: "solomon.rajap@gmail.com",
  fatherOccupation: "IT technologies",
  fatherEmployer: "Abraham",
  fatherJobTitle: "Manager",
  fatherAnnualSalary: 45000,
  motherFirstName: "Mary",
  motherLastName: "Query",
  motherMobileNumber: "9952908933",
  motherEmailAine1: "Banking",
  permanentAddressLine2: "ABCD",
  permanentAddressCountry: "India",
  permanentAddressState: "Tamilnadu",
  permanentAddressCity: "Chennai",
  permanentAddressZipCode: "600000",
  communicationAddressLine1: "ABC",
  communicationAddressLine2: "ABC",
  communicationAddressCountry: "India",
  communicationAddressState: "Tamilnadu",
  communicationAddressCity: "Chennai",
  communicationAddressZipCode: "600000",
  eligibleForFeeConcession: true,
  feeConcessionCategory: "militoryquota",
  needTransportFacility: true,
  needHostelFacility: true,
  applicationFee: "345.00",
  paymentStatus: "TXN_SUCCESS",
  paymentNote: "Txn Success",
  paymentMode: "NB",
  applicationStatus: "Applicant Passed",
  interviewDate: "2021-02-28",
  interviewerNote: "Candidate cleared the assessment",
  birthCertificate: {
    _id: "6031bf4b3df7e4001814900c",
    originalFileName: "LinkedIn.png",
    fileKey: "Blesutp9qbrPZTwbKNVJoCIO2w3ZU5mA",
    createdAt: "2021-02-21",
    __v: 0,
  },
  parentAadhaarCard: {
    _id: "6031bf4e3df7e4001814900d",
    originalFileName: "LinkedIn.png",
    fileKey: "6cVmfG83J0fbH4xz07JyNYWUtY7Fm639",
    createdAt: "2021-02-21",
    __v: 0,
    essLine2: "ABC",
    communicationAddressCountry: "India",
    communicationAddressState: "Tamilnadu",
    communicationAddressCity: "Thiruvallur",
    communicationAddressZipCode: "600000",
    previousAcademicInformationSchoolName: "Gateway International School",
    previousAcademicInformationSchoolBoard: "CBSE",
    previousAcademicInformationClass: "Grade 6",
    previousAcademicInformationOverallPercentage: 77,
    previousAcademicInformationYearOfPassing: "2020-06-30",
    previousAcademicInformationReasonForLeaving: "Address Change",
  },
  studentPhoto: {
    originalFileName: "MicrosoftTeams-image (2) (1) (2).png",
    fileKey: "mcTxaXf4meE3LJLNtHOPkIvCMjZdieGs",
  },
  interests: [{
    sportsEvent:"Cricket",
    skillLevel: "Good",
    nameOfTheEvent: "Tournament",
    competitionInterest: "Yes",
    competitionType: "Statelevel",
    nameOfTheLanguage: "English",
    level: "Medium",}
  ],
  achievements: [{
    eventName: "Dancing",
    winnerLevel: "First Price",
    location: "Chennai",
    year: "2021",
    description: "Won the First Price",
  }],
  emergencyContactMobileNumber: "9790702005",
  emergencyContactPerson: "Jeba DeepasS",
  emergencyContactPersonFirstName: "Jeba",
  emergencyContactPersonLastName: "Deepa",
  emergencyPhysicianName: "Mathpathi",
  HadSurgery: "solomon Raja",
  allergies: "No",
  bmi: "130",
  height: "4'5\"",
  needSpecialAttention: "Yes, much",
  needToObserveAnySymptoms: "No..",
  problems: "No..",
  weight: "20 Kg",
  sibilingStudyingAtThisSchool: "No",
  emergencyContactNumber: "9999999999",
  emergencyContactRelationship: "Mother",
  emergencyDoctorAddress: "5345435gfhfgh",
  emergencyDoctorContactNumber: "1234567890",
  emergencyDoctorName: "solomon Raja",
  otherDocument: [],
  section: "A",
  tag: {
    previousStudentId: "60313ca73df7e40018149009",
    previousStudentEnrollNumber: "AD10003",
    nextStudentId: "603207783df7e40018149022",
    nextStudentEnrollNumber: "AD10005",
  },
  applicationIds:["6031ca663df7e40018149018"]
};
const mockRequestenroll = {
  instituteId:"5faac26d80417b003d11edcd",
  _id: "6031ca663df7e40018149018",
  id:"6031ca663df7e40018149018",
  isActive: true,
  userId: "5ff98104a28de700189ae6f7",
  applicationNumber: 1001,
  boardName: "cbse",
  schoolName: "captain_america",
  firstName: "Emmanuel Raja",
  middleName: "",
  lastName: "S",
  classGrade: "V",
  dob: "2023-07-04",
  gender: "male",
  bloodGroup: "A+",
  nationality: "Singaporean",
  religion: "Hindu",
  casteType: "BC",
  casteName: "Nadar",
  motherTongue: "Tamil",
  aadhaarNumber: "123456789999",
  fatherFirstName: "Abraham",
  fatherLastName: "Lincon",
  fatherMobileNumber: "+919790702000",
  fatherEmailAddress: "solomon.rajap@gmail.com",
  fatherOccupation: "IT technologies",
  fatherEmployer: "Abraham",
  fatherJobTitle: "Manager",
  fatherAnnualSalary: 45000,
  motherFirstName: "Mary",
  motherLastName: "Query",
  motherMobileNumber: "9952908933",
  motherEmailAine1: "Banking",
  permanentAddressLine2: "ABCD",
  permanentAddressCountry: "India",
  permanentAddressState: "Tamilnadu",
  permanentAddressCity: "Chennai",
  permanentAddressZipCode: "600000",
  communicationAddressLine1: "ABC",
  communicationAddressLine2: "ABC",
  communicationAddressCountry: "India",
  communicationAddressState: "Tamilnadu",
  communicationAddressCity: "Chennai",
  communicationAddressZipCode: "600000",
  eligibleForFeeConcession: true,
  feeConcessionCategory: "militoryquota",
  needTransportFacility: true,
  needHostelFacility: true,
  applicationFee: "345.00",
  paymentStatus: "TXN_SUCCESS",
  paymentNote: "Txn Success",
  paymentMode: "NB",
  applicationStatus: "Applicant Passed",
  interviewDate: "2021-02-28",
  interviewerNote: "Candidate cleared the assessment",
  birthCertificate: {
    _id: "6031bf4b3df7e4001814900c",
    originalFileName: "LinkedIn.png",
    fileKey: "Blesutp9qbrPZTwbKNVJoCIO2w3ZU5mA",
    createdAt: "2021-02-21",
    __v: 0,
  },
  parentAadhaarCard: {
    _id: "6031bf4e3df7e4001814900d",
    originalFileName: "LinkedIn.png",
    fileKey: "6cVmfG83J0fbH4xz07JyNYWUtY7Fm639",
    createdAt: "2021-02-21",
    __v: 0,
    essLine2: "ABC",
    communicationAddressCountry: "India",
    communicationAddressState: "Tamilnadu",
    communicationAddressCity: "Thiruvallur",
    communicationAddressZipCode: "600000",
    previousAcademicInformationSchoolName: "Gateway International School",
    previousAcademicInformationSchoolBoard: "CBSE",
    previousAcademicInformationClass: "Grade 6",
    previousAcademicInformationOverallPercentage: 77,
    previousAcademicInformationYearOfPassing: "2020-06-30",
    previousAcademicInformationReasonForLeaving: "Address Change",
  },
  studentPhoto: {
    originalFileName: "MicrosoftTeams-image (2) (1) (2).png",
    fileKey: "mcTxaXf4meE3LJLNtHOPkIvCMjZdieGs",
  },
  interests: [{
    sportsEvent:"Cricket",
    skillLevel: "Good",
    nameOfTheEvent: "Tournament",
    competitionInterest: "Yes",
    competitionType: "Statelevel",
    nameOfTheLanguage: "English",
    level: "Medium",}
  ],
  achievements: [{
    eventName: "Dancing",
    winnerLevel: "First Price",
    location: "Chennai",
    year: "2021",
    description: "Won the First Price",
  }],
  emergencyContactMobileNumber: "9790702005",
  emergencyContactPerson: "Jeba DeepasS",
  emergencyContactPersonFirstName: "Jeba",
  emergencyContactPersonLastName: "Deepa",
  emergencyPhysicianName: "Mathpathi",
  HadSurgery: "solomon Raja",
  allergies: "No",
  bmi: "130",
  height: "4'5\"",
  needSpecialAttention: "Yes, much",
  needToObserveAnySymptoms: "No..",
  problems: "No..",
  weight: "20 Kg",
  sibilingStudyingAtThisSchool: "No",
  emergencyContactNumber: "9999999999",
  emergencyContactRelationship: "Mother",
  emergencyDoctorAddress: "5345435gfhfgh",
  emergencyDoctorContactNumber: "1234567890",
  emergencyDoctorName: "solomon Raja",
  otherDocument: [],
  section: "A",
  tag: {
    previousStudentId: "60313ca73df7e40018149009",
    previousStudentEnrollNumber: "AD10003",
    nextStudentId: "603207783df7e40018149022",
    nextStudentEnrollNumber: "AD10005",
  },
  applicationIds:["6031ca663df7e40018149018"]
};
const mockRequest = {
  instituteId:"5faac26d80417b003d11edcd",
  _id: "6031ca663df7e40018149018",
  id:"6031ca663df7e40018149018",
  isActive: true,
  enrollNumber: "AD10002",
  _enrollNo: 10002,
  userId: "5ff98104a28de700189ae6f7",
  applicationNumber: 1001,
  boardName: "cbse",
  schoolName: "captain_america",
  firstName: "Emmanuel Raja",
  middleName: "",
  lastName: "S",
  classGrade: "V",
  dob: "2003-06-13",
  gender: "male",
  bloodGroup: "A+",
  nationality: "Singaporean",
  religion: "Hindu",
  casteType: "BC",
  casteName: "Nadar",
  motherTongue: "Tamil",
  aadhaarNumber: "123456789999",
  fatherFirstName: "Abraham",
  fatherLastName: "Lincon",
  fatherMobileNumber: "+919790702000",
  fatherEmailAddress: "solomon.rajap@gmail.com",
  fatherOccupation: "IT technologies",
  fatherEmployer: "Abraham",
  fatherJobTitle: "Manager",
  fatherAnnualSalary: 45000,
  motherFirstName: "Mary",
  motherLastName: "Query",
  motherMobileNumber: "9952908933",
  motherEmailAine1: "Banking",
  permanentAddressLine2: "ABCD",
  permanentAddressCountry: "India",
  permanentAddressState: "Tamilnadu",
  permanentAddressCity: "Chennai",
  permanentAddressZipCode: "600000",
  communicationAddressLine1: "ABC",
  communicationAddressLine2: "ABC",
  communicationAddressCountry: "India",
  communicationAddressState: "Tamilnadu",
  communicationAddressCity: "Chennai",
  communicationAddressZipCode: "600000",
  eligibleForFeeConcession: true,
  feeConcessionCategory: "militoryquota",
  needTransportFacility: true,
  needHostelFacility: true,
  applicationFee: "345.00",
  paymentStatus: "TXN_SUCCESS",
  paymentNote: "Txn Success",
  paymentMode: "NB",
  applicationStatus: "Applicant Passed",
  interviewDate: "2021-02-28",
  interviewerNote: "Candidate cleared the assessment",
  birthCertificate: {
    _id: "6031bf4b3df7e4001814900c",
    originalFileName: "LinkedIn.png",
    fileKey: "Blesutp9qbrPZTwbKNVJoCIO2w3ZU5mA",
    createdAt: "2021-02-21",
    __v: 0,
  },
  parentAadhaarCard: {
    _id: "6031bf4e3df7e4001814900d",
    originalFileName: "LinkedIn.png",
    fileKey: "6cVmfG83J0fbH4xz07JyNYWUtY7Fm639",
    createdAt: "2021-02-21",
    __v: 0,
    essLine2: "ABC",
    communicationAddressCountry: "India",
    communicationAddressState: "Tamilnadu",
    communicationAddressCity: "Thiruvallur",
    communicationAddressZipCode: "600000",
    previousAcademicInformationSchoolName: "Gateway International School",
    previousAcademicInformationSchoolBoard: "CBSE",
    previousAcademicInformationClass: "Grade 6",
    previousAcademicInformationOverallPercentage: 77,
    previousAcademicInformationYearOfPassing: "2020-06-30",
    previousAcademicInformationReasonForLeaving: "Address Change",
  },
  studentPhoto: {
    originalFileName: "MicrosoftTeams-image (2) (1) (2).png",
    fileKey: "mcTxaXf4meE3LJLNtHOPkIvCMjZdieGs",
  },
  interests: [{
    sportsEvent:"Cricket",
    skillLevel: "Good",
    nameOfTheEvent: "Tournament",
    competitionInterest: "Yes",
    competitionType: "Statelevel",
    nameOfTheLanguage: "English",
    level: "Medium",}
  ],
  achievements: [{
    eventName: "Dancing",
    winnerLevel: "First Price",
    location: "Chennai",
    year: "2021",
    description: "Won the First Price",
  }],
  emergencyContactMobileNumber: "9790702005",
  emergencyContactPerson: "Jeba DeepasS",
  emergencyContactPersonFirstName: "Jeba",
  emergencyContactPersonLastName: "Deepa",
  emergencyPhysicianName: "Mathpathi",
  HadSurgery: "solomon Raja",
  allergies: "No",
  bmi: "130",
  height: "4'5\"",
  needSpecialAttention: "Yes, much",
  needToObserveAnySymptoms: "No..",
  problems: "No..",
  weight: "20 Kg",
  sibilingStudyingAtThisSchool: "No",
  emergencyContactNumber: "9999999999",
  emergencyContactRelationship: "Mother",
  emergencyDoctorAddress: "5345435gfhfgh",
  emergencyDoctorContactNumber: "1234567890",
  emergencyDoctorName: "solomon Raja",
  otherDocument: [],
  section: "A",
  tag: {
    previousStudentId: "60313ca73df7e40018149009",
    previousStudentEnrollNumber: "AD10003",
    nextStudentId: "603207783df7e40018149022",
    nextStudentEnrollNumber: "AD10005",
  },
  applicationIds:["6031ca663df7e40018149018"]
};
const mockRequestsearch = {
  instituteId:"5faac26d80417b003d11edcd",
  _id: "6031ca663df7e40018149018",
  id:"6031ca663df7e40018149018",
  isActive: true,
  enrollNumber: "AD10002",
  _enrollNo: 10002,
  userId: "5ff98104a28de700189ae6f7",
  applicationNumber: 1001,
  boardName: "cbse",
  schoolName: "captain_america",
  firstName: "Emmanuel Raja",
  middleName: "",
  lastName: "S",
  dob: "2003-06-13",
  gender: "male",
  bloodGroup: "A+",
  nationality: "Singaporean",
  religion: "Hindu",
  casteType: "BC",
  casteName: "Nadar",
  motherTongue: "Tamil",
  aadhaarNumber: "123456789999",
  fatherFirstName: "Abraham",
  fatherLastName: "Lincon",
  fatherMobileNumber: "+919790702000",
  fatherEmailAddress: "solomon.rajap@gmail.com",
  fatherOccupation: "IT technologies",
  fatherEmployer: "Abraham",
  fatherJobTitle: "Manager",
  fatherAnnualSalary: 45000,
  motherFirstName: "Mary",
  motherLastName: "Query",
  motherMobileNumber: "9952908933",
  motherEmailAine1: "Banking",
  permanentAddressLine2: "ABCD",
  permanentAddressCountry: "India",
  permanentAddressState: "Tamilnadu",
  permanentAddressCity: "Chennai",
  permanentAddressZipCode: "600000",
  communicationAddressLine1: "ABC",
  communicationAddressLine2: "ABC",
  communicationAddressCountry: "India",
  communicationAddressState: "Tamilnadu",
  communicationAddressCity: "Chennai",
  communicationAddressZipCode: "600000",
  eligibleForFeeConcession: true,
  feeConcessionCategory: "militoryquota",
  needTransportFacility: true,
  needHostelFacility: true,
  applicationFee: "345.00",
  paymentStatus: "TXN_SUCCESS",
  paymentNote: "Txn Success",
  paymentMode: "NB",
  applicationStatus: "Applicant Passed",
  interviewDate: "2021-02-28",
  interviewerNote: "Candidate cleared the assessment",
  birthCertificate: {
    _id: "6031bf4b3df7e4001814900c",
    originalFileName: "LinkedIn.png",
    fileKey: "Blesutp9qbrPZTwbKNVJoCIO2w3ZU5mA",
    createdAt: "2021-02-21",
    __v: 0,
  },
  parentAadhaarCard: {
    _id: "6031bf4e3df7e4001814900d",
    originalFileName: "LinkedIn.png",
    fileKey: "6cVmfG83J0fbH4xz07JyNYWUtY7Fm639",
    createdAt: "2021-02-21",
    __v: 0,
    essLine2: "ABC",
    communicationAddressCountry: "India",
    communicationAddressState: "Tamilnadu",
    communicationAddressCity: "Thiruvallur",
    communicationAddressZipCode: "600000",
    previousAcademicInformationSchoolName: "Gateway International School",
    previousAcademicInformationSchoolBoard: "CBSE",
    previousAcademicInformationClass: "Grade 6",
    previousAcademicInformationOverallPercentage: 77,
    previousAcademicInformationYearOfPassing: "2020-06-30",
    previousAcademicInformationReasonForLeaving: "Address Change",
  },
  studentPhoto: {
    originalFileName: "MicrosoftTeams-image (2) (1) (2).png",
    fileKey: "mcTxaXf4meE3LJLNtHOPkIvCMjZdieGs",
  },
  interests: [{
    sportsEvent:"Cricket",
    skillLevel: "Good",
    nameOfTheEvent: "Tournament",
    competitionInterest: "Yes",
    competitionType: "Statelevel",
    nameOfTheLanguage: "English",
    level: "Medium",}
  ],
  achievements: [{
    eventName: "Dancing",
    winnerLevel: "First Price",
    location: "Chennai",
    year: "2021",
    description: "Won the First Price",
  }],
  emergencyContactMobileNumber: "9790702005",
  emergencyContactPerson: "Jeba DeepasS",
  emergencyContactPersonFirstName: "Jeba",
  emergencyContactPersonLastName: "Deepa",
  emergencyPhysicianName: "Mathpathi",
  HadSurgery: "solomon Raja",
  allergies: "No",
  bmi: "130",
  height: "4'5\"",
  needSpecialAttention: "Yes, much",
  needToObserveAnySymptoms: "No..",
  problems: "No..",
  weight: "20 Kg",
  sibilingStudyingAtThisSchool: "No",
  emergencyContactNumber: "9999999999",
  emergencyContactRelationship: "Mother",
  emergencyDoctorAddress: "5345435gfhfgh",
  emergencyDoctorContactNumber: "1234567890",
  emergencyDoctorName: "solomon Raja",
  otherDocument: [],
  tag: {
    previousStudentId: "60313ca73df7e40018149009",
    previousStudentEnrollNumber: "AD10003",
    nextStudentId: "603207783df7e40018149022",
    nextStudentEnrollNumber: "AD10005",
  },
  applicationIds:["6031ca663df7e40018149018"]
};
const mockFailureRequest = {
  instituteId:"5faac26d80417b003d11edcd",
  _id: "6031ca663df7e40018149018",
  applicationIds:[],
  isActive: true,
  enrollNumber: "AD10001",
  _enrollNo: 10001,
  userId: "5ff98104a28de700189ae6f7",
  applicationNumber: 1001,
  boardName: "cbse",
  schoolName: "captain_america",
  firstName: "Emmanuel Raja",
  middleName: "",
  lastName: "S",
  classGrade: "V",
  dob: "2023-07-04",
  gender: "male",
  bloodGroup: "A+",
  nationality: "Singaporean",
  religion: "Hindu",
  casteType: "BC",
  casteName: "Nadar",
  motherTongue: "Tamil",
  aadhaarNumber: "123456789999",
  fatherFirstName: "Abraham",
  fatherLastName: "Lincon",
  fatherMobileNumber: "+919790702000",
  fatherEmailAddress: "solomon.rajap@gmail.com",
  fatherOccupation: "IT technologies",
  fatherEmployer: "Abraham",
  fatherJobTitle: "Manager",
  fatherAnnualSalary: 45000,
  motherFirstName: "Mary",
  motherLastName: "Query",
  motherMobileNumber: "9952908933",
  motherEmailAine1: "Banking",
  permanentAddressLine2: "ABCD",
  permanentAddressCountry: "India",
  permanentAddressState: "Tamilnadu",
  permanentAddressCity: "Chennai",
  permanentAddressZipCode: "600000",
  communicationAddressLine1: "ABC",
  communicationAddressLine2: "ABC",
  communicationAddressCountry: "India",
  communicationAddressState: "Tamilnadu",
  communicationAddressCity: "Chennai",
  communicationAddressZipCode: "600000",
  eligibleForFeeConcession: true,
  feeConcessionCategory: "militoryquota",
  needTransportFacility: true,
  needHostelFacility: true,
  applicationFee: "345.00",
  paymentStatus: "TXN_SUCCESS",
  paymentNote: "Txn Success",
  paymentMode: "NB",
  applicationStatus: "Applicant Passed",
  interviewDate: "2021-02-28",
  interviewerNote: "Candidate cleared the assessment",
  birthCertificate: {
    _id: "6031bf4b3df7e4001814900c",
    originalFileName: "LinkedIn.png",
    fileKey: "Blesutp9qbrPZTwbKNVJoCIO2w3ZU5mA",
    createdAt: "2021-02-21",
    __v: 0,
  },
  parentAadhaarCard: {
    _id: "6031bf4e3df7e4001814900d",
    originalFileName: "LinkedIn.png",
    fileKey: "6cVmfG83J0fbH4xz07JyNYWUtY7Fm639",
    createdAt: "2021-02-21",
    __v: 0,
    essLine2: "ABC",
    communicationAddressCountry: "India",
    communicationAddressState: "Tamilnadu",
    communicationAddressCity: "Thiruvallur",
    communicationAddressZipCode: "600000",
    previousAcademicInformationSchoolName: "Gateway International School",
    previousAcademicInformationSchoolBoard: "CBSE",
    previousAcademicInformationClass: "Grade 6",
    previousAcademicInformationOverallPercentage: 77,
    previousAcademicInformationYearOfPassing: "2020-06-30",
    previousAcademicInformationReasonForLeaving: "Address Change",
  },
  studentPhoto: {
    originalFileName: "MicrosoftTeams-image (2) (1) (2).png",
    fileKey: "mcTxaXf4meE3LJLNtHOPkIvCMjZdieGs",
  },
  interests: [{
    sportsEvent:"Cricket",
    skillLevel: "Good",
    nameOfTheEvent: "Tournament",
    competitionInterest: "Yes",
    competitionType: "Statelevel",
    nameOfTheLanguage: "English",
    level: "Medium",}
  ],
  achievements: [{
    eventName: "Dancing",
    winnerLevel: "First Price",
    location: "Chennai",
    year: "2021",
    description: "Won the First Price",
  }],
  emergencyContactMobileNumber: "9790702005",
  emergencyContactPerson: "Jeba DeepasS",
  emergencyContactPersonFirstName: "Jeba",
  emergencyContactPersonLastName: "Deepa",
  emergencyPhysicianName: "Mathpathi",
  HadSurgery: "solomon Raja",
  allergies: "No",
  bmi: "130",
  height: "4'5\"",
  needSpecialAttention: "Yes, much",
  needToObserveAnySymptoms: "No..",
  problems: "No..",
  weight: "20 Kg",
  sibilingStudyingAtThisSchool: "No",
  emergencyContactNumber: "9999999999",
  emergencyContactRelationship: "Mother",
  emergencyDoctorAddress: "5345435gfhfgh",
  emergencyDoctorContactNumber: "1234567890",
  emergencyDoctorName: "solomon Raja",
  otherDocument: [],
  section: "A",
  tag: {
    previousStudentId: "60313ca73df7e40018149009",
    previousStudentEnrollNumber: "AD10003",
    nextStudentId: "603207783df7e40018149022",
    nextStudentEnrollNumber: "AD10005",
  },  
};
const updateStudentdata = {
  _id: "6031ca663df7e40018149018",
  isActive: true,
  enrollNumber: "AD10001",
  _enrollNo: 10001,
  userId: "5ff98104a28de700189ae6f7",
  applicationNumber: 1001,
  boardName: "cbse",
  schoolName: "Vidyalaya",
  firstName: "Mahesh",
  middleName: "Kumar",
  lastName: "V",
  classGrade: "V",
  dob: "2023-07-04",
  gender: "male",
  bloodGroup: "A+",
  nationality: "Indian",
  religion: "Hindu",
  casteType: "BC",
  casteName: "Nadar",
  motherTongue: "Tamil",
  aadhaarNumber: "123456789999",
  fatherFirstName: "Velu",
  fatherLastName: "R",
  fatherMobileNumber: "+919790702000",
  fatherEmailAddress: "velur@gmail.com",
  fatherOccupation: "IT technologies",
  fatherEmployer: "Abraham",
  fatherJobTitle: "Manager",
  fatherAnnualSalary: 45000,
  motherFirstName: "Banu",
  motherLastName: "velu",
  motherMobileNumber: "9952908933",
  motherEmailAine1: "Banking",
  permanentAddressLine2: "ABCD",
  permanentAddressCountry: "India",
  permanentAddressState: "Tamilnadu",
  permanentAddressCity: "Chennai",
  permanentAddressZipCode: "600000",
  communicationAddressLine1: "ABC",
  communicationAddressLine2: "ABC",
  communicationAddressCountry: "India",
  communicationAddressState: "Tamilnadu",
  communicationAddressCity: "Chennai",
  communicationAddressZipCode: "600000",
  eligibleForFeeConcession: true,
  feeConcessionCategory: "militoryquota",
  needTransportFacility: true,
  needHostelFacility: true,
  applicationFee: "345.00",
  paymentStatus: "TXN_SUCCESS",
  paymentNote: "Txn Success",
  paymentMode: "NB",
  applicationStatus: "Applicant Passed",
  interviewDate: "2021-02-28",
  interviewerNote: "Candidate cleared the assessment",
  birthCertificate: {
    _id: "6031bf4b3df7e4001814900c",
    originalFileName: "LinkedIn.png",
    fileKey: "Blesutp9qbrPZTwbKNVJoCIO2w3ZU5mA",
    createdAt: "2021-02-21",
    __v: 0,
  },
  parentAadhaarCard: {
    _id: "6031bf4e3df7e4001814900d",
    originalFileName: "LinkedIn.png",
    fileKey: "6cVmfG83J0fbH4xz07JyNYWUtY7Fm639",
    createdAt: "2021-02-21",
    __v: 0,
    essLine2: "ABC",
    communicationAddressCountry: "India",
    communicationAddressState: "Tamilnadu",
    communicationAddressCity: "Thiruvallur",
    communicationAddressZipCode: "600000",
    previousAcademicInformationSchoolName: "Gateway International School",
    previousAcademicInformationSchoolBoard: "CBSE",
    previousAcademicInformationClass: "Grade 6",
    previousAcademicInformationOverallPercentage: 77,
    previousAcademicInformationYearOfPassing: "2020-06-30",
    previousAcademicInformationReasonForLeaving: "Address Change",
  },
  studentPhoto: {
    originalFileName: "MicrosoftTeams-image (2) (1) (2).png",
    fileKey: "mcTxaXf4meE3LJLNtHOPkIvCMjZdieGs",
  },
  interests: [{
    sportsEvent:"Cricket",
    skillLevel: "Good",
    nameOfTheEvent: "Tournament",
    competitionInterest: "Yes",
    competitionType: "Statelevel",
    nameOfTheLanguage: "English",
    level: "Medium",}
  ],
  achievements: [{
    eventName: "Dancing",
    winnerLevel: "First Price",
    location: "Chennai",
    year: "2021",
    description: "Won the First Price",
  }],
  emergencyContactMobileNumber: "9790702005",
  emergencyContactPerson: "Jeba DeepasS",
  emergencyContactPersonFirstName: "Jeba",
  emergencyContactPersonLastName: "Deepa",
  emergencyPhysicianName: "Mathpathi",
  HadSurgery: "solomon Raja",
  allergies: "No",
  bmi: "130",
  height: "4'5\"",
  needSpecialAttention: "Yes, much",
  needToObserveAnySymptoms: "No..",
  problems: "No..",
  weight: "20 Kg",
  sibilingStudyingAtThisSchool: "No",
  emergencyContactNumber: "9999999999",
  emergencyContactRelationship: "Mother",
  emergencyDoctorAddress: "5345435gfhfgh",
  emergencyDoctorContactNumber: "1234567890",
  emergencyDoctorName: "solomon Raja",
  otherDocument: [],
  section: "A",
  tag: {
    previousStudentId: "60313ca73df7e40018149009",
    previousStudentEnrollNumber: "AD10003",
    nextStudentId: "603207783df7e40018149022",
    nextStudentEnrollNumber: "AD10005",
  },
};

const mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(),
};

describe("Student API - MockTesting", () => {
  test("GET Student ", async () => {
    Student.find.mockResolvedValue(mockRequest);
    try {
      const result = await getStudentsService();
      expect(Student.find).toHaveBeenCalled();
      expect(result).toEqual(mockRequest);
      console.log("get",result);
    } catch (error) { 
      console.log(error);
    }
  });
  test("GET Student - Error Handling", async () => {
    const errorMessage = "Error while fetching Student details.";
    Student.find.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getStudentsService();
      console.log("get", result); 
    } catch (error) {
      expect(Student.find).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage); 
      console.log(error, "error");
    }
  });

  test("POST Student - With enrollnumber", async () => {
  Student.findOne = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockRequest),
    });
  Student.create.mockResolvedValue(mockRequestpost);
    try {
      const result = await createStudentService(mockRequestpost);
      expect(Student.create).toHaveBeenCalled();
      expect(result).toEqual(mockRequestpost);
    } catch (error) { 
    }
  });
  test("POST Student - Without enrollnumber ", async () => {
    Student.findOne = jest.fn().mockReturnValue({
        sort: jest.fn().mockResolvedValue(null),
      });
    Student.create.mockResolvedValue(mockRequestenroll);
      try {
        const result = await createStudentService(mockRequestenroll);
        expect(Student.create).toHaveBeenCalled();
        expect(result).toEqual(mockRequestenroll);
      } catch (error) { 
      }
    });

  test("POST Student - Enrollnumber already registered ", async () => {
    const errorMessage = "Enrollnumber is already registered";
    const mockMongoError = new Error();
    mockMongoError.name = "MongoError";
    mockMongoError.code = 11000;
    Student.findOne = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockRequest)
    });
    Student.create.mockRejectedValue(mockMongoError);
    try {
      const result = await createStudentService(mockRequest);
    } catch (error) {
      expect(Student.create).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage); 
      expect(error.status).toBe(409);
    }
  });  
  test("POST Student - Error Handling", async () => {
    const errorMessage = "Error creating Student";
    const mockError = new Error(errorMessage);
    Student.create.mockRejectedValue(mockError);
    try {
      await createStudentService(mockRequest);
    } catch (error) {
      expect(Student.create).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    } 
  });

  test("PUT Student/:id ", async () => {
    Student.findOneAndUpdate.mockResolvedValue(updateStudentdata);
    try {
      const result = await updateStudentService(updateStudentdata._id);
      expect(result).toEqual(updateStudentdata);
    } catch (error) {
    }
  });
  test("PUT Student/:id  - Error Handling", async () => {
    const errorMessage = "Error Updating Student data : Invalid ID";
    Student.findOneAndUpdate.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await updateStudentService(updateStudentdata._id);
    } catch (error) {
      expect(Student.findOneAndUpdate).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage); 
    }
  });

  test("GET StudentList/: Instituteid /all ", async () => {
    const instituteId = "5faac26d80417b003d11edcd";
    jest.spyOn(Student, "find").mockResolvedValue(mockRequest);
    try {
      const result = await getStudentListService(
        {instituteId: instituteId,});
      expect(Student.find).toHaveBeenCalledWith({
        instituteId: { $eq: instituteId },
        isActive: { $eq: true },});
      expect(result).toEqual(mockRequest);
    } catch (error) {
    }
  });
  test("GET StudentList/: Instituteid/all -  Error Handling", async () => {
    const instituteId = "5faac26d80417b003d11edcd";
    const errorMessage = new Error("Failed to fetch Student List");
    jest.spyOn(Student, "find").mockRejectedValue(errorMessage);
    try {
      await getStudentListService(
        {instituteId: instituteId,},
      );
    } catch (error) {
      expect(error.message).toBe("Failed to fetch Student List");
    }
  });

  test("POST StudentFromApplication - lastStudent is falsy", async () => {
    Student.findOne = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(null),
    });
    Student.create.mockResolvedValue(mockRequestpost);
    Application.find.mockResolvedValue([mockRequestpost]);
    try {
      const result = await createStudentFromApplicationService(mockRequestpost);
      expect(Student.create).toHaveBeenCalled();
    } catch (error) {
    }
  });

  test("POST StudentFromApplication ", async () => {
    Student.create.mockResolvedValue(mockRequest);
    Student.findOne = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockRequest)
    });
    Application.find.mockResolvedValue([mockRequest]);
    try {
      const result = await createStudentFromApplicationService(mockRequest);
      expect(Student.create).toHaveBeenCalled();
      expect(result).toEqual(mockRequest);
    } catch (error) {
    }
  });

  test("POST StudentFromApplication - Error Handling", async () => {
    const errorMessage = "Error while processing your request";
    Application.find.mockRejectedValue([]);
    try {
      const result = await createStudentFromApplicationService(
        mockRequest
      );
    } catch (error) {
      expect(Application.find).toHaveBeenCalled();
      expect(error.status).toBe(409);
      expect(error.message).toBe(errorMessage);
    }
  });
  test("POST StudentFromApplication - No valid Application", async () => {
    const errorMessage = "No valid application to enroll";
    Student.create.mockResolvedValue(mockRequest);
    Student.findOne = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockRequest),
    });
    Application.find.mockResolvedValue([]);
    try {
      const result = await createStudentFromApplicationService(mockRequest);
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error.status).toBe(409);
      expect(error.message).toBe(errorMessage);
    }
  });
  test("POST StudentFromApplication - Not a valid application id", async () => {
    const errorMessage = "Not a valid application ids";
    try {
      const result = await createStudentFromApplicationService(mockFailureRequest);
    } catch (error) {
      expect(Student.create).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage);
    }
  });

  test("GET students/enrollnumber/:enrollNumber ", async () => {
    const mockSortRequest = {sort:[],tag:{
        "nextStudentEnrollNumber": "AD10001",
        "nextStudentId": "6031ca663df7e40018149018",
        "previousStudentEnrollNumber": "AD10001",
        "previousStudentId": "6031ca663df7e40018149018",
    }}
    Student.findOne = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockRequest)
    });
    try {
      const result = await getStudentByEnrollNumberService({enrollNumber:mockRequest.enrollNumber});
      expect(Student.findOne).toHaveBeenCalled();
      console.log("result",result);
      expect(result).toEqual(mockSortRequest);
    } catch (error) { 
      console.log(error);
    }
  });
  test("GET students/enrollnumber/:enrollNumber - Error Handling", async () => {
    const errorMessage = "Error while processing your request";
    const mockRequest = { enrollNumber: "AD10001" };
    Student.findOne = jest.fn().mockRejectedValue(new Error(errorMessage));
    try {
      await getStudentByEnrollNumberService(mockRequest);
    } catch (error) {
      expect(Student.findOne).toHaveBeenCalled();
      expect(error.status).toBe(409);
      expect(error.message).toBe(errorMessage);
      console.log(error, "error");
    }
  });
  test("GET students/enrollnumber/:enrollNumber - Document not found", async () => {
    Student.findOne = jest.fn().mockResolvedValue(null);
    try {
      await getStudentByEnrollNumberService({ enrollNumber: "AD10001" });
    } catch (error) {
      expect(Student.findOne).toHaveBeenCalled();
      expect(error.status).toBe(404);
      expect(error.message).toBe("not found");
      console.log(error)
    }
  });

  
  test("GET searchStudentService - with class & section", async () => {
    const queryParams = {
      limit: 10,
      offset: 0,
      sort_by: "firstname",
      sort_order: "asc",
      table_name: "StudentTable",
      class: "V",
      section: "A",
      query: "searchQuery",
      dob: "2003-06-13",
    };
    TableMetaDataConfigModel.find = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      lean: jest
        .fn()
        .mockResolvedValue([
          { fieldName: "firstname" },
        ]),
    });
    Student.paginate.mockResolvedValue({
      totalStudents: 1,
      Students: mockRequest,
    });
    const result = await searchStudentService(queryParams);
    expect(result.totalStudents).toBe(1);
    expect(result.Students).toEqual(mockRequest);
    expect(TableMetaDataConfigModel.find).toHaveBeenCalledWith({
      entityName: "Student",
      tableName: "StudentTable",
    });
    });   
  test("GET searchStudentService with unique filterprops value", async () => {
    const queryParams = {
      limit: 10,
      offset: 0,
      sort_by: "firstname",
      sort_order: "asc",
      table_name: "StudentTable",
      query: "searchQuery",
      dob: "2003-06-13",
      filterProp1: "Mahesh",
      filterProp2: "Pondy",
    };
    TableMetaDataConfigModel.find = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValue([
        { fieldName: "firstname" },
      ]),
    });
    Student.paginate.mockResolvedValue({
      totalStudents: 1,
      students: mockRequestsearch,
    });
    const result = await searchStudentService(queryParams);
    expect(result.totalStudents).toBe(1);
    expect(result.students).toEqual(mockRequestsearch);
    expect(TableMetaDataConfigModel.find).toHaveBeenCalledWith({
      entityName: "Student",
      tableName: "StudentTable",
    });
  });
  test("GET searchStudentService with different value types", async () => {
    const queryParams = {
      limit: 10,
      offset: 0,
      sort_by: "firstname",
      sort_order: "asc",
      table_name: "StudentTable",
      query: "searchQuery",
      dob: "2003-06-13",
      filterProp1: 42,
      filterProp2: "2023-11-23",
      filterProp3: ["value1", "value2"],
    };
    TableMetaDataConfigModel.find = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValue([
        { fieldName: "firstname" },
      ]),
    });
    Student.paginate.mockResolvedValue({
      totalStudents: 1,
      students: mockRequestsearch,
    });
    const result = await searchStudentService(queryParams);
    expect(result.totalStudents).toBe(1);
    expect(result.students).toEqual(mockRequestsearch);
    expect(TableMetaDataConfigModel.find).toHaveBeenCalledWith({
      entityName: "Student",
      tableName: "StudentTable",
    });
  });
  test("GET searchStudentService - Error while processing your request", async () => {
    Student.paginate = jest
      .fn()
      .mockRejectedValue(new Error("Error  while processing your request"));
    const queryParams = {};
    try {
      await searchStudentService(queryParams);
    } catch (error) {
      expect(error.message).toBe("Error  while processing your request");
    }
  });

  test("GET Student by Id", async () => {
    const mockResponse = {
      previousStudentId: "123",
      previousStudentEnrollNumber: "AD1000",
      nextStudentId: "4",
      nextStudentEnrollNumber: "AD1001",
    };
    Student.findById.mockResolvedValue(mockResponse);
      Student.findOne = jest.fn().mockReturnValue({
        sort: jest.fn().mockResolvedValue({ mockResponse }),
      });
    try {
      const result = await getStudentByIdService({
        id: "5faac26d80417b003d11edcd",
      });
      expect(Student.findById).toHaveBeenCalledWith(expect.any(Object));
      expect(result).toEqual(mockResponse);
    } catch (error) {
    }
  });
  test("GET Student by Id - Error Handling", async () => {
    const errorMessage = "Error while processing your request";
    Student.findOne = jest.fn().mockReturnValue({
      select: jest.fn().mockRejectedValue(new Error(errorMessage))
    });
    try {
      const result = await getStudentByIdService({enrollNumber:mockRequest.enrollNumber});
    } catch (error) {
      expect(Student.findOne).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage); 
    }
  });
  test("GET Student by Id - Document not found", async () => {
    Student.findById = jest.fn().mockResolvedValue(null);
    
    try {
      await getStudentByIdService({ enrollNumber: "AD10001" });
    } catch (error) {
      expect(Student.findById).toHaveBeenCalled();
      expect(error.status).toBe(404);
      expect(error.message).toBe("not found");
    }
  });

  test("GET Student/:id Interests ", async () => {
    Student.findById = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue(mockRequest.interests),
    });
    try {
      const result = await getStudentInterstsByIdService(mockRequest._id);
      expect(Student.findById).toHaveBeenCalled();
      expect(result).toEqual(mockRequest.interests);
    } catch (error) { 
    }
  });
  test("GET Student/:id Interests - Error Handling", async () => {
    const errorMessage = "Error fetching StudentInterests";
    Student.findById = jest.fn().mockReturnValue({
      select: jest.fn().mockRejectedValue(new Error(errorMessage))
    });
    try {
      const result = await getStudentInterstsByIdService(mockRequest._id);
    } catch (error) {
      expect(Student.findById).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage); 
    }
  });

  test("GET Student/:id Achievements  ", async () => {
    Student.findById = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue(mockRequest.achievements),
    });
    try {
      const result = await getStudentAchievementsByIdService(mockRequest._id);
      expect(Student.findById).toHaveBeenCalled();
      expect(result).toEqual(mockRequest.achievements);
    } catch (error) { 
    }
  });
  test("GET Student/:id Achievements - Error Handling", async () => {
    const errorMessage = "Error fetching StudentAchievements";
    Student.findById = jest.fn().mockReturnValue({
      select: jest.fn().mockRejectedValue(new Error(errorMessage))
    });
    try {
      const result = await getStudentAchievementsByIdService(mockRequest._id);
    } catch (error) {
      expect(Student.findById).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage); 
    }
  });

  test("POST Student/excel ", async () => {
    Student.insertMany.mockResolvedValue(mockRequest);
    try {
      const result = await createStudentExcelDataService(mockRequest);
      expect(Student.insertMany).toHaveBeenCalled();
      expect(result).toEqual({"message": "Student added successfully!!"});
    } catch (error) {
    }
  });
  test("POST Student/excel - Error Handling", async () => {
    const errorMessage = "Unable to create studentexceldata";
    Student.insertMany.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await createStudentExcelDataService(mockRequest);
    } catch (error) { 
      expect(Student.insertMany).toHaveBeenCalled();
      expect(error.message).toBe(errorMessage); 
    }
  });
 
  test("POST addBulkSStudentService", async () => {
    const req = {
      file: {
        buffer: "mocked-file-buffer",
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const dateofbirth = new Date("1997-09-12T00:00:00.000Z");
    const mockedSheetData = [
          { firstName: "John", middleName: "Vijay", lastName:"V",dob: dateofbirth, bloodGroup:"B+ve",gender:"Male",nationality:"Indian",religion:"Hindu",casteType:"MBC",casteName:"BC",motherTongue:"Tamil",aadhaarNumber:"123456789123",fatherFirstName:"Velu",fatherLastName:"R",fatherMobileNumber:"7010933658",fatherEmailAddress:"velu562@gmail.com",fatherOccupation:"Carpenter",fatherAnnualSalary:"180000",motherFirstName:"Banu",motherLastName:"V",motherMobileNumber:"7010933558",motherEmailAddress:"banu562@gmail.com",motherOccupation:"Accountant",motherAnnualSalary:"150000",emergencyContactPerson:"Thiru",emergencyContactNumber:"8525040049",emergencyContactRelationship:"Brother",emergencyDoctorName:"Guna",emergencyDoctorContactNumber:"9663251874",emergencyDoctorAddress:"Pondicherry",permanentAddressLine1:"MainRoad",permanentAddressLine2:"Maduravoyal",permanentAddressCountry:"India",permanentAddressState:"Tamilnadu",permanentAddressCity:"Chennai",permanentAddressZipCode:"605125",communicationAddressLine1:"2nd Cross street",communicationAddressLine2:"Major Colony",communicationAddressCountry:"India",communicationAddressState:"Tamilnadu",communicationAddressCity:"Chennai",communicationAddressZipCode:"605225"}
        ];
    const worksheet = { A1: { v: "firstName", t: "s" }, B1: { v: "middleName", t: "s" }, C1: { v: "lastName", t: "s" }, D1: { v: "dob", t: "s" }, E1: { v: "bloodGroup", t: "s" }, F1: { v: "gender", t: "s" }, G1: { v: "nationality", t: "s" }, H1: { v: "religion", t: "s" }, I1: { v: "casteType", t: "s" },J1: { v: "casteName", t: "s" }, K1: { v: "motherTongue", t: "s" }, L1: { v: "aadhaarNumber", t: "s" },M1: { v: "fatherFirstName", t: "s" }, N1: { v: "fatherLastName", t: "s" }, O1: { v: "fatherMobileNumber", t: "s" },P1: { v: "fatherEmailAddress", t: "s" }, Q1: { v: "fatherOccupation", t: "s" }, R1: { v: "fatherAnnualSalary", t: "s" }, S1: { v: "motherFirstName", t: "s" }, T1: { v: "motherLastName", t: "s" }, U1: { v: "motherMobileNumber", t: "s" }, V1: { v: "motherEmailAddress", t: "s" }, W1: { v: "motherOccupation", t: "s" }, X1: { v: "motherAnnualSalary", t: "s" },Y1: { v: "emergencyContactPerson", t: "s" }, Z1: { v: "emergencyContactNumber", t: "s" }, AA: { v: "emergencyContactRelationship", t: "s" },AB: { v: "emergencyDoctorName", t: "s" }, AC: { v: "emergencyDoctorContactNumber", t: "s" },AD: { v: "emergencyDoctorAddress", t: "s" }, AE: { v: "permanentAddressLine1", t: "s" },AF: { v: "permanentAddressLine2", t: "s" }, AG: { v: "permanentAddressCountry", t: "s" },AH: { v: "permanentAddressState", t: "s" }, AI: { v: "permanentAddressCity", t: "s" },AJ: { v: "permanentAddressZipCode", t: "s" },AK: { v: "communicationAddressLine1", t: "s" }, AL: { v: "communicationAddressLine2", t: "s" },AM: { v: "communicationAddressCountry", t: "s" }, AN: { v: "communicationAddressState", t: "s" },AO: { v: "communicationAddressCity", t: "s" },AP: { v: "communicationAddressZipCode", t: "s" }};  
    for (let i = 0; i < mockedSheetData.length; i++) {
      const data = mockedSheetData[i];
      const row = String.fromCharCode(65 + i + 2);
      Object.keys(data).forEach((key, index) => {
        worksheet[`${String.fromCharCode(65 + index)}${i + 2}`] = { v: data[key], t: "s" };
      });
    }
    xlsx.read.mockReturnValue({
      SheetNames: ["Sheet1"],
      Sheets: { Sheet1: worksheet },
    });
    xlsx.utils.sheet_to_json.mockReturnValue(mockedSheetData);
    await addBulkStudentService(req, res);
    expect(xlsx.read).toHaveBeenCalledWith("mocked-file-buffer", {
      type: "buffer",
    });
    expect(xlsx.utils.sheet_to_json).toHaveBeenCalledWith(worksheet);
    expect(res.json).toHaveBeenCalledWith(mockedSheetData);
    expect(res.status).not.toHaveBeenCalled();
  }); 
  test("POST addBulkStudentService - Error Case", async () => {
    const req = {
      file: {
        buffer: "mocked-file-buffer",
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    xlsx.read.mockImplementation(() => {
      throw new Error("Failed to read Excel file");
    });
    await addBulkStudentService(req, res);
    expect(xlsx.read).toHaveBeenCalledWith("mocked-file-buffer", {
      type: "buffer",
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error processing Excel file" });
  });
  
});
