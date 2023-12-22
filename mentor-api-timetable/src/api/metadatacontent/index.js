import { middleware as body } from "bodymen";
import { Router } from "express";
import {
    createMetadataContent,
    deleteMetadataContentByContentKey,
    getMetadataContentByKey,
    updateMetadataContent,
} from "./controller";
import { schema } from "./model";
export MetadataContent, { schema } from "./model";

const router = new Router();
const { contentKey, content } = schema.tree;

/**
 * @api {post} /metadatacontents Create metadataContent
 */
router.post("/", body({ contentKey, content }), createMetadataContent);

/**
 * @api {get} /metadatacontents/:contentKey Retrieve metadataContent
 */
router.get("/:contentKey", getMetadataContentByKey);

/**
 * @api {get} /metadatacontents Update metadataContent
 */
router.put("/", body({ contentKey, content }), updateMetadataContent);

/**
 * @api {get} /metadatacontents/:contentKey Delete metadataContent
 */
router.delete("/:contentKey", deleteMetadataContentByContentKey);

export default router;
