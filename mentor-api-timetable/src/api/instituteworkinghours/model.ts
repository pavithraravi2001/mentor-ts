import mongoose, { Schema } from "mongoose";

const dayOrder = new Schema(
  {
    day: String,
    type: String,
    startTime: String,
    endTime: String,
  },
  {
    _id: false,
  }
);

const InstituteWorkingHoursModel = new Schema(
  {
    instituteId: mongoose.Schema.Types.ObjectId,
    workingHours: [dayOrder],
    tag: Object,
  },
  {
    strict: true,
    timestamps: {
      updatedAt: "lastUpdated",
    },
    toJSON: {
      virtuals: true,
    },
  }
);

const Deprecated = new Schema(
  {
    instituteId: mongoose.Schema.Types.ObjectId,
    monday: dayOrder,
    tuesday: dayOrder,
    wednesday: dayOrder,
    thursday: dayOrder,
    friday: dayOrder,
    saturday: dayOrder,
    sunday: dayOrder,
    tag: Object,
  },
  {
    strict: true,
    timestamps: {
      updatedAt: "lastUpdated",
    },
    toJSON: {
      virtuals: true,
    },
  }
);

export const InstituteWorkHours = mongoose.model(
  "InstituteWorkHours",
  InstituteWorkingHoursModel
);

export const schema = InstituteWorkHours.schema;
