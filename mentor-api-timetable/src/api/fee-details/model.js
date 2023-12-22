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
exports.InstituteFeeConfiguration = exports.InstituteFeeTerm = exports.InstituteFeeMaster = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const FeeModel = new mongoose_1.Schema({
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
}, {
    _id: false,
});
const InstituteFeeMasterModel = new mongoose_1.Schema({
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
}, {
    strict: true,
    timestamps: true,
});
exports.InstituteFeeMaster = mongoose_1.default.model("InstituteFeeMaster", InstituteFeeMasterModel);
const TermModel = new mongoose_1.Schema({
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
}, {
    _id: false,
});
const InstituteFeeTermModel = new mongoose_1.Schema({
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
}, {
    strict: true,
    timestamps: true,
});
exports.InstituteFeeTerm = mongoose_1.default.model("InstituteFeeTerm", InstituteFeeTermModel);
const ConfigurationModel = new mongoose_1.Schema({
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
const InstituteFeeConfig = new mongoose_1.Schema({
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
}, {
    strict: true,
    timestamps: true,
});
exports.InstituteFeeConfiguration = mongoose_1.default.model("InstituteFeeConfiguration", InstituteFeeConfig);
