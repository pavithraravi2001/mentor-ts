"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
let upload = require("../document/multer.config");
const router = new express_1.Router();
/**
 * @api {post} /students Create student
 */
router.post("/", controller_1.createStudent);
/**
 * @api {get} /students/:id Retrieve student
 */
router.get("/", controller_1.getStudents);
/**
 * @api {post} /students/excel excel-edited data
 */
router.post("/excel", controller_1.createStudentExcelData);
/**
     * @api {post} /students Create student from application
     */
router.post("/enroll", controller_1.createStudentFromApplication);
/**
 * @api {get} /students/search Retrieve students for logged-in user
 */
router.get("/search", controller_1.searchStudent);
/**
 * @api {get} /students/:id/interests Retrieve student
 */
router.get("/:id/interests", controller_1.getStudentInterstsById);
/**
 * @api {get} /students/:id/interests Retrieve student
 */
router.get("/:id/achievements", controller_1.getStudentAchievementsById);
/**
 * @api {get} /students/:id Retrieve student
 */
router.get("/:id", controller_1.getStudentById);
/**
 * @api {get} /students/enrollnumber/:enrollnumber Retrieve student
 */
router.get("/enrollnumber/:enrollnumber", controller_1.getStudentByEnrollNumber);
/**
 * @api {put} /students/:id Update student
 */
router.put("/:id", controller_1.updateStudent);
/**
 * @api {get} /students/:instituteId  Retrieve student list for Announcement
 */
router.get("/:instituteId/all", controller_1.getStudentList);
/**
 * @api {post} /students/upload Create bulk student
 */
router.post("/upload", upload.single("file"), controller_1.addBulkStudent);
exports.default = router;
