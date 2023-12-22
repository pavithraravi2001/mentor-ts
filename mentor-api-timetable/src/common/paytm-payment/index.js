"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genChecksum = exports.generatePaymentRequest = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const checksum_js_1 = require("./checksum.js");
const generatePaymentRequest = (paytmParams, txnUrl) => {
    return new bluebird_1.default((resolve, reject) => {
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
exports.generatePaymentRequest = generatePaymentRequest;
exports.genChecksum = bluebird_1.default.promisify(checksum_js_1.genchecksum);
