import mongoose, { Schema } from "mongoose";

const DaySchema = new Schema(
  {
    day: { type: String, required: true },
    period1: { type: String, required: true },
    period2: { type: String },
    period3: { type: String, required: true },
    period4: { type: String },
    period5: { type: String, required: true },
    period6: { type: String },
    period7: { type: String, required: true },
    period8: { type: String },
    period9: { type: String, required: true },
    period10: { type: String },
    period11: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const TimetableSchema = new Schema(
  {
    academicYear: {
      type: String,
      required: true,
    },
    classGrade: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    timetableRow: [DaySchema],
  },
  {
    strict: false,
    timestamps: true,
  }
);

export const Timetable = mongoose.model("Timetable", TimetableSchema);
