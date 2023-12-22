import { success } from "../../common/response";
import {
  createCatalogueService,
  deleteCatalogueService,
  getBranchesByGroupNameService,
  updateCatalogueService,
} from "./service";

export const createCatalogue = ({ bodymen: { body } }, res) => {
  createCatalogueService(body)
    .then(success(res, 201))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getBranchesByGroupName = ({ params }, res) => {
  getBranchesByGroupNameService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateCatalogue = ({ bodymen: { body } }, res) => {
  updateCatalogueService(body)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const deleteCatalogueByGroupName = ({ params }, res) => {
  deleteCatalogueService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
