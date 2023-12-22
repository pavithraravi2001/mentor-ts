import {
  awsSESRegion,
  sesAccessKeyId,
  sesDefaultFromEmail,
  sesSecretAccessKey,
} from "../../config";
const AWS = require("aws-sdk");
// key and secret used are for arn:aws:iam::632590076490:user/ses-smtp-user.20200502-125850
AWS.config.update({
  accessKeyId: sesAccessKeyId,
  secretAccessKey: sesSecretAccessKey,
  region: awsSESRegion,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

function sendSESEmail({
  fromEmail = sesDefaultFromEmail,
  toEmail,
  subject,
  content,
}) {
  return new Promise((resolve, reject) => {
    const params = {
      Destination: {
        ToAddresses: Array.isArray(toEmail) ? toEmail : [toEmail],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: content,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
      ReturnPath: fromEmail,
      Source: fromEmail,
    };

    ses
      .sendEmail(params)
      .promise()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default {
  sendEmail: sendSESEmail,
};
