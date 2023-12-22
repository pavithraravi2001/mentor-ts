"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCollectionByName = exports.updateCollection = exports.getCollectionForDropDown = exports.getCollections = exports.getCollectionByName = exports.createCollection = void 0;
const response_1 = require("../../common/response/");
const service_1 = require("./service");
const createCollection = ({ bodymen: { body } }, res) => {
    (0, service_1.createCollectionService)(body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.createCollection = createCollection;
const getCollectionByName = ({ params }, res) => {
    (0, service_1.getCollectionByNameService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getCollectionByName = getCollectionByName;
const getCollections = ({ params }, res) => {
    (0, service_1.getCollectionsService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getCollections = getCollections;
const getCollectionForDropDown = ({ params, query }, res) => {
    (0, service_1.getCollectionForDropDownService)(params, query)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getCollectionForDropDown = getCollectionForDropDown;
const updateCollection = ({ bodymen: { body } }, res) => {
    (0, service_1.updateCollectionService)(body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateCollection = updateCollection;
const deleteCollectionByName = ({ params }, res) => {
    (0, service_1.deleteCollectionService)(params)
        .then((0, response_1.success)(res, 410))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.deleteCollectionByName = deleteCollectionByName;
