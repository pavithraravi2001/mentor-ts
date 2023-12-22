import { Router } from "express";
import {
  deleteInstituteWorkingHours,
  getInstituteWorkingHours,
  updateInstituteWorkingHours,
} from "./controller";

const router = new Router();

/**
 * @api {get} /instituteworkinghours
 */
router.get("/", getInstituteWorkingHours);

/**
 * @api {put} /instituteworkinghours Update Institute working hours
 */
router.put("/", updateInstituteWorkingHours);

/**
 * @api {delete} /instituteworkinghours Delete Institute working hours
 */
router.delete("/", deleteInstituteWorkingHours);

export default router;
