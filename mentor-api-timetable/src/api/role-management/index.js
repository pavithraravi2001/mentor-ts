"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const { body } = require("express-validator");
const router = new express_1.Router();
/**
 * @api {get} /roles/:instituteId/roles Retrieve Institute roles
 */
router.get("/:instituteId", controller_1.getInstituteRoles);
/**
 * @api {put} /roles/:instituteId/roles Update Institute role
 */
router.put("/:instituteId", body("feature")
    .exists()
    .notEmpty()
    .withMessage("Feature is required in the body"), controller_1.updateInstituteRoles);
/**
 * @api {delete} /roles/:id Delete Institute Role
 */
router.delete("/:id", controller_1.deleteInstituteRole);
/**
 * @api {put} /roles/:instituteId/user-role Update Institute role
 */
router.put("/:instituteId/user-role", body("roleId")
    .exists()
    .notEmpty()
    .withMessage("Role is required in the body"), controller_1.updateUserRole);
/**
 * @api {delete} /roles/:id delete user role
 */
router.delete("/:roleId/:userId", controller_1.deleteUserRole);
/**
 * @api {get}/user-by-role-id /:roleId Retrieve User by role Id
 */
router.get("/user-by-role-id/:roleId", controller_1.getUsersByRoleId);
/**
 * @api {get}/role-by-user-id /:userId Retrieve roles by user Id
 */
router.get("/role-by-user-id/:userId", controller_1.getRolesByUserId);
/**
 * @api {get} /roles/:instituteId/features Retrieve Institute roles
 */
// canAccess(Constants.FEATURE_VIEW_ALL_USERS),
router.get("/:instituteId/features", controller_1.getInstituteFeature);
/**
 * @api {put} /roles/:instituteId/roles Update Institute role
 */
router.put("/:instituteId/features", body("feature")
    .exists()
    .notEmpty()
    .withMessage("Feature is required in the body"), controller_1.updateInstituteFeature);
exports.default = router;
