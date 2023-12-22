"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = new express_1.Router();
/**
 * @api {get} /instituteworkinghours
 */
router.get("/", controller_1.getInstituteWorkingHours);
/**
 * @api {put} /instituteworkinghours Update Institute working hours
 */
router.put("/", controller_1.updateInstituteWorkingHours);
/**
 * @api {delete} /instituteworkinghours Delete Institute working hours
 */
router.delete("/", controller_1.deleteInstituteWorkingHours);
exports.default = router;
