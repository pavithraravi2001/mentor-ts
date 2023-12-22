import { redirect, success } from "../../common/response/";
import {
  admissionPaymentCallbackService,
  admissionPaymentService,
  applicationPaymentCallbackService,
  applicationPaymentService,
  getAdmissionPaymentConfigService,
  getPaymentConfigService,
} from "./service";

export const applicationPayment = (req, res) => {
  const applicationId = req.params.applicationId;
  const userId = req.userId || "5eef30c590bb0a0075570d3e";
  applicationPaymentService({ userId, applicationId })
    .then(success(res))
    .catch((err) => {
      res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getPaymentConfig = (req, res) => {
  return getPaymentConfigService()
    .then(success(res))
    .catch((err) => {
      res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const applcationPaymentCallback = (req, res) => {
  applicationPaymentCallbackService(req.body)
    .then(redirect(res, 302))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const admissionPayment = (req, res) => {
  const applicationId = req.params.applicationId;
  const userId = req.userId || "5ff98104a28de700189ae6f7";
  admissionPaymentService({ userId, applicationId })
    .then(success(res))
    .catch((err) => {
      res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getAdmissionPaymentConfig = (req, res) => {
  return getAdmissionPaymentConfigService()
    .then(success(res))
    .catch((err) => {
      res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const admissionPaymentCallback = (req, res) => {
  admissionPaymentCallbackService(req.body)
    .then(redirect(res, 302))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
