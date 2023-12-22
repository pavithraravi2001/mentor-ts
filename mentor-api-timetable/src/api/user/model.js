"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.activationTokenSchemaDef = exports.ActivationToken = exports.PasswordReset = exports.User = exports.schema = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const mongoose_1 = __importStar(require("mongoose"));
const rand_token_1 = require("rand-token");
const config_1 = require("../../config");
const userSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
//--to create profile URL & name--
userSchema.path("email").set(function (email) {
    if (!this.profileURL ||
        this.profileURL.indexOf("https://gravatar.com") === 0) {
        const hash = crypto_1.default.createHash("md5").update(email).digest("hex");
        this.profileURL = `https://gravatar.com/avatar/${hash}?d=identicon`;
    }
    if (!this.name) {
        this.name = email.replace(/^(.+)@.+$/, "$1");
    }
    return email;
});
//--password dcrypt--
userSchema.pre("save", function (next) {
    if (!this.isModified("password"))
        return next();
    /* istanbul ignore next */
    const rounds = config_1.env === "development" ? 1 : 9;
    bcrypt_1.default
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
    authenticate: function (password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const valid = yield bcrypt_1.default.compare(password, this.password);
                return valid ? this : false;
            }
            catch (error) {
                throw error;
            }
        });
    },
};
const model = mongoose_1.default.model("User", userSchema);
exports.schema = model.schema;
exports.User = mongoose_1.default.model("User", userSchema);
const passwordResetSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        // index: true,
    },
    token: {
        type: String,
        unique: true,
        index: true,
        default: () => (0, rand_token_1.uid)(64),
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
exports.PasswordReset = mongoose_1.default.model("PasswordReset", passwordResetSchema);
const activationTokenSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.ObjectId,
        ref: "User",
        index: true,
    },
    token: {
        type: String,
        unique: true,
        index: true,
        default: () => (0, rand_token_1.uid)(64),
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
exports.ActivationToken = mongoose_1.default.model("ActivationToken", activationTokenSchema);
exports.activationTokenSchemaDef = exports.ActivationToken.schema;
