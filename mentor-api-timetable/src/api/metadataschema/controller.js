"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSchemaByEntityName = exports.updateSchema = exports.getSchemaByEntityName = exports.createSchema = void 0;
const response_1 = require("../../common/response/");
const service_1 = require("./service");
const createSchema = ({ bodymen: { body } }, res) => {
    (0, service_1.createSchemaService)(body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => {
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.createSchema = createSchema;
const getSchemaByEntityName = ({ params }, res) => {
    (0, service_1.getSchemaByEntityNameService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getSchemaByEntityName = getSchemaByEntityName;
const updateSchema = ({ bodymen: { body } }, res) => {
    (0, service_1.updateSchemaService)(body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateSchema = updateSchema;
const deleteSchemaByEntityName = ({ params }, res) => {
    (0, service_1.deleteSchemaService)(params)
        .then((0, response_1.success)(res, 410))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.deleteSchemaByEntityName = deleteSchemaByEntityName;
