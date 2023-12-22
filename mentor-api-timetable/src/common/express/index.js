"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const bodymen_1 = require("bodymen");
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_force_ssl_1 = __importDefault(require("express-force-ssl"));
const morgan_1 = __importDefault(require("morgan"));
const querymen_1 = require("querymen");
const jwt_1 = require("../../common/jwt");
const config_1 = require("../../config");
var path = require("path");
exports.default = (apiRoot, routes) => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.static(path.join(__dirname, "public")));
    app.set("view engine", "ejs");
    app.get("/", (req, res) => {
        res.render("index.ejs");
    });
    /* istanbul ignore next */
    if (config_1.env === "production") {
        app.set("forceSSLOptions", {
            enable301Redirects: false,
            trustXFPHeader: true,
        });
        app.use(express_force_ssl_1.default);
    }
    app.use((0, cors_1.default)());
    app.options("*", (0, cors_1.default)());
    app.use((0, compression_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(body_parser_1.default.json());
    app.use(function useExtraction(req, res, next) {
        const authCode = req.get("Authorization");
        console.log("Time: ", Date.now(), authCode);
        if (authCode) {
            (0, jwt_1.verify)(authCode)
                .then((payload) => {
                req.userId = payload.id;
                if (req.body && !req.body.userId) {
                    req.body.userId = payload.id;
                }
                return null;
            })
                .then(next)
                .catch(next);
        }
        else {
            next();
        }
    });
    app.use(apiRoot, routes);
    app.use((0, querymen_1.errorHandler)());
    app.use((0, bodymen_1.errorHandler)());
    return app;
};
