import mongoose, { Schema } from "mongoose";

const PaymentSchema = new Schema(
  {
    ORDER_ID: {
      type: String,
      required: true,
    },
    CUST_ID: {
      type: Schema.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", PaymentSchema);

export const schema = Payment.schema;
export default Payment;
