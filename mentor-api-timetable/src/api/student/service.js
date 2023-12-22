import { notFoundError } from "../../common/response";
import { TableMetaDataConfigModel } from "../admin-config";
import { Application } from "../application/model";

import { Student } from "./model";
import { validateExcelData } from "./validator";
const { ObjectId } = require("bson");
const xlsx = require("xlsx");
const csvtojson = require("csvtojson");
const xlsxFile = require("read-excel-file/node");
const Validator = require("jsonschema").Validator;
const v = new Validator();

// export const createStudentService = async (body) => {
//   if (body && !body.enrollNumber) {
//     var lastEnrollNumber = await Student.findOne().sort({ _enrollNo: -1 });
//     if (lastEnrollNumber && lastEnrollNumber._enrollNo) {
//       var newEnrollNo = lastEnrollNumber._enrollNo + 1;
//       body._enrollNo = newEnrollNo;
//       body.enrollNumber = "AD" + newEnrollNo;
//     } else {
//       var enrollNo = 10001;
//       body._enrollNo = enrollNo;
//       body.enrollNumber = "AD" + enrollNo;
//     }
//   }
//   return new Promise((resolve, reject) => {
//     if (body.firstName && body.lastName) {
//       body.candidateName = body.firstName + " " + body.lastName;
//     }
//     if (
//       InterviewSchedulerModel.interviewTimeIn &&
//       InterviewSchedulerModel.interviewTimeOut
//     ) {
//       body.interviewTime = body.interviewTimeIn + "-" + body.interviewTimeOut;
//     }

//     return Student.create(body)
//       .then((resolve)=>{
//         console.log(resolve);
//       })
//       .catch((err) => {
//         console.log(err, "then error")
//         /* istanbul ignore else */
//         if (err.name === "MongoError" && err.code === 11000) {
//           const error = new Error();
//           error.status = 409;
//           error.message = "Enrollnumber is already registered";
//           reject(error);
//         } else {
//           reject((err)=>{
//             console.log(err, "else error")
//           });
//         }
//       });
//   });
// };

export const createStudentService = async (body) => {
  try {
    if (body && !body.enrollNumber) {
      var lastEnrollNumber = await Student.findOne().sort({ _enrollNo: -1 });
      if (lastEnrollNumber && lastEnrollNumber._enrollNo) {
        var newEnrollNo = lastEnrollNumber._enrollNo + 1;
        body._enrollNo = newEnrollNo;
        body.enrollNumber = "AD" + newEnrollNo;
      } else {
        var enrollNo = 10001;
        body._enrollNo = enrollNo;
        body.enrollNumber = "AD" + enrollNo;
      }
    }

    if (body.firstName && body.lastName) {
      body.candidateName = body.firstName + " " + body.lastName;
    }
    const createdStudent = await Student.create(body);
    return createdStudent;
  } catch (err) {
    console.error(err);
    if (err.name === "MongoError" && err.code === 11000) {
      const error = new Error("Enrollnumber is already registered");
      error.status = 409;
      throw error;
    } else {
      throw err;
    }
  }
};

export const createStudentFromApplicationService = async (params) => {
  const { applicationIds } = params;

  return new Promise(async (resolve, reject) => {
    try {
      var appIds = [];
      applicationIds.forEach(function (appid) {
        appIds.push(new ObjectId(appid));
      });

      if (appIds.length == 0) {
        const error = new Error();
        error.status = 409;
        error.message = "Not a valid application ids";
        reject(error);
      }
      const applications = await Application.find({
        $and: [{ _id: { $in: appIds } }, { enrollNumber: { $in: [null, ""] } }],
      });

      if (applications.length == 0) {
        const error = new Error();
        error.status = 409;
        error.message = "No valid application to enroll";
        reject(error);
      }

      var lastStudent = await Student.findOne().sort({ _enrollNo: -1 });
      var lastEnrollNumber;
      if (lastStudent && lastStudent._enrollNo) {
        lastEnrollNumber = lastStudent._enrollNo;
      } else {
        lastEnrollNumber = 10000;
      }

      var students = [];
      var appls = [];
      applications.forEach(function (body) {
        lastEnrollNumber++;
        const enrollNo = "AD" + lastEnrollNumber;

        appls.push({ id: new ObjectId(body.id), enrollNumber: enrollNo });

        var stud = {
          userId: body.userId,
          _enrollNo: lastEnrollNumber,
          enrollNumber: enrollNo,
          applicationNumber: body.applicationNumber,
          instituteId: body.instituteId,
          boardName: body.boardName,
          schoolName: body.schoolName,
          firstName: body.firstName,
          middleName: body.middleName,
          lastName: body.lastName,
          candidateName: body.candidateName,
          classGrade: body.classGrade,
          section: body.section,
          dob: body.dob,
          gender: body.gender,
          bloodGroup: body.bloodGroup,
          nationality: body.nationality,
          religion: body.religion,
          casteType: body.casteType,
          casteName: body.casteName,
          motherTongue: body.motherTongue,
          aadhaarNumber: body.aadhaarNumber,
          fatherFirstName: body.fatherFirstName,
          fatherLastName: body.fatherLastName,
          fatherMobileNumber: body.fatherMobileNumber,
          fatherEmailAddress: body.fatherEmailAddress,
          fatherOccupation: body.fatherOccupation,
          fatherEmployer: body.fatherEmployer,
          fatherJobTitle: body.fatherJobTitle,
          fatherAnnualSalary: body.fatherAnnualSalary,
          motherFirstName: body.motherFirstName,
          motherLastName: body.motherLastName,
          motherMobileNumber: body.motherMobileNumber,
          motherEmailAddress: body.motherEmailAddress,
          motherOccupation: body.motherOccupation,
          motherEmployer: body.motherEmployer,
          motherJobTitle: body.motherJobTitle,
          motherAnnualSalary: body.motherAnnualSalary,
          permanentAddressLine1: body.permanentAddressLine1,
          permanentAddressLine2: body.permanentAddressLine2,
          permanentAddressCountry: body.permanentAddressCountry,
          permanentAddressState: body.permanentAddressState,
          permanentAddressCity: body.permanentAddressCity,
          permanentAddressZipCode: body.permanentAddressZipCode,
          copySameAddress: body.copySameAddress,
          communicationAddressLine1: body.communicationAddressLine1,
          communicationAddressLine2: body.communicationAddressLine2,
          communicationAddressCountry: body.communicationAddressCountry,
          communicationAddressState: body.communicationAddressState,
          communicationAddressCity: body.communicationAddressCity,
          communicationAddressZipCode: body.communicationAddressZipCode,
          previousAcademicInformationSchoolName:
            body.previousAcademicInformationSchoolName,
          previousAcademicInformationSchoolBoard:
            body.previousAcademicInformationSchoolBoard,
          previousAcademicInformationClass:
            body.previousAcademicInformationClass,
          previousAcademicInformationOverallPercentage:
            body.previousAcademicInformationOverallPercentage,
          previousAcademicInformationYearOfPassing:
            body.previousAcademicInformationYearOfPassing,
          previousAcademicInformationReasonForLeaving:
            body.previousAcademicInformationReasonForLeaving,
          eligibleForFeeConcession: body.eligibleForFeeConcession,
          feeConcessionCategory: body.feeConcessionCategory,
          needTransportFacility: body.needTransportFacility,
          transportationMoreInformation: body.transportationMoreInformation,
          needHostelFacility: body.needHostelFacility,
          hostelMoreInformation: body.hostelMoreInformation,
          applicationFee: body.applicationFee,
          paymentStatus: body.paymentStatus,
          paymentNote: body.paymentNote,
          paymentMode: body.paymentMode,
          admissionFee: body.admissionFee,
          admissionPaymentId: body.admissionPaymentId,
          admissionPaymentStatus: body.admissionPaymentStatus,
          admissionStatus: body.admissionStatus,
          admissionPaymentNote: body.admissionPaymentNote,
          admissionPaymentMode: body.admissionPaymentMode,
          applicationStatus: body.applicationStatus,
          interviewDate: body.interviewDate,
          interviewTime: body.interviewTime,
          interviewerNote: body.interviewerNote,
          candidatePercentage: body.candidatePercentage,
          candidatePerformance: body.candidatePerformance,
          parentInput: body.parentInput,
          birthCertificate: body.birthCertificate,
          parentAadhaarCard: body.parentAadhaarCard,
          parentAddressProof: body.parentAddressProof,
          immunisationCard: body.immunisationCard,
          transferCertificate: body.transferCertificate,
          previousReportCard: body.previousReportCard,
          studentAadhaarCard: body.studentAadhaarCard,
          studentPhoto: body.studentPhoto,
        };
        stud.otherDocument = [];
        var addDocument = function (otherDocument, documentType, obj) {
          if (obj != undefined) {
            const doc = {
              documentUrl: "",
              documentType: documentType,
              fileKey: obj.fileKey,
              originalFileName: obj.originalFileName,
            };
            otherDocument.push(doc);
          }
        };
        addDocument(
          stud.otherDocument,
          "Birth Certificate",
          body.birthCertificate
        );
        addDocument(
          stud.otherDocument,
          "Parent Aadhaar Card",
          body.parentAadhaarCard
        );
        addDocument(
          stud.otherDocument,
          "Parent Address Proof",
          body.parentAddressProof
        );
        addDocument(
          stud.otherDocument,
          "Immunisation Card",
          body.immunisationCard
        );
        addDocument(
          stud.otherDocument,
          "Transfer Certificate",
          body.transferCertificate
        );
        addDocument(
          stud.otherDocument,
          "Previous Report Card",
          body.previousReportCard
        );
        addDocument(
          stud.otherDocument,
          "Student Aadhaar Card",
          body.studentAadhaarCard
        );
        if (body.studentPhoto != undefined) {
          const doc = {
            documentUrl: "",
            documentType: "Student Photo",
            fileKey: body.studentPhoto.fileKey,
            originalFileName: body.studentPhoto.originalFileName,
          };
          stud.studentPhoto = doc;
        }

        addDocument(stud.otherDocument, "Student Photo", body.studentPhoto);
        students.push(stud);
      });

      const studs = await Student.create(students);

      appls.forEach(async function (item) {
        const filter = { _id: item.id };
        const update = {
          enrollNumber: item.enrollNumber,
          applicationStatus: "Enrolled",
        };
        const doc = await Application.findOneAndUpdate(filter, update);
      });

      resolve(studs);
    } catch (exception) {
      const error = new Error();
      error.status = 409;
      error.message = "Error while processing your request";
      reject(error);
    }
  });
};

export const getStudentByEnrollNumberService = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = await Student.findOne({ enrollNumber: params.enrollnumber });
      if (!doc) {
        reject({
          status: 404,
          message: "not found",
        });
      }

      doc.tag = await previousNextStudent(doc._enrollNo);

      resolve(doc);
    } catch (exception) {
      const error = new Error();
      error.status = 409;
      error.message = "Error while processing your request";
      error.stack = exception;
      reject(error);
    }
  });
};

export const getStudentByIdService = (params) => {
  var objId = new ObjectId(params.id);
  return new Promise(async (resolve, reject) => {
    try {
      const doc = await Student.findById(objId);
      if (!doc) {
        reject({
          status: 404,
          message: "not found",
        });
      }
      doc.tag = await previousNextStudent(doc._enrollNo);

      resolve(doc);
    } catch (exception) {
      const error = new Error();
      error.status = 409;
      error.message = "Error while processing your request";
      error.stack = exception;
      reject(error);
    }
  });
};

const previousNextStudent = async (enrollNo) => {
  const prevDoc = await Student.findOne(
    { _enrollNo: { $lt: enrollNo }, isActive: true },
    "id enrollNumber"
  ).sort({ _enrollNo: -1 });
  const nextDoc = await Student.findOne(
    { _enrollNo: { $gt: enrollNo }, isActive: true },
    "id enrollNumber"
  ).sort({ _enrollNo: 1 });
  var tag = {
    previousStudentId: null,
    previousStudentEnrollNumber: null,
    nextStudentId: null,
    nextStudentEnrollNumber: null,
  };
  if (prevDoc) {
    tag.previousStudentId = prevDoc.id;
    tag.previousStudentEnrollNumber = prevDoc.enrollNumber;
  }
  if (nextDoc) {
    tag.nextStudentId = nextDoc.id;
    tag.nextStudentEnrollNumber = nextDoc.enrollNumber;
  }
  return tag;
};

export const getStudentInterstsByIdService = (params) => {
  return new Promise((resolve, reject) => {
    return Student.findById(params.id)
      .select("interests")
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const getStudentAchievementsByIdService = (params) => {
  return new Promise((resolve, reject) => {
    return Student.findById(params.id)
      .select("achievements")
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const getStudentsService = (params) => {
  return new Promise((resolve, reject) => {
    return Student.find().then(resolve).catch(reject);
  });
};

export const getStudentListService = ({ instituteId }) => {
  return new Promise((resolve, reject) => {
    return Student.find({
      instituteId: { $eq: instituteId },
      isActive: { $eq: true },
    })
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const updateStudentService = (params, body) => {
  return new Promise((resolve, reject) => {
    return Student.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((studentDoc) => {
        return studentDoc;
      })
      .then(resolve)
      .catch(reject);
  });
};

export const searchStudentService = async (queryParams) => {
  try {
    let {
      limit = 10,
      offset = 0,
      sort_by: sortBy,
      sort_order: sortOrder,
      table_name: tableName,
      class: classGrade,
      section: section,
      query,
      ...filterProps
    } = queryParams;

    let selectFields = await TableMetaDataConfigModel.find({
      tableName: tableName,
      entityName: "Student",
    })
      .select("fieldName")
      .lean();
    selectFields = selectFields.map((obj) => obj.fieldName);

    const options = {
      limit,
      offset,
      customLabels: {
        totalDocs: "totalStudents",
        docs: "students",
      },
    };

    if (sortBy) {
      sortOrder = sortOrder && sortOrder === "desc" ? -1 : 1;
      options.sort = { [sortBy]: sortOrder };
    }

    if (selectFields.length > 0) {
      options.select = selectFields.join(" ");
    }

    const $and = [];
    const q = {};

    if (classGrade) {
      $and.push({ classGrade: { $eq: classGrade } });
    }
    if (section) {
      $and.push({ section: { $eq: section } });
    }

    if (query) {
      const regexQuery = new RegExp(query, "i");
      const searchFields = [
        "enrollNumber",
        "applicationNumber",
        //"boardName",
        //"schoolName",
        "firstName",
        "middleName",
        "lastName",
        "candidateName",
        "classGrade",
        "section",
        //"gender",
        //"bloodGroup",
        //"nationality",
        //"religion",
        //"casteType",
        //"casteName",
        //"motherTongue",
        //"aadhaarNumber",
        "fatherFirstName",
        "fatherLastName",
        "fatherMobileNumber",
        "fatherEmailAddress",
        // "fatherOccupation",
        // "fatherEmployer",
        // "fatherJobTitle",
        // "fatherAnnualSalary",
        "motherFirstName",
        "motherLastName",
        "motherMobileNumber",
        "motherEmailAddress",
        // "motherOccupation",
        // "motherEmployer",
        // "motherJobTitle",
        // "motherAnnualSalary",
        // "permanentAddressLine1",
        // "permanentAddressLine2",
        // "permanentAddressCountry",
        // "permanentAddressState",
        // "permanentAddressCity",
        // "permanentAddressZipCode",
        // "communicationAddressLine1",
        // "communicationAddressLine2",
        // "communicationAddressCountry",
        // "communicationAddressState",
        // "communicationAddressCity",
        // "communicationAddressZipCode",
        // "previousAcademicInformationSchoolName",
        // "previousAcademicInformationSchoolBoard",
        // "previousAcademicInformationClass",
        // "previousAcademicInformationOverallPercentage",
        // "previousAcademicInformationYearOfPassing",
        // "previousAcademicInformationReasonForLeaving",
        // "eligibleForFeeConcession",
        // "feeConcessionCategory",
        // "needTransportFacility",
        // "transportationMoreInformation",
        // "needHostelFacility"
      ];
      const orCondition = searchFields.map((field) => ({
        [field]: regexQuery,
      }));
      $and.push({ $or: orCondition });
    }
    if (filterProps.dob) {
      const dob = new Date(filterProps.dob);
      if (!isNaN(dob.getTime())) {
        $and.push({
          dob: {
            $gte: new Date(
              dob.getFullYear(),
              dob.getMonth(),
              dob.getDate(),
              0,
              0,
              0
            ),
            $lte: new Date(
              dob.getFullYear(),
              dob.getMonth(),
              dob.getDate(),
              23,
              59,
              59
            ),
          },
        });
      }
      delete filterProps.dob;
    }

    if (!classGrade && !section) {
      Object.keys(filterProps).forEach((prop) => {
        const value = filterProps[prop];
        const dateParse = Date.parse(value);
        if (Array.isArray(value)) {
          q[prop] = { $in: value };
        } else {
          if (!isNaN(value)) {
            $and.push({ [prop]: value });
          } else if (isNaN(value) && !isNaN(dateParse)) {
            const queryDate = new Date(dateParse);
            const year = queryDate.getFullYear();
            const month = queryDate.getMonth();
            const day = queryDate.getDate();
            $and.push({
              [prop]: {
                $gte: new Date(year, month, day, 0, 0, 0),
                $lte: new Date(year, month, day, 23, 59, 59),
              },
            });
          } else {
            $and.push({ [prop]: { $regex: new RegExp(value) } });
          }
        }
      });
    }

    if ($and.length > 0) {
      q.$and = $and;
    }

    return await Student.paginate(q, options);
  } catch (exception) {
    throw new Error("Error  while processing your request");
  }
};

export const addBulkStudentService = async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const validatedData = validateExcelData(jsonData);
    res.json(validatedData.validData);
    // res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: "Error processing Excel file" });
  }
};

export const createStudentExcelDataService = async (body) => {
  return new Promise((resolve, reject) => {
    return Student.insertMany(body)
      .then((doc) => {
        return { message: "Student added successfully!!" };
      })
      .then(resolve)
      .catch(reject);
  });
};
