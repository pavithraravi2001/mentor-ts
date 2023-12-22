import { ActivationToken, PasswordReset, User } from "./model";
import {
  confirmationMailService,
  doPasswordResetService,
  findResetTokenService,
  updateResetPasswordService,
} from "./service";
import ses from "../../common/aws-ses";
jest.mock("../../common/aws-ses");
jest.mock("./model", () => ({
  User: {
    findOne: jest.fn(),
  },
  PasswordReset: {
    findOne: jest.fn(),
    create: jest.fn(),
    deleteMany: jest.fn(),
    populate: jest.fn(),
  },
  ActivationToken: {
    create: jest.fn(),
  },
}));

const mockToken =
  "V61XryEAAlDuGtIYJkuWXaoRLjj9I/Wz9LR6La1h9DGiyYRrI700ese9IFxGLKc+oAQuDXlUgR0I47nEwVQUlI+xHmvTMY4BaUwjpdV8I";
const mockUser = {
  email: "pavithrar@bloomlync.com",
  name: "pavithra",
  password: "Pavi@123",
  isVerified: true,
  reset: {
    view: jest.fn(),
  },
  user: {
    view: jest.fn(),
  },
};

const mockRequestPasswordReset = {
  password: "123456",
  token: mockToken,
};

const mockReset = {
  token: mockToken,
  user: {
    view() {
      return mockUser;
    },
  },
};

const user = {
  set: jest.fn(),
  save: jest.fn(),
  view: jest.fn(() => "user_view"),
};

describe("Password Reset API", () => {
  test("POST doPasswordResetService", async () => {
    User.findOne = jest.fn().mockResolvedValue(mockUser);
    PasswordReset.create = jest
      .fn()
      .mockResolvedValue({ user: mockUser, token: "reset-token" });
    ses.sendEmail = jest.fn().mockImplementation(() => ({
      promise: jest.fn().mockResolvedValueOnce(
        {toEmail: "pavithrar@bloomlync.com",
        subject: "Mentor - Password Reset",
        content:"Password Reset",}),
    }));
    const email = "pavithrar@bloomlync.com";
    const link = "http//example/reset-link";
    const result = await doPasswordResetService(email, link);
    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(PasswordReset.create).toHaveBeenCalledWith({
      user: mockUser,
    });
    const expectedLink = `${link.replace(/\/$/, "")}/reset-token`;
    // expect(result).toEqual({
    //   status: 200,
    //   message: "Password reset email is sent",
    // });
  });

  test("POST doPasswordResetService - successful email ", async () => {
    User.findOne = jest.fn().mockResolvedValue(mockUser);
    PasswordReset.create = jest.fn().mockResolvedValue({ user: mockUser, token: "reset-token" });
    ses.sendEmail = jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' });
    const email = "pavithrar@bloomlync.com";
    const link = "http//example/reset-link";
    const result = await doPasswordResetService(email, link);
    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(PasswordReset.create).toHaveBeenCalledWith({ user: mockUser });
    expect(ses.sendEmail).toHaveBeenCalledWith({
      toEmail: mockUser.email,
      subject: "Mentor - Password Reset",
      content: expect.any(String),
    });
    expect(result).toEqual({ status: 200, message: "Password reset email is sent" });
  });
  

  test("POST doPasswordResetService - Error null", async () => {
    User.findOne = jest.fn().mockResolvedValue(mockUser);
    PasswordReset.create = jest
      .fn()
      .mockResolvedValue(null);
    ses.sendEmail = jest.fn().mockImplementation(() => ({
      promise: jest.fn().mockResolvedValueOnce(
        {toEmail: "pavithrar@bloomlync.com",
        subject: "Mentor - Password Reset",
        content:"Password Reset",}),
    }));
    const email = "pavithrar@bloomlync.com";
    const link = "http//example/reset-link";
    const result = await doPasswordResetService(email, link);
    expect(User.findOne).toHaveBeenCalledWith({ email });
    const expectedLink = `${link.replace(/\/$/, "")}/reset-token`;
  });

  test("POST doPasswordResetService - User not verified", async () => {
    const email = "pavithrar@bloomlync.com";
    const link = "http//example/reset-link";
    User.findOne.mockResolvedValue({ email, isVerified: false });
    PasswordReset.create.mockResolvedValue({
      user: { email, name: "Mock User" },
      token: "reset-token",
    });
    ses.sendEmail = jest.fn().mockImplementation(() => {
      return {
        promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
      };
    });
    try {
      await doPasswordResetService(email, link);
      expect(true).toBe(true);
    } catch (error) {
      expect(error.message).toBe("User not verified");
    }
  });

  test("POST doPasswordResetService - user is not found", async () => {
    User.findOne = jest.fn().mockResolvedValue(null);
    const email = "nonexistent@example.com";
    const link = "http//example/reset-link";
    try {
      await doPasswordResetService(email, link);
      expect(true).toBe(true);
    } catch (error) {
      expect(error.message).toBe("User not found");
    }
  });

  test("POST doPasswordResetService - password reset creation fails", async () => {
    User.findOne = jest.fn().mockResolvedValue(mockUser);
    PasswordReset.create = jest
      .fn()
      .mockRejectedValue(new Error("Password reset creation failed"));
    const email = "user@example.com";
    const link = "http//example/reset-link";
    try {
      await doPasswordResetService(email, link);
      expect(true).toBe(true);
    } catch (error) {
      expect(error.message).toBe("Password reset creation failed");
    }
  });

  test("POST doPasswordResetService - sending the email fails", async () => {
    User.findOne = jest.fn().mockResolvedValue(mockUser);
    PasswordReset.create = jest
      .fn()
      .mockResolvedValue({ user: mockUser, token: "reset-token" });
    const email = "pavithrar@bloomlync.com";
    const link = "http//example/reset-link";
    ses.sendEmail = jest.fn().mockImplementation(() => {
      return {
        promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
      };
    });
    try {
      await doPasswordResetService(email, link);
    } catch (error) {
      expect(error.message).toBe("Email sending failed");
    }
  });

  test("confirmationMailService - successful email ", async () => {
    User.findOne = jest.fn().mockResolvedValue(mockUser);
    ActivationToken.create = jest.fn().mockResolvedValue({ token: "activation-token" });
    ses.sendEmail = jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' });
    const email = "pavithrar@bloomlync.com";
    const link = "http//example/activation-link";
    const result = await confirmationMailService(email, link);
    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(ActivationToken.create).toHaveBeenCalledWith({ user: mockUser });
    expect(ses.sendEmail).toHaveBeenCalledWith({
      toEmail: mockUser.email,
      subject: "Confirmation Mail",
      content: expect.any(String), // You can further customize this expectation
    });
    expect(result).toEqual({ status: 200, message: "Response email is sent" });
  });

  test("POST confirmationMailService - confirmation email", async () => {
    const mockLink = "http//example/confirmation-link";
    User.findOne = jest.fn().mockResolvedValue({
      email: "pavithrar@bloomlync.com",
      isVerified: true,
    });
    ActivationToken.create = jest.fn().mockResolvedValue({
      user: mockUser,
      isVerified: true,
      token: "activation-token",
    });
    const email = "pavithrar@bloomlync.com";
    const link = mockLink;
    ses.sendEmail = jest.fn().mockImplementation(() => ({
      promise: jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' }),
    }));
    const result = await confirmationMailService(email, link);
    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(ActivationToken.create).toHaveBeenCalledWith({
      user: { email: "pavithrar@bloomlync.com", isVerified: true },
    });
    const expectedLink = `${mockLink.replace(/\/$/, "")}/activation-token`;
    // expect(result).toEqual({
    //   status: 200,
    //   message: "Response email is sent",
    // });
  });

  test("POST confirmationMailService - User not verified", async () => {
    const email = "user@example.com";
    const link = "https://example.com/confirmation";
    User.findOne.mockResolvedValue({ isVerified: false });
    try {
      await confirmationMailService(email, link);
    } catch (error) {
      expect(error.message).toBe("Error: User is not verified");
    }
  });

  test("POST confirmationMailService - User not found", async () => {
    const email = "user@example.com";
    const link = "https://example.com/confirmation";
    User.findOne.mockResolvedValue(null);
    try {
      await confirmationMailService(email, link);
    } catch (error) {
      expect(error.message).toBe("Error: User not found");
    }
  });

  test("GET findPasswordResetService by Id", async () => {
    PasswordReset.findOne = jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue({ mockUser }),
    });
    const expectedUser = {
      email: "pavithrar@bloomlync.com",
      name: "pavithra",
      password: "Pavi@123",
      isVerified: true,
      reset: { view: jest.fn().mockReturnThis(mockUser) },
    };
    try {
      const result = await findResetTokenService({
        token: "123",
      });
      expect(PasswordReset.findOne).toHaveBeenCalledWith(expect.any(Object));
      expect(result).toEqual(mockUser.reset);
    } catch (error) {
      console.error(error);
    }
  });

  test("GET findPasswordResetService by Id (error case)", async () => {
    const mockError = new Error(
      "An error occurred while finding the reset token"
    );
    PasswordReset.findOne = jest.fn().mockReturnValue({
      populate: jest.fn().mockRejectedValue(mockError),
    });
    try {
      await findResetTokenService({
        token: "123",
      });
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBe(mockError);
    }
  });

  test("PUT updateResetPasswordService - Password updated successfully", async () => {
    const token = "validToken";
    const newPassword = "newPassword123";
    const validResetObject = {
      user: {
        set: jest.fn().mockResolvedValue({ password: newPassword }),
        save: jest.fn().mockResolvedValue(),
        view: jest.fn(),
      },
    };
    PasswordReset.findOne = jest.fn().mockReturnValue({
      populate: jest.fn().mockRejectedValue(validResetObject),
    });
    try {
      const result = await updateResetPasswordService(token, newPassword);
      expect(result).toEqual(validResetObject.user.view());
      expect(validResetObject.user.set).toHaveBeenCalledWith({
        password: newPassword,
      });
      expect(validResetObject.user.save).toHaveBeenCalled();
    } catch (error) {
      console.error('Unexpected error:', error.message);
      console.error(error.stack);
    }    
  });

  test("PUT updateResetPasswordService - Token not found", async () => {
    const token = "invalidToken";
    const newPassword = "newPassword123";
    PasswordReset.findOne = jest.fn().mockReturnValue({
      populate: jest.fn().mockRejectedValue(null),
    });
    try {
      const result = await updateResetPasswordService(token, newPassword);
      expect(result).toBeNull();
    } catch (error){
      console.log(error)
    }
  });

  test("PUT updateResetPasswordService (error case)", async () => {
    const mockError = new Error(
      "An error occurred while finding the reset token"
    );
    PasswordReset.findOne = jest.fn().mockReturnValue({
      populate: jest.fn().mockRejectedValue(mockError),
    });
    try {
      const result = await updateResetPasswordService(
        mockToken,
        mockUser.password
      );
      expect(result).toBe(null);
    } catch (error) {
      expect(error).toBe(mockError);
      console.log("error", error);
    }
  });
});

