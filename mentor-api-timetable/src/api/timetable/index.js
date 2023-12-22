"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = new express_1.Router();
const { query, body } = require("express-validator");
module.exports = router;
/***
  @api {get} /timetable Get timetable
***/
router.get("/", controller_1.getTimetable);
/***
  @api {post} /timetable/timetable-schedule Retrieve timetable
***/
router.post("/", controller_1.createTimetable);
/**
 * @api {put} /timetable/timetable-schedule Update timetable
 */
router.put("/", controller_1.updateTimetable);
