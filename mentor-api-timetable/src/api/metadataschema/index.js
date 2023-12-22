import { middleware as body } from "bodymen";
import { Router } from "express";
import {
  createSchema,
  deleteSchemaByEntityName,
  getSchemaByEntityName,
  updateSchema,
} from "./controller";
import { schema } from "./model";
export MetadataCollection, { schema } from "./model";

const router = new Router();
const { entityName, version, status, fields, formFields } = schema.tree;

/**
 * @api {post} /metadatacontents Create metadataContent
 */
router.post(
  "/",
  body({ entityName, version, status, fields, formFields }),
  createSchema
);

/**
 * @api {get} /metadatacontents/:contentKey Retrieve metadataContent
 */
router.get("/:entityName", getSchemaByEntityName);

/**
 * @api {get} /metadatacontents Update metadataContent
 */
router.put(
  "/",
  body({ entityName, version, status, fields, formFields }),
  updateSchema
);

/**
 * @api {get} /metadatacontents/:contentKey Delete metadataContent
 */
router.delete("/:entityName", deleteSchemaByEntityName);

export default router;
