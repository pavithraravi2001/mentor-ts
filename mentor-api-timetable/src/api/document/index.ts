import { Router } from "express";
import { downloadFile, uploadFile } from "./controller.js";
let upload = require("./multer.config.js");

const router = new Router();

/**
 * @api {post} /documents to upload file
 */

router.post("/", upload.single("file"), uploadFile);

/**
 * @api {get} /documents to download file
 */

router.get("/:filekey", downloadFile);

export default router;

module.exports = router;
