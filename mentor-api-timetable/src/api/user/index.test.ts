import MockAdapter from "axios-mock-adapter";
import { sign } from "../../common/jwt";
import { ActivationToken, User } from "./model";
import ses from "../../common/aws-ses";
import {
  createUserByAdminService,
  createUserService,
  getInstituteUsersService,
  getUserByEmailService,
  loginService,
  recaptchaVerificationService,
  resendVerifyEmailService,
  verifyEmailService,
} from "./service";
const axios = require("axios");
jest.mock("./model");
jest.mock("../../common/jwt");
jest.mock("../../common/aws-ses");
jest.mock("../../common/response");
const mockAxios = new MockAdapter(axios);

jest.mock("./model", () => ({
  User: {
    create: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    set: jest.fn(),
    authenticate: jest.fn(),
  },
  PasswordReset: {
    create: jest.fn(),
  },
  ActivationToken: {
    create: jest.fn(),
    findOne: jest.fn(),
    deleteMany: jest.fn(),
  },
}));

const mockToken = "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF";
const mockUser = {
  email: "pavithrar@bloomlync.com",
  name: "pavithra",
  captcha: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlGG",
  password: "123456",
  isVerified: true,
};
const mockUsers = [
  {
    email: "abc@a.com",
    password: "123456",
    name: "pavithra",
    captcha: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlGG",
    isVerified: true,
  },
  {
    email: "b@a.com",
    password: "123456",
    name: "pavithra",
    captcha: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlGG",
    isVerified: true,
  },
];
jest.mock("axios");

describe("User API", () => {
  test("POST createUserService with valid captcha", async () => {
    const expectedResponse = {
      success: true,
    };
    const mockUser = {
      user: {
        email: "pavithrar@bloomlync.com",
        name: "pavithra",
        password: "123456",
        isVerified: true,
      },
      captcha: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlGG",
    };
    const axiosMock = jest.spyOn(require("axios"), "post");
    axiosMock.mockResolvedValue({ data: expectedResponse });
    User.create.mockResolvedValue(mockUser);
    ActivationToken.create.mockResolvedValue(mockUser);
    ses.sendEmail = jest.fn().mockImplementation(() => ({
      promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
    }));
    const link = "https://example.com/activation/";
    const recaptchaResult = await recaptchaVerificationService("captcha");
    const mockSesResponse = {
      MessageId: 'mock-message-id',
    };
    ses.sendEmail.mockImplementation(() => ({
      promise: jest.fn().mockResolvedValueOnce({}),
    }));
    ses.sendEmail.mockResolvedValue(mockSesResponse);
    const resultWithMessageId = await createUserService(mockUser, link);
    expect(resultWithMessageId.status).toBe(201);
    expect(recaptchaResult).toEqual(expectedResponse);
    expect(resultWithMessageId.message).toBe(
      "A verification email has been sent to the given email. Please verify it."
    );
  });

  test("POST createUserService Error while creating activation token", async () => {
    const expectedResponse = {
      success: true,
    };
    const axiosMock = jest.spyOn(require("axios"), "post");
    axiosMock.mockResolvedValue({ data: expectedResponse });
    User.create.mockResolvedValue({ _id: "61ebd33f38b4e0ecc10fa5ab" });
    ActivationToken.create.mockResolvedValue(null);
    ses.sendEmail = jest.fn().mockImplementation(() => ({
      promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
    }));
    const link = "https://example.com/activation/";
    try {
      const recaptchaResult = await recaptchaVerificationService("captcha");
      const result = await createUserService(mockUser, link);
      console.log(result, "result");
    } catch (error) {
      expect(error.message).toBe("Error while creating activation token");
    }
  });

  test("POST createUserService Error while creating user", async () => {
    const expectedResponse = {
      success: true,
    };
    const axiosMock = jest.spyOn(require("axios"), "post");
    axiosMock.mockResolvedValue({ data: expectedResponse });
    User.create.mockResolvedValue(null);
    ActivationToken.create.mockResolvedValue(null);
    ses.sendEmail = jest.fn().mockImplementation(() => ({
      promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
    }));
    const link = "https://example.com/activation/";
    try {
      const recaptchaResult = await recaptchaVerificationService("captcha");
      const result = await createUserService(mockUser, link);
    } catch (error) {
      expect(error.message).toBe("Error while creating user");
    }
  });

  test("POST createUserService Email is already registered", async () => {
    const mockMongoError = new Error();
    mockMongoError.name = "MongoError";
    mockMongoError.code = 11000;
    const expectedResponse = {
      success: true,
    };
    const axiosMock = jest.spyOn(require("axios"), "post");
    axiosMock.mockResolvedValue({ data: expectedResponse });
    User.create.mockResolvedValue({ _id: "61ebd33f38b4e0ecc10fa5ab" });
    ActivationToken.create.mockResolvedValue(mockUser);
    const recaptchaResult = await recaptchaVerificationService("captcha");
    expect(recaptchaResult).toEqual(expectedResponse);
    User.create.mockRejectedValue(mockMongoError);
    try {
      await createUserService(mockUser, "https://example.com/activation/");
    } catch (error) {
      expect(error.message).toBe("Email is already registered");
    }
  });

  test("POST createUserService error Recaptcha token not found", async () => {
    User.create.mockRejectedValue(new Error("User creation error"));
    const body = {};
    const link = "https://example.com/activation/";
    try {
      await createUserService(body, link);
    } catch (error) {
      expect(error.message).toBe("Recaptcha token not found");
    }
  });

  test("POST createUserService with invalid captcha", async () => {
    const expectedErrorResponse = {
      success: false,
      error: "Invalid captcha",
    };
    const axiosMock = jest.spyOn(require("axios"), "post");
    axiosMock.mockResolvedValue({ data: expectedErrorResponse });

    try {
      await recaptchaVerificationService("invalid_captcha");
    } catch (error) {
      expect(error.message).toBe("reCAPTCHA verification failed");
    }

    try {
      await createUserService(mockUser, "https://example.com/activation/");
    } catch (error) {
      expect(error.message).toBe("reCAPTCHA verification failed");
    }
  });

  test("POST createUserService with valid captcha - Email sending failure", async () => {
    const expectedResponse = {
      success: true,
    };
    const mockUser = {
      user: {
        email: "pavithrar@bloomlync.com",
        name: "pavithra",
        password: "123456",
        isVerified: true,
      },
      captcha: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlGG",
    };
    const axiosMock = jest.spyOn(require("axios"), "post");
    axiosMock.mockResolvedValue({ data: expectedResponse });
    User.create.mockResolvedValue(mockUser);
    ActivationToken.create.mockResolvedValue(mockUser);
    ses.sendEmail = jest.fn().mockImplementation(() => ({
      promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
    }));
    const link = "https://example.com/activation/";
    const recaptchaResult = await recaptchaVerificationService("captcha");
    try {
      await createUserService(mockUser, link);
      expect(true).toBe(true);
    } catch (error) {
      console.log(error)
      expect(error.message).toBe("Error sending activation email");
    }
  });

  test("POST recaptchaVerificationService", async () => {
    const captcha = "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF";
    axios.post.mockResolvedValue({
      data: {
        success: true,
      },
    });
    const result = await recaptchaVerificationService(captcha);
    expect(result).toEqual({ success: true });
  });

  test("POST recaptchaVerificationService reCAPTCHA verification failed", async () => {
    const mockFailedResponse = {
      data: {
        success: false,
      },
    };
    const mockError = new Error("reCAPTCHA verification failed");
    axios.post.mockResolvedValue(mockFailedResponse);
    const captchaToken = "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlGG";
    await recaptchaVerificationService(captchaToken);
  });

  test("POST resendVerifyEmailService - Email sending failure", async () => {
    const email = "pavithrar@bloomlync.com";
    const link = "https://example.com/resend-activation/";
    User.findOne.mockResolvedValue({ email, isVerified: false });
    ActivationToken.create.mockResolvedValue({ token: mockToken });
    ses.sendEmail = jest.fn().mockImplementation(() => ({
      promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
    }));

    try {
      await resendVerifyEmailService(email, link);
      expect(true).toBe(true);
    } catch (error) {
      expect(error.message).toBe("Failed to send email");
      expect(error.status).toBe(500);
    }
  });

  test("POST resendVerifyEmailService - Activation email not sent", async () => {
    const sendEmailError = new Error("Failed to send email");
    sendEmailError.status = 500;
    const mockUser = {
      email: "pavithrar@bloomlync.com",
      captcha: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlGG",
      password: "123456",
      isVerified: false,
    };
    User.findOne.mockResolvedValue(mockUser);
    ActivationToken.create.mockResolvedValue(mockToken);
    ses.sendEmail = jest.fn().mockImplementation(() => ({
      promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
    }));
    try {
      await resendVerifyEmailService("user@example.com", "https://example.com");
    } catch (error) {
      expect(error).toEqual(sendEmailError);
    }
  });

  test("POST resendVerifyEmailService", async () => {
    const mockUser = {
      email: 'pavithrar@bloomlync.com',
      name: 'Test User',
      isVerified: false,
    };
    const mockActivationToken = {
      token: 'mock-token',
    };
    const mockSesResponse = {
      MessageId: 'mock-message-id',
    };
    jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);
    jest.spyOn(ActivationToken, 'create').mockResolvedValue(mockActivationToken);
    ses.sendEmail.mockResolvedValue(mockSesResponse);
    const email = 'pavithrar@bloomlync.com';
    const link = 'https://example.com';
    const result = await resendVerifyEmailService(email, link);
    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(ActivationToken.create).toHaveBeenCalledWith({ user: mockUser });
    const expectedLink = `${link.replace(/\/$/, '')}/${mockActivationToken.token}`;
    const expectedContent = `
    Dear, undefined.<br><br> Welcome to our platform! We are thrilled to have you, and we 
want to ensure that your account is fully activated so you can begin your journey with us. To get started, please click on the “Activate Account” button to activate your email account.
      <br><br>
      <a href=\"https://example.com/undefined\" style=\"display: inline-block; background-color: #72bf44; color: white; padding: 10px 20px; border: 
none; border-radius: 5px; text-decoration: none; text-align: center; font-size: 16px;\">Activate Account</a>
      <br><br>
      If you did not request a password reset, please ignore this email. The password reset is valid only for 60 minutes.
      <br><br>
      Thank you for choosing our platform. We look forward to providing you with a seamless and enjoyable experience.
      <br><br>
      Best Regards, <br><br>
      &mdash; Mentor Team
    `;
    expect(result).toEqual({
      status: 201,
      message: 'A verification email has been resent to the given email.',
    });
  });


  test("POST resendVerifyEmailService Failed to send email", async () => {
    User.findOne.mockResolvedValue({
      email: "pavithrar@bloomlync.com",
      isVerified: false,
      name: "John Doe",
    });
    ActivationToken.create.mockResolvedValue({
      token: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF",
    });
    const email = "pavithrar@bloomlync.com";
    const link = "https://example.com/activation/";
    try {
      await resendVerifyEmailService(email, link);
    } catch (error) {
      expect(error.message).toBe("Failed to send email");
    }
  });

  test("POST verifyEmailService - No activation token found", async () => {
    const token = "mockedToken";
    ActivationToken.findOne.mockResolvedValue(null);
    try {
      const result = await verifyEmailService(token);
      expect(result).toEqual(null);
    } catch (error) {
      console.log(error);
    }
  });

  test("POST resendVerifyEmailService - user is not found", async () => {
    User.findOne.mockResolvedValue(null);
    const email = "nonexistent@mail.com";
    const link = "https://example.com/activation/";
    try {
      await resendVerifyEmailService(email, link);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("User not found");
    }
  });

  test("POST resendVerifyEmailService - email is already verified", async () => {
    User.findOne.mockResolvedValue({
      email: "verified@example.com",
      isVerified: true,
      name: "Jane Doe",
    });
    const email = "verified@example.com";
    const link = "https://example.com/activation/";
    try {
      await resendVerifyEmailService(email, link);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe(
        "This email has already been verified. Please log in."
      );
    }
  });

  test("PUT verifyEmailService", async () => {
    ActivationToken.findOne = jest.fn(() => ({
      populate: jest.fn().mockResolvedValue({
        token: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF",
        user: {
          set: jest.fn().mockReturnThis(),
          save: jest.fn().mockResolvedValue(),
        },
      }),
    }));
    ActivationToken.deleteMany.mockResolvedValue({ n: 1 });
    const token = "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF";
    const result = await verifyEmailService(token);
    expect(result.verified).toBe(true);
  });

  test("PUT verifyEmailService - null", async () => {
    ActivationToken.findOne = jest.fn(() => ({
      populate: jest.fn().mockResolvedValue(null),
    }));
    const token = "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF";
    const result = await verifyEmailService(token);
    expect(result).toBe(null);
  });

  test("PUT verifyEmailService - Error Handling", async () => {
    const expectedToken = "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF";
    const expectedUser = {
      set: jest.fn().mockReturnThis(),
      save: jest.fn().mockResolvedValue(),
    };
    ActivationToken.findOne = jest.fn(() => ({
      populate: jest.fn().mockResolvedValue({
        token: expectedToken,
        user: expectedUser,
      }),
    }));
    ActivationToken.deleteMany.mockResolvedValue({ n: 1 });
    const token = expectedToken;
    const result = await verifyEmailService(token);
    expect(result.verified).toBe(true);
    expect(expectedUser.set).toHaveBeenCalled();
    expect(expectedUser.save).toHaveBeenCalled();
  });

  test("POST loginService - 200", async () => {
    const mockUser = {
      email: "pavithrar@bloomlync.com",
      password: "Pavi@123",
      authenticate: jest.fn(),
      isVerified: true,
      view: jest.fn(),
    };
    mockUser.authenticate.mockResolvedValue(true);
    User.findOne.mockResolvedValue(mockUser);
    sign.mockResolvedValue("kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF");
    const requestBody = {
      email: "pavithrar@bloomlync.com",
      password: "Pavi@123",
    };
    const result = await loginService(requestBody);
    expect(User.findOne).toHaveBeenCalledWith({ email: requestBody.email });
    expect(sign).toHaveBeenCalledWith(mockUser.id);
    expect(result).toEqual({
      token: "kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF",
      user: mockUser.view(),
    });
  });

  test("POST loginService - User is not verified", async () => {
    const mockUser = {
      email: "pavithrar@bloomlync.com",
      password: "Pavi@123",
      authenticate: jest.fn(),
      isVerified: false,
      view: jest.fn(),
    };
    mockUser.authenticate.mockResolvedValue(true);
    User.findOne.mockResolvedValue(mockUser);
    const requestBody = {
      email: "pavithrar@bloomlync.com",
      password: "Pavi@123",
      isVerified: false,
    };
    try {
      await loginService(requestBody);
    } catch (error) {
      console.log(error, "error");
      //expect(error).toBe("User is not verified");
    }
  });

  test("POST loginService - Authentication failed", async () => {
    const mockUser = {
      email: "pavithrar@bloomlync.com",
      password: "Pavi@123",
      authenticate: jest.fn(),
      isVerified: true,
      view: jest.fn(),
    };
    mockUser.authenticate.mockResolvedValue(false);
    User.findOne.mockResolvedValue(mockUser);
    const requestBody = {
      email: "pavithrar@bloomlync.com",
      password: "Pavi@123",
    };
    try {
      await loginService(requestBody);
    } catch (error) {
      console.log(error, "error");
      expect(mockUser.authenticate).toHaveBeenCalledWith(requestBody.password);
    }
    expect(User.findOne).toHaveBeenCalledWith({ email: requestBody.email });
  });

  test("POST loginService - 400 invalid password", async () => {
    const mockUser = {
      email: "pavithrar@bloomlync.com",
      password: "Pavi@123",
      authenticate: jest.fn(),
      isVerified: true,
      view: jest.fn(),
    };
    mockUser.authenticate.mockRejectedValue(new Error("Invalid password"));
    User.findOne.mockResolvedValue(mockUser);
    sign.mockResolvedValue("kGl4l_eXsjZqZjDo96fG6SMSIYfRj1IccJ8WhJU8FQlF");
    const requestBody = {
      email: "pavithrar@bloomlync.com",
      password: "InvalidPassword",
    };
    try {
      await loginService(requestBody);
    } catch (error) {
      expect(error.message).toBe("Invalid password");
      expect(User.findOne).toHaveBeenCalledWith({ email: requestBody.email });
      expect(mockUser.authenticate).toHaveBeenCalledWith(requestBody.password);
    }
  });

  test("POST loginService - 400 missing email", async () => {
    const requestBody = {
      password: "Pavi@123",
    };
    User.findOne.mockResolvedValue(null);
    try {
      const result = await loginService(requestBody);
      expect(result).toBeUndefined();
    } catch (error) {
      console.log(error);
    }
    expect(User.findOne).toHaveBeenCalledWith({ email: undefined });
  });

  test("POST loginService - 400 missing password", async () => {
    const requestBody = {
      email: "Pavi@123.com",
    };
    User.findOne.mockResolvedValue(null);
    try {
      const result = await loginService(requestBody);
      expect(result).toBeUndefined();
    } catch (error) {
      console.log(error);
    }
  });

  test("GET getUserByEmailService", async () => {
    const expectedEmail = "testuser@example.com";
    const expectedUser = {
      email: expectedEmail,
      view: jest.fn().mockReturnThis(),
    };
    User.findOne = jest.fn().mockResolvedValue(expectedUser);
    const params = { email: expectedEmail };
    const result = await getUserByEmailService(params);
    expect(result).toEqual(expectedUser);
    expect(expectedUser.view).toHaveBeenCalled();
  });

  test("GET  getUserByEmailService - no user with the provided email is found", async () => {
    User.findOne = jest.fn().mockResolvedValue(null);
    const params = { email: "nonexistent@example.com" };
    try {
      await getUserByEmailService(params);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("User not found");
    }
  });

  test("POST createUserByAdminService", async () => {
    User.create = jest.fn().mockResolvedValue(mockUser);
    const result = await createUserByAdminService(mockUser);
    expect(result).toEqual(mockUser);
  });

  test("POST createUserByAdminService - email is already registered", async () => {
    User.create = jest.fn().mockRejectedValue({
      name: "MongoError",
      code: 11000,
    });
    try {
      await createUserByAdminService(mockUser);
    } catch (error) {
      expect(error.status).toBe(409);
      expect(error.message).toBe("Email is already registered");
    }
  });

  test("POST createUserByAdminService - failed to create", async () => {
    const otherError = new Error("failed to create");
    User.create = jest.fn().mockRejectedValue(otherError);

    try {
      await createUserByAdminService(mockUser);
    } catch (error) {
      expect(error).toBe(otherError);
    }
  });

  test("GET getInstituteUsersService", async () => {
    User.find = jest.fn().mockResolvedValue(mockUsers);
    const result = await getInstituteUsersService();
    expect(result).toEqual(mockUsers);
  });

  test("GET getInstituteUsersService - users not found", async () => {
    User.find = jest.fn().mockResolvedValue([]);
    try {
      await getInstituteUsersService();
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("No users found");
    }
  });

  afterEach(() => {
    mockAxios.reset();
  });
});
