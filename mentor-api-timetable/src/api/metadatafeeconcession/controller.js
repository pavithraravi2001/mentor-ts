"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMetadataFeeConcessionByConcessionKey = exports.updateFeeConcession = exports.getMetadataFeeConcession = exports.getMetadataFeeConcessionByConcessionKey = exports.createFeeConcession = void 0;
const response_1 = require("../../common/response/");
const service_1 = require("./service");
const createFeeConcession = ({ bodymen: { body } }, res) => {
    (0, service_1.createFeeConcessionService)(body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.createFeeConcession = createFeeConcession;
const getMetadataFeeConcessionByConcessionKey = ({ params }, res) => {
    (0, service_1.getMetadataFeeConcessionByConcessionKeyService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getMetadataFeeConcessionByConcessionKey = getMetadataFeeConcessionByConcessionKey;
const getMetadataFeeConcession = ({ params }, res) => {
    (0, service_1.getMetadataFeeConcessionService)()
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getMetadataFeeConcession = getMetadataFeeConcession;
const updateFeeConcession = ({ bodymen: { body } }, res) => {
    (0, service_1.updateFeeConcessionService)(body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateFeeConcession = updateFeeConcession;
const deleteMetadataFeeConcessionByConcessionKey = ({ params }, res) => {
    (0, service_1.deleteFeeConcessionService)(params)
        .then((0, response_1.success)(res, 410))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.deleteMetadataFeeConcessionByConcessionKey = deleteMetadataFeeConcessionByConcessionKey;
