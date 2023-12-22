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
exports.convertToUTCDate = exports.getDatesBetween = exports.getWeekDates = exports.getApplicationsForAnalyticCalendarService = exports.sendInterviewReminderNotificationService = exports.searchInterviewSchedulesService = exports.getInterviewScheduleByDateService = exports.cancelInterviewScheduleService = exports.updateInterviewReScheduleService = exports.updateInterviewScheduleService = exports.createInterviewScheduleService = exports.sendApplicationStatusNotification = exports.updateApplicationsAdmissionStatusService = exports.getApplicationsAdmissionStatusService = exports.searchApplicationsService = exports.deleteApplicationService = exports.updateApplicationService = exports.nextApplicationNumber = exports.findElement = exports.getApplicationsForAnalyticService = exports.getApplicationService = exports.getApplicationsService = exports.getApplicationsByUserId = exports.createApplicationService = void 0;
const mongodb_1 = require("mongodb");
const aws_ses_1 = __importDefault(require("../../common/aws-ses"));
const response_1 = require("../../common/response");
const admin_config_1 = require("../admin-config");
const model_1 = require("../user/model");
const model_2 = require("./model");
const fullTextSearchApplicationStatus = [
    "Application Submitted",
    "Awaiting Application Fee",
    "Submission Pending",
    "Applicant Rejected",
    "Application Rejected",
    "Interview Scheduled",
    "Application WaitingList",
    "Applicant Passed",
    "Applicant OnHold",
];
const createApplicationService = (body) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        if (body.firstName && body.lastName) {
            body.candidateName = body.firstName + " " + body.lastName;
        }
        if (body.interviewTimeIn && body.interviewTimeOut) {
            body.interviewTime = body.interviewTimeIn + "-" + body.interviewTimeOut;
        }
        if (body.submitted) {
            body.applicationNumber = yield nextApplicationNumber();
            if (body.paymentMode === "online" &&
                body.paymentStatus === "TXN_SUCCESS") {
                body.applicationStatus = "Application Submitted";
            }
            else {
                body.applicationStatus = "Awaiting Application Fee";
            }
        }
        else {
            body.applicationStatus = "Submission Pending";
        }
        return model_2.Application.create(body)
            .then(resolve)
            .catch((err) => {
            if (err.name === "MongoError" && err.code === 11000) {
                const error = new Error();
                error.status = 409;
                error.message = "ApplicationNumber is already registered";
                reject(error);
            }
            else {
                reject(err);
            }
        });
    }));
};
exports.createApplicationService = createApplicationService;
const getApplicationsByUserId = (params) => {
    return new Promise((resolve, reject) => {
        return model_2.Application.find({ userId: params.userId })
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
};
exports.getApplicationsByUserId = getApplicationsByUserId;
const getApplicationsService = (userId) => {
    return new Promise((resolve, reject) => {
        return model_2.Application.find({ userId }, {
            applicationNumber: 1,
            submitted: 1,
            firstName: 1,
            middleName: 1,
            lastName: 1,
            candidateName: 1,
            boardName: 1,
            schoolName: 1,
            classGrade: 1,
            admissionFor: 1,
            lastUpdated: 1,
            applicationStatus: 1,
            paymentMode: 1,
            paymentNode: 1,
            gender: 1,
            enrollNumber: 1,
        })
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
};
exports.getApplicationsService = getApplicationsService;
const getApplicationService = (params) => {
    var objId = new mongodb_1.ObjectId(params.id);
    return new Promise((resolve, reject) => {
        return model_2.Application.findById(objId)
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
};
exports.getApplicationService = getApplicationService;
const getApplicationsForAnalyticService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    let applications;
    if (params.type === "dashboard") {
        result = [
            { count: 0, key: "Application Received" },
            { count: 0, key: "Application Submitted" },
            { count: 0, key: "Open Application" },
            { count: 0, key: "Interview Scheduled" },
            { count: 0, key: "Application WaitingList" },
            { count: 0, key: "Application Rejected" },
            { count: 0, key: "In Review" },
            { count: 0, key: "Interviewed" },
            { count: 0, key: "Applicant Passed" },
            { count: 0, key: "Applicant Rejected" },
            { count: 0, key: "Applicant OnHold" },
            { count: 0, key: "Admission Fee Paid" },
            { count: 0, key: "Payment Made" },
            { count: 0, key: "Payment Pending" },
            { count: 0, key: "Admission Payment" },
            { count: 0, key: "Interview Completed" },
            { count: 0, key: "Rejected" },
        ];
        applications = yield model_2.Application.aggregate([
            {
                $group: {
                    _id: "$applicationStatus",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        function findElement(arr, propName, propValue) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][propName] === propValue) {
                    return arr[i];
                }
            }
        }
        applications.forEach((element) => {
            var statusEntry = findElement(result, "key", element._id);
            if (statusEntry) {
                statusEntry.count = element.count;
            }
        });
        applications.forEach((element) => {
            var statusEntry = findElement(result, "key", element._id);
            if (statusEntry) {
                statusEntry.count = element.count;
            }
        });
        var applicationReceived = findElement(result, "key", "Application Received");
        var applicaionSubmitted = findElement(result, "key", "Application Submitted");
        var openApplication = findElement(result, "key", "Open Application");
        var interviewScheduled = findElement(result, "key", "Interview Scheduled");
        var applicationWaitingList = findElement(result, "key", "Application WaitingList");
        var applicationRejected = findElement(result, "key", "Application Rejected");
        var inReview = findElement(result, "key", "In Review");
        var interviewed = findElement(result, "key", "Interviewed");
        var applicantPassed = findElement(result, "key", "Applicant Passed");
        var applicantRejected = findElement(result, "key", "Applicant Rejected");
        var applicantOnHold = findElement(result, "key", "Applicant OnHold");
        var admissionFeePaid = findElement(result, "key", "Admission Fee Paid");
        var paymentMade = findElement(result, "key", "Payment Made");
        var paymentPending = findElement(result, "key", "Payment Pending");
        var admissionPayment = findElement(result, "key", "Admission Payment");
        var interviewCompleted = findElement(result, "key", "Interview Completed");
        var rejected = findElement(result, "key", "Rejected");
        // Original Status
        var applicationSubmittedCount = applicaionSubmitted.count;
        var applicationWaitingListCount = applicationWaitingList.count;
        var applicationRejectedCount = applicationRejected.count;
        var interviewScheduledCount = interviewScheduled.count;
        var applicantPassedCount = applicantPassed.count;
        var applicantRejectedCount = applicantRejected.count;
        var applicantOnHoldCount = applicantOnHold.count;
        var admissionFeePaidCount = admissionFeePaid.count;
        // Alias Field
        var inReviewCount = applicaionSubmitted.count;
        var paymentMadeCount = admissionFeePaidCount;
        var paymentPendingCount = applicantPassedCount;
        applicationReceived.count =
            applicationSubmittedCount +
                applicationWaitingListCount +
                applicationRejectedCount +
                interviewScheduledCount +
                applicantPassedCount +
                applicantRejectedCount +
                applicantOnHoldCount +
                admissionFeePaidCount;
        // Special case to track all interview passed student
        applicantPassedCount = applicantPassedCount;
        applicantPassed.count = applicantPassedCount;
        // Calculation Field
        var openApplicationCount = applicationRejectedCount + applicationWaitingListCount + inReviewCount;
        var interviewedCount = applicantPassedCount + applicantRejectedCount + applicantOnHoldCount;
        var admissionPaymentCount = paymentMadeCount + paymentPendingCount;
        var rejectedCount = applicationRejectedCount + applicantRejectedCount;
        inReview.count = inReviewCount;
        paymentMade.count = paymentMadeCount;
        paymentPending.count = paymentPendingCount;
        openApplication.count = openApplicationCount;
        interviewed.count = interviewedCount;
        admissionPayment.count = admissionPaymentCount;
        interviewCompleted.count = interviewedCount;
        rejected.count = rejectedCount;
        return result;
    }
    else if (params.type === "statuswise") {
        result = [
            { count: 0, key: "Application Submitted" },
            { count: 0, key: "Interview Scheduled" },
            { count: 0, key: "Application WaitingList" },
            { count: 0, key: "Application Rejected" },
            { count: 0, key: "Applicant Passed" },
            { count: 0, key: "Applicant Rejected" },
            { count: 0, key: "Applicant OnHold" },
            { count: 0, key: "Admission Fee Paid" },
        ];
        applications = yield model_2.Application.aggregate([
            {
                $group: {
                    _id: "$applicationStatus",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        applications.forEach((element) => {
            var statusEntry = findElement(result, "key", element._id);
            if (statusEntry) {
                statusEntry.count = element.count;
            }
        });
        return result;
    }
    else if (params.type === "gradewise") {
        result = [
            { count: 0, key: "LKG" },
            { count: 0, key: "UKG" },
            { count: 0, key: "I" },
            { count: 0, key: "II" },
            { count: 0, key: "III" },
            { count: 0, key: "IV" },
            { count: 0, key: "V" },
            { count: 0, key: "VI" },
            { count: 0, key: "VII" },
            { count: 0, key: "VIII" },
            { count: 0, key: "IX" },
            { count: 0, key: "X" },
            { count: 0, key: "XI" },
            { count: 0, key: "XII" },
        ];
        applications = yield model_2.Application.aggregate([
            {
                $group: {
                    _id: "$classGrade",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        applications.forEach((element) => {
            var statusEntry = findElement(result, "key", element._id);
            if (statusEntry) {
                statusEntry.count = element.count;
            }
        });
        return result;
    }
    else if (params.type === "payment") {
        result = [
            { count: 0, key: "LKG" },
            { count: 0, key: "UKG" },
            { count: 0, key: "I" },
            { count: 0, key: "II" },
            { count: 0, key: "III" },
            { count: 0, key: "IV" },
            { count: 0, key: "V" },
            { count: 0, key: "VI" },
            { count: 0, key: "VII" },
            { count: 0, key: "VIII" },
            { count: 0, key: "IX" },
            { count: 0, key: "X" },
            { count: 0, key: "XI" },
            { count: 0, key: "XII" },
        ];
        applications = yield model_2.Application.aggregate([
            {
                $match: {
                    applicationStatus: "Admission Fee Paid",
                },
            },
            {
                $group: {
                    _id: "$classGrade",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        applications.forEach((element) => {
            var statusEntry = findElement(result, "key", element._id);
            if (statusEntry) {
                statusEntry.count = element.count;
            }
        });
        return result;
    }
    else if (params.type === "genderwise") {
        result = [
            { count: 0, key: "Male" },
            { count: 0, key: "Female" },
        ];
        applications = yield model_2.Application.aggregate([
            {
                $group: {
                    _id: "$gender",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        applications.forEach((element) => {
            var statusEntry = findElement(result, "key", element._id);
            if (statusEntry) {
                statusEntry.count = element.count;
            }
        });
        return result;
    }
    else {
        return [];
    }
});
exports.getApplicationsForAnalyticService = getApplicationsForAnalyticService;
function findElement(arr, propName, propValue) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][propName] === propValue) {
            return arr[i];
        }
    }
}
exports.findElement = findElement;
function nextApplicationNumber() {
    return __awaiter(this, void 0, void 0, function* () {
        var lastapp = yield model_2.Application.findOne().sort({ applicationNumber: -1 });
        let applicationNumber = 1001;
        if (lastapp && lastapp.applicationNumber) {
            applicationNumber = lastapp.applicationNumber + 1;
        }
        return applicationNumber;
    });
}
exports.nextApplicationNumber = nextApplicationNumber;
const updateApplicationService = (params, body) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        if (body.firstName && body.lastName) {
            body.candidateName = body.firstName + " " + body.lastName;
        }
        if (body.interviewTimeIn && body.interviewTimeOut) {
            body.interviewTime = body.interviewTimeIn + "-" + body.interviewTimeOut;
        }
        try {
            var objId = new mongodb_1.ObjectId(params.id);
            const appDoc = yield model_2.Application.findById(objId);
            if (!appDoc) {
                const error = new Error();
                error.status = 404;
                error.message = "Application does not exist";
                reject(error);
            }
            if (appDoc.applicationStatus === "Submission Pending" ||
                appDoc.applicationStatus === "Awaiting Application Fee") {
                if (body.submitted) {
                    if (!appDoc.applicationNumber) {
                        body.applicationNumber = yield nextApplicationNumber();
                    }
                    if (body.paymentMode === "online" &&
                        body.paymentStatus === "TXN_SUCCESS") {
                        body.applicationStatus = "Application Submitted";
                    }
                    else {
                        body.applicationStatus = "Awaiting Application Fee";
                    }
                }
            }
            const newDoc = yield model_2.Application.findOneAndUpdate({ _id: params.id }, body, { new: true });
            resolve(newDoc);
        }
        catch (err) {
            const error = new Error();
            error.status = 500;
            error.message = "Error while processing your request";
            reject(err);
        }
    }));
};
exports.updateApplicationService = updateApplicationService;
const deleteApplicationService = (params) => {
    var objId = new mongodb_1.ObjectId(params.id);
    return new Promise((resolve, reject) => {
        return model_2.Application.findByIdAndRemove(objId).then(resolve).catch(reject);
    });
};
exports.deleteApplicationService = deleteApplicationService;
const searchApplicationsService = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { limit = 10, offset = 0, sort_by: sortBy, sort_order: sortOrder, table_name: tableName } = queryParams, filterProps = __rest(queryParams, ["limit", "offset", "sort_by", "sort_order", "table_name"]);
        let selectFields = yield admin_config_1.TableMetaDataConfigModel.find({
            tableName: tableName,
            entityName: "Application",
        })
            .select("fieldName")
            .lean();
        selectFields = selectFields.map((obj) => obj.fieldName);
        const options = {
            limit,
            offset,
            customLabels: {
                totalDocs: "totalApplications",
                docs: "applications",
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
        Object.keys(filterProps).forEach((prop) => {
            const value = filterProps[prop];
            const dateParse = Date.parse(value);
            if (Array.isArray(value)) {
                q[prop] = { $in: value };
            }
            else if (prop === "applicationStatus" &&
                fullTextSearchApplicationStatus.indexOf(value) !== -1) {
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
        return yield model_2.Application.paginate(q, options);
    }
    catch (exception) {
        throw new Error("Error while processing your request");
    }
});
exports.searchApplicationsService = searchApplicationsService;
const getApplicationsAdmissionStatusService = ({ applicationId, }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        model_2.Application.find({ _id: applicationId })
            .select("interviewerNote passPercentage candidatePercentage candidatePerformance parentInput reportUrl -_id")
            .lean()
            .then((application) => {
            if (application && application.length) {
                const response = application[0];
                delete response.age;
                delete response.paymentFailed;
                return resolve(response);
            }
            return null;
        })
            .then((0, response_1.notFoundError)(reject))
            .catch(reject);
    });
});
exports.getApplicationsAdmissionStatusService = getApplicationsAdmissionStatusService;
const updateApplicationsAdmissionStatusService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, applicationIds } = params, updateParams = __rest(params, ["userId", "applicationIds"]);
        if (!applicationIds || applicationIds.length === 0) {
            throw new Error("Invalid applicationIds");
        }
        if (!updateParams || !updateParams.interviewerNote) {
            throw new Error("Interview note is required");
        }
        const convertedApplicationIds = applicationIds.map((id) => new mongodb_1.ObjectId(id));
        const updateRes = yield model_2.Application.bulkWrite([
            {
                updateMany: {
                    filter: { _id: convertedApplicationIds },
                    update: { $set: updateParams },
                },
            },
        ]);
        if (!updateRes) {
            throw new Error("Updatting admission status failed");
        }
        const applications = yield model_2.Application.find({
            _id: { $in: convertedApplicationIds },
        }).select("candidateName applicationStatus interviewerNote interviewDate interviewTime applicationNumber fatherEmailAddress motherEmailAddress");
        const mailNotificationResponse = yield Promise.allSettled(applications.map(exports.sendApplicationStatusNotification));
        return applications;
    }
    catch (exception) {
        console.log(exception, "exception");
        throw exception;
    }
});
exports.updateApplicationsAdmissionStatusService = updateApplicationsAdmissionStatusService;
const sendApplicationStatusNotification = (application) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let content = "";
        if (!application.fatherEmailAddress && !application.motherEmailAddress) {
            throw new Error("Parents email address is required for " + application._id);
        }
        const sendEmailTo = application.fatherEmailAddress || application.motherEmailAddress;
        if (application.applicationStatus === "Application Submitted") {
            content = `
        Hello ${application.candidateName},<br><br>
        We regret to say that your interview schedule for application no. ${application.applicationNumber} has been
        cancelled. We will notify you, further schedules. Please refer the notes.<br><br>
        Note: ${application.interviewerNote}
       <br><br>
        Best Regards, <br><br>
        &mdash; Mentor Team
      `;
        }
        else if (application.applicationStatus === "Application Rejected") {
            content = `
        Hello ${application.candidateName},<br><br>
        We regret to inform you that, after careful consideration, the application with the number ${application.applicationNumber} has been
         unsuccessful in moving forward in the admissions process. 
         Unfortunately, we are unable to proceed with it any further at this time. <br><br>
          We understand that this may be disappointing news, and we appreciate your 
          interest in our institution. We encourage you to explore other opportunities 
          and options that align with your goals and aspirations. If you have any questions or 
          would like further clarification regarding the rejection, please do not hesitate to 
          reach out to us. We are here to assist you and provide any necessary support  
        Note: ${application.interviewerNote}
        <br><br>
        Best Regards, <br><br>
        &mdash; Mentor Team
      `;
        }
        else if (application.applicationStatus === "On-hold") {
            content = `
        Hello ${application.candidateName},<br><br>
        We regret to say that application no. ${application.applicationNumber} is on-hold.   
        We will notify you, once the status has been changed. <br><br>
        Note: ${application.interviewerNote}
         <br><br>
        Best Regards, <br><br>
        &mdash; Mentor Team
      `;
        }
        else if (application.applicationStatus === "Application WaitingList") {
            content = `
        Hello ${application.candidateName},<br><br>
        We regret to inform you that the application with the number ${application.applicationNumber} has been placed on the waiting list. This means that while the application was not accepted immediately, 
        there is still a possibility of admission depending on future developments. <br><br>
       
        We will closely monitor the status of the application and notify you promptly 
        if there are any changes. We understand that this may be a period of uncertainty, 
        but we appreciate your patience and continued interest in our institution. 
        <br><br>
         If you have any questions or require further information, please feel free to contact us. 
         We will do our best to provide you with updates and assist you throughout this process. 
        Note: ${application.interviewerNote}
        <br><br>
         Best Regards, <br><br>
        &mdash; Mentor Team
      `;
        }
        else if (application.applicationStatus === "Applicant Passed") {
            content = `
        Hello ${application.candidateName},<br><br>
        Congratulations! Your application no. ${application.applicationNumber}  has been selected for admission for the year 2020-2021. 
        We request you to contact the admin team or you can visit the application dashboard the pay the admission fee through online.
       <br><br>
         Best Regards, <br><br>
        &mdash; Mentor Team
      `;
        }
        else if (application.applicationStatus === "Interview Scheduled") {
            content = `
        Hello ${application.candidateName},<br><br>
        Congratulations! Your application no. ${application.applicationNumber} has been selected for interview. We request you to be there along with applicant 
        10mins before the interview and carry the supporting documents.  
        <br><br>
        <b>Interview Date:</b> ${application.interviewDate}
        <br><br>
        <b>Interview Time:</b> ${application.interviewTime}
        <br><br>
        Note: ${application.interviewerNote}
      <br><br>
         Best Regards, <br><br>
        &mdash; Mentor Team
      `;
        }
        else if (application.applicationStatus === "Applicant Rejected") {
            content = `
        Hello ${application.candidateName},<br><br>
        We regret to say that application no. <> has been rejected so we will not be able to take it forward further. 
        <br><br>
         Best Regards, <br><br>
        &mdash; Mentor Team
      `;
        }
        else if (application.applicationStatus === "Admission Fee Failed") {
            content = `
        Hello ${application.candidateName},<br><br>
        Thanks for trying to make payment for admission fee through online. 
        Unfortunately, payment for the admission process has been declined, 
        please contact your bank for more information.  
        Please use the application no. ${application === null || application === void 0 ? void 0 : application.applicationNumber} to pay for the admission fee ${application === null || application === void 0 ? void 0 : application.admissionFee} at the 
        Institution Fee counter or if you wish to use another type of payment then 
        you can make the online payment through Application dashboard.<br><br>
       Note: Once the payment has been made then we will start the enrollment process for your child
        <br><br>
         Best Regards, <br><br>
        &mdash; Mentor Team
      `;
        }
        else if (application.applicationStatus === "Admission Fee Paid") {
            content = `
        Hello ${application.candidateName},<br><br>
        Congratulations, your payment for admission fee has been successfully completed.   We will share the enrollment number, our online ERP credentials once the enrollment has been completed.  
        <br><br>
       Please find the attached payment receipt. 
        <br><br>
         Best Regards, <br><br>
        &mdash; Mentor Team
      `;
        }
        else if (application.applicationStatus === "Enrolled") {
            content = `
        Hello ${application.candidateName},<br><br>
       We are pleased to inform you that enrollment for your child has been completed for the year 2020-2021.  Please find the login details. 
        <br><br>
        We wish a successful learning journey for your child. 
        <br><br>
         Best Regards, <br><br>
        &mdash; Mentor Team
      `;
        }
        return aws_ses_1.default.sendEmail({
            toEmail: sendEmailTo,
            subject: "Mentor - Application Status",
            content,
        });
    }
    catch (exception) {
        const err = exception && exception.message
            ? exception.message
            : "Error while sending notification email";
        throw new Error(err);
    }
});
exports.sendApplicationStatusNotification = sendApplicationStatusNotification;
const createInterviewScheduleService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = params, schedulerParams = __rest(params, ["userId"]);
        const applicationExists = yield model_2.InterviewScheduler.findOne({
            applicationIds: { $in: schedulerParams.applicationIds },
        });
        if (schedulerParams.interviewTimeIn && schedulerParams.interviewTimeOut) {
            schedulerParams.interviewTime =
                schedulerParams.interviewTimeIn +
                    "-" +
                    schedulerParams.interviewTimeOut;
        }
        if (!schedulerParams.applicationIds ||
            schedulerParams.applicationIds.length === 0) {
            throw new Error("Invalid applicationIds");
        }
        if (!schedulerParams ||
            !schedulerParams.interviewDate ||
            !schedulerParams.interviewTimeIn) {
            throw new Error("Interview date & time in is required");
        }
        if (!schedulerParams.applicationStatus) {
            schedulerParams.applicationStatus = "Interview Scheduled";
        }
        const updateRes = yield (0, exports.updateApplicationsAdmissionStatusService)(schedulerParams);
        if (!updateRes) {
            throw new Error("Updatting application admission schedule is failed");
        }
        schedulerParams.applicantCount = schedulerParams.applicationIds.length;
        schedulerParams.lastModifiedBy = schedulerParams.createdBy =
            (yield model_1.User.findById(userId)) || null;
        if (applicationExists) {
            const filter = {
                applicationIds: { $in: schedulerParams.applicationIds },
            };
            const update = {
                $set: {
                    interviewerNote: params.interviewerNote,
                    interviewTimeIn: params.interviewTimeIn,
                    interviewDate: params.interviewDate,
                    applicationStatus: params.applicationStatus,
                    interviewTimeOut: params.interviewTimeOut,
                    interviewTime: params.interviewTimeIn + " - " + params.interviewTimeOut,
                    lastModifiedBy: (yield model_1.User.findById(userId)) || null,
                },
            };
            const updateResponse = yield model_2.InterviewScheduler.updateMany(filter, update);
            const updateRes = yield (0, exports.updateApplicationsAdmissionStatusService)({
                userId: (params === null || params === void 0 ? void 0 : params.userId) || null,
                applicationIds: params.applicationIds,
                interviewDate: params.interviewDate,
                interviewTimeIn: params.interviewTimeIn,
                interviewTimeOut: params.interviewTimeOut,
                interviewerNote: params.interviewerNote,
                interviewTime: params.interviewTimeIn + " - " + params.interviewTimeOut,
            });
            return { message: "Interview Schedule updated Successfully" };
        }
        else {
            const scheduleRes = yield model_2.InterviewScheduler.create(schedulerParams);
            return { message: "Interview Scheduled Successfully" };
        }
    }
    catch (exception) {
        const err = exception && exception.message
            ? exception.message
            : "Error while creating application schedule";
        throw new Error(err);
    }
});
exports.createInterviewScheduleService = createInterviewScheduleService;
const updateInterviewScheduleService = (id, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = params, schedulerParams = __rest(params, ["userId"]);
        if (schedulerParams.interviewTimeIn && schedulerParams.interviewTimeOut) {
            schedulerParams.interviewTime =
                schedulerParams.interviewTimeIn +
                    "-" +
                    schedulerParams.interviewTimeOut;
        }
        if (schedulerParams.interviewTimeIn && schedulerParams.interviewTimeOut) {
            schedulerParams.interviewTime =
                schedulerParams.interviewTimeIn +
                    "-" +
                    schedulerParams.interviewTimeOut;
        }
        if (!schedulerParams ||
            !schedulerParams.interviewDate ||
            !schedulerParams.interviewTimeIn) {
            throw new Error("Interview date & time in is required");
        }
        if (!schedulerParams.applicationStatus) {
            schedulerParams.applicationStatus = "Interview Scheduled";
        }
        const scheduledData = yield model_2.InterviewScheduler.findById(id);
        if (scheduledData.deleted) {
            throw new Error("Interview Schedule is not found");
        }
        schedulerParams.applicationIds = scheduledData.applicationIds;
        const updateRes = yield (0, exports.updateApplicationsAdmissionStatusService)(schedulerParams);
        if (!updateRes) {
            throw new Error("Updatting application admission schedule is failed");
        }
        schedulerParams.applicantCount = schedulerParams.applicationIds.length;
        schedulerParams.lastModifiedBy = (yield model_1.User.findById(userId)) || null;
        const scheduleRes = yield model_2.InterviewScheduler.findByIdAndUpdate(id, schedulerParams);
        return scheduleRes;
    }
    catch (exception) {
        const err = exception && exception.message
            ? exception.message
            : "Error while update application schedule";
        throw new Error(err);
    }
});
exports.updateInterviewScheduleService = updateInterviewScheduleService;
const updateInterviewReScheduleService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, applicationIds, interviewTimeOut, interviewTimeIn, interviewDate, interviewerNote, } = params;
        const applicationExists = yield model_2.InterviewScheduler.findOne({
            applicationIds: { $in: applicationIds },
        });
        if (applicationExists) {
            const filter = { applicationIds: { $in: applicationIds } };
            const update = {
                $set: {
                    interviewerNote: params.interviewerNote,
                    interviewTimeIn: params.interviewTimeIn,
                    interviewDate: params.interviewDate,
                    applicationStatus: params.applicationStatus,
                    interviewTimeOut: params.interviewTimeOut,
                    interviewTime: params.interviewTimeIn + " - " + params.interviewTimeOut,
                    lastModifiedBy: (yield model_1.User.findById(userId)) || null,
                },
            };
            const updateResponse = yield model_2.InterviewScheduler.updateMany(filter, update);
            const updateRes = yield (0, exports.updateApplicationsAdmissionStatusService)({
                userId: (params === null || params === void 0 ? void 0 : params.userId) || null,
                applicationIds: params.applicationIds,
                interviewDate: params.interviewDate,
                interviewTimeIn: params.interviewTimeIn,
                interviewTimeOut: params.interviewTimeOut,
                interviewerNote: params.interviewerNote,
                interviewTime: params.interviewTimeIn + " - " + interviewTimeOut,
            });
            return updateResponse;
        }
        else {
            return "null";
        }
    }
    catch (exception) {
        const err = exception && exception.message
            ? exception.message
            : "Error while update application schedule";
        throw new Error(err);
    }
});
exports.updateInterviewReScheduleService = updateInterviewReScheduleService;
const cancelInterviewScheduleService = (id, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = params;
        const scheduledData = yield model_2.InterviewScheduler.findById(id).lean();
        if (!scheduledData || scheduledData.deleted) {
            throw new Error("Interview Schedule is not found");
        }
        scheduledData.interviewerNote = "Due to technical issue";
        scheduledData.applicationStatus = "Application Submitted";
        scheduledData.deleted = true;
        delete scheduledData._id;
        const updateRes = yield (0, exports.updateApplicationsAdmissionStatusService)(scheduledData);
        if (!updateRes) {
            throw new Error("Updatting application admission schedule is failed");
        }
        scheduledData.applicantCount = scheduledData.applicationIds.length;
        scheduledData.lastModifiedBy = (yield model_1.User.findById(userId)) || null;
        {
            const scheduleRes = yield model_2.InterviewScheduler.findByIdAndUpdate(id, scheduledData);
            return scheduleRes;
        }
    }
    catch (exception) {
        const err = exception && exception.message
            ? exception.message
            : "Error while cancelling application schedule";
        throw new Error(err);
    }
});
exports.cancelInterviewScheduleService = cancelInterviewScheduleService;
const getInterviewScheduleByDateService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        model_2.InterviewScheduler.find({
            interviewDate: params.interviewDate,
            deleted: false,
        })
            .populate("lastModifiedBy", "name email")
            .select("-deleted -__v")
            .then(resolve)
            .catch(reject);
    });
});
exports.getInterviewScheduleByDateService = getInterviewScheduleByDateService;
const searchInterviewSchedulesService = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { limit = 10, offset = 0, sort_by: sortBy, sort_order: sortOrder, table_name: tableName } = queryParams, filterProps = __rest(queryParams, ["limit", "offset", "sort_by", "sort_order", "table_name"]);
        let selectFields = yield admin_config_1.TableMetaDataConfigModel.find({
            tableName: tableName,
            entityName: "InterviewScheduler",
        })
            .select("fieldName")
            .lean();
        selectFields = selectFields.map((obj) => obj.fieldName);
        const options = {
            limit,
            offset,
            lean: true,
            customLabels: {
                totalDocs: "totalSchedules",
                docs: "schedules",
            },
        };
        if (sortBy) {
            sortOrder = sortOrder && sortOrder === "desc" ? -1 : 1;
            options.sort = { [sortBy]: sortOrder };
        }
        if (selectFields.length > 0) {
            options.select = selectFields.join(" ");
        }
        filterProps.deleted = false;
        const $and = [];
        const q = {};
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
        if ($and.length > 0) {
            q.$and = $and;
        }
        const result = yield model_2.InterviewScheduler.paginate(q, options);
        result.schedules = result.schedules.map((schedule) => {
            let scheduleDate = schedule.interviewDate;
            if (scheduleDate) {
                scheduleDate = scheduleDate.toISOString();
                schedule.interviewDate = scheduleDate.split("T")[0];
            }
            return schedule;
        });
        return result;
    }
    catch (exception) {
        throw new Error("Error while processing your request");
    }
});
exports.searchInterviewSchedulesService = searchInterviewSchedulesService;
const sendInterviewReminderNotificationService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scheduledData = yield model_2.InterviewScheduler.findById(id);
        if (scheduledData.deleted) {
            throw new Error("Interview Schedule is not found");
        }
        const applications = yield model_2.Application.find({
            _id: { $in: scheduledData.applicationIds },
        }).select("candidateName applicationStatus interviewerNote interviewDate interviewTime applicationNumber fatherEmailAddress motherEmailAddress");
        const mailNotificationResponse = yield Promise.allSettled(applications.map(exports.sendApplicationStatusNotification));
        return { message: "Remainder notification is sent to all applicants." };
    }
    catch (exception) {
        throw exception;
    }
});
exports.sendInterviewReminderNotificationService = sendInterviewReminderNotificationService;
const getApplicationsForAnalyticCalendarService = (params, body) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    function findElement(arr, propName, propValue) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][propName] === propValue) {
                return arr[i];
            }
        }
    }
    function updateCountInResult(resultArray, data, yearType) {
        data.forEach((element) => {
            const statusEntry = findElement(resultArray, "key", element._id);
            if (statusEntry) {
                statusEntry[`${yearType}`] = element.count;
            }
        });
    }
    if (params.type === "dashboard") {
        const currentYearApplications = yield model_2.Application.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lt: new Date(`${currentYear + 1}-01-01`),
                    },
                },
            },
            {
                $group: {
                    _id: "$applicationStatus",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        const previousYearApplications = yield model_2.Application.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${previousYear}-01-01`),
                        $lt: new Date(`${currentYear}-01-01`),
                    },
                },
            },
            {
                $group: {
                    _id: "$applicationStatus",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        result = [
            {
                currentYear: 0,
                previousYear: 0,
                key: "Application Received",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Application Submitted",
            },
            { currentYear: 0, previousYear: 0, key: "Open Application" },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Interview Scheduled",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Application WaitingList",
            },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Application Rejected",
            },
            { currentYear: 0, previousYear: 0, key: "In Review" },
            { currentYear: 0, previousYear: 0, key: "Interviewed" },
            { currentYear: 0, previousYear: 0, key: "Applicant Passed" },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Applicant Rejected",
            },
            { currentYear: 0, previousYear: 0, key: "Applicant OnHold" },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Admission Fee Paid",
            },
            { currentYear: 0, previousYear: 0, key: "Payment Made" },
            { currentYear: 0, previousYear: 0, key: "Payment Pending" },
            { currentYear: 0, previousYear: 0, key: "Admission Payment" },
            {
                currentYear: 0,
                previousYear: 0,
                key: "Interview Completed",
            },
            { currentYear: 0, previousYear: 0, key: "Rejected" },
        ];
        updateCountInResult(result, currentYearApplications, "currentYear");
        updateCountInResult(result, previousYearApplications, "previousYear");
        const calculationConst = [
            {
                label: "Open Application",
                keys: [
                    "Application WaitingList",
                    "Application Submitted",
                    "Application Rejected",
                ],
            },
            {
                label: "Admission Payment",
                keys: ["Admission Payment"],
            },
            {
                label: "Interviewed",
                keys: ["Admission Payment", "Applicant Rejected", "Applicant OnHold"],
            },
            {
                label: "Reject",
                keys: ["Application Rejected", "Rejected"],
            },
            {
                label: "Application Received",
                keys: [
                    "Application Submitted",
                    "Application WaitingList",
                    "Applicant Rejected",
                    "Interview Scheduled",
                    "Applicant Passed",
                    "Application Rejected",
                    "Applicant OnHold",
                    "Admission Fee Paid",
                ],
            },
            {
                label: "In Review",
                keys: ["Application Submitted"],
            },
            {
                label: "Applicant Passed",
                keys: ["Applicant Passed"],
            },
            {
                label: "Payment Made",
                keys: ["Admission Fee Paid"],
            },
            {
                label: "Payment Pending",
                keys: ["Applicant Passed"],
            },
            {
                label: "Rejected",
                keys: ["Application Rejected", "Applicant Rejected"],
            },
            {
                label: "Interview Completed",
                keys: ["Interviewed"],
            },
        ];
        calculationConst.forEach((calculation) => {
            const currentYear = result.reduce((sum, statusEntry) => {
                if (calculation.keys.includes(statusEntry.key)) {
                    sum += statusEntry.currentYear;
                }
                return sum;
            }, 0);
            const previousYear = result.reduce((sum, statusEntry) => {
                if (calculation.keys.includes(statusEntry.key)) {
                    sum += statusEntry.previousYear;
                }
                return sum;
            }, 0);
            const update = findElement(result, "key", calculation.label);
            if (update) {
                update.currentYear = currentYear;
                update.previousYear = previousYear;
            }
        });
        return result;
    }
    else if (params.type === "statuswise") {
        const currentYearApplications = yield model_2.Application.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lt: new Date(`${currentYear + 1}-01-01`),
                    },
                },
            },
            {
                $group: {
                    _id: "$applicationStatus",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        const previousYearApplications = yield model_2.Application.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${previousYear}-01-01`),
                        $lt: new Date(`${currentYear}-01-01`),
                    },
                },
            },
            {
                $group: {
                    _id: "$applicationStatus",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        result = [
            { currentYear: 0, previousYear: 0, key: "Application Submitted" },
            { currentYear: 0, previousYear: 0, key: "Interview Scheduled" },
            { currentYear: 0, previousYear: 0, key: "Application WaitingList" },
            { currentYear: 0, previousYear: 0, key: "Application Rejected" },
            { currentYear: 0, previousYear: 0, key: "Applicant Passed" },
            { currentYear: 0, previousYear: 0, key: "Applicant Rejected" },
            { currentYear: 0, previousYear: 0, key: "Applicant OnHold" },
            { currentYear: 0, previousYear: 0, key: "Admission Fee Paid" },
        ];
        updateCountInResult(result, currentYearApplications, "currentYear");
        updateCountInResult(result, previousYearApplications, "previousYear");
        return result;
    }
    else if (params.type === "gradewise") {
        const currentYearApplications = yield model_2.Application.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lt: new Date(`${currentYear + 1}-01-01`),
                    },
                },
            },
            {
                $group: {
                    _id: "$classGrade",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        const previousYearApplications = yield model_2.Application.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${previousYear}-01-01`),
                        $lt: new Date(`${currentYear}-01-01`),
                    },
                },
            },
            {
                $group: {
                    _id: "$classGrade",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        result = [
            { currentYear: 0, previousYear: 0, key: "LKG" },
            { currentYear: 0, previousYear: 0, key: "UKG" },
            { currentYear: 0, previousYear: 0, key: "I" },
            { currentYear: 0, previousYear: 0, key: "II" },
            { currentYear: 0, previousYear: 0, key: "III" },
            { currentYear: 0, previousYear: 0, key: "IV" },
            { currentYear: 0, previousYear: 0, key: "V" },
            { currentYear: 0, previousYear: 0, key: "VI" },
            { currentYear: 0, previousYear: 0, key: "VII" },
            { currentYear: 0, previousYear: 0, key: "VIII" },
            { currentYear: 0, previousYear: 0, key: "IX" },
            { currentYear: 0, previousYear: 0, key: "X" },
            { currentYear: 0, previousYear: 0, key: "XI" },
            { currentYear: 0, previousYear: 0, key: "XII" },
        ];
        updateCountInResult(result, currentYearApplications, "currentYear");
        updateCountInResult(result, previousYearApplications, "previousYear");
        return result;
    }
    else if (params.type === "payment") {
        const currentYearApplications = yield model_2.Application.aggregate([
            {
                $match: {
                    applicationStatus: "Admission Fee Paid",
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lt: new Date(`${currentYear + 1}-01-01`),
                    },
                },
            },
            {
                $group: {
                    _id: "$classGrade",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        const previousYearApplications = yield model_2.Application.aggregate([
            {
                $match: {
                    applicationStatus: "Admission Fee Paid",
                    createdAt: {
                        $gte: new Date(`${previousYear}-01-01`),
                        $lt: new Date(`${currentYear}-01-01`),
                    },
                },
            },
            {
                $group: {
                    _id: "$classGrade",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        result = [
            { currentYear: 0, previousYear: 0, key: "LKG" },
            { currentYear: 0, previousYear: 0, key: "UKG" },
            { currentYear: 0, previousYear: 0, key: "I" },
            { currentYear: 0, previousYear: 0, key: "II" },
            { currentYear: 0, previousYear: 0, key: "III" },
            { currentYear: 0, previousYear: 0, key: "IV" },
            { currentYear: 0, previousYear: 0, key: "V" },
            { currentYear: 0, previousYear: 0, key: "VI" },
            { currentYear: 0, previousYear: 0, key: "VII" },
            { currentYear: 0, previousYear: 0, key: "VIII" },
            { currentYear: 0, previousYear: 0, key: "IX" },
            { currentYear: 0, previousYear: 0, key: "X" },
            { currentYear: 0, previousYear: 0, key: "XI" },
            { currentYear: 0, previousYear: 0, key: "XII" },
        ];
        updateCountInResult(result, currentYearApplications, "currentYear");
        updateCountInResult(result, previousYearApplications, "previousYear");
        return result;
    }
    else if (params.type === "genderwise") {
        const currentYearApplications = yield model_2.Application.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lt: new Date(`${currentYear + 1}-01-01`),
                    },
                },
            },
            {
                $group: {
                    _id: "$gender",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        const previousYearApplications = yield model_2.Application.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${previousYear}-01-01`),
                        $lt: new Date(`${currentYear}-01-01`),
                    },
                },
            },
            {
                $group: {
                    _id: "$gender",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        result = [
            { currentYear: 0, previousYear: 0, key: "Male" },
            { currentYear: 0, previousYear: 0, key: "Female" },
        ];
        updateCountInResult(result, currentYearApplications, "currentYear");
        updateCountInResult(result, previousYearApplications, "previousYear");
        return result;
    }
    else {
        return [];
    }
    /* //const inputDate = new Date(body.date);
    const inputDate = new Date("2023-07-31");
    // Week Query
    const currentWeekDays = getWeekDates(inputDate);
    const currentWeekDates = getDatesBetween(
      new Date(currentWeekDays.startDate),
      new Date(currentWeekDays.endDate)
    );
    const previousWeekStartDate = new Date(currentWeekDays.startDate) - 1;
    const previousWeekDays = getWeekDates(previousWeekStartDate);
    const previousWeekDates = getDatesBetween(
      new Date(previousWeekDays.startDate),
      new Date(previousWeekDays.endDate)
    );
  
    // Month Query
    const firstDayOfMonth = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      1
    );
    const firstDayOfNextMonth = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth() + 1,
      1
    );
    const firstDayOfPreviousMonth = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth() - 1,
      1
    );
    const firstDayOfPreviousMonthNext = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      1
    );
    // Year Query
    const firstDayOfYear = new Date(inputDate.getFullYear(), 0, 1);
    const firstDayOfNextYear = new Date(inputDate.getFullYear() + 1, 0, 1);
    const firstDayOfPreviousYear = new Date(inputDate.getFullYear() - 1, 0, 1);
    const firstDayOfPreviousYearNext = new Date(inputDate.getFullYear(), 0, 1);
  
    let currentWeekResult = [];
    let previousWeekResult = [];
    let currentMonthResult = [];
    let previousMonthResult = [];
    let currentYearResult = [];
    let previousYearResult = [];
  
    if (params.type === "dashboard") {
      const retrieveData = async (query, label) => {
        try {
          const data = await Application.find(query);
          switch (label) {
            case "currentMonth":
              currentMonthResult = data.length;
              break;
            case "previousMonth":
              previousMonthResult = data.length;
              break;
            case "currentYear":
              currentYearResult = data.length;
              break;
            case "previousYear":
              previousYearResult = data.length;
              break;
            default:
              return {};
          }
          return data;
        } catch (err) {
          console.error("Error while retrieving data:", err);
          throw err;
        }
      };
  
      const retrieveWeekData = async (query, desc, label) => {
        try {
          const data = await Application.aggregate(query);
          const dayLabel = label.split(" ")[1];
          const key = "day" + dayLabel;
          const resultObj = { [key]: data.length };
  
          switch (desc) {
            case "currentWeek":
              currentWeekResult.push(resultObj);
              break;
            case "previousWeek":
              previousWeekResult.push(resultObj);
              break;
            default:
              return [];
          }
          return data;
        } catch (err) {
          console.error("Error while retrieving data:", err);
          throw err;
        }
      };
  
      const weekQuery = async (dates, desc) => {
        const weekQueries = dates?.map((dateString, index) => {
          const startOfDay = new Date(dateString);
          startOfDay.setUTCHours(0, 0, 0, 0);
          const endOfDay = new Date(dateString);
          endOfDay.setUTCHours(23, 59, 59, 999);
          const query = [
            {
              $match: {
                createdAt: {
                  $gte: startOfDay,
                  $lte: endOfDay,
                },
              },
            },
          ];
          const description = `Day ${index + 1} ${dateString}`;
          return retrieveWeekData(query, desc, description);
        });
  
        return Promise.all(weekQueries);
      };
  
      const getDataForDashboard = async () => {
        try {
          const [currentWeekQueries, previousWeekQueries] = await Promise.all([
            weekQuery(currentWeekDates, "currentWeek"),
            weekQuery(previousWeekDates, "previousWeek"),
          ]);
  
          await Promise.all([
            ...currentWeekQueries.flat(),
            ...previousWeekQueries.flat(),
            retrieveData(
              { createdAt: { $gte: firstDayOfMonth, $lt: firstDayOfNextMonth } },
              "currentMonth"
            ),
            retrieveData(
              {
                createdAt: {
                  $gte: firstDayOfPreviousMonth,
                  $lt: firstDayOfPreviousMonthNext,
                },
              },
              "previousMonth"
            ),
            retrieveData(
              { createdAt: { $gte: firstDayOfYear, $lt: firstDayOfNextYear } },
              "currentYear"
            ),
            retrieveData(
              {
                createdAt: {
                  $gte: firstDayOfPreviousYear,
                  $lt: firstDayOfPreviousYearNext,
                },
              },
              "previousYear"
            ),
          ]);
  
          const results = {
            currentWeekResult,
            previousWeekResult,
            currentMonthResult,
            previousMonthResult,
            currentYearResult,
            previousYearResult,
          };
          return results;
        } catch (err) {
          console.error("Error:", err);
          throw err;
        }
      };
  
      const result = getDataForDashboard()
        .then((results) => {
          return results;
        })
        .catch((err) => {
          return err;
        });
  
      return result;
    } else if (params.type === "gradewise") {
      const gradeCollection = [
        "LKG",
        "UKG",
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII",
      ];
  
      const currentWeekResult = [];
      const previousWeekResult = [];
  
      const retrieveGradeWeekData = async (query, label, desc) => {
        try {
          const data = await Application.aggregate(query);
          const dayLabel = label.split(" ")[1];
          const key = "day" + dayLabel;
          const resultObj = { [key]: data.length };
          switch (desc) {
            case "currentWeek":
              currentWeekResult.push(resultObj);
              break;
            case "previousWeek":
              previousWeekResult.push(resultObj);
              break;
            default:
              return [];
          }
          return data ? data : null;
        } catch (err) {
          console.error("Error while retrieving data:", err);
          throw err;
        }
      };
  
      async function weekQuery(dates, desc) {
        return Promise.all(
          dates?.map(async (dateString, index) => {
            const startOfDay = new Date(dateString);
            startOfDay.setUTCHours(0, 0, 0, 0);
            const endOfDay = new Date(dateString);
            endOfDay.setUTCHours(23, 59, 59, 999);
            const query = [
              {
                $match: {
                  classGrade: { $in: gradeCollection },
                  createdAt: {
                    $gte: startOfDay,
                    $lte: endOfDay,
                  },
                },
              },
              {
                $group: {
                  _id: {
                    classGrade: "$classGrade",
                    createdAt: {
                      $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdAt",
                        timezone: "+00:00",
                      },
                    },
                  },
                  count: { $sum: 1 },
                },
              },
            ];
            const description = `Day ${index + 1} ${dateString}`;
            return await retrieveGradeWeekData(query, description, desc);
          })
        );
      }
  
      async function getClassGradeDataByDateRange(startDate, endDate) {
        try {
          const classGradeData = await Application.aggregate([
            {
              $match: {
                classGrade: { $in: gradeCollection },
                createdAt: {
                  $gte: startDate,
                  $lt: endDate,
                },
              },
            },
            {
              $group: {
                _id: "$classGrade",
                count: { $sum: 1 },
              },
            },
          ]).exec();
  
          return classGradeData ? classGradeData : null;
        } catch (error) {
          console.error("Error while aggregating data:", error);
          throw error;
        }
      }
  
      async function getGradeData() {
        const results = {};
  
        const currentYearData = await getClassGradeDataByDateRange(
          firstDayOfYear,
          firstDayOfNextYear
        );
  
        const previousYearData = await getClassGradeDataByDateRange(
          firstDayOfPreviousYear,
          firstDayOfPreviousYearNext
        );
  
        const currentMonthData = await getClassGradeDataByDateRange(
          firstDayOfMonth,
          firstDayOfNextMonth
        );
  
        const previousMonthData = await getClassGradeDataByDateRange(
          firstDayOfPreviousMonth,
          firstDayOfMonth
        );
  
        const currentWeekResult = await weekQuery(currentWeekDates, "currentWeek");
        const previousWeeResult = await weekQuery(
          previousWeekDates,
          "previousWeek"
        );
  
        results.currentWeekResult = currentWeekResult ? currentWeekResult : null;
        results.previousWeekResult = previousWeeResult ? previousWeeResult : null;
        results.currentMonthResult = currentMonthData ? currentMonthData : null;
        results.previousMonthResult = previousMonthData ? previousMonthData : null;
        results.currentYearResult = currentYearData ? currentYearData : null;
        results.previousYearResult = previousYearData ? previousYearData : null;
        console.log("result1", results);
  
        return results;
      }
  
      const result = getGradeData()
        .then((results) => {
          console.log("Final Results:", results);
          return results;
        })
        .catch((err) => {
          console.error("Error while retrieving data:", err);
        });
  
      return result;
    } else if (params.type === "payment") {
      const gradeCollection = [
        "LKG",
        "UKG",
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII",
      ];
  
      const currentWeekResult = [];
      const previousWeekResult = [];
  
      const retrievePaymentWeekData = async (query, label, desc) => {
        try {
          const data = await Application.aggregate(query);
          const dayLabel = label.split(" ")[1];
          const key = "day" + dayLabel;
          const resultObj = { [key]: data.length };
          switch (desc) {
            case "currentWeek":
              currentWeekResult.push(resultObj);
              break;
            case "previousWeek":
              previousWeekResult.push(resultObj);
              break;
            default:
              return [];
          }
          return data ? data : null;
        } catch (err) {
          console.error("Error while retrieving data:", err);
          throw err;
        }
      };
  
      async function weekQuery(dates, desc) {
        return Promise.all(
          dates?.map(async (dateString, index) => {
            const startOfDay = new Date(dateString);
            startOfDay.setUTCHours(0, 0, 0, 0);
            const endOfDay = new Date(dateString);
            endOfDay.setUTCHours(23, 59, 59, 999);
            const query = [
              {
                $match: {
                  applicationStatus: "Admission Fee Paid",
                  classGrade: { $in: gradeCollection },
                  createdAt: {
                    $gte: startOfDay,
                    $lte: endOfDay,
                  },
                },
              },
              {
                $group: {
                  _id: {
                    classGrade: "$classGrade",
                    createdAt: {
                      $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdAt",
                        timezone: "+00:00",
                      },
                    },
                  },
                  count: { $sum: 1 },
                },
              },
            ];
            const description = `Day ${index + 1} ${dateString}`;
            return await retrievePaymentWeekData(query, description, desc);
          })
        );
      }
  
      async function getClassGradePaymentDataByDateRange(startDate, endDate) {
        try {
          const classGradePaymentData = await Application.aggregate([
            {
              $match: {
                applicationStatus: "Admission Fee Paid",
                classGrade: { $in: gradeCollection },
                createdAt: {
                  $gte: startDate,
                  $lt: endDate,
                },
              },
            },
            {
              $group: {
                _id: "$classGrade",
                count: { $sum: 1 },
              },
            },
          ]).exec();
  
          return classGradePaymentData? classGradePaymentData : null;
        } catch (error) {
          console.error("Error while aggregating data:", error);
          throw error;
        }
      }
  
      async function getPaymentGradeData() {
        const results = {};
  
        const currentYearData = await getClassGradePaymentDataByDateRange(
          firstDayOfYear,
          firstDayOfNextYear
        );
  
        const previousYearData = await getClassGradePaymentDataByDateRange(
          firstDayOfPreviousYear,
          firstDayOfPreviousYearNext
        );
  
        const currentMonthData = await getClassGradePaymentDataByDateRange(
          firstDayOfMonth,
          firstDayOfNextMonth
        );
  
        const previousMonthData = await getClassGradePaymentDataByDateRange(
          firstDayOfPreviousMonth,
          firstDayOfMonth
        );
  
        const currentWeekResult = await weekQuery(currentWeekDates, "currentWeek");
        const previousWeekResult = await weekQuery(
          previousWeekDates,
          "previousWeek"
        );
  
        results.currentWeekResult = currentWeekResult ? currentWeekResult : null;
        results.previousWeekResult = previousWeekResult ? previousWeekResult : null;
        results.currentMonthResult = currentMonthData ? currentMonthData : null;
        results.previousMonthResult = previousMonthData ? previousMonthData : null;
        results.currentYearResult = currentYearData ? currentYearData : null;
        results.previousYearResult = previousYearData ? previousYearData : null;
        return results;
      }
      const result = getPaymentGradeData()
        .then((results) => {
          console.log("Final Results:", results);
          return results;
        })
        .catch((err) => {
          console.error("Error while retrieving data:", err);
        });
      return result;
    } else {
      return [];
    }*/
});
exports.getApplicationsForAnalyticCalendarService = getApplicationsForAnalyticCalendarService;
function getWeekDates(lastDayOfWeek) {
    const lastDayOfWeekObj = new Date(lastDayOfWeek);
    const startDate = new Date(lastDayOfWeekObj);
    startDate.setDate(lastDayOfWeekObj.getDate() - 6);
    return {
        startDate: startDate.toISOString().slice(0, 10),
        endDate: lastDayOfWeekObj.toISOString().slice(0, 10),
    };
}
exports.getWeekDates = getWeekDates;
function getDatesBetween(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const isoString = currentDate.toISOString();
        const isoWithTimezone = isoString.replace("Z", "+00:00");
        dates.push(isoWithTimezone);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}
exports.getDatesBetween = getDatesBetween;
function convertToUTCDate(normalDate) {
    const dateObj = new Date(normalDate);
    const timezoneOffset = dateObj.getTimezoneOffset();
    const utcTimestamp = dateObj.getTime() - timezoneOffset * 60000;
    const utcDate = new Date(utcTimestamp);
    return utcDate;
}
exports.convertToUTCDate = convertToUTCDate;
