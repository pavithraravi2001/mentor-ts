/* eslint-disable no-unused-vars */
import merge from "lodash/merge";
import path from "path";

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error("You must set the " + name + " environment variable");
  }
  return process.env[name];
};

const dotenv = require("dotenv-safe");
dotenv.config({
  path: path.join(__dirname, "../.env"),
  example: path.join(__dirname, "../.env.example"),
});

const config = {
  all: {
    env: process.env.NODE_ENV || "development",
    root: path.join(__dirname, ".."),
    port: process.env.PORT || 9200,
    ip: process.env.IP || "0.0.0.0",
    apiRoot: process.env.API_ROOT || "",
    defaultEmail: "tamilselvanvjm@gmail.com",
    sendgridKey: requireProcessEnv("SENDGRID_KEY"),
    awsSESRegion: requireProcessEnv("AWS_SES_REGION"),
    sesAccessKeyId: requireProcessEnv("AWS_SES_ACCESS_KEY_ID"),
    sesSecretAccessKey: requireProcessEnv("AWS_SES_SECRET_ACCESS_KEY"),
    awsS3Region: requireProcessEnv("AWS_S3_REGION"),
    s3AccessKeyId: requireProcessEnv("AWS_S3_ACCESS_KEY_ID"),
    s3SecretAccessKey: requireProcessEnv("AWS_S3_SECRET_ACCESS_KEY"),
    sesDefaultFromEmail: "admin@mentorerp.com",
    jwtSecret: requireProcessEnv("JWT_SECRET"),
    mongo: {
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    },
  },
  test: {
    mongo: {
      uri: process.env.DB_URI,
      options: {
        debug: true,
      },
    },
    paytmConfig: {
      callbackURLPath:
        //"http://dev.mentorerp.com:9200/payment-integrations/application-payment/callback",
        "http://localhost:9200/payment-integrations/application-payment/callback",
    },
    ui: {
      baseURL: process.env.UI_BASE_URL || "http://localhost:4201",
      activationPath: "/activate",
      resetPassword: "/reset-password",
      confirmationMail: "/confirmation-mail",
      applicationConfirmation: "/onboard/confirmation",
      employeeUpdateProfile: "/employee/updateprofile",
    },
    //SWAGGER_API_HOST: 'http://dev.mentorerp.com:9200'
    SWAGGER_API_HOST: "localhost:9200",
  },
  development: {
    mongo: {
      uri: "mongodb+srv://mentorerp-test:hEGQ61h81LcNJLW9@mentorerp.0uaij.mongodb.net/test?authSource=admin&replicaSet=atlas-u0i3cv-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true",
      options: {
        debug: true,
      },
    },
    paytmConfig: {
      // TODO: Need to update later
      callbackURLPath:
        "http://localhost:9200/payment-integrations/application-payment/callback",
    },
    ui: {
      baseURL: "http://localhost:4201",
      activationPath: "/activate",
      resetPassword: "/reset-password",
      confirmationMail: "/confirmation-mail",
      applicationConfirmation: "/onboard/confirmation",
      employeeUpdateProfile: "/employee/updateprofile",
    },
    // SWAGGER_API_HOST: 'http://dev.mentorerp.com:9200'
    SWAGGER_API_HOST: "localhost:9200",
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || "mongodb://localhost/mentor-api",
    },
    paytmConfig: {
      callbackURLPath:
        "http://localhost:9200/payment-integrations/application-payment/callback",
    },
  },
};
//export const SWAGGER_API_HOST = "http://localhost:9200";
module.exports = merge(config.all, config[config.all.env]);
export default module.exports;
