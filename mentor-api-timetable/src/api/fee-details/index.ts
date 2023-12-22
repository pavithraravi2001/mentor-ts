import { Router } from "express";
import {
  deleteInstituteFeeConfiguration,
  getInstituteFeeConfiguration,
  getInstituteFeeMaster,
  getInstituteFeeTerm,
  removeArrayItemInstituteFeeConfiguration,
  updateInstituteFeeConfiguration,
  updateInstituteFeeMaster,
  updateInstituteFeeTerm,
} from "./controller";
const { query, body } = require("express-validator");

const router = new Router();
/**
 * @api {get} /fees/:instituteId/fee-master Retrieve Institute fee
 */
router.get(
  "/:instituteId/fee-master",
  query("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the query string"),
  getInstituteFeeMaster
);

/**
 * @api {put} /fees/:instituteId/fees Update Institute fee
 */
router.put(
  "/:instituteId/fee-master",
  body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"),
  updateInstituteFeeMaster
);

/**
 * @api {get} /fees/:instituteId/fee-term Retrieve Institute fee term
 */
router.get(
  "/:instituteId/fee-term",
  query("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the query string"),
  getInstituteFeeTerm
);

/**
 * @api {put} /fees/:instituteId/fee-term Update Institute fee term
 */
router.put(
  "/:instituteId/fee-term",
  body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"),
  updateInstituteFeeTerm
);

/**
 * @api {get} /fees/:instituteId/fee-configuration Retrieve Institute fee configuration
 */
router.get(
  "/:instituteId/fee-configuration",
  query("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the query string"),
  getInstituteFeeConfiguration
);

/**
 * @api {put} /fees/:instituteId/fee-configuration Update Institute fee configuration
 */
router.put(
  "/:instituteId/fee-configuration",
  body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"),
  updateInstituteFeeConfiguration
);

/**
 * @api {delete} /fees/:id Delete Institute fee configuration
 */
router.delete("/:id", deleteInstituteFeeConfiguration);

/**
 * @api {delete} /fees/:id/:arrayId remove Array element from Institute fee configuration
 */
router.delete("/:id/:termId", removeArrayItemInstituteFeeConfiguration);

export default router;
