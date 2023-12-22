import { sendErrorResponse } from "../common/response";
import { getRolesByUserIdService } from "./role-management/service";

export default (permission, field = "edit") =>
  async (req, res, next) => {
    if (!permission || permission === "undefined" || permission.length === 0) {
      return sendErrorResponse(
        res,
        403,
        "You do not have the authorization to access this"
      );
    }
    const access = await getRolesByUserIdService({
      userId: req.userId,
      ...req.body,
    });
    const roles = permission;
    console.log(
      JSON.stringify(
        access.filter((f) =>
          f.roles.some(
            (o) => roles.includes(o.featureCode) && field && (o.all || o[field])
          )
        ).length > 0
      )
    );
    if (
      access.filter((f) =>
        f.roles.some(
          (o) => roles.includes(o.featureCode) && field && (o.all || o[field])
        )
      ).length > 0
    ) {
      return next();
    }
    return sendErrorResponse(
      res,
      403,
      "You do not have the authorization to access this"
    );
  };
