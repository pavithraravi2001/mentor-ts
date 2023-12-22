"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
let upload = require("../document/multer.config");
const router = new express_1.Router();
/**
 * @api {post} /employees Create metadataContent
 */
router.post("/", controller_1.createEmployee);
/**
 * @api {get} /employees/ Retrieve employees for logged-in user
 */
router.get("/", controller_1.getEmployees);
/**
 * @api {get} /employees/search Retrieve employees for logged-in user
 */
router.get("/search", controller_1.searchEmployee);
/**
 * @api {get} /employees/:id Retrieve metadataContent
 */
router.get("/empid/:empId", controller_1.getEmployeeByEmpId);
/**
 * @api {get} /employees/:id Retrieve metadataContent
 */
router.get("/:id", controller_1.getEmployeeById);
/**
 * @api {put} /employees/:id Update employee
 */
router.put("/:id", controller_1.updateEmployee);
/**
 * @api {put} /employees/enroll/:id Update employee
 */
router.put("/enroll/:id", controller_1.updateEmployeeEnroll);
/**
 * @api {put} /employees/submit/:id Update employee
 */
router.put("/submit/:id", controller_1.updateEmployeeSubmit);
/**
 * @api {delete} /employees/:id Delete employee
 */
router.delete("/:id", controller_1.deleteEmployee);
/**
 * @api {get} /analytics/:type Retrieve applications
 */
router.get("/students/analytics", controller_1.getEmployeesForAnalytics);
/**
 * @api {get} /employees/:instituteId/teaching-employee Retrieve Institute announcement
 */
router.get("/:instituteId/teaching-employee", controller_1.getTeachingEmployees);
/**
 * @api {post} /employees/upload Create bulk student
 */
router.post("/upload", upload.single("file"), controller_1.addBulkEmployee);
/**
 * @api {post} /employees/excel excel-edited data
 */
router.post("/excel", controller_1.createEmployeeExcelData);
exports.default = router;
