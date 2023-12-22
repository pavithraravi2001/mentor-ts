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
exports.removeArrayItemInstituteFeeConfigurationService = exports.deleteInstituteFeeConfigurationService = exports.getInstituteFeeConfigurationService = exports.updateInstituteFeeConfigurationService = exports.getInstituteFeeTermService = exports.updateInstituteFeeTermService = exports.getInstituteFeeService = exports.updateInstituteFeeService = void 0;
const response_1 = require("../../common/response");
const model_1 = require("./model");
const updateInstituteFeeService = ({ instituteId }, body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.InstituteFeeMaster.findOneAndUpdate({ instituteId, academicYear: body.academicYear }, body, { upsert: true })
            .then((doc) => {
            return { message: "Fee updated successfully!!" };
        })
            .then(resolve)
            .catch(reject);
    });
});
exports.updateInstituteFeeService = updateInstituteFeeService;
const getInstituteFeeService = ({ instituteId }, { academicYear }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.InstituteFeeMaster.findOne({
            instituteId: instituteId,
            academicYear: academicYear,
        })
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
});
exports.getInstituteFeeService = getInstituteFeeService;
const updateInstituteFeeTermService = ({ instituteId }, body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.InstituteFeeTerm.findOneAndUpdate({ instituteId, academicYear: body.academicYear }, body, { upsert: true })
            .then((doc) => {
            return { message: "Fee term updated successfully!!" };
        })
            .then(resolve)
            .catch(reject);
    });
});
exports.updateInstituteFeeTermService = updateInstituteFeeTermService;
const getInstituteFeeTermService = ({ instituteId }, { academicYear }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.InstituteFeeTerm.findOne({
            instituteId: instituteId,
            academicYear: academicYear,
        })
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
});
exports.getInstituteFeeTermService = getInstituteFeeTermService;
const updateInstituteFeeConfigurationService = ({ instituteId }, body) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        instituteId,
        academicYear: body.academicYear,
        grade: body.grade,
        section: "All",
    };
    const section = yield model_1.InstituteFeeConfiguration.findOne(query);
    let existSection;
    if (body._id && section) {
        if (section._id.toString() === body._id.toString() &&
            section.section === body.section) {
            existSection = false;
        }
        else {
            existSection = true;
        }
    }
    else if (section) {
        existSection = true;
    }
    delete body._id;
    return new Promise((resolve, reject) => {
        if (existSection) {
            return reject({
                status: 409,
                message: "Fee configuration Grade and Section already exists. kindly update existing section",
            });
        }
        else {
            // section: body.section
            return model_1.InstituteFeeConfiguration.findOneAndUpdate({
                instituteId,
                academicYear: body.academicYear,
                grade: body.grade,
                section: body.section,
            }, body, { upsert: true })
                .then((doc) => {
                return { message: "Fee configuration updated successfully!!" };
            })
                .then(resolve)
                .catch(reject);
        }
    });
});
exports.updateInstituteFeeConfigurationService = updateInstituteFeeConfigurationService;
const getInstituteFeeConfigurationService = ({ instituteId }, { academicYear }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.InstituteFeeConfiguration.find({
            instituteId: instituteId,
            academicYear: academicYear,
        })
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
});
exports.getInstituteFeeConfigurationService = getInstituteFeeConfigurationService;
const deleteInstituteFeeConfigurationService = (params) => {
    return new Promise((resolve, reject) => {
        model_1.InstituteFeeConfiguration.deleteOne({ _id: params.id })
            .then((result) => {
            console.log(result);
            if (result.deletedCount > 0) {
                resolve({
                    status: 200,
                    message: "Fee Configuration deleted successfully",
                });
            }
            else {
                const error = new Error();
                error.status = 404;
                error.message = "ID not found";
                reject(error);
            }
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.deleteInstituteFeeConfigurationService = deleteInstituteFeeConfigurationService;
const removeArrayItemInstituteFeeConfigurationService = (params) => {
    return new Promise((resolve, reject) => {
        model_1.InstituteFeeConfiguration.findOneAndUpdate({ _id: params.id }, { $pull: { terms: { _id: params.termId } } })
            .then((result) => {
            console.log(result);
            if (result) {
                resolve({
                    status: 200,
                    message: "Fee Term deleted successfully",
                });
            }
            else {
                const error = new Error();
                error.status = 404;
                error.message = "Term ID not found";
                reject(error);
            }
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.removeArrayItemInstituteFeeConfigurationService = removeArrayItemInstituteFeeConfigurationService;
