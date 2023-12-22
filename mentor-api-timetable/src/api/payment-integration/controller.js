"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admissionPaymentCallback = exports.getAdmissionPaymentConfig = exports.admissionPayment = exports.applcationPaymentCallback = exports.getPaymentConfig = exports.applicationPayment = void 0;
const response_1 = require("../../common/response/");
const service_1 = require("./service");
const applicationPayment = (req, res) => {
    const applicationId = req.params.applicationId;
    const userId = req.userId || "5eef30c590bb0a0075570d3e";
    (0, service_1.applicationPaymentService)({ userId, applicationId })
        .then((0, response_1.success)(res))
        .catch((err) => {
        res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.applicationPayment = applicationPayment;
const getPaymentConfig = (req, res) => {
    return (0, service_1.getPaymentConfigService)()
        .then((0, response_1.success)(res))
        .catch((err) => {
        res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getPaymentConfig = getPaymentConfig;
const applcationPaymentCallback = (req, res) => {
    (0, service_1.applicationPaymentCallbackService)(req.body)
        .then((0, response_1.redirect)(res, 302))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.applcationPaymentCallback = applcationPaymentCallback;
const admissionPayment = (req, res) => {
    const applicationId = req.params.applicationId;
    const userId = req.userId || "5ff98104a28de700189ae6f7";
    (0, service_1.admissionPaymentService)({ userId, applicationId })
        .then((0, response_1.success)(res))
        .catch((err) => {
        res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.admissionPayment = admissionPayment;
const getAdmissionPaymentConfig = (req, res) => {
    return (0, service_1.getAdmissionPaymentConfigService)()
        .then((0, response_1.success)(res))
        .catch((err) => {
        res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getAdmissionPaymentConfig = getAdmissionPaymentConfig;
const admissionPaymentCallback = (req, res) => {
    (0, service_1.admissionPaymentCallbackService)(req.body)
        .then((0, response_1.redirect)(res, 302))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.admissionPaymentCallback = admissionPaymentCallback;
