"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = exports.fillTemplate = exports.authorOrAdmin = exports.isNotVerifiedUserError = exports.unAuthorizedError = exports.notFoundError = exports.notFound = exports.redirect = exports.successRender = exports.success = void 0;
const success = (res, status) => (entity) => {
    if (entity) {
        res.status(status || 200).json(entity);
    }
    return null;
};
exports.success = success;
const successRender = (res) => (entity) => {
    console.log("AT render : - ", entity);
    if (entity) {
        res.send(entity);
    }
    return null;
};
exports.successRender = successRender;
const redirect = (res, status) => (path) => {
    if (path) {
        return res.redirect(status || 301, path);
    }
    return res.redirect("/");
};
exports.redirect = redirect;
const notFound = (res) => (entity) => {
    if (entity) {
        return entity;
    }
    res.status(404).end();
    return null;
};
exports.notFound = notFound;
const notFoundError = (reject) => (entity) => {
    if (entity) {
        return entity;
    }
    return reject({
        status: 404,
        message: "not found",
    });
};
exports.notFoundError = notFoundError;
const unAuthorizedError = (reject, msg) => {
    reject({
        status: 401,
        message: msg || "Your account has not been verified.",
    });
    return null;
};
exports.unAuthorizedError = unAuthorizedError;
const isNotVerifiedUserError = (reject, msg) => (entity) => {
    console.log(entity);
    if (entity && entity.isVerified) {
        return entity;
    }
    reject({
        status: 401,
        message: msg || "Your account has not been verified.",
    });
    return null;
};
exports.isNotVerifiedUserError = isNotVerifiedUserError;
const authorOrAdmin = (res, user, userField) => (entity) => {
    if (entity) {
        const isAdmin = user.role === "admin";
        const isAuthor = entity[userField] && entity[userField].equals(user.id);
        if (isAuthor || isAdmin) {
            return entity;
        }
        res.status(401).end();
    }
    return null;
};
exports.authorOrAdmin = authorOrAdmin;
const fillTemplate = (templateString, templateVariables) => templateString.replace(/\${(.*?)}/g, (_, g) => templateVariables[g]);
exports.fillTemplate = fillTemplate;
const sendErrorResponse = (res, code, errorMessage, e = null) => res.status(code).send({
    status: "error",
    error: errorMessage,
    e: e === null || e === void 0 ? void 0 : e.toString(),
});
exports.sendErrorResponse = sendErrorResponse;
