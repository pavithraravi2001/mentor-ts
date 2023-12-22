"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_js_1 = require("./controller.js");
let upload = require("./multer.config.js");
const router = new express_1.Router();
/**
 * @api {post} /documents to upload file
 */
router.post("/", upload.single("file"), controller_js_1.uploadFile);
/**
 * @api {get} /documents to download file
 */
router.get("/:filekey", controller_js_1.downloadFile);
exports.default = router;
module.exports = router;
