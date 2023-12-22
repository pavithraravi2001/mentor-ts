import mongoose, { Schema } from "mongoose";
const mongooseSchemaJsonSchema = require('mongoose-schema-jsonschema');

const PaymentConfig = new Schema(
  {
    gatewayName: {
      type: String,
      required: true,
      unique: true,
    },
    merchantId: {
      type: String,
      required: true,
      unique: true,
    },
    merchantKey: {
      type: String,
      required: true,
      unique: true,
    },
    gateWayURL: {
      type: String,
      required: true,
      unique: true,
    },
    website: {
      type: String,
      required: true,
      unique: true,
    },
    industryTypeID: {
      type: String,
      required: true,
    },
    channelId: {
      type: String,
      required: true,
    },
    orderProcessURLPath: {
      type: String,
      required: true,
    },
    paymentModeOnly: {
      type: String,
      default: "No",
    },
    paymentTypeId: {
      type: String,
    },
    applicationTxnAmount: {
      type: String,
      required: true,
    },
    applicationTxnTax: {
      type: String,
      required: true,
    },
    totalTxnAmount: {
      type: String,
      required: true,
    },
    admissionFeeTxnAmount: {
      type: String,
      required: true,
    },
    admissionFeeTxnTax: {
      type: String,
      required: true,
    },
    totalAdmissionFeeTxnAmount: {
      type: String,
      required: true,
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

const ApplicationTableConfig = new Schema(
  {
    displayName: {
      type: String,
      required: true,
      unique: true,
    },
    fieldName: {
      type: String,
      required: true,
      unique: true,
    },
    fieldType: {
      type: String,
      required: false,
    },
    label: String,
    sortable: {
      type: Boolean,
      default: true,
    },
    optional: {
      type: Boolean,
      default: false,
    },
    tableNames: {
      type: [String],
      index: true,
    },
    filter: {
      type: Boolean,
      default: true,
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

const EmailTemplateConfig = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    strict: true,
    timestamps: true,
  }
);

const columnDefSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    fieldName: {
      type: String,
      required: true,
      unique: true,
    },
    fieldType: String,
    fieldTypeFormat: String,
    tooltip: String,
    sortable: {
      type: Boolean,
      default: true,
    },
    optional: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      index: false,
    },
    filterable: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const TableMetaDataConfig = new Schema(
  {
    tableName: {
      type: String,
      required: true,
      unique: true,
    },
    entityName: {
      type: String,
      required: true,
    },
    columns: {
      type: [columnDefSchema],
      required: true,
    },
  },
  {
    strict: true,
    timestamps: true,
  }
);

export const ApplicationTableConfigModel = mongoose.model(
  "ApplicationTableConfigModel",
  ApplicationTableConfig
);
export const EmailTemplateConfigModel = mongoose.model(
  "EmailTemplateConfigModel",
  EmailTemplateConfig
);
export const EmployeeTableConfigModel = mongoose.model(
  "EmployeeTableConfigModel",
  ApplicationTableConfig
);
export const StudentTableConfigModel = mongoose.model(
  "StudentTableConfigModel",
  ApplicationTableConfig
);

export const TableMetaDataConfigModel = mongoose.model(
  "TableMetaDataConfigModel",
  TableMetaDataConfig
);
export const PaymentConfigs = mongoose.model("PaymentConfigs", PaymentConfig);

export const InterviewTableConfigSchema = ApplicationTableConfigModel.schema;
