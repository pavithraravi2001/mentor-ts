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
exports.LeaveForm = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const LeaveFormModel = new mongoose_1.Schema({
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
}, {
    strict: true,
    timestamps: true,
});
exports.LeaveForm = mongoose_1.default.model("LeaveForm", LeaveFormModel);
