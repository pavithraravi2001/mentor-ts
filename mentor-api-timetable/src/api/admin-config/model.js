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
exports.InterviewTableConfigSchema = exports.PaymentConfigs = exports.TableMetaDataConfigModel = exports.StudentTableConfigModel = exports.EmployeeTableConfigModel = exports.EmailTemplateConfigModel = exports.ApplicationTableConfigModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongooseSchemaJsonSchema = require('mongoose-schema-jsonschema');
const PaymentConfig = new mongoose_1.Schema({
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
}, {
    strict: false,
    timestamps: true,
});
const ApplicationTableConfig = new mongoose_1.Schema({
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
}, {
    strict: false,
    timestamps: true,
});
const EmailTemplateConfig = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    strict: true,
    timestamps: true,
});
const columnDefSchema = new mongoose_1.Schema({
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
}, { _id: false });
const TableMetaDataConfig = new mongoose_1.Schema({
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
}, {
    strict: true,
    timestamps: true,
});
exports.ApplicationTableConfigModel = mongoose_1.default.model("ApplicationTableConfigModel", ApplicationTableConfig);
exports.EmailTemplateConfigModel = mongoose_1.default.model("EmailTemplateConfigModel", EmailTemplateConfig);
exports.EmployeeTableConfigModel = mongoose_1.default.model("EmployeeTableConfigModel", ApplicationTableConfig);
exports.StudentTableConfigModel = mongoose_1.default.model("StudentTableConfigModel", ApplicationTableConfig);
exports.TableMetaDataConfigModel = mongoose_1.default.model("TableMetaDataConfigModel", TableMetaDataConfig);
exports.PaymentConfigs = mongoose_1.default.model("PaymentConfigs", PaymentConfig);
exports.InterviewTableConfigSchema = exports.ApplicationTableConfigModel.schema;
