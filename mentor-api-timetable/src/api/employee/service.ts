import { ObjectId } from "mongodb";
import { notFoundError } from "../../common/response";

import randtoken from "rand-token";
import validator from "validator";
import ses from "../../common/aws-ses";
import { ui } from "../../config";
import { TableMetaDataConfigModel } from "../admin-config";
import { Student } from "../student/model";
import { createUserByAdminService } from "../user/service";
import { Employee } from "./model";
const xlsx = require("xlsx");

const fullTextSearchEmpApplicationStatus = ["Completed", "Enrolled", "Pending"];

export const checkEmail = async (body, objId) => {
  if (!body.hasOwnProperty("emailId")) {
    return false;
  }
  let existingEmp;
  if (objId) {
    existingEmp = await Employee.findOne({
      emailId: body.emailId,
      _id: { $ne: objId },
    });
  } else {
    existingEmp = await Employee.findOne({ emailId: body.emailId });
  }
  if (existingEmp) {
    return true;
  } else {
    return false;
  }
};

export const createEmployeeService = async (body) => {
  const lastEmp = await Employee.findOne().sort({ _empId: -1 });
  if (lastEmp && lastEmp._empId) {
    const newEmpId = lastEmp._empId + 1;
    body._empId = newEmpId;
    body.empId = "EMP" + newEmpId;
  }

  const isDuplicateEmail = await checkEmail(body);
  return new Promise((resolve, reject) => {
    if (isDuplicateEmail) {
      reject({
        status: 409,
        message: "Email Id already exists",
      });
    }

    body.profileStatus = "Pending";
    return Employee.create(body)
      .then(resolve)
      .catch((err) => {
        if (err.name === "MongoError" && err.code === 11000) {
          const error = new Error();
          error.status = 409;
          error.message = "Email is already exist";
          reject(error);
        } else {
          reject(err);
        }
      });
  });
};

export const getEmployeesService = (userId) => {
  return new Promise((resolve, reject) => {
    return Employee.find()
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const getEmployeeByIdService = (params) => {
  var objId = new ObjectId(params.id);
  return new Promise(async (resolve, reject) => {
    try {
      const doc = await Employee.findById(objId);
      if (!doc) {
        reject({
          status: 404,
          message: "not found",
        });
      }

      doc.tag = await previousNextEmployee(doc._empId);

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

export const getEmployeeByEmpIdService = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = await Employee.findOne({ empId: params.empId });
      if (!doc) {
        reject({
          status: 404,
          message: "not found",
        });
      }

      doc.tag = await previousNextEmployee(doc?._empId);

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

const previousNextEmployee = async (empId) => {
  const prevDoc = await Employee.findOne(
    { _empId: { $lt: empId }, isActive: true },
    "id empId"
  ).sort({ _empId: -1 });
  const nextDoc = await Employee.findOne(
    { _empId: { $gt: empId }, isActive: true },
    "id empId"
  ).sort({ _empId: 1 });
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
};

export const searchEmployeeService = async (queryParams) => {
  try {
    let {
      limit = 10,
      offset = 0,
      sort_by: sortBy,
      sort_order: sortOrder,
      table_name: tableName,
      ...filterProps
    } = queryParams;

    let selectFields = await TableMetaDataConfigModel.find({
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
      } else if (
        prop === "profileStatus" &&
        fullTextSearchEmpApplicationStatus.indexOf(value) !== -1
      ) {
        q[prop] = { $eq: value };
      } else if (prop === "isActive") {
        q[prop] = { $eq: value };
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

    if ($and.length > 0) {
      q.$and = $and;
    }

    return await Employee.paginate(q, options);
  } catch (exception) {
    throw new Error("Error while processing your request");
  }
};

export const updateEmployeeService = async (params, body) => {
  var objId = new ObjectId(params.id);
  return new Promise(async (resolve, reject) => {
    try {
      const isDuplicateEmail = await checkEmail(body, objId);
      if (isDuplicateEmail) {
        reject({
          status: 409,
          message: "Email Id already exists",
        });
      }
      let empDoc = await Employee.findOneAndUpdate({ _id: objId }, body, {
        new: true,
      });
      if (empDoc && !empDoc.isActive) {
        const res = await sendEmployeeStatusNotification(null, empDoc);
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
            !validator.isEmpty(academicInfo.courseType) &&
            !validator.isEmpty(academicInfo.boardName) &&
            !validator.isEmpty(academicInfo.schoolCollegeName) &&
            !validator.isEmpty(academicInfo.courseName) &&
            !validator.isEmpty(academicInfo.overallPercentage);
        }
        // if (allFilled) {
        const filter = { _id: empDoc._id };
        const update = { profileStatus: "Completed" };
        empDoc = await Employee.findOneAndUpdate(filter, update, { new: true });
        //}
      }
      resolve(empDoc);
    } catch (err) {
      const error = new Error();
      error.status = 409;
      error.message = "Error while processing your request";
      reject(err);
    }
  });
};

export const updateEmployeeServiceEnroll = (params, body) => {
  body.profileStatus = "Enrolled";
  return new Promise((resolve, reject) => {
    return Employee.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(createUserAndSendEnrolledNotification)
      .then(resolve)
      .catch(reject);
  });
};

export const createUserAndSendEnrolledNotification = async (empDoc) => {
  try {
    empDoc.emailId = empDoc.emailId || "tamilselvanvjm@gmail.com";
    const generatedPassword = randtoken.generate(10);
    const userInfo = {
      email: empDoc.emailId,
      username: empDoc.empId,
      password: generatedPassword,
    };
    await createUserByAdminService(userInfo);
    sendEmployeeStatusNotification(userInfo, empDoc);
    return empDoc;
  } catch (exception) {
    throw exception;
  }
};

export const sendEmployeeStatusNotification = async (user, empDoc) => {
  try {
    const sendEmailTo = empDoc.emailId;
    if (!sendEmailTo) {
      throw new Error("Email Id is required");
    }
    let content = "";
    if (empDoc.isActive && empDoc.profileStatus === "Enrolled") {
      const updateEmpProfileURL = ui.baseURL + ui.employeeUpdateProfile;
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
    } else if (empDoc.isActive && empDoc.profileStatus === "Completed") {
      content = `
        Hello ${empDoc.firstName || ""},<br><br>
        Your application is completed
        <br><br>
        &mdash; Admin Team
      `;
    } else if (!empDoc.isActive) {
      content = `
        Hello ${empDoc.firstName || ""},<br><br>
        Your employment status is deactivated
        <br><br>
        &mdash; Admin Team
      `;
    }
    return ses.sendEmail({
      toEmail: sendEmailTo,
      subject: "Mentor - Employee Application Status",
      content,
    });
  } catch (exception) {
    throw exception;
  }
};

export const updateEmployeeServiceSubmit = (params, body) => {
  body.profileStatus = "Completed";
  return new Promise((resolve, reject) => {
    return Employee.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(resolve)
      .catch(reject);
  });
};

export const deleteEmployeeService = (params) => {
  return new Promise((resolve, reject) => {
    return Employee.deleteOne({ _id: params.id }).then(resolve).catch(reject);
  });
};

export const getEmployeesForAnalyticService = async (params) => {
  try {
    var employeeResult = [
      { count: 0, key: "Total Employee" },
      { count: 0, key: "Administrative" },
      { count: 0, key: "Faculty" },
      { count: 0, key: "Support Staff" },
    ];

    var studentResult = [{ count: 0, key: "Total Student" }];

    var employees = await Employee.aggregate([
      {
        $group: {
          _id: "$role",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    var students = await Student.aggregate([
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

    const totalStudentIndex = employeeStudentAnalytics.findIndex(
      (item) => item.key === "Total Student"
    );

    const studentIndex = students.findIndex((item) => item._id === true);

    if (totalStudentIndex !== -1) {
      employeeStudentAnalytics[totalStudentIndex].count =
        students[studentIndex].count;
    }
    return employeeStudentAnalytics;
  } catch (exception) {
    throw new Error(
      "Error while getting employees for analytics from database"
    );
  }
};

export const getTeachingEmployeesService = async (
  { instituteId },
  { employeeType }
) => {
  return new Promise((resolve, reject) => {
    return Employee.find({
      instituteId: { $eq: instituteId },
      employeeType: { $eq: employeeType },
      isActive: { $eq: true },
    })
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

function findElement(arr, propName, propValue) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][propName] == propValue) {
      return arr[i];
    }
  }
}

export const addBulkEmployeeService = async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: "Error processing Excel file" });
  }
};

export const createEmployeeExcelDataService = async (body) => {
  return new Promise((resolve, reject) => {
    return Employee.insertMany(body)
      .then((doc) => {
        return { message: "Employee added successfully!!" };
      })
      .then(resolve)
      .catch(reject);
  });
};
