"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodymen_1 = require("bodymen");
const express_1 = require("express");
const controller_1 = require("./controller");
const model_1 = require("./model");
const router = new express_1.Router();
const { name, version, status, items } = model_1.schema.tree;
/***
 * @api {post} /metadatacontents Create metadataContent
 */
router.post("/", (0, bodymen_1.middleware)({ name, version, status, items }), controller_1.createCollection);
/**
 * @api {get} /metadatacontents/:contentKey Retrieve metadataContent
 */
router.get("/:name", controller_1.getCollectionByName);
/**
 * @api {get} /metadatacollections Retrieve metadataContent
 */
router.get("/", controller_1.getCollections);
/**
 * @api {get} /metadatacontents/:contentKey Retrieve metadataContent
 */
router.get("/dropdown/:name", controller_1.getCollectionForDropDown);
/**
 * @api {get} /metadatacontents Update metadataContent
 */
router.put("/", (0, bodymen_1.middleware)({ name, version, status, items }), controller_1.updateCollection);
/**
 * @api {get} /metadatacontents/:contentKey Delete metadataContent
 */
router.delete("/:name", controller_1.deleteCollectionByName);
exports.default = router;
