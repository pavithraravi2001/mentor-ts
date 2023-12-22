import { success } from "../../common/response";
import {
  createFeeConcessionService,
  deleteFeeConcessionService,
  getMetadataFeeConcessionByConcessionKeyService,
  getMetadataFeeConcessionService,
  updateFeeConcessionService,
} from "./service";

export const createFeeConcession = ({ bodymen: { body } }, res) => {
  createFeeConcessionService(body)
    .then(success(res, 201))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getMetadataFeeConcessionByConcessionKey = ({ params }, res) => {
  getMetadataFeeConcessionByConcessionKeyService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getMetadataFeeConcession = ({ params }, res) => {
  getMetadataFeeConcessionService()
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateFeeConcession = ({ bodymen: { body } }, res) => {
  updateFeeConcessionService(body)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const deleteMetadataFeeConcessionByConcessionKey = ({ params }, res) => {
  deleteFeeConcessionService(params)
    .then(success(res, 410))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
