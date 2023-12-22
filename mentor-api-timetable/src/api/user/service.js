import qs from "qs";
import ses from "../../common/aws-ses";
import { sign } from "../../common/jwt";
import {
  notFoundError,
  unAuthorizedError
} from "../../common/response";
import { ActivationToken, PasswordReset, User } from "./model";
const axios = require("axios");

export const loginService = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });

    if (!user) {
      throw new Error('User not found');
    }

    const authenticatedUser = await user.authenticate(body.password, user.password);

    if (!authenticatedUser) {
      throw new Error('Please enter correct password');
    }

    if (!user.isVerified) {
      throw new Error("Your account has not been verified.");
    }

    const token = await sign(user.id);
    const result = { token, user: user.view() };

    return result;
  } catch (error) {
    return { error: error.message };
  }
};

export const recaptchaVerificationService = async (captcha) => {
  if (!captcha) {
    const error = new Error();
    error.status = 400;
    error.message = "Recaptcha token not found";
    throw error;
  }
  const secretKey = "6Ldhc8UnAAAAAPuypW3ibo_v2nwfNNcl--w7Y9xB";
  const verificationData = {
    secret: secretKey,
    response: captcha,
  };
  try {
    const formData = qs.stringify(verificationData);
    const verificationUrl = "https://www.google.com/recaptcha/api/siteverify";
    const response = await axios.post(verificationUrl, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    if (response?.data?.success) {
      return response?.data;
    } else {
      const error = new Error();
      error.status = 400;
      error.message = "reCAPTCHA verification failed";
      throw error;
    }
  } catch (error) {
    return {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getUserByEmailService = (params) => {
  return new Promise((resolve, reject) => {
    return User.findOne({ email: params.email })
      .then(notFoundError(reject))
      .then((user) => (user ? user.view() : null))
      .then(resolve)
      .catch(reject);
  });
};

export const createUserService = async (body, link) => {
  const { captcha } = body;
  await recaptchaVerificationService(captcha);
  try {
    const user = await User.create(body);
    if (!user) {
      const error = new Error();
      error.status = 400;
      error.message = 'Error while creating user';
      throw error;
    }

    const activationToken = await ActivationToken.create({ user });
    console.log(activationToken, "activationToken");
    if (!activationToken) {
      const error = new Error();
      error.status = 400;
      error.message = 'Error while creating activation token';
      throw error;
    }
    const { user: createdUser, token } = activationToken;
    console.log(createdUser, "createdUser")
    link = `${link.replace(/\/$/, '')}/${token}`;
    const content = `
        Dear, ${user.name}.<br><br>
        Welcome to our platform! We are thrilled to have you and we want to ensure that your account is fully activated so you can begin your journey with us. To get started, please click on the “Activate Account” button to activate your email account. 
       <br><br>
       <a href="${link}" style="display: inline-block; background-color: #72bf44; color: white; padding: 10px 20px; border: none; border-radius: 5px; text-decoration: none; text-align: center; font-size: 16px;">Activate Account</a>
       <br><br>
        If you did not request for a password reset, then please ignore this email. The password reset is valid only for 60mins.
        <br><br>
        Thank you for choosing our platform. We look forward to providing you with a seamless and enjoyable experience. 
        <br><br>
        <br><br>
        Best Regards, <br><br>
        &mdash; Mentor Team
      `;

    const response = await ses.sendEmail({ toEmail: createdUser.email, subject: 'Mentor - Account Activation', content });

    if (response && response.MessageId) {
      return { status: 201, message: 'A verification email has been sent to the given email. Please verify it.' };
    } else {
      return null
    }

  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      const error = new Error();
      error.status = 409;
      error.message = 'Email is already registered';
      throw error;
    } else {
      return {
        status: err.status || 500,
        message: err.message || "Internal Server Error",
      };
    }
  }
};

export const createUserByAdminService = (body) => {
  return new Promise((resolve, reject) => {
    return User.create(body)
      .then(resolve)
      .catch((err) => {
        if (err.name === "MongoError" && err.code === 11000) {
          const error = new Error();
          error.status = 409;
          error.message = "Email is already registered";
          reject(error);
        } else {
          reject(err);
        }
      });
  });
};

export const resendVerifyEmailService = async (email, link) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error();
      error.status = 404;
      error.message = "User not found";
      throw error;
    }

    if (user.isVerified) {
      const error = new Error();
      error.status = 400;
      error.message = "This email has already been verified. Please log in.";
      throw error;
    }

    const activationToken = await ActivationToken.create({ user });
    const { token } = activationToken;
    link = `${link.replace(/\/$/, "")}/${token}`;

    const content = `
      Dear, ${user.name}.<br><br>
      Welcome to our platform! We are thrilled to have you, and we want to ensure that your account is fully activated so you can begin your journey with us. To get started, please click on the “Activate Account” button to activate your email account. 
      <br><br>
      <a href="${link}" style="display: inline-block; background-color: #72bf44; color: white; padding: 10px 20px; border: none; border-radius: 5px; text-decoration: none; text-align: center; font-size: 16px;">Activate Account</a>
      <br><br>
      If you did not request a password reset, please ignore this email. The password reset is valid only for 60 minutes.
      <br><br>
      Thank you for choosing our platform. We look forward to providing you with a seamless and enjoyable experience. 
      <br><br>
      Best Regards, <br><br>
      &mdash; Mentor Team
    `;

    const response = await ses.sendEmail({
      toEmail: user.email,
      subject: "Mentor - Resent Account Activation Link",
      content,
    });

    if (response && response.MessageId) {
      return {
        status: 201,
        message: "A verification email has been resent to the given email.",
      };
    } else {
      const error = new Error();
      error.status = 500;
      error.message = "Failed to send email";
      throw error;
    }
  } catch (error) {
    return {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const verifyEmailService = (token) => {
  return new Promise((resolve, reject) => {
    return ActivationToken.findOne({ token })
      .populate("user")
      .then(notFoundError(reject))
      .then((activationToken) => {
        if (!activationToken) return null;
        const { user } = activationToken;
        return user
          .set({ isVerified: true })
          .save()
          .then(() => ActivationToken.deleteMany({ user }))
          .then(() => resolve({ verified: true }));
      })
      .then(resolve)
      .catch(reject);
  });
};

export const confirmationMailService = async (email, link) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isVerified) {
      throw new Error("User is not verified");
    }

    const activationToken = await ActivationToken.create({ user });
    const { token } = activationToken;
    link = `${link.replace(/\/$/, "")}/${token}`;

    const content = `
      Dear, ${user.name}.<br><br>
      You request has been approved.<br>
      <a href="${link}">${link}</a>
    `;

    const response = await ses.sendEmail({
      toEmail: user.email,
      subject: "Confirmation Mail",
      content,
    });

    if (response && response.MessageId) {
      return { status: 200, message: "Response email is sent" };
    } else {
      return null;
    }
  } catch (error) {
    return {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const doPasswordResetService = (email, link) => {
  return new Promise(async (resolve, reject) => {
    console.log('Starting password reset process...');

    try {
      const user = await User.findOne({ email });

      if (!user) {
        console.log('User not found');
        reject(new Error('User not found'));
        return;
      }

      if (!user.isVerified) {
        console.log('User not verified');
        reject(new Error('User not verified'));
        return;
      }

      console.log('User found and verified:', user);

      const reset = await PasswordReset.create({ user });

      if (!reset) {
        console.log('Password reset not initiated');
        resolve(null);
        return;
      }

      console.log('Password reset initiated:', reset);

      const { user: resetUser, token } = reset;
      link = `${link.replace(/\/$/, '')}/${token}`;
      const content = `
        Hey, ${resetUser.name}.<br><br>
        You requested a new password for your Mentor Api account.<br>
        Please use the following link to set a new password. It will expire in 1 hour.<br><br>
        <a href="${link}">${link}</a><br><br>
        If you didn't make this request then you can safely ignore this email. :)<br><br>
        &mdash; Mentor Api Team
      `;

      const response = await ses.sendEmail({ toEmail: email, subject: 'Mentor - Password Reset', content });

      if (response && response.MessageId) {
        console.log('Password reset email is sent');
        resolve({ status: 200, message: 'Password reset email is sent' });
      } else {
        console.log('Email not sent or MessageId not available in the response:', response);
        resolve(null);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      reject(error);
    }
  });
};

export const findResetTokenService = (token) => {
  return new Promise((resolve, reject) => {
    PasswordReset.findOne({ token })
      .populate("user")
      .then(notFoundError(reject))
      .then((reset) => (reset ? reset?.view() : null))
      .then(resolve)
      .catch(reject);
  });
};

export const updateResetPasswordService = (token, password) => {
  return new Promise((resolve, reject) => {
    return PasswordReset.findOne({ token })
      .populate("user")
      .then(notFoundError(reject))
      .then((reset) => {
        if (!reset) return null;
        const { user } = reset;
        return user
          .set({ password })
          .save()
          .then(() => PasswordReset.deleteMany({ user }))
          .then(() => user.view());
      })
      .then(resolve)
      .catch(reject);
  });
};

export const getInstituteUsersService = async () => {
  return new Promise((resolve, reject) => {
    return User.find().then(notFoundError(reject)).then(resolve).catch(reject);
  });
};
