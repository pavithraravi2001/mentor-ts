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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenAuth = exports.password = void 0;
const bodymen_1 = require("bodymen");
const passport_1 = __importDefault(require("passport"));
const passport_http_1 = require("passport-http");
const passport_jwt_1 = require("passport-jwt");
const model_1 = __importStar(require("../../api/user/model"));
const config_1 = require("../../config");
const password = () => (req, res, next) => passport_1.default.authenticate("password", { session: false }, (err, user, info) => {
    if (err && err.param) {
        return res.status(400).json(err);
    }
    else if (err || !user) {
        return res.status(401).end();
    }
    req.logIn(user, { session: false }, (err) => {
        if (err)
            return res.status(401).end();
        next();
    });
})(req, res, next);
exports.password = password;
const tokenAuth = ({ required, roles = model_1.default.roles } = {}) => (req, res, next) => {
    passport_1.default.authenticate("token", { session: false }, (err, user, info) => {
        if (err ||
            (required && !user) ||
            (required && !~roles.indexOf(user.role))) {
            return res.status(401).end();
        }
        req.logIn(user, { session: false }, (err) => {
            if (err)
                return res.status(401).end();
            next();
        });
    })(req, res, next);
};
exports.tokenAuth = tokenAuth;
passport_1.default.use("password", new passport_http_1.BasicStrategy((email, password, done) => {
    const userSchema = new bodymen_1.Schema({
        email: model_1.schema.tree.email,
        password: model_1.schema.tree.password,
    });
    userSchema.validate({ email, password }, (err) => {
        if (err)
            done(err);
    });
    model_1.default.findOne({ email }).then((user) => {
        if (!user) {
            done(true);
            return null;
        }
        return user
            .authenticate(password, user.password)
            .then((user) => {
            done(null, user);
            return null;
        })
            .catch(done);
    });
}));
passport_1.default.use("token", new passport_jwt_1.Strategy({
    secretOrKey: config_1.jwtSecret,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
        passport_jwt_1.ExtractJwt.fromUrlQueryParameter("access_token"),
        passport_jwt_1.ExtractJwt.fromBodyField("access_token"),
        passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
    ]),
}, ({ id }, done) => {
    model_1.default.findById(id)
        .then((user) => {
        done(null, user);
        return null;
    })
        .catch(done);
}));
