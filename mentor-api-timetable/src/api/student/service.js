"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentExcelDataService = exports.addBulkStudentService = exports.searchStudentService = exports.updateStudentService = exports.getStudentListService = exports.getStudentsService = exports.getStudentAchievementsByIdService = exports.getStudentInterstsByIdService = exports.getStudentByIdService = exports.getStudentByEnrollNumberService = exports.createStudentFromApplicationService = exports.createStudentService = void 0;
const response_1 = require("../../common/response");
const admin_config_1 = require("../admin-config");
const model_1 = require("../application/model");
const model_2 = require("./model");
const validator_1 = require("./validator");
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
const createStudentService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (body && !body.enrollNumber) {
            var lastEnrollNumber = yield model_2.Student.findOne().sort({ _enrollNo: -1 });
            if (lastEnrollNumber && lastEnrollNumber._enrollNo) {
                var newEnrollNo = lastEnrollNumber._enrollNo + 1;
                body._enrollNo = newEnrollNo;
                body.enrollNumber = "AD" + newEnrollNo;
            }
            else {
                var enrollNo = 10001;
                body._enrollNo = enrollNo;
                body.enrollNumber = "AD" + enrollNo;
            }
        }
        if (body.firstName && body.lastName) {
            body.candidateName = body.firstName + " " + body.lastName;
        }
        const createdStudent = yield model_2.Student.create(body);
        return createdStudent;
    }
    catch (err) {
        console.error(err);
        if (err.name === "MongoError" && err.code === 11000) {
            const error = new Error("Enrollnumber is already registered");
            error.status = 409;
            throw error;
        }
        else {
            throw err;
        }
    }
});
exports.createStudentService = createStudentService;
const createStudentFromApplicationService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { applicationIds } = params;
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
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
            const applications = yield model_1.Application.find({
                $and: [{ _id: { $in: appIds } }, { enrollNumber: { $in: [null, ""] } }],
            });
            if (applications.length == 0) {
                const error = new Error();
                error.status = 409;
                error.message = "No valid application to enroll";
                reject(error);
            }
            var lastStudent = yield model_2.Student.findOne().sort({ _enrollNo: -1 });
            var lastEnrollNumber;
            if (lastStudent && lastStudent._enrollNo) {
                lastEnrollNumber = lastStudent._enrollNo;
            }
            else {
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
                    previousAcademicInformationSchoolName: body.previousAcademicInformationSchoolName,
                    previousAcademicInformationSchoolBoard: body.previousAcademicInformationSchoolBoard,
                    previousAcademicInformationClass: body.previousAcademicInformationClass,
                    previousAcademicInformationOverallPercentage: body.previousAcademicInformationOverallPercentage,
                    previousAcademicInformationYearOfPassing: body.previousAcademicInformationYearOfPassing,
                    previousAcademicInformationReasonForLeaving: body.previousAcademicInformationReasonForLeaving,
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
                addDocument(stud.otherDocument, "Birth Certificate", body.birthCertificate);
                addDocument(stud.otherDocument, "Parent Aadhaar Card", body.parentAadhaarCard);
                addDocument(stud.otherDocument, "Parent Address Proof", body.parentAddressProof);
                addDocument(stud.otherDocument, "Immunisation Card", body.immunisationCard);
                addDocument(stud.otherDocument, "Transfer Certificate", body.transferCertificate);
                addDocument(stud.otherDocument, "Previous Report Card", body.previousReportCard);
                addDocument(stud.otherDocument, "Student Aadhaar Card", body.studentAadhaarCard);
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
            const studs = yield model_2.Student.create(students);
            appls.forEach(function (item) {
                return __awaiter(this, void 0, void 0, function* () {
                    const filter = { _id: item.id };
                    const update = {
                        enrollNumber: item.enrollNumber,
                        applicationStatus: "Enrolled",
                    };
                    const doc = yield model_1.Application.findOneAndUpdate(filter, update);
                });
            });
            resolve(studs);
        }
        catch (exception) {
            const error = new Error();
            error.status = 409;
            error.message = "Error while processing your request";
            reject(error);
        }
    }));
});
exports.createStudentFromApplicationService = createStudentFromApplicationService;
const getStudentByEnrollNumberService = (params) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doc = yield model_2.Student.findOne({ enrollNumber: params.enrollnumber });
            if (!doc) {
                reject({
                    status: 404,
                    message: "not found",
                });
            }
            doc.tag = yield previousNextStudent(doc._enrollNo);
            resolve(doc);
        }
        catch (exception) {
            const error = new Error();
            error.status = 409;
            error.message = "Error while processing your request";
            error.stack = exception;
            reject(error);
        }
    }));
};
exports.getStudentByEnrollNumberService = getStudentByEnrollNumberService;
const getStudentByIdService = (params) => {
    var objId = new ObjectId(params.id);
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doc = yield model_2.Student.findById(objId);
            if (!doc) {
                reject({
                    status: 404,
                    message: "not found",
                });
            }
            doc.tag = yield previousNextStudent(doc._enrollNo);
            resolve(doc);
        }
        catch (exception) {
            const error = new Error();
            error.status = 409;
            error.message = "Error while processing your request";
            error.stack = exception;
            reject(error);
        }
    }));
};
exports.getStudentByIdService = getStudentByIdService;
const previousNextStudent = (enrollNo) => __awaiter(void 0, void 0, void 0, function* () {
    const prevDoc = yield model_2.Student.findOne({ _enrollNo: { $lt: enrollNo }, isActive: true }, "id enrollNumber").sort({ _enrollNo: -1 });
    const nextDoc = yield model_2.Student.findOne({ _enrollNo: { $gt: enrollNo }, isActive: true }, "id enrollNumber").sort({ _enrollNo: 1 });
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
});
const getStudentInterstsByIdService = (params) => {
    return new Promise((resolve, reject) => {
        return model_2.Student.findById(params.id)
            .select("interests")
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
};
exports.getStudentInterstsByIdService = getStudentInterstsByIdService;
const getStudentAchievementsByIdService = (params) => {
    return new Promise((resolve, reject) => {
        return model_2.Student.findById(params.id)
            .select("achievements")
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
};
exports.getStudentAchievementsByIdService = getStudentAchievementsByIdService;
const getStudentsService = (params) => {
    return new Promise((resolve, reject) => {
        return model_2.Student.find().then(resolve).catch(reject);
    });
};
exports.getStudentsService = getStudentsService;
const getStudentListService = ({ instituteId }) => {
    return new Promise((resolve, reject) => {
        return model_2.Student.find({
            instituteId: { $eq: instituteId },
            isActive: { $eq: true },
        })
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
};
exports.getStudentListService = getStudentListService;
const updateStudentService = (params, body) => {
    return new Promise((resolve, reject) => {
        return model_2.Student.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((studentDoc) => {
            return studentDoc;
        })
            .then(resolve)
            .catch(reject);
    });
};
exports.updateStudentService = updateStudentService;
const searchStudentService = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { limit = 10, offset = 0, sort_by: sortBy, sort_order: sortOrder, table_name: tableName, class: classGrade, section: section, query } = queryParams, filterProps = __rest(queryParams, ["limit", "offset", "sort_by", "sort_order", "table_name", "class", "section", "query"]);
        let selectFields = yield admin_config_1.TableMetaDataConfigModel.find({
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
                        $gte: new Date(dob.getFullYear(), dob.getMonth(), dob.getDate(), 0, 0, 0),
                        $lte: new Date(dob.getFullYear(), dob.getMonth(), dob.getDate(), 23, 59, 59),
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
                }
                else {
                    if (!isNaN(value)) {
                        $and.push({ [prop]: value });
                    }
                    else if (isNaN(value) && !isNaN(dateParse)) {
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
                    }
                    else {
                        $and.push({ [prop]: { $regex: new RegExp(value) } });
                    }
                }
            });
        }
        if ($and.length > 0) {
            q.$and = $and;
        }
        return yield model_2.Student.paginate(q, options);
    }
    catch (exception) {
        throw new Error("Error  while processing your request");
    }
});
exports.searchStudentService = searchStudentService;
const addBulkStudentService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const validatedData = (0, validator_1.validateExcelData)(jsonData);
        res.json(validatedData.validData);
        // res.json(jsonData);
    }
    catch (error) {
        res.status(500).json({ error: "Error processing Excel file" });
    }
});
exports.addBulkStudentService = addBulkStudentService;
const createStudentExcelDataService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_2.Student.insertMany(body)
            .then((doc) => {
            return { message: "Student added successfully!!" };
        })
            .then(resolve)
            .catch(reject);
    });
});
exports.createStudentExcelDataService = createStudentExcelDataService;
