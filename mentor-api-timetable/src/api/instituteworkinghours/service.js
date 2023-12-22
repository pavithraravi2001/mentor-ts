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
exports.deleteInstituteWorkingHoursService = exports.updateInstituteWorkingHoursService = exports.getInstituteWorkingHoursService = void 0;
const response_1 = require("../../common/response");
const model_1 = require("./model");
const getInstituteWorkingHoursService = (userId) => {
    return new Promise((resolve, reject) => {
        return model_1.InstituteWorkHours.findOne()
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
};
exports.getInstituteWorkingHoursService = getInstituteWorkingHoursService;
const updateInstituteWorkingHoursService = (params, body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.InstituteWorkHours.findOneAndUpdate({}, body, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        })
            .then((doc) => {
            return doc;
        })
            .then(resolve)
            .catch(reject);
    });
});
exports.updateInstituteWorkingHoursService = updateInstituteWorkingHoursService;
const deleteInstituteWorkingHoursService = (params) => {
    return new Promise((resolve, reject) => {
        return model_1.InstituteWorkHours.deleteOne({}).then(resolve).catch(reject);
    });
};
exports.deleteInstituteWorkingHoursService = deleteInstituteWorkingHoursService;
