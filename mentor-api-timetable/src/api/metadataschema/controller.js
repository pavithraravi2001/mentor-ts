import { success } from "../../common/response/";
import {
  createSchemaService,
  deleteSchemaService,
  getSchemaByEntityNameService,
  updateSchemaService,
} from "./service";

export const createSchema = ({ bodymen: { body } }, res) => {
  createSchemaService(body)
    .then(success(res, 201))
    .catch((err) => {
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getSchemaByEntityName = ({ params }, res) => {
  getSchemaByEntityNameService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateSchema = ({ bodymen: { body } }, res) => {
  updateSchemaService(body)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const deleteSchemaByEntityName = ({ params }, res) => {
  deleteSchemaService(params)
    .then(success(res, 410))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
