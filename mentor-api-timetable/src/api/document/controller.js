"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = exports.uploadFile = void 0;
const service_1 = require("./service");
const uploadFile = (req, res) => {
    (0, service_1.doUploadService)(req, res);
};
exports.uploadFile = uploadFile;
const downloadFile = (req, res) => {
    (0, service_1.doDownloadService)(req, res);
};
exports.downloadFile = downloadFile;
