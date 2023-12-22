"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodymen_1 = require("bodymen");
const express_1 = require("express");
const controller_1 = require("./controller");
const model_1 = require("./model");
MetadataContent, { schema: model_1.schema };
from;
"./model";
const router = new express_1.Router();
const { contentKey, content } = model_1.schema.tree;
/**
 * @api {post} /metadatacontents Create metadataContent
 */
router.post("/", (0, bodymen_1.middleware)({ contentKey, content }), controller_1.createMetadataContent);
/**
 * @api {get} /metadatacontents/:contentKey Retrieve metadataContent
 */
router.get("/:contentKey", controller_1.getMetadataContentByKey);
/**
 * @api {get} /metadatacontents Update metadataContent
 */
router.put("/", (0, bodymen_1.middleware)({ contentKey, content }), controller_1.updateMetadataContent);
/**
 * @api {get} /metadatacontents/:contentKey Delete metadataContent
 */
router.delete("/:contentKey", controller_1.deleteMetadataContentByContentKey);
exports.default = router;
