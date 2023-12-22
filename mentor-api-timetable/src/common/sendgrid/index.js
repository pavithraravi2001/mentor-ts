"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const config_1 = require("../../config");
mail_1.default.setApiKey(config_1.sendgridKey);
const sendMail = ({ fromEmail = config_1.defaultEmail, toEmail, subject, content, }) => {
    const msg = {
        to: toEmail,
        from: fromEmail,
        subject,
        html: content,
    };
    return mail_1.default.send(msg);
};
exports.sendMail = sendMail;
