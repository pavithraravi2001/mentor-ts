"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.Payment = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const PaymentSchema = new mongoose_1.Schema({
    ORDER_ID: {
        type: String,
        required: true,
    },
    CUST_ID: {
        type: mongoose_1.Schema.ObjectId,
        ref: "User",
        index: true,
    },
    MOBILE_NO: String,
    EMAIL: String,
    TXN_AMOUNT: String,
    PAYMENT_TYPE_ID: String,
    PAYMENT_MODE_ONLY: String,
    MID: String,
    TXNID: String,
    TXNAMOUNT: String,
    PAYMENTMODE: String,
    CURRENCY: String,
    TXNDATE: String,
    STATUS: String,
    RESPCODE: String,
    RESPMSG: String,
    GATEWAYNAME: String,
    BANKTXNID: String,
    BANKNAME: String,
    CHECKSUMHASH: String,
}, {
    timestamps: true,
});
exports.Payment = mongoose_1.default.model("Payment", PaymentSchema);
exports.schema = exports.Payment.schema;
exports.default = exports.Payment;
