import { uid } from "rand-token";
import {
  genChecksum,
  generatePaymentRequest,
} from "../../common/paytm-payment";
import { paytmConfig, ui } from "../../config";
import { PaymentConfigs } from "../admin-config/model";
import { Application } from "../application/model";
import { User } from "../user/model";
import { Payment } from "./model";

export const applicationPaymentCallbackService = async (params) => {
  try {
    await Payment.findOneAndUpdate(
      {
        ORDER_ID: params.ORDERID,
        CHECKSUMHASH: params.CHECKSUMHASH,
        MID: params.MID,
      },
      params
    );

    const updateApplicationData = {
      applicationFee: params.TXNAMOUNT,
      paymentStatus: params.STATUS,
      paymentNote: params.RESPMSG,
      paymentMode: params.PAYMENTMODE,
    };

    if (updateApplicationData.paymentStatus === "TXN_SUCCESS") {
      updateApplicationData.applicationStatus = "Application Submitted";
    } else {
      updateApplicationData.applicationStatus = "Awaiting Application Fee";
    }

    await Application.findByIdAndUpdate(
      { _id: params.ORDERID },
      updateApplicationData
    );
    return (
      //ui.baseURL +
      "http://localhost:3000" +
      ui.applicationConfirmation +
      "?applicationId=" +
      params.ORDERID
    );
  } catch (exception) {
    return (
      ui.baseURL +
      ui.applicationConfirmation +
      "?applicationId=" +
      params.ORDERID
    );
  }
};

export const getPaymentConfigService = async () => {
  try {
    return await PaymentConfigs.findOne(
      { gatewayName: "PayTM" },
      `applicationTxnAmount applicationTxnTax totalTxnAmount 
      availablePaymentOptions defaultPaymentOption`
    );
  } catch (exception) {
    throw new Error("Error while getting payment config");
  }
};

export const applicationPaymentService = async ({ userId, applicationId }) => {
  try {
    const user = await User.findById({ _id: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const paymentConfig = await PaymentConfigs.findOne({
      gatewayName: "PayTM",
    });

    if (!paymentConfig) {
      throw new Error("PaymentConfig not found");
    }

    const application = await Application.findById({ _id: applicationId });

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
      CALLBACK_URL: paytmConfig.callbackURLPath,
    };

    if (user.email) {
      paytmParams.EMAIL = user.email;
    }

    if (user.mobile) {
      paytmParams.MOBILE_NO = user.mobile;
    }
    const txnUrl = paymentConfig.gateWayURL + paymentConfig.orderProcessURLPath;
    paytmParams.CHECKSUMHASH = await genChecksum(
      paytmParams,
      paymentConfig.merchantKey
    );

    await Payment.create(paytmParams);

    const paymentReuest = await generatePaymentRequest(paytmParams, txnUrl);
    return paymentReuest;
  } catch (exception) {
    throw exception;
  }
};

export const admissionPaymentCallbackService = async (params) => {
  try {
    await Payment.findOneAndUpdate(
      {
        ORDER_ID: params.ORDERID,
        CHECKSUMHASH: params.CHECKSUMHASH,
        MID: params.MID,
      },
      params
    );

    const updateApplicationData = {
      admissionFee: params.TXNAMOUNT,
      admissionPaymentStatus: params.STATUS,
      admissionPaymentNote: params.RESPMSG,
    };

    if (updateApplicationData.admissionPaymentStatus === "TXN_SUCCESS") {
      updateApplicationData.admissionStatus = "Admission Fee Paid";
    } else {
      updateApplicationData.admissionStatus = "Awaiting Admission Fee";
    }

    const application = await Application.findOneAndUpdate(
      { admissionPaymentId: params.ORDERID },
      updateApplicationData,
      { new: true }
    );
    return (
      ui.baseURL +
      ui.applicationConfirmation +
      "?applicationId=" +
      application._id
    );
  } catch (exception) {
    return ui.baseURL + ui.applicationConfirmation + "?applicationId=";
  }
};

export const getAdmissionPaymentConfigService = async () => {
  try {
    return await PaymentConfigs.findOne(
      { gatewayName: "PayTM" },
      `admissionFeeTxnAmount admissionFeeTxnTax totalAdmissionFeeTxnAmount 
      availablePaymentOptions defaultPaymentOption`
    );
  } catch (exception) {
    throw new Error("Error while getting payment config");
  }
};

export const admissionPaymentService = async ({ userId, applicationId }) => {
  try {
    const user = await User.findById({ _id: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const paymentConfig = await PaymentConfigs.findOne({
      gatewayName: "PayTM",
    });

    if (!paymentConfig) {
      throw new Error("PaymentConfig not found");
    }

    const application = await Application.findOneAndUpdate(
      { _id: applicationId },
      { admissionPaymentId: uid(32) },
      { new: true }
    );

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
      CALLBACK_URL: paytmConfig.callbackURLPath,
    };

    if (user.email) {
      paytmParams.EMAIL = user.email;
    }

    if (user.mobile) {
      paytmParams.MOBILE_NO = user.mobile;
    }
    const txnUrl = paymentConfig.gateWayURL + paymentConfig.orderProcessURLPath;
    paytmParams.CHECKSUMHASH = await genChecksum(
      paytmParams,
      paymentConfig.merchantKey
    );

    await Payment.create(paytmParams);

    const paymentReuest = await generatePaymentRequest(paytmParams, txnUrl);
    return paymentReuest;
  } catch (exception) {
    throw exception;
  }
};
