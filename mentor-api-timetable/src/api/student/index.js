import { Router } from "express";
import {
  addBulkStudent,
  createStudent,
  createStudentExcelData,
  createStudentFromApplication,
  getStudentAchievementsById,
  getStudentByEnrollNumber,
  getStudentById,
  getStudentInterstsById,
  getStudentList,
  getStudents,
  searchStudent,
  updateStudent,
} from "./controller";
let upload = require("../document/multer.config");

const router = new Router();

/**
 * @api {post} /students Create student
 */
router.post("/", createStudent);

/**
 * @api {get} /students/:id Retrieve student
 */
router.get("/", getStudents);


/**
 * @api {post} /students/excel excel-edited data
 */
router.post("/excel", createStudentExcelData);

  /**
       * @api {post} /students Create student from application
       */
router.post("/enroll", createStudentFromApplication);

/**
 * @api {get} /students/search Retrieve students for logged-in user
 */
router.get("/search", searchStudent);

/**
 * @api {get} /students/:id/interests Retrieve student
 */
router.get("/:id/interests", getStudentInterstsById);

/**
 * @api {get} /students/:id/interests Retrieve student
 */
router.get("/:id/achievements", getStudentAchievementsById);

/**
 * @api {get} /students/:id Retrieve student
 */
router.get("/:id", getStudentById);

/**
 * @api {get} /students/enrollnumber/:enrollnumber Retrieve student
 */
router.get("/enrollnumber/:enrollnumber", getStudentByEnrollNumber);

/**
 * @api {put} /students/:id Update student
 */
router.put("/:id", updateStudent);

/**
 * @api {get} /students/:instituteId  Retrieve student list for Announcement
 */
router.get("/:instituteId/all", getStudentList);

/**
 * @api {post} /students/upload Create bulk student
 */
router.post("/upload", upload.single("file"), addBulkStudent);


export default router;
