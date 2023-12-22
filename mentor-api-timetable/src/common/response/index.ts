export const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || 200).json(entity);
  }
  return null;
};

export const successRender = (res) => (entity) => {
  console.log("AT render : - ", entity);
  if (entity) {
    res.send(entity);
  }
  return null;
};

export const redirect = (res, status) => (path) => {
  if (path) {
    return res.redirect(status || 301, path);
  }
  return res.redirect("/");
};

export const notFound = (res) => (entity) => {
  if (entity) {
    return entity;
  }
  res.status(404).end();
  return null;
};

export const notFoundError = (reject) => (entity) => {
  if (entity) {
    return entity;
  }
  return reject({
    status: 404,
    message: "not found",
  });
};

export const unAuthorizedError = (reject, msg) => {
  reject({
    status: 401,
    message: msg || "Your account has not been verified.",
  });
  return null;
};

export const isNotVerifiedUserError = (reject, msg) => (entity) => {
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

export const authorOrAdmin = (res, user, userField) => (entity) => {
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

export const fillTemplate = (templateString, templateVariables) =>
  templateString.replace(/\${(.*?)}/g, (_, g) => templateVariables[g]);

export const sendErrorResponse = (res, code, errorMessage, e = null) =>
  res.status(code).send({
    status: "error",
    error: errorMessage,
    e: e?.toString(),
  });
