"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMetadataContentByContentKey = exports.updateMetadataContent = exports.getMetadataContentByKey = exports.createMetadataContent = void 0;
const response_1 = require("../../common/response/");
const service_1 = require("./service");
const createMetadataContent = ({ bodymen: { body } }, res) => {
    (0, service_1.createMetadataContentService)(body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.createMetadataContent = createMetadataContent;
const getMetadataContentByKey = ({ params }, res) => {
    (0, service_1.getMetadataContentByKeyService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getMetadataContentByKey = getMetadataContentByKey;
const updateMetadataContent = ({ bodymen: { body } }, res) => {
    (0, service_1.updateMetadataContentService)(body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateMetadataContent = updateMetadataContent;
const deleteMetadataContentByContentKey = ({ params }, res) => {
    (0, service_1.deleteMetadataContentService)(params)
        .then((0, response_1.success)(res, 410))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.deleteMetadataContentByContentKey = deleteMetadataContentByContentKey;
