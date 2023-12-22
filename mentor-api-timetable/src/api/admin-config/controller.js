"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmailTemplateConfigByName = exports.getEmailTemplateConfig = exports.updateEmailTemplateConfig = exports.addEmailTemplateConfig = exports.getMongoSchemaByEntityName = exports.getTableMetaDataConfig = exports.getMetaDataTableNames = exports.upsertTableMetaDtaConfig = exports.getStudentTableConfigs = exports.getAllStudentTableConfigs = exports.updateStudentTableConfigs = exports.addStudentTableConfigs = exports.getEmployeeTableConfigs = exports.getAllEmployeeTableConfigs = exports.updateEmployeeTableConfigs = exports.addEmployeeTableConfigs = exports.getApplicationTableConfigs = exports.getAllApplicationTableConfigs = exports.updateApplicationTableConfigs = exports.addApplicationTableConfigs = exports.getPaymentConfig = exports.updatePaymentConfig = exports.addPaymentConfig = void 0;
const response_1 = require("../../common/response");
const service_1 = require("./service");
const addPaymentConfig = ({ body }, res) => {
    (0, service_1.addPaymentConfigService)(body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.addPaymentConfig = addPaymentConfig;
const updatePaymentConfig = ({ params, body }, res) => {
    (0, service_1.updatePaymentConfigService)(params, body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.updatePaymentConfig = updatePaymentConfig;
const getPaymentConfig = (req, res) => {
    (0, service_1.getPaymentConfigService)()
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getPaymentConfig = getPaymentConfig;
const addApplicationTableConfigs = ({ body }, res) => {
    (0, service_1.addApplicationTableConfigService)(body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.addApplicationTableConfigs = addApplicationTableConfigs;
const updateApplicationTableConfigs = ({ body }, res) => {
    (0, service_1.updateApplicationTableConfigsService)(body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.updateApplicationTableConfigs = updateApplicationTableConfigs;
const getAllApplicationTableConfigs = ({ params }, res) => {
    (0, service_1.getAllApplicationTableConfigService)(params.tableName)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getAllApplicationTableConfigs = getAllApplicationTableConfigs;
const getApplicationTableConfigs = ({ params }, res) => {
    (0, service_1.getApplicationTableConfigService)(params.tableName)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getApplicationTableConfigs = getApplicationTableConfigs;
const addEmployeeTableConfigs = ({ body }, res) => {
    (0, service_1.addEmployeeTableConfigService)(body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.addEmployeeTableConfigs = addEmployeeTableConfigs;
const updateEmployeeTableConfigs = ({ body }, res) => {
    (0, service_1.updateEmployeeTableConfigsService)(body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.updateEmployeeTableConfigs = updateEmployeeTableConfigs;
const getAllEmployeeTableConfigs = ({ params }, res) => {
    (0, service_1.getAllEmployeeTableConfigService)(params.tableName)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getAllEmployeeTableConfigs = getAllEmployeeTableConfigs;
const getEmployeeTableConfigs = ({ params }, res) => {
    (0, service_1.getEmployeeTableConfigService)(params.tableName)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getEmployeeTableConfigs = getEmployeeTableConfigs;
const addStudentTableConfigs = ({ body }, res) => {
    (0, service_1.addStudentTableConfigService)(body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.addStudentTableConfigs = addStudentTableConfigs;
const updateStudentTableConfigs = ({ body }, res) => {
    (0, service_1.updateStudentTableConfigsService)(body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.updateStudentTableConfigs = updateStudentTableConfigs;
const getAllStudentTableConfigs = ({ params }, res) => {
    (0, service_1.getAllStudentTableConfigService)(params.tableName)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getAllStudentTableConfigs = getAllStudentTableConfigs;
const getStudentTableConfigs = ({ params }, res) => {
    (0, service_1.getStudentTableConfigService)(params.tableName)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getStudentTableConfigs = getStudentTableConfigs;
const upsertTableMetaDtaConfig = ({ body }, res) => {
    (0, service_1.upsertTableMetaDtaConfigService)(body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.upsertTableMetaDtaConfig = upsertTableMetaDtaConfig;
const getMetaDataTableNames = (req, res) => {
    (0, service_1.getMetaDataTableNamesService)()
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getMetaDataTableNames = getMetaDataTableNames;
const getTableMetaDataConfig = ({ params }, res) => {
    (0, service_1.getTableMetaDataConfigService)(params.tableName)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getTableMetaDataConfig = getTableMetaDataConfig;
const getMongoSchemaByEntityName = ({ params }, res) => {
    (0, service_1.getMongoSchemaByEntityNameService)(params.entityName)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getMongoSchemaByEntityName = getMongoSchemaByEntityName;
const addEmailTemplateConfig = ({ body }, res) => {
    (0, service_1.addEmailTemplateConfigService)(body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => {
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.addEmailTemplateConfig = addEmailTemplateConfig;
const updateEmailTemplateConfig = ({ params, body }, res) => {
    (0, service_1.updateEmailTemplateConfigService)(params, body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.updateEmailTemplateConfig = updateEmailTemplateConfig;
const getEmailTemplateConfig = (req, res) => {
    (0, service_1.getEmailTemplateConfigService)()
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getEmailTemplateConfig = getEmailTemplateConfig;
const getEmailTemplateConfigByName = ({ params }, res) => {
    (0, service_1.getEmailTemplateConfigByNameService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => {
        console.log(err);
        return res.status(err && err.status ? err.status : 400).json(err);
    });
};
exports.getEmailTemplateConfigByName = getEmailTemplateConfigByName;
