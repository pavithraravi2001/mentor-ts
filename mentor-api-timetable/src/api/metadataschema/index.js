"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodymen_1 = require("bodymen");
const express_1 = require("express");
const controller_1 = require("./controller");
const model_1 = require("./model");
MetadataCollection, { schema: model_1.schema };
from;
"./model";
const router = new express_1.Router();
const { entityName, version, status, fields, formFields } = model_1.schema.tree;
/**
 * @api {post} /metadatacontents Create metadataContent
 */
router.post("/", (0, bodymen_1.middleware)({ entityName, version, status, fields, formFields }), controller_1.createSchema);
/**
 * @api {get} /metadatacontents/:contentKey Retrieve metadataContent
 */
router.get("/:entityName", controller_1.getSchemaByEntityName);
/**
 * @api {get} /metadatacontents Update metadataContent
 */
router.put("/", (0, bodymen_1.middleware)({ entityName, version, status, fields, formFields }), controller_1.updateSchema);
/**
 * @api {get} /metadatacontents/:contentKey Delete metadataContent
 */
router.delete("/:entityName", controller_1.deleteSchemaByEntityName);
exports.default = router;
