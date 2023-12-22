import bcrypt from "bcrypt";
import crypto from "crypto";
import mongoose, { Schema } from "mongoose";
import { uid } from "rand-token";
import { env } from "../../config";

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      sparse: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      index: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profileURL: {
      type: String,
      trim: true,
    },
    roleId: {
      type: String,
    },
    captcha: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//--to create profile URL & name--
userSchema.path("email").set(function (email) {
  if (
    !this.profileURL ||
    this.profileURL.indexOf("https://gravatar.com") === 0
  ) {
    const hash = crypto.createHash("md5").update(email).digest("hex");
    this.profileURL = `https://gravatar.com/avatar/${hash}?d=identicon`;
  }

  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, "$1");
  }

  return email;
});

//--password dcrypt--
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  /* istanbul ignore next */
  const rounds = env === "development" ? 1 : 9;

  bcrypt
    .hash(this.password, rounds)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch(next);
});

// userSchema.pre('updateOne', function (next) {
//   const password = this.getUpdate().$set.password
//   if (!password) return next()

//   /* istanbul ignore next */
//   const rounds = env === 'development' ? 1 : 9

//   bcrypt.hash(password, rounds).then((hash) => {
//     this.getUpdate().$set.password = hash
//     next()
//   }).catch(next)
// })
userSchema.methods = {
  view() {
    const view = {};
    const fields = ["id", "name", "profileURL", "email", "roleId"];
    fields.forEach((field) => {
      view[field] = this[field];
    });
    return view;
  },

  authenticate: async function (password) {
    try {
      const valid = await bcrypt.compare(password, this.password);
      return valid ? this : false;
    } catch (error) {
      throw error;
    }
  },
};

const model = mongoose.model("User", userSchema);

export const schema = model.schema;
export const User = mongoose.model("User", userSchema);

const passwordResetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // index: true,
  },
  token: {
    type: String,
    unique: true,
    index: true,
    default: () => uid(64),
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

passwordResetSchema.methods = {
  view() {
    return {
      user: this.user.view(),
      token: this.token,
    };
  },
};

export const PasswordReset = mongoose.model(
  "PasswordReset",
  passwordResetSchema
);

const activationTokenSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    index: true,
  },
  token: {
    type: String,
    unique: true,
    index: true,
    default: () => uid(64),
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

activationTokenSchema.methods = {
  view() {
    return {
      user: this.user.view(),
      token: this.token,
    };
  },
};

export const ActivationToken = mongoose.model(
  "ActivationToken",
  activationTokenSchema
);

export const activationTokenSchemaDef = ActivationToken.schema;
