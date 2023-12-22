// import {GenericFileUpload} from "./model";

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

import {GenericFileUpload} from "./model";

import { awsS3Region, s3AccessKeyId, s3SecretAccessKey } from "../../config";
const AWS = require("aws-sdk");

const s3Client = new AWS.S3({
  accessKeyId: s3AccessKeyId,
  secretAccessKey: s3SecretAccessKey,
  region: awsS3Region,
});

export const doUploadService = async (req, res) => {
  try {
    var uploadFile = {
      originalFileName: req.file.originalname,
    };
    var newFile = await GenericFileUpload.create(uploadFile);

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
      } else {
        if (res) {
          res.json(newFile);
        }
      }
    });
  } catch (error) {
    console.error("Error during file creation:", error);
    if (res) {
      res.status(500).json({ error: "Error during file creation" });
    }
  }
};



export const doDownloadService = async (req, res) => {
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
  } catch (error) {
    res.status(500).json({ error: "Error -> " + error.message });
  }
};


