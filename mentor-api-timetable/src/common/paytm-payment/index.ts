import Promise from "bluebird";
import { genchecksum } from "./checksum.js";

export const generatePaymentRequest = (paytmParams, txnUrl) => {
  return new Promise((resolve, reject) => {
    var formFields = [];
    for (var x in paytmParams) {
      // eslint-disable-next-line prefer-const
      let formElement = {
        id: x,
        key: x,
        type: "input",
        name: x,
        defaultValue: paytmParams[x],
        hideExpression: true,
        templateOptions: {},
      };
      formFields.push(formElement);
    }
    const response = {
      formFields: formFields,
      action: txnUrl,
    };
    resolve(response);
  });
};

export const genChecksum = Promise.promisify(genchecksum);
