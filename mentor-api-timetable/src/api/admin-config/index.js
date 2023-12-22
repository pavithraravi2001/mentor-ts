"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableMetaDataConfigModel = exports.StudentTableConfigModel = exports.PaymentConfigs = exports.EmployeeTableConfigModel = exports.ApplicationTableConfigModel = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
var model_1 = require("./model");
Object.defineProperty(exports, "ApplicationTableConfigModel", { enumerable: true, get: function () { return model_1.ApplicationTableConfigModel; } });
Object.defineProperty(exports, "EmployeeTableConfigModel", { enumerable: true, get: function () { return model_1.EmployeeTableConfigModel; } });
Object.defineProperty(exports, "PaymentConfigs", { enumerable: true, get: function () { return model_1.PaymentConfigs; } });
Object.defineProperty(exports, "StudentTableConfigModel", { enumerable: true, get: function () { return model_1.StudentTableConfigModel; } });
Object.defineProperty(exports, "TableMetaDataConfigModel", { enumerable: true, get: function () { return model_1.TableMetaDataConfigModel; } });
const router = new express_1.Router();
/**
 * @api {post} /application-payment/callback Retrieve applications
 */
router.post("/payment-configs", controller_1.addPaymentConfig);
/**
 * @api {post} /application-payment/callback Retrieve applications
 */
router.put("/payment-configs/:id", controller_1.updatePaymentConfig);
/**
 * @api {post} /application-payment/callback Retrieve applications
 */
router.get("/payment-configs", controller_1.getPaymentConfig);
/**
 * @api {post} /application-payment/callback create admissions applications table config
 */
router.post("/application-table-configs", controller_1.addApplicationTableConfigs);
/**
 * @api {post} /application-table-configs/:tableName update admissions table config
 */
router.put("/application-table-configs", controller_1.updateApplicationTableConfigs);
/**
 * @api {post} /application-table-configs/:tableName update admissions table config
 */
router.get("/application-table-configs", controller_1.getAllApplicationTableConfigs);
/**
 * @api {get} /application-table-configs/:tableName Retrieve admissions table config
 */
router.get("/application-table-configs/:tableName", controller_1.getApplicationTableConfigs);
/**
 * @api {post} /application-payment/callback create admissions applications table config
 */
router.post("/employee-table-configs", controller_1.addEmployeeTableConfigs);
/**
 * @api {post} /application-table-configs/:tableName update admissions table config
 */
router.put("/employee-table-configs", controller_1.updateEmployeeTableConfigs);
/**
 * @api {post} /application-table-configs/:tableName update admissions table config
 */
router.get("/employee-table-configs", controller_1.getAllEmployeeTableConfigs);
/**
 * @api {get} /application-table-configs/:tableName Retrieve admissions table config
 */
router.get("/employee-table-configs/:tableName", controller_1.getEmployeeTableConfigs);
/**
 * @api {post} /application-payment/callback create admissions applications table config
 */
router.post("/student-table-configs", controller_1.addStudentTableConfigs);
/**
 * @api {post} /application-table-configs/:tableName update admissions table config
 */
router.put("/student-table-configs", controller_1.updateStudentTableConfigs);
/**
 * @api {post} /application-table-configs/:tableName update admissions table config
 */
router.get("/student-table-configs", controller_1.getAllStudentTableConfigs);
/**
 * @api {get} /application-table-configs/:tableName Retrieve admissions table config
 */
router.get("/student-table-configs/:tableName", controller_1.getStudentTableConfigs);
/**
 * @api {post} /table-metadata-configs insert table metadata config
 */
router.post("/table-metadata-configs", controller_1.upsertTableMetaDtaConfig);
/**
 * @api {post} /table-metadata-configs get all table metadata configs
 */
router.get("/table-metadata-configs", controller_1.getMetaDataTableNames);
/**
 * @api {get} /table-metadata-configs/:tableName Retrieve metadata table names
 */
router.get("/table-metadata-configs/:tableName", controller_1.getTableMetaDataConfig);
/**
 * @api {get} /mongo-schema/:entiryName Retrieve metadata table names
 */
router.get("/mongo-schema/:entityName", controller_1.getMongoSchemaByEntityName);
/**
 * @api {post} /application-payment/callback Retrieve applications
 */
router.post("/email-templates", controller_1.addEmailTemplateConfig);
/**
 * @api {post} /application-payment/callback Retrieve applications
 */
router.put("/email-templates/:name", controller_1.updateEmailTemplateConfig);
/**
 * @api {post} /application-payment/callback Retrieve applications
 */
router.get("/email-templates", controller_1.getEmailTemplateConfig);
/**
 * @api {post} /application-payment/callback Retrieve applications
 */
router.get("/email-templates/:name", controller_1.getEmailTemplateConfigByName);
exports.default = router;
