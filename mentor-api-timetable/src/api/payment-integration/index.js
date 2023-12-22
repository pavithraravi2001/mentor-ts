import { Router } from "express";
import {
  admissionPayment,
  admissionPaymentCallback,
  applcationPaymentCallback,
  applicationPayment,
  getAdmissionPaymentConfig,
  getPaymentConfig,
} from "./controller";

const router = new Router();

/**
 * @api {get} /payment-integrations/application-payment-configs
 * - to initialize payment config on mentor-ui
 */
router.get("/application-payment-configs", getPaymentConfig);

/**
 * @api {post} /payment-integrations/application-payment-initialization/:applicationId
 * - to initiate payment request from mentor-ui
 */
router.get(
  "/application-payment-initialization/:applicationId",
  applicationPayment
);

/**
 * @api {post} /payment-integrations/application-payment/callback
 * To store payment information from payment gateway
 */
router.post("/application-payment/callback", applcationPaymentCallback);

/**
 * @api {get} /payment-integrations/application-payment-configs
 * - to initialize payment config on mentor-ui
 */
router.get("/admission-payment-configs", getAdmissionPaymentConfig);

/**
 * @api {post} /payment-integrations/application-payment-initialization/:applicationId
 * - to initiate payment request from mentor-ui
 */
router.get(
  "/admission-payment-initialization/:applicationId",
  admissionPayment
);

/**
 * @api {post} /payment-integrations/application-payment/callback
 * To store payment information from payment gateway
 */
router.post("/admission-payment/callback", admissionPaymentCallback);

export default router;
