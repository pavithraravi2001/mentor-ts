import { middleware as body } from "bodymen";
import { Router } from "express";
import {
  createCatalogue,
  deleteCatalogueByGroupName,
  getBranchesByGroupName,
  updateCatalogue,
} from "./controller";
import { schema } from "./model";
export Catalogue, { schema } from "./model";

const router = new Router();
const {
  _id,
  groupName,
  instituteName,
  branch,
  board,
  addressLine1,
  addressLine2,
  addressLine3,
} = schema.tree;

/**
 * @api {post} /metadatacontents Create metadataContent
 */
router.post(
  "/",
  body({
    groupName,
    instituteName,
    branch,
    board,
    addressLine1,
    addressLine2,
    addressLine3,
  }),
  createCatalogue
);

/**
 * @api {get} /metadatacontents/:contentKey Retrieve metadataContent
 */
router.get("/:groupName", getBranchesByGroupName);

/**
 * @api {get} /metadatacontents Update metadataContent
 */
router.put(
  "/:id",
  body({
    _id,
    groupName,
    instituteName,
    branch,
    board,
    addressLine1,
    addressLine2,
    addressLine3,
  }),
  updateCatalogue
);

/**
 * @api {get} /metadatacontents/:contentKey Delete metadataContent
 */
router.delete("/:groupName", deleteCatalogueByGroupName);

export default router;
