import ses from '.';
import AWS from 'aws-sdk-mock';

AWS.mock('SES', 'sendEmail', Promise.resolve({ messageId: 'mocked-message-id' }));

describe('sendSESEmail', () => {
    afterEach(() => {
        AWS.restore();
    });

    it('should send an SES email', async () => {
        const emailInfo = {
            toEmail: 'pavithrar@bloomlync.com',
            subject: 'Test Subject',
            content: '<p>Hello, this is a test email.</p>',
        };
        AWS.mock('SES', 'sendEmail', Promise.resolve({ "MessageId": "0109018c23d8d244-16951568-7205-4c0b-ac6b-22169c3b3e17-000000", "ResponseMetadata": { "RequestId": "601f9619-8557-400b-bce1-637eb8548d6e" } }));
        const result = await ses.sendEmail(emailInfo);
    });

    it('should handle errors when sending an SES email', async () => {
        await expect(ses.sendEmail({})).rejects.toThrow("")
    });
});
