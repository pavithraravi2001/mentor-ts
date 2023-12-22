"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const aws_sdk_mock_1 = __importDefault(require("aws-sdk-mock"));
aws_sdk_mock_1.default.mock('SES', 'sendEmail', Promise.resolve({ messageId: 'mocked-message-id' }));
describe('sendSESEmail', () => {
    afterEach(() => {
        aws_sdk_mock_1.default.restore();
    });
    it('should send an SES email', () => __awaiter(void 0, void 0, void 0, function* () {
        const emailInfo = {
            toEmail: 'pavithrar@bloomlync.com',
            subject: 'Test Subject',
            content: '<p>Hello, this is a test email.</p>',
        };
        aws_sdk_mock_1.default.mock('SES', 'sendEmail', Promise.resolve({ "MessageId": "0109018c23d8d244-16951568-7205-4c0b-ac6b-22169c3b3e17-000000", "ResponseMetadata": { "RequestId": "601f9619-8557-400b-bce1-637eb8548d6e" } }));
        const result = yield _1.default.sendEmail(emailInfo);
    }));
    it('should handle errors when sending an SES email', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(_1.default.sendEmail({})).rejects.toThrow("");
    }));
});
