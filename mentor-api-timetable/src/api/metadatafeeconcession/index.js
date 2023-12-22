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
const { concessionKey, description, isPercentage, percentage, isFixedAmount, fixedAmount, } = model_1.schema.tree;
/**
 * @api {post} /metadatacontents Create metadataContent
 */
router.post("/", (0, bodymen_1.middleware)({
    concessionKey,
    description,
    isPercentage,
    percentage,
    isFixedAmount,
    fixedAmount,
}), controller_1.createFeeConcession);
/**
 * @api {get} /metadatacontents/:contentKey Retrieve metadataContent
 */
router.get("/:concessionKey", controller_1.getMetadataFeeConcessionByConcessionKey);
/**
 * @api {get} /metadatacontents/:contentKey Retrieve metadataContent
 */
router.get("/", controller_1.getMetadataFeeConcession);
/**
 * @api {get} /metadatacontents Update metadataContent
 */
router.put("/", (0, bodymen_1.middleware)({
    concessionKey,
    description,
    isPercentage,
    percentage,
    isFixedAmount,
    fixedAmount,
}), controller_1.updateFeeConcession);
/**
 * @api {get} /metadatacontents/:contentKey Delete metadataContent
 */
router.delete("/:concessionKey", controller_1.deleteMetadataFeeConcessionByConcessionKey);
exports.default = router;
