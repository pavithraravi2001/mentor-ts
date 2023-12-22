import mongoose, { Schema } from "mongoose";

const LeaveFormModel = new Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      trim: true,
    },
    leaveType: {
      type: String,
      require: true,
    },
    dateFrom: {
      type: Date,
      require: true,
    },
    dateTo: {
      type: Date,
      require: true,
    },
    leaveReason: {
      type: String,
      require: true,
    },
  },
  {
    strict: true,
    timestamps: true,
  }
);

export const LeaveForm = mongoose.model("LeaveForm", LeaveFormModel);
