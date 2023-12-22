import { Router } from "express";
import {
  addApplicationTableConfigs,
  addEmailTemplateConfig,
  addEmployeeTableConfigs,
  addPaymentConfig,
  addStudentTableConfigs,
  getAllApplicationTableConfigs,
  getAllEmployeeTableConfigs,
  getAllStudentTableConfigs,
  getApplicationTableConfigs,
  getEmailTemplateConfig,
  getEmailTemplateConfigByName,
  getEmployeeTableConfigs,
  getMetaDataTableNames,
  getMongoSchemaByEntityName,
  getPaymentConfig,
  getStudentTableConfigs,
  getTableMetaDataConfig,
  updateApplicationTableConfigs,
  updateEmailTemplateConfig,
  updateEmployeeTableConfigs,
  updatePaymentConfig,
  updateStudentTableConfigs,
  upsertTableMetaDtaConfig,
} from "./controller";

export {
  ApplicationTableConfigModel,
  EmployeeTableConfigModel,
  PaymentConfigs,
  StudentTableConfigModel,
  TableMetaDataConfigModel
} from "./model";

const router = new Router();

/**
 * @api {post} /application-payment/callback Retrieve applications
 */
router.post("/payment-configs", addPaymentConfig);

/**
 * @api {post} /application-payment/callback Retrieve applications
 */
router.put("/payment-configs/:id", updatePaymentConfig);

/**
 * @api {post} /application-payment/callback Retrieve applications
 */
router.get("/payment-configs", getPaymentConfig);

/**
 * @api {post} /application-payment/callback create admissions applications table config
 */
router.post("/application-table-configs", addApplicationTableConfigs);

/**
 * @api {post} /application-table-configs/:tableName update admissions table config
 */
router.put("/application-table-configs", updateApplicationTableConfigs);

/**
 * @api {post} /application-table-configs/:tableName update admissions table config
 */
router.get("/application-table-configs", getAllApplicationTableConfigs);

/**
 * @api {get} /application-table-configs/:tableName Retrieve admissions table config
 */
router.get("/application-table-configs/:tableName", getApplicationTableConfigs);

/**
 * @api {post} /application-payment/callback create admissions applications table config
 */
router.post("/employee-table-configs", addEmployeeTableConfigs);

/**
 * @api {post} /application-table-configs/:tableName update admissions table config
 */
router.put("/employee-table-configs", updateEmployeeTableConfigs);

/**
 * @api {post} /application-table-configs/:tableName update admissions table config
 */
router.get("/employee-table-configs", getAllEmployeeTableConfigs);

/**
 * @api {get} /application-table-configs/:tableName Retrieve admissions table config
 */
router.get("/employee-table-configs/:tableName", getEmployeeTableConfigs);

/**
 * @api {post} /application-payment/callback create admissions applications table config
 */
router.post("/student-table-configs", addStudentTableConfigs);

/**
 * @api {post} /application-table-configs/:tableName update admissions table config
 */
router.put("/student-table-configs", updateStudentTableConfigs);

/**
 * @api {post} /application-table-configs/:tableName update admissions table config
 */
router.get("/student-table-configs", getAllStudentTableConfigs);

/**
 * @api {get} /application-table-configs/:tableName Retrieve admissions table config
 */
router.get("/student-table-configs/:tableName", getStudentTableConfigs);

/**
 * @api {post} /table-metadata-configs insert table metadata config
 */
router.post("/table-metadata-configs", upsertTableMetaDtaConfig);

/**
 * @api {post} /table-metadata-configs get all table metadata configs
 */
router.get("/table-metadata-configs", getMetaDataTableNames);

/**
 * @api {get} /table-metadata-configs/:tableName Retrieve metadata table names
 */
router.get("/table-metadata-configs/:tableName", getTableMetaDataConfig);

/**
 * @api {get} /mongo-schema/:entiryName Retrieve metadata table names
 */
router.get("/mongo-schema/:entityName", getMongoSchemaByEntityName);

/**
 * @api {post} /application-payment/callback Retrieve applications
 */
router.post("/email-templates", addEmailTemplateConfig);

/**
 * @api {post} /application-payment/callback Retrieve applications
 */
router.put("/email-templates/:name", updateEmailTemplateConfig);

/**
 * @api {post} /application-payment/callback Retrieve applications
 */
router.get("/email-templates", getEmailTemplateConfig);

/**
 * @api {post} /application-payment/callback Retrieve applications
 */
router.get("/email-templates/:name", getEmailTemplateConfigByName);

export default router;
