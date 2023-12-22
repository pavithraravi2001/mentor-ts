"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const { query, body } = require("express-validator");
const router = new express_1.Router();
/**
 * @api {get} /fees/:instituteId/fee-master Retrieve Institute fee
 */
router.get("/:instituteId/fee-master", query("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the query string"), controller_1.getInstituteFeeMaster);
/**
 * @api {put} /fees/:instituteId/fees Update Institute fee
 */
router.put("/:instituteId/fee-master", body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"), controller_1.updateInstituteFeeMaster);
/**
 * @api {get} /fees/:instituteId/fee-term Retrieve Institute fee term
 */
router.get("/:instituteId/fee-term", query("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the query string"), controller_1.getInstituteFeeTerm);
/**
 * @api {put} /fees/:instituteId/fee-term Update Institute fee term
 */
router.put("/:instituteId/fee-term", body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"), controller_1.updateInstituteFeeTerm);
/**
 * @api {get} /fees/:instituteId/fee-configuration Retrieve Institute fee configuration
 */
router.get("/:instituteId/fee-configuration", query("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the query string"), controller_1.getInstituteFeeConfiguration);
/**
 * @api {put} /fees/:instituteId/fee-configuration Update Institute fee configuration
 */
router.put("/:instituteId/fee-configuration", body("academicYear")
    .exists()
    .notEmpty()
    .withMessage("academicYear is required in the body"), controller_1.updateInstituteFeeConfiguration);
/**
 * @api {delete} /fees/:id Delete Institute fee configuration
 */
router.delete("/:id", controller_1.deleteInstituteFeeConfiguration);
/**
 * @api {delete} /fees/:id/:arrayId remove Array element from Institute fee configuration
 */
router.delete("/:id/:termId", controller_1.removeArrayItemInstituteFeeConfiguration);
exports.default = router;
