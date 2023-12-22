import { Router } from "express";
import {
  addBulkEmployee,
  createEmployee,
  createEmployeeExcelData,
  deleteEmployee,
  getEmployeeByEmpId,
  getEmployeeById,
  getEmployees,
  getEmployeesForAnalytics,
  getTeachingEmployees,
  searchEmployee,
  updateEmployee,
  updateEmployeeEnroll,
  updateEmployeeSubmit,
} from "./controller";
let upload = require("../document/multer.config");

const router = new Router();

/**
 * @api {post} /employees Create metadataContent
 */
router.post("/", createEmployee);

/**
 * @api {get} /employees/ Retrieve employees for logged-in user
 */
router.get("/", getEmployees);

/**
 * @api {get} /employees/search Retrieve employees for logged-in user
 */
router.get("/search", searchEmployee);

/**
 * @api {get} /employees/:id Retrieve metadataContent
 */
router.get("/empid/:empId", getEmployeeByEmpId);

/**
 * @api {get} /employees/:id Retrieve metadataContent
 */
router.get("/:id", getEmployeeById);

/**
 * @api {put} /employees/:id Update employee
 */
router.put("/:id", updateEmployee);

/**
 * @api {put} /employees/enroll/:id Update employee
 */
router.put("/enroll/:id", updateEmployeeEnroll);

/**
 * @api {put} /employees/submit/:id Update employee
 */
router.put("/submit/:id", updateEmployeeSubmit);

/**
 * @api {delete} /employees/:id Delete employee
 */
router.delete("/:id", deleteEmployee);

/**
 * @api {get} /analytics/:type Retrieve applications
 */
router.get("/students/analytics", getEmployeesForAnalytics);

/**
 * @api {get} /employees/:instituteId/teaching-employee Retrieve Institute announcement
 */
router.get("/:instituteId/teaching-employee", getTeachingEmployees);

/**
 * @api {post} /employees/upload Create bulk student
 */
router.post("/upload", upload.single("file"), addBulkEmployee);

/**
 * @api {post} /employees/excel excel-edited data
 */
router.post("/excel", createEmployeeExcelData);

export default router;
