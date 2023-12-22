"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const AWS = require("aws-sdk");
// key and secret used are for arn:aws:iam::632590076490:user/ses-smtp-user.20200502-125850
AWS.config.update({
    accessKeyId: config_1.sesAccessKeyId,
    secretAccessKey: config_1.sesSecretAccessKey,
    region: config_1.awsSESRegion,
});
const ses = new AWS.SES({ apiVersion: "2010-12-01" });
function sendSESEmail({ fromEmail = config_1.sesDefaultFromEmail, toEmail, subject, content, }) {
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
exports.default = {
    sendEmail: sendSESEmail,
};
