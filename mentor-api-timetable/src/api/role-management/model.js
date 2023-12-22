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
exports.InstituteFeature = exports.UserRoles = exports.InstituteRoles = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const RolesClassModel = new mongoose_1.Schema({
    featureCode: {
        type: String,
        required: true,
    },
    all: {
        type: Boolean,
        required: true,
    },
    read: {
        type: Boolean,
        required: true,
    },
    write: {
        type: Boolean,
        required: true,
    },
    delete: {
        type: Boolean,
        required: true,
    },
    publish: {
        type: Boolean,
        required: true,
        default: true,
    },
}, {
    _id: false,
});
const RolesModel = new mongoose_1.Schema({
    instituteId: {
        type: String,
        required: true,
    },
    roleName: {
        type: String,
        required: true,
        unique: true,
    },
    roles: [RolesClassModel],
}, {
    strict: true,
    timestamps: true,
});
exports.InstituteRoles = mongoose_1.default.model("InstituteRoles", RolesModel);
const UserModel = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
}, {
    strict: true,
    timestamps: true,
});
const UserRoleModel = new mongoose_1.Schema({
    instituteId: {
        type: String,
        required: true,
    },
    roleId: {
        type: String,
        required: true,
    },
    users: [UserModel],
}
// {
//   _id: false,
// }
);
exports.UserRoles = mongoose_1.default.model("UserRoles", UserRoleModel);
const InstituteFeatureModel = new mongoose_1.Schema({
    instituteId: {
        type: String,
        required: true,
    },
    featureName: {
        type: String,
        required: true,
    },
    featureCode: {
        type: String,
        required: true,
        unique: true,
    },
    publish: {
        type: Boolean,
        default: true,
    },
}, {
    strict: true,
    timestamps: true,
});
exports.InstituteFeature = mongoose_1.default.model("InstituteFeature", InstituteFeatureModel);
