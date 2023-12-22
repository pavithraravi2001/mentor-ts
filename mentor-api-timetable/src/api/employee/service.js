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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployeeExcelDataService = exports.addBulkEmployeeService = exports.getTeachingEmployeesService = exports.getEmployeesForAnalyticService = exports.deleteEmployeeService = exports.updateEmployeeServiceSubmit = exports.sendEmployeeStatusNotification = exports.createUserAndSendEnrolledNotification = exports.updateEmployeeServiceEnroll = exports.updateEmployeeService = exports.searchEmployeeService = exports.getEmployeeByEmpIdService = exports.getEmployeeByIdService = exports.getEmployeesService = exports.createEmployeeService = exports.checkEmail = void 0;
const mongodb_1 = require("mongodb");
const response_1 = require("../../common/response");
const rand_token_1 = __importDefault(require("rand-token"));
const validator_1 = __importDefault(require("validator"));
const aws_ses_1 = __importDefault(require("../../common/aws-ses"));
const config_1 = require("../../config");
const admin_config_1 = require("../admin-config");
const model_1 = require("../student/model");
const service_1 = require("../user/service");
const model_2 = require("./model");
const xlsx = require("xlsx");
const fullTextSearchEmpApplicationStatus = ["Completed", "Enrolled", "Pending"];
const checkEmail = (body, objId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!body.hasOwnProperty("emailId")) {
        return false;
    }
    let existingEmp;
    if (objId) {
        existingEmp = yield model_2.Employee.findOne({
            emailId: body.emailId,
            _id: { $ne: objId },
        });
    }
    else {
        existingEmp = yield model_2.Employee.findOne({ emailId: body.emailId });
    }
    if (existingEmp) {
        return true;
    }
    else {
        return false;
    }
});
exports.checkEmail = checkEmail;
const createEmployeeService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const lastEmp = yield model_2.Employee.findOne().sort({ _empId: -1 });
    if (lastEmp && lastEmp._empId) {
        const newEmpId = lastEmp._empId + 1;
        body._empId = newEmpId;
        body.empId = "EMP" + newEmpId;
    }
    const isDuplicateEmail = yield (0, exports.checkEmail)(body);
    return new Promise((resolve, reject) => {
        if (isDuplicateEmail) {
            reject({
                status: 409,
                message: "Email Id already exists",
            });
        }
        body.profileStatus = "Pending";
        return model_2.Employee.create(body)
            .then(resolve)
            .catch((err) => {
            if (err.name === "MongoError" && err.code === 11000) {
                const error = new Error();
                error.status = 409;
                error.message = "Email is already exist";
                reject(error);
            }
            else {
                reject(err);
            }
        });
    });
});
exports.createEmployeeService = createEmployeeService;
const getEmployeesService = (userId) => {
    return new Promise((resolve, reject) => {
        return model_2.Employee.find()
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
};
exports.getEmployeesService = getEmployeesService;
const getEmployeeByIdService = (params) => {
    var objId = new mongodb_1.ObjectId(params.id);
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doc = yield model_2.Employee.findById(objId);
            if (!doc) {
                reject({
                    status: 404,
                    message: "not found",
                });
            }
            doc.tag = yield previousNextEmployee(doc._empId);
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
exports.getEmployeeByIdService = getEmployeeByIdService;
const getEmployeeByEmpIdService = (params) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doc = yield model_2.Employee.findOne({ empId: params.empId });
            if (!doc) {
                reject({
                    status: 404,
                    message: "not found",
                });
            }
            doc.tag = yield previousNextEmployee(doc === null || doc === void 0 ? void 0 : doc._empId);
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
exports.getEmployeeByEmpIdService = getEmployeeByEmpIdService;
const previousNextEmployee = (empId) => __awaiter(void 0, void 0, void 0, function* () {
    const prevDoc = yield model_2.Employee.findOne({ _empId: { $lt: empId }, isActive: true }, "id empId").sort({ _empId: -1 });
    const nextDoc = yield model_2.Employee.findOne({ _empId: { $gt: empId }, isActive: true }, "id empId").sort({ _empId: 1 });
    var tag = {
        previousEmployeeId: null,
        previousEmployeeEmpId: null,
        nextEmployeeId: null,
        nextEmployeeEmpId: null,
    };
    if (prevDoc) {
        tag.previousEmployeeId = prevDoc.id;
        tag.previousEmployeeEmpId = prevDoc.empId;
    }
    if (nextDoc) {
        tag.nextEmployeeId = nextDoc.id;
        tag.nextEmployeeEmpId = nextDoc.empId;
    }
    return tag;
});
const searchEmployeeService = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { limit = 10, offset = 0, sort_by: sortBy, sort_order: sortOrder, table_name: tableName } = queryParams, filterProps = __rest(queryParams, ["limit", "offset", "sort_by", "sort_order", "table_name"]);
        let selectFields = yield admin_config_1.TableMetaDataConfigModel.find({
            tableName: tableName,
            entityName: "Employee",
        })
            .select("fieldName")
            .lean();
        selectFields = selectFields.map((obj) => obj.fieldName);
        const options = {
            limit,
            offset,
            customLabels: {
                totalDocs: "totalEmployees",
                docs: "employees",
            },
        };
        if (sortBy) {
            sortOrder = sortOrder && sortOrder === "desc" ? -1 : 1;
            options.sort = { [sortBy]: sortOrder };
        }
        if (selectFields.length > 0) {
            options.select = selectFields.join(" ");
        }
        if (!filterProps.hasOwnProperty("isActive")) {
            filterProps.isActive = true;
        }
        const $and = [];
        const q = {};
        Object.keys(filterProps).forEach((prop) => {
            const value = filterProps[prop];
            const dateParse = Date.parse(value);
            if (Array.isArray(value)) {
                q[prop] = { $in: value };
            }
            else if (prop === "profileStatus" &&
                fullTextSearchEmpApplicationStatus.indexOf(value) !== -1) {
                q[prop] = { $eq: value };
            }
            else if (prop === "isActive") {
                q[prop] = { $eq: value };
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
        if ($and.length > 0) {
            q.$and = $and;
        }
        return yield model_2.Employee.paginate(q, options);
    }
    catch (exception) {
        throw new Error("Error while processing your request");
    }
});
exports.searchEmployeeService = searchEmployeeService;
const updateEmployeeService = (params, body) => __awaiter(void 0, void 0, void 0, function* () {
    var objId = new mongodb_1.ObjectId(params.id);
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const isDuplicateEmail = yield (0, exports.checkEmail)(body, objId);
            if (isDuplicateEmail) {
                reject({
                    status: 409,
                    message: "Email Id already exists",
                });
            }
            let empDoc = yield model_2.Employee.findOneAndUpdate({ _id: objId }, body, {
                new: true,
            });
            if (empDoc && !empDoc.isActive) {
                const res = yield (0, exports.sendEmployeeStatusNotification)(null, empDoc);
            }
            if (empDoc.profileStatus != "Completed") {
                let allFilled = true;
                /* const fields = ['firstName', 'lastName', 'contactNumber', 'emailId', 'gender', 'nationality', 'religion', 'casteType', 'casteName', 'motherTongue', 'emergencyContactPersonFirstName', 'emergencyContactPersonLastName',
                  'emergencyContactMobileNumber', 'permanentAddressLine1', 'permanentAddressLine2', 'permanentAddressCountry', 'permanentAddressState', 'permanentAddressCity', 'permanentAddressZipCode',
                  'communicationAddressLine1', 'communicationAddressLine2', 'communicationAddressCountry', 'communicationAddressState', 'communicationAddressCity',
                  'communicationAddressZipCode', 'bankAccountHolderName', 'bankAccountAccountNumber', 'bankAccountIFSCCode', 'panNumber',
                  'employementType', 'designation', 'employeeType', 'primaryDepartment', 'role'
                ]*/
                //fields.forEach(checkEmpty)
                /*function checkEmpty(item) {
                  console.log(item)
                 allFilled = allFilled && !validator.isEmpty(empDoc[item])
                 console.log(allFilled);
                }*/
                if (empDoc.academicInfos.length > 0) {
                    const academicInfo = empDoc.academicInfos[0];
                    allFilled =
                        allFilled &&
                            !validator_1.default.isEmpty(academicInfo.courseType) &&
                            !validator_1.default.isEmpty(academicInfo.boardName) &&
                            !validator_1.default.isEmpty(academicInfo.schoolCollegeName) &&
                            !validator_1.default.isEmpty(academicInfo.courseName) &&
                            !validator_1.default.isEmpty(academicInfo.overallPercentage);
                }
                // if (allFilled) {
                const filter = { _id: empDoc._id };
                const update = { profileStatus: "Completed" };
                empDoc = yield model_2.Employee.findOneAndUpdate(filter, update, { new: true });
                //}
            }
            resolve(empDoc);
        }
        catch (err) {
            const error = new Error();
            error.status = 409;
            error.message = "Error while processing your request";
            reject(err);
        }
    }));
});
exports.updateEmployeeService = updateEmployeeService;
const updateEmployeeServiceEnroll = (params, body) => {
    body.profileStatus = "Enrolled";
    return new Promise((resolve, reject) => {
        return model_2.Employee.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(exports.createUserAndSendEnrolledNotification)
            .then(resolve)
            .catch(reject);
    });
};
exports.updateEmployeeServiceEnroll = updateEmployeeServiceEnroll;
const createUserAndSendEnrolledNotification = (empDoc) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        empDoc.emailId = empDoc.emailId || "tamilselvanvjm@gmail.com";
        const generatedPassword = rand_token_1.default.generate(10);
        const userInfo = {
            email: empDoc.emailId,
            username: empDoc.empId,
            password: generatedPassword,
        };
        yield (0, service_1.createUserByAdminService)(userInfo);
        (0, exports.sendEmployeeStatusNotification)(userInfo, empDoc);
        return empDoc;
    }
    catch (exception) {
        throw exception;
    }
});
exports.createUserAndSendEnrolledNotification = createUserAndSendEnrolledNotification;
const sendEmployeeStatusNotification = (user, empDoc) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sendEmailTo = empDoc.emailId;
        if (!sendEmailTo) {
            throw new Error("Email Id is required");
        }
        let content = "";
        if (empDoc.isActive && empDoc.profileStatus === "Enrolled") {
            const updateEmpProfileURL = config_1.ui.baseURL + config_1.ui.employeeUpdateProfile;
            content = `
      Greetings,
        Hello ${empDoc.firstName || ""},<br><br>
        We request you to fill the remaining details about yourself along with respective documents
        <br><br>
        Emp ID: ${empDoc.empId}
        Password: ${user.password}
        <br><br>
        Please click the follwoing button / link and proceed to fille the details.
        ${updateEmpProfileURL}
        &mdash; Admin Team
      `;
        }
        else if (empDoc.isActive && empDoc.profileStatus === "Completed") {
            content = `
        Hello ${empDoc.firstName || ""},<br><br>
        Your application is completed
        <br><br>
        &mdash; Admin Team
      `;
        }
        else if (!empDoc.isActive) {
            content = `
        Hello ${empDoc.firstName || ""},<br><br>
        Your employment status is deactivated
        <br><br>
        &mdash; Admin Team
      `;
        }
        return aws_ses_1.default.sendEmail({
            toEmail: sendEmailTo,
            subject: "Mentor - Employee Application Status",
            content,
        });
    }
    catch (exception) {
        throw exception;
    }
});
exports.sendEmployeeStatusNotification = sendEmployeeStatusNotification;
const updateEmployeeServiceSubmit = (params, body) => {
    body.profileStatus = "Completed";
    return new Promise((resolve, reject) => {
        return model_2.Employee.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(resolve)
            .catch(reject);
    });
};
exports.updateEmployeeServiceSubmit = updateEmployeeServiceSubmit;
const deleteEmployeeService = (params) => {
    return new Promise((resolve, reject) => {
        return model_2.Employee.deleteOne({ _id: params.id }).then(resolve).catch(reject);
    });
};
exports.deleteEmployeeService = deleteEmployeeService;
const getEmployeesForAnalyticService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var employeeResult = [
            { count: 0, key: "Total Employee" },
            { count: 0, key: "Administrative" },
            { count: 0, key: "Faculty" },
            { count: 0, key: "Support Staff" },
        ];
        var studentResult = [{ count: 0, key: "Total Student" }];
        var employees = yield model_2.Employee.aggregate([
            {
                $group: {
                    _id: "$role",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        var students = yield model_1.Student.aggregate([
            {
                $group: {
                    _id: "$isActive",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        employees.forEach((element) => {
            var statusEntry = findElement(employeeResult, "key", element._id);
            if (statusEntry) {
                statusEntry.count = element.count;
            }
        });
        var totalEmployees = findElement(employeeResult, "key", "Total Employee");
        var adminstrative = findElement(employeeResult, "key", "Administrative");
        var faculty = findElement(employeeResult, "key", "Faculty");
        var supportStaff = findElement(employeeResult, "key", "Support Staff");
        var adminstrativeCount = adminstrative.count;
        var facultyCount = faculty.count;
        var supportStaffCount = supportStaff.count;
        totalEmployees.count =
            adminstrativeCount + facultyCount + supportStaffCount;
        const employeeStudentAnalytics = [...employeeResult, ...studentResult];
        const totalStudentIndex = employeeStudentAnalytics.findIndex((item) => item.key === "Total Student");
        const studentIndex = students.findIndex((item) => item._id === true);
        if (totalStudentIndex !== -1) {
            employeeStudentAnalytics[totalStudentIndex].count =
                students[studentIndex].count;
        }
        return employeeStudentAnalytics;
    }
    catch (exception) {
        throw new Error("Error while getting employees for analytics from database");
    }
});
exports.getEmployeesForAnalyticService = getEmployeesForAnalyticService;
const getTeachingEmployeesService = ({ instituteId }, { employeeType }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_2.Employee.find({
            instituteId: { $eq: instituteId },
            employeeType: { $eq: employeeType },
            isActive: { $eq: true },
        })
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
});
exports.getTeachingEmployeesService = getTeachingEmployeesService;
function findElement(arr, propName, propValue) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][propName] == propValue) {
            return arr[i];
        }
    }
}
const addBulkEmployeeService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        res.json(jsonData);
    }
    catch (error) {
        res.status(500).json({ error: "Error processing Excel file" });
    }
});
exports.addBulkEmployeeService = addBulkEmployeeService;
const createEmployeeExcelDataService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_2.Employee.insertMany(body)
            .then((doc) => {
            return { message: "Employee added successfully!!" };
        })
            .then(resolve)
            .catch(reject);
    });
});
exports.createEmployeeExcelDataService = createEmployeeExcelDataService;
