"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeArrayItemInstituteFeeConfiguration = exports.deleteInstituteFeeConfiguration = exports.updateInstituteFeeConfiguration = exports.getInstituteFeeConfiguration = exports.updateInstituteFeeTerm = exports.getInstituteFeeTerm = exports.updateInstituteFeeMaster = exports.getInstituteFeeMaster = void 0;
const response_1 = require("../../common/response/");
const service_1 = require("./service");
const getInstituteFeeMaster = ({ params, query }, res) => {
    (0, service_1.getInstituteFeeService)(params, query)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getInstituteFeeMaster = getInstituteFeeMaster;
const updateInstituteFeeMaster = ({ params, body }, res) => {
    (0, service_1.updateInstituteFeeService)(params, Object.assign({ instituteId: params.instituteId }, body))
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateInstituteFeeMaster = updateInstituteFeeMaster;
const getInstituteFeeTerm = ({ params, query }, res) => {
    (0, service_1.getInstituteFeeTermService)(params, query)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getInstituteFeeTerm = getInstituteFeeTerm;
const updateInstituteFeeTerm = ({ params, body }, res) => {
    (0, service_1.updateInstituteFeeTermService)(params, Object.assign({ instituteId: params.instituteId }, body))
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateInstituteFeeTerm = updateInstituteFeeTerm;
const getInstituteFeeConfiguration = ({ params, query }, res) => {
    (0, service_1.getInstituteFeeConfigurationService)(params, query)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getInstituteFeeConfiguration = getInstituteFeeConfiguration;
const updateInstituteFeeConfiguration = ({ params, body }, res) => {
    (0, service_1.updateInstituteFeeConfigurationService)(params, Object.assign({ instituteId: params.instituteId }, body))
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateInstituteFeeConfiguration = updateInstituteFeeConfiguration;
const deleteInstituteFeeConfiguration = ({ params }, res) => {
    (0, service_1.deleteInstituteFeeConfigurationService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.deleteInstituteFeeConfiguration = deleteInstituteFeeConfiguration;
const removeArrayItemInstituteFeeConfiguration = ({ params }, res) => {
    (0, service_1.removeArrayItemInstituteFeeConfigurationService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.removeArrayItemInstituteFeeConfiguration = removeArrayItemInstituteFeeConfiguration;
