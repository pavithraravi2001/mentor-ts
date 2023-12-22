"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodymen_1 = require("bodymen");
const express_1 = require("express");
const controller_1 = require("./controller");
const model_1 = require("./model");
Catalogue, { schema: model_1.schema };
from;
"./model";
const router = new express_1.Router();
const { _id, groupName, instituteName, branch, board, addressLine1, addressLine2, addressLine3, } = model_1.schema.tree;
/**
 * @api {post} /metadatacontents Create metadataContent
 */
router.post("/", (0, bodymen_1.middleware)({
    groupName,
    instituteName,
    branch,
    board,
    addressLine1,
    addressLine2,
    addressLine3,
}), controller_1.createCatalogue);
/**
 * @api {get} /metadatacontents/:contentKey Retrieve metadataContent
 */
router.get("/:groupName", controller_1.getBranchesByGroupName);
/**
 * @api {get} /metadatacontents Update metadataContent
 */
router.put("/:id", (0, bodymen_1.middleware)({
    _id,
    groupName,
    instituteName,
    branch,
    board,
    addressLine1,
    addressLine2,
    addressLine3,
}), controller_1.updateCatalogue);
/**
 * @api {get} /metadatacontents/:contentKey Delete metadataContent
 */
router.delete("/:groupName", controller_1.deleteCatalogueByGroupName);
exports.default = router;
