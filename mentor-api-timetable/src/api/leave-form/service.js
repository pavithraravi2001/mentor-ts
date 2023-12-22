"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdService = exports.deleteLeaveFormService = exports.updateLeaveFormService = exports.getLeaveFormByIdService = exports.getLeaveFormService = exports.createLeaveFormService = void 0;
const mongodb_1 = require("mongodb");
const model_1 = require("./model");
const response_1 = require("../../common/response");
const createLeaveFormService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.LeaveForm.create(body)
            .then(resolve)
            .catch((err) => {
            reject(err);
        });
    });
});
exports.createLeaveFormService = createLeaveFormService;
const getLeaveFormService = () => {
    return new Promise((resolve, reject) => {
        return model_1.LeaveForm.find()
            .then(resolve)
            .catch((err) => {
            reject(err);
        });
    });
};
exports.getLeaveFormService = getLeaveFormService;
const getLeaveFormByIdService = (params) => {
    var objId = new mongodb_1.ObjectId(params._id);
    return new Promise((resolve, reject) => {
        return model_1.LeaveForm.findById(objId)
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
};
exports.getLeaveFormByIdService = getLeaveFormByIdService;
const updateLeaveFormService = (params, body) => {
    return new Promise((resolve, reject) => {
        return model_1.LeaveForm.findOneAndUpdate({ _id: params.id }, body)
            .then(resolve)
            .catch((err) => {
            reject(err);
        });
    });
};
exports.updateLeaveFormService = updateLeaveFormService;
const deleteLeaveFormService = (params) => {
    return new Promise((resolve, reject) => {
        model_1.LeaveForm.deleteOne({ _id: params.id })
            .then((result) => {
            if (result.deletedCount > 0) {
                resolve({ status: 200, message: "LeaveForm deleted successfully" });
            }
            else {
                const error = new Error();
                error.status = 404;
                error.message = "LeaveForm not found";
                reject(error);
            }
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.deleteLeaveFormService = deleteLeaveFormService;
const getUserIdService = (params) => {
    return new Promise((resolve, reject) => {
        return model_1.LeaveForm.findOne({ userId: params.userId })
            .then(resolve)
            .catch((err) => {
            reject(err);
        });
    });
};
exports.getUserIdService = getUserIdService;
