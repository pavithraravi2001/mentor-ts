import { middleware as body } from "bodymen";
import { Router } from "express";
import { ui } from "../../config";
import {
  confirmationMail,
  createUser,
  createUserByAdmin,
  doPasswordReset,
  findResetToken,
  getInstituteUsers,
  getUserByEmail,
  login,
  recaptchaVerification,
  resendVerifyEmail,
  updateResetPassword,
  verifyEmail,
} from "./controller";
import { schema } from "./model";

const router = new Router();
const { email, password, name, profileURL, roleId, captcha } = schema.tree;
// const { token } = activationTokenSchemaDef.tree

/**
 * @api {post} /users Create user
 */
router.post(
  "/",
  body({
    activationLink: {
      type: String,
      required: false,
      default: ui.baseURL + ui.activationPath,
    },
    email,
    password,
    name,
    profileURL,
    roleId,
    captcha,
  }),
  createUser
);

router.post("/recaptcha", recaptchaVerification);

/**
 * @api {post} /users/email-verifications - Resend verify email
 */
router.post(
  "/email-verifications",
  body({
    activationLink: {
      type: String,
      required: false,
      default: ui.baseURL + ui.activationPath,
    },
    email,
  }),
  resendVerifyEmail
);

/**
 * @api {put} /users/email-verifications Activate user
 */
router.put("/email-verifications/:token", verifyEmail);

/**
 * @api {get} /users/email-verifications Activate user
 */
router.get("/email-verifications/:token", verifyEmail);

router.get("/", (req, res) => {
  res.status(200).send("<h1> Welcome to mentor User API </h1>");
});

/**
 * @api {get} /users/login logging in user
 */
router.post("/login", body({ email, password }), login);

/**
 * @api {get} /users/:id Retrieve user
 */
router.get("/:email", getUserByEmail);

/**
 * @api {post} /users/password-resets Send email
 */
router.post(
  "/password-resets",
  body({
    email,
    link: {
      type: String,
      required: false,
      default: ui.baseURL + ui.resetPassword,
    },
  }),
  doPasswordReset
);

/**
 * @api {post} /users/confirmation-mail Send response email
 */
router.post(
  "/confirmation-mail",
  body({
    email,
    link: {
      type: String,
      required: false,
      default: ui.baseURL + ui.responseMail,
    },
  }),
  confirmationMail
);

/**
 * @api {get} /password-resets/:token find token
 */
router.get("/password-resets/:token", findResetToken);

/**
 * @api {put} /password-resets/:token Submit password
 */
router.put("/password-resets/:token", body({ password }), updateResetPassword);

/**
 * @api {post} /users/user-create-by-admin Create user by admin
 */
router.post(
  "/user-create-by-admin",
  body({
    activationLink: {
      type: String,
      required: false,
      default: ui.baseURL + ui.activationPath,
    },
    email,
    password,
    name,
    profileURL,
    roleId,
  }),
  createUserByAdmin
);

/**
 * @api {get}/list get Users
 */

router.get("/all/users", getInstituteUsers);

//router.post("/recaptcha", reCaptchaVerification);

export default router;
