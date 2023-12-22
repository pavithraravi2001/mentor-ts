import { Router } from "express";
import { createTimetable, getTimetable, updateTimetable } from "./controller";
const router = new Router();
const { query, body } = require("express-validator");
module.exports = router;

/***
  @api {get} /timetable Get timetable
***/

router.get("/", getTimetable);

/***
  @api {post} /timetable/timetable-schedule Retrieve timetable
***/
router.post("/", createTimetable);

/**
 * @api {put} /timetable/timetable-schedule Update timetable
 */
router.put("/", updateTimetable);
