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
Object.defineProperty(exports, "__esModule", { value: true });
exports.admissionPaymentService = exports.getAdmissionPaymentConfigService = exports.admissionPaymentCallbackService = exports.applicationPaymentService = exports.getPaymentConfigService = exports.applicationPaymentCallbackService = void 0;
const rand_token_1 = require("rand-token");
const paytm_payment_1 = require("../../common/paytm-payment");
const config_1 = require("../../config");
const model_1 = require("../admin-config/model");
const model_2 = require("../application/model");
const model_3 = require("../user/model");
const model_4 = require("./model");
const applicationPaymentCallbackService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_4.Payment.findOneAndUpdate({
            ORDER_ID: params.ORDERID,
            CHECKSUMHASH: params.CHECKSUMHASH,
            MID: params.MID,
        }, params);
        const updateApplicationData = {
            applicationFee: params.TXNAMOUNT,
            paymentStatus: params.STATUS,
            paymentNote: params.RESPMSG,
            paymentMode: params.PAYMENTMODE,
        };
        if (updateApplicationData.paymentStatus === "TXN_SUCCESS") {
            updateApplicationData.applicationStatus = "Application Submitted";
        }
        else {
            updateApplicationData.applicationStatus = "Awaiting Application Fee";
        }
        yield model_2.Application.findByIdAndUpdate({ _id: params.ORDERID }, updateApplicationData);
        return (
        //ui.baseURL +
        "http://localhost:3000" +
            config_1.ui.applicationConfirmation +
            "?applicationId=" +
            params.ORDERID);
    }
    catch (exception) {
        return (config_1.ui.baseURL +
            config_1.ui.applicationConfirmation +
            "?applicationId=" +
            params.ORDERID);
    }
});
exports.applicationPaymentCallbackService = applicationPaymentCallbackService;
const getPaymentConfigService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield model_1.PaymentConfigs.findOne({ gatewayName: "PayTM" }, `applicationTxnAmount applicationTxnTax totalTxnAmount 
      availablePaymentOptions defaultPaymentOption`);
    }
    catch (exception) {
        throw new Error("Error while getting payment config");
    }
});
exports.getPaymentConfigService = getPaymentConfigService;
const applicationPaymentService = ({ userId, applicationId }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_3.User.findById({ _id: userId });
        if (!user) {
            throw new Error("User not found");
        }
        const paymentConfig = yield model_1.PaymentConfigs.findOne({
            gatewayName: "PayTM",
        });
        if (!paymentConfig) {
            throw new Error("PaymentConfig not found");
        }
        const application = yield model_2.Application.findById({ _id: applicationId });
        if (application.paymentStatus === "TXN_SUCCESS") {
            throw new Error("Payment is already done");
        }
        const paytmParams = {
            MID: paymentConfig.merchantId,
            WEBSITE: paymentConfig.website,
            INDUSTRY_TYPE_ID: paymentConfig.industryTypeID,
            CHANNEL_ID: paymentConfig.channelId,
            ORDER_ID: applicationId,
            CUST_ID: userId,
            PAYMENT_MODE_ONLY: paymentConfig.paymentModeOnly,
            PAYMENT_TYPE_ID: paymentConfig.paymentTypeId,
            TXN_AMOUNT: paymentConfig.totalTxnAmount,
            CALLBACK_URL: config_1.paytmConfig.callbackURLPath,
        };
        if (user.email) {
            paytmParams.EMAIL = user.email;
        }
        if (user.mobile) {
            paytmParams.MOBILE_NO = user.mobile;
        }
        const txnUrl = paymentConfig.gateWayURL + paymentConfig.orderProcessURLPath;
        paytmParams.CHECKSUMHASH = yield (0, paytm_payment_1.genChecksum)(paytmParams, paymentConfig.merchantKey);
        yield model_4.Payment.create(paytmParams);
        const paymentReuest = yield (0, paytm_payment_1.generatePaymentRequest)(paytmParams, txnUrl);
        return paymentReuest;
    }
    catch (exception) {
        throw exception;
    }
});
exports.applicationPaymentService = applicationPaymentService;
const admissionPaymentCallbackService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_4.Payment.findOneAndUpdate({
            ORDER_ID: params.ORDERID,
            CHECKSUMHASH: params.CHECKSUMHASH,
            MID: params.MID,
        }, params);
        const updateApplicationData = {
            admissionFee: params.TXNAMOUNT,
            admissionPaymentStatus: params.STATUS,
            admissionPaymentNote: params.RESPMSG,
        };
        if (updateApplicationData.admissionPaymentStatus === "TXN_SUCCESS") {
            updateApplicationData.admissionStatus = "Admission Fee Paid";
        }
        else {
            updateApplicationData.admissionStatus = "Awaiting Admission Fee";
        }
        const application = yield model_2.Application.findOneAndUpdate({ admissionPaymentId: params.ORDERID }, updateApplicationData, { new: true });
        return (config_1.ui.baseURL +
            config_1.ui.applicationConfirmation +
            "?applicationId=" +
            application._id);
    }
    catch (exception) {
        return config_1.ui.baseURL + config_1.ui.applicationConfirmation + "?applicationId=";
    }
});
exports.admissionPaymentCallbackService = admissionPaymentCallbackService;
const getAdmissionPaymentConfigService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield model_1.PaymentConfigs.findOne({ gatewayName: "PayTM" }, `admissionFeeTxnAmount admissionFeeTxnTax totalAdmissionFeeTxnAmount 
      availablePaymentOptions defaultPaymentOption`);
    }
    catch (exception) {
        throw new Error("Error while getting payment config");
    }
});
exports.getAdmissionPaymentConfigService = getAdmissionPaymentConfigService;
const admissionPaymentService = ({ userId, applicationId }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_3.User.findById({ _id: userId });
        if (!user) {
            throw new Error("User not found");
        }
        const paymentConfig = yield model_1.PaymentConfigs.findOne({
            gatewayName: "PayTM",
        });
        if (!paymentConfig) {
            throw new Error("PaymentConfig not found");
        }
        const application = yield model_2.Application.findOneAndUpdate({ _id: applicationId }, { admissionPaymentId: (0, rand_token_1.uid)(32) }, { new: true });
        if (application.paymentStatus === "TXN_SUCCESS") {
            throw new Error("Payment is already done.");
        }
        const paytmParams = {
            MID: paymentConfig.merchantId,
            WEBSITE: paymentConfig.website,
            INDUSTRY_TYPE_ID: paymentConfig.industryTypeID,
            CHANNEL_ID: paymentConfig.channelId,
            ORDER_ID: application.admissionPaymentId,
            CUST_ID: userId,
            PAYMENT_MODE_ONLY: paymentConfig.paymentModeOnly,
            PAYMENT_TYPE_ID: paymentConfig.paymentTypeId,
            TXN_AMOUNT: paymentConfig.totalAdmissionFeeTxnAmount,
            CALLBACK_URL: config_1.paytmConfig.callbackURLPath,
        };
        if (user.email) {
            paytmParams.EMAIL = user.email;
        }
        if (user.mobile) {
            paytmParams.MOBILE_NO = user.mobile;
        }
        const txnUrl = paymentConfig.gateWayURL + paymentConfig.orderProcessURLPath;
        paytmParams.CHECKSUMHASH = yield (0, paytm_payment_1.genChecksum)(paytmParams, paymentConfig.merchantKey);
        yield model_4.Payment.create(paytmParams);
        const paymentReuest = yield (0, paytm_payment_1.generatePaymentRequest)(paytmParams, txnUrl);
        return paymentReuest;
    }
    catch (exception) {
        throw exception;
    }
});
exports.admissionPaymentService = admissionPaymentService;
