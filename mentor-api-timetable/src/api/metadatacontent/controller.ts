import { success } from "../../common/response";
import {
  createMetadataContentService,
  deleteMetadataContentService,
  getMetadataContentByKeyService,
  updateMetadataContentService,
} from "./service";

export const createMetadataContent = ({ bodymen: { body } }, res) => {
  createMetadataContentService(body)
    .then(success(res, 201))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getMetadataContentByKey = ({ params }, res) => {
  getMetadataContentByKeyService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateMetadataContent = ({ bodymen: { body } }, res) => {
  updateMetadataContentService(body)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const deleteMetadataContentByContentKey = ({ params }, res) => {
  deleteMetadataContentService(params)
    .then(success(res, 410))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
