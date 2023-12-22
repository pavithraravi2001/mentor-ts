import { success } from "../../common/response";
import {
  createCollectionService,
  deleteCollectionService,
  getCollectionByNameService,
  getCollectionForDropDownService,
  getCollectionsService,
  updateCollectionService,
} from "./service";

export const createCollection = ({ bodymen: { body } }, res) => {
  createCollectionService(body)
    .then(success(res, 201))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getCollectionByName = ({ params }, res) => {
  getCollectionByNameService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getCollections = ({ params }, res) => {
  getCollectionsService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getCollectionForDropDown = ({ params, query }, res) => {
  getCollectionForDropDownService(params, query)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateCollection = ({ bodymen: { body } }, res) => {
  updateCollectionService(body)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const deleteCollectionByName = ({ params }, res) => {
  deleteCollectionService(params)
    .then(success(res, 410))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
