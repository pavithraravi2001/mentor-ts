"use strict";
// import {GenericFileUpload} from "./model";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doDownloadService = exports.doUploadService = void 0;
// import { awsS3Region, s3AccessKeyId, s3SecretAccessKey } from "../../config";
// const AWS = require("aws-sdk");
// const s3Client = new AWS.S3({
//   accessKeyId: s3AccessKeyId,
//   secretAccessKey: s3SecretAccessKey,
//   region: awsS3Region,
// });
// export const doUploadService = async (req, res) => {
//   var uploadFile = {
//     originalFileName: req.file.originalname,
//   };
//   var newFile = await GenericFileUpload.create(uploadFile);
//   const uploadParams = {
//     Bucket: "applicationattachment2",
//     Key: newFile.fileKey,
//     Body: req.file.buffer,
//   };
//   const params = uploadParams;
//   s3Client.upload(params, (err, data) => {
//     if (err) {
//       res.status(500).json({ error: "Error -> " + err });
//     } else {
//       res.json(newFile);
//     }
//   });
// };
// export const doDownloadService = async (req, res) => {
//   const params = {
//     Bucket: "applicationattachment2",
//     Key: req.params.filekey,
//   };
//   const s3Stream = s3Client.getObject(params).createReadStream();
//   s3Stream.on("error", function (err) {
//     res.status(500).json({ error: "Error -> " + err });
//   });
//   s3Stream.pipe(res);
// };
const model_1 = require("./model");
const config_1 = require("../../config");
const AWS = require("aws-sdk");
const s3Client = new AWS.S3({
    accessKeyId: config_1.s3AccessKeyId,
    secretAccessKey: config_1.s3SecretAccessKey,
    region: config_1.awsS3Region,
});
const doUploadService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var uploadFile = {
            originalFileName: req.file.originalname,
        };
        var newFile = yield model_1.GenericFileUpload.create(uploadFile);
        const uploadParams = {
            Bucket: "applicationattachment2",
            Key: newFile.fileKey,
            Body: req.file.buffer,
        };
        const params = uploadParams;
        s3Client.upload(params, (err, data) => {
            if (err) {
                console.error("Error during S3 upload:", err);
                if (res) {
                    res.status(500).json({ error: "Error during S3 upload" });
                }
            }
            else {
                if (res) {
                    res.json(newFile);
                }
            }
        });
    }
    catch (error) {
        console.error("Error during file creation:", error);
        if (res) {
            res.status(500).json({ error: "Error during file creation" });
        }
    }
});
exports.doUploadService = doUploadService;
const doDownloadService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: "applicationattachment2",
        Key: req.params.filekey,
    };
    try {
        const s3Stream = s3Client.getObject(params).createReadStream();
        s3Stream.on("error", function (err) {
            res.status(500).json({ error: "Error -> " + err.message });
        });
        s3Stream.pipe(res);
    }
    catch (error) {
        res.status(500).json({ error: "Error -> " + error.message });
    }
});
exports.doDownloadService = doDownloadService;
