import mongoose, { Schema } from "mongoose";

const FeeModel = new Schema(
  {
    feeName: {
      type: String,
      required: true,
      unique: true,
    },
    feeCode: {
      type: String,
      required: true,
      unique: true,
    },
    feeCode: {
      type: String,
      required: true,
    },
    status: String,
  },
  {
    _id: false,
  }
);

const InstituteFeeMasterModel = new Schema(
  {
    instituteId: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
      unique: true,
    },
    fees: [FeeModel],
  },
  {
    strict: true,
    timestamps: true,
  }
);

export const InstituteFeeMaster = mongoose.model(
  "InstituteFeeMaster",
  InstituteFeeMasterModel
);

const TermModel = new Schema(
  {
    termName: {
      type: String,
      required: true,
    },
    feeDate: {
      type: Date,
      required: true,
      index: true,
    },
    dueDate: {
      type: Date,
      required: true,
      index: true,
    },
    status: String,
  },
  {
    _id: false,
  }
);

const InstituteFeeTermModel = new Schema(
  {
    instituteId: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
      unique: true,
    },
    terms: [TermModel],
  },
  {
    strict: true,
    timestamps: true,
  }
);

export const InstituteFeeTerm = mongoose.model(
  "InstituteFeeTerm",
  InstituteFeeTermModel
);

const ConfigurationModel = new Schema({
  feeType: {
    type: String,
    required: true,
  },
  feeAmount: {
    type: Number,
    required: true,
    index: true,
  },
  term: {
    type: String,
    required: true,
    index: true,
  },
  startDate: {
    type: Date,
    required: true,
    index: true,
  },
  endDate: {
    type: Date,
    required: true,
    index: true,
  },
});

const InstituteFeeConfig = new Schema(
  {
    instituteId: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
    },
    terms: [ConfigurationModel],
  },
  {
    strict: true,
    timestamps: true,
  }
);

export const InstituteFeeConfiguration = mongoose.model(
  "InstituteFeeConfiguration",
  InstituteFeeConfig
);
