import { Router } from "express";
import {
  deleteInstituteRole,
  deleteUserRole,
  getInstituteFeature,
  getInstituteRoles,
  getRolesByUserId,
  getUsersByRoleId,
  updateInstituteFeature,
  updateInstituteRoles,
  updateUserRole,
} from "./controller";
const { body } = require("express-validator");
const router = new Router();

/**
 * @api {get} /roles/:instituteId/roles Retrieve Institute roles
 */
router.get("/:instituteId", getInstituteRoles);

/**
 * @api {put} /roles/:instituteId/roles Update Institute role
 */
router.put(
  "/:instituteId",
  body("feature")
    .exists()
    .notEmpty()
    .withMessage("Feature is required in the body"),
  updateInstituteRoles
);

/**
 * @api {delete} /roles/:id Delete Institute Role
 */
router.delete("/:id", deleteInstituteRole);

/**
 * @api {put} /roles/:instituteId/user-role Update Institute role
 */
router.put(
  "/:instituteId/user-role",
  body("roleId")
    .exists()
    .notEmpty()
    .withMessage("Role is required in the body"),
  updateUserRole
);

/**
 * @api {delete} /roles/:id delete user role
 */
router.delete("/:roleId/:userId", deleteUserRole);

/**
 * @api {get}/user-by-role-id /:roleId Retrieve User by role Id
 */
router.get("/user-by-role-id/:roleId", getUsersByRoleId);

/**
 * @api {get}/role-by-user-id /:userId Retrieve roles by user Id
 */
router.get("/role-by-user-id/:userId", getRolesByUserId);

/**
 * @api {get} /roles/:instituteId/features Retrieve Institute roles
 */
// canAccess(Constants.FEATURE_VIEW_ALL_USERS),
router.get("/:instituteId/features", getInstituteFeature);

/**
 * @api {put} /roles/:instituteId/roles Update Institute role
 */
router.put(
  "/:instituteId/features",
  body("feature")
    .exists()
    .notEmpty()
    .withMessage("Feature is required in the body"),
  updateInstituteFeature
);

export default router;
