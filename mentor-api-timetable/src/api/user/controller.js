import { success } from "../../common/response/";
import {
  confirmationMailService,
  createUserByAdminService,
  createUserService,
  doPasswordResetService,
  findResetTokenService,
  getInstituteUsersService,
  getUserByEmailService,
  loginService,
  recaptchaVerificationService,
  resendVerifyEmailService,
  updateResetPasswordService,
  verifyEmailService,
} from "./service";
const axios = require("axios");

export const login = ({ bodymen: { body } }, res) => {
  loginService(body)
    .then(success(res, 201))
    .catch((err) => res.status(err.status || 400).json(err));
};

export const getUserByEmail = ({ params }, res) => {
  getUserByEmailService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const createUser = ({ bodymen: { body } }, res) => {
  const { activationLink, ...user } = body;
  createUserService(user, activationLink)
    .then(success(res, 201))
    .catch((err) => {
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const createUserByAdmin = ({ bodymen: { body } }, res) => {
  const { activationLink, ...user } = body;
  createUserByAdminService(user, activationLink)
    .then(success(res, 201))
    .catch((err) => {
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const resendVerifyEmail = ({ bodymen: { body } }, res) => {
  const { activationLink, email } = body;
  resendVerifyEmailService(email, activationLink)
    .then(success(res, 201))
    .catch((err) => {
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const verifyEmail = ({ params: { token } }, res, next) => {
  return verifyEmailService(token)
    .then(success(res))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const recaptchaVerification = ({ body }, res) => {
  recaptchaVerificationService(body)
    .then((recaptchaResponse) => {
      res.json({ message: "reCAPTCHA verification successful" });
    })
    .catch((error) => {
      if (error.status) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    });
};

export const doPasswordReset = async (
  {
    bodymen: {
      body: { email, link },
    },
  },
  res
) => {
  return doPasswordResetService(email, link)
    .then(() => {
      success(res);
    })
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const confirmationMail = (
  {
    bodymen: {
      body: { email, link },
    },
  },
  res
) => {
  return confirmationMailService(email, link)
    .then(success(res))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const findResetToken = ({ params: { token } }, res) => {
  return findResetTokenService(token)
    .then(success(res))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateResetPassword = (
  {
    params: { token },
    bodymen: {
      body: { password },
    },
  },
  res,
  next
) => {
  return updateResetPasswordService(token, password)
    .then(success(res))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getInstituteUsers = ({ params }, res) => {
  getInstituteUsersService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
