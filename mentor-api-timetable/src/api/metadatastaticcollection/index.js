import { middleware as body } from "bodymen";
import { Router } from "express";
import {
  createCollection,
  deleteCollectionByName,
  getCollectionByName,
  getCollectionForDropDown,
  getCollections,
  updateCollection,
} from "./controller";
import { schema } from "./model";

const router = new Router();
const { name, version, status, items } = schema.tree;

/***
 * @api {post} /metadatacontents Create metadataContent
 */
router.post("/", body({ name, version, status, items }), createCollection);

/**
 * @api {get} /metadatacontents/:contentKey Retrieve metadataContent
 */
router.get("/:name", getCollectionByName);

/**
 * @api {get} /metadatacollections Retrieve metadataContent
 */
router.get("/", getCollections);

/**
 * @api {get} /metadatacontents/:contentKey Retrieve metadataContent
 */
router.get("/dropdown/:name", getCollectionForDropDown);

/**
 * @api {get} /metadatacontents Update metadataContent
 */
router.put("/", body({ name, version, status, items }), updateCollection);

/**
 * @api {get} /metadatacontents/:contentKey Delete metadataContent
 */
router.delete("/:name", deleteCollectionByName);

export default router;
