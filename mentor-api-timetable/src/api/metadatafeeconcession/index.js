import { middleware as body } from "bodymen";
import { Router } from "express";
import {
  createFeeConcession,
  deleteMetadataFeeConcessionByConcessionKey,
  getMetadataFeeConcession,
  getMetadataFeeConcessionByConcessionKey,
  updateFeeConcession,
} from "./controller";
import { schema } from "./model";
export MetadataContent, { schema } from "./model";

const router = new Router();
const {
  concessionKey,
  description,
  isPercentage,
  percentage,
  isFixedAmount,
  fixedAmount,
} = schema.tree;

/**
 * @api {post} /metadatacontents Create metadataContent
 */
router.post(
  "/",
  body({
    concessionKey,
    description,
    isPercentage,
    percentage,
    isFixedAmount,
    fixedAmount,
  }),
  createFeeConcession
);

/**
 * @api {get} /metadatacontents/:contentKey Retrieve metadataContent
 */
router.get("/:concessionKey", getMetadataFeeConcessionByConcessionKey);

/**
 * @api {get} /metadatacontents/:contentKey Retrieve metadataContent
 */
router.get("/", getMetadataFeeConcession);

/**
 * @api {get} /metadatacontents Update metadataContent
 */
router.put(
  "/",
  body({
    concessionKey,
    description,
    isPercentage,
    percentage,
    isFixedAmount,
    fixedAmount,
  }),
  updateFeeConcession
);

/**
 * @api {get} /metadatacontents/:contentKey Delete metadataContent
 */
router.delete("/:concessionKey", deleteMetadataFeeConcessionByConcessionKey);

export default router;
