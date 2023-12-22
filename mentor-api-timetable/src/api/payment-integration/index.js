"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = new express_1.Router();
/**
 * @api {get} /payment-integrations/application-payment-configs
 * - to initialize payment config on mentor-ui
 */
router.get("/application-payment-configs", controller_1.getPaymentConfig);
/**
 * @api {post} /payment-integrations/application-payment-initialization/:applicationId
 * - to initiate payment request from mentor-ui
 */
router.get("/application-payment-initialization/:applicationId", controller_1.applicationPayment);
/**
 * @api {post} /payment-integrations/application-payment/callback
 * To store payment information from payment gateway
 */
router.post("/application-payment/callback", controller_1.applcationPaymentCallback);
/**
 * @api {get} /payment-integrations/application-payment-configs
 * - to initialize payment config on mentor-ui
 */
router.get("/admission-payment-configs", controller_1.getAdmissionPaymentConfig);
/**
 * @api {post} /payment-integrations/application-payment-initialization/:applicationId
 * - to initiate payment request from mentor-ui
 */
router.get("/admission-payment-initialization/:applicationId", controller_1.admissionPayment);
/**
 * @api {post} /payment-integrations/application-payment/callback
 * To store payment information from payment gateway
 */
router.post("/admission-payment/callback", controller_1.admissionPaymentCallback);
exports.default = router;
