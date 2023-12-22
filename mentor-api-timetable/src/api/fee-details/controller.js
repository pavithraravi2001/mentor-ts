import { success } from "../../common/response/";
import {
  deleteInstituteFeeConfigurationService,
  getInstituteFeeConfigurationService,
  getInstituteFeeService,
  getInstituteFeeTermService,
  removeArrayItemInstituteFeeConfigurationService,
  updateInstituteFeeConfigurationService,
  updateInstituteFeeService,
  updateInstituteFeeTermService,
} from "./service";

export const getInstituteFeeMaster = ({ params, query }, res) => {
  getInstituteFeeService(params, query)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateInstituteFeeMaster = ({ params, body }, res) => {
  updateInstituteFeeService(params, {
    instituteId: params.instituteId,
    ...body,
  })
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getInstituteFeeTerm = ({ params, query }, res) => {
  getInstituteFeeTermService(params, query)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateInstituteFeeTerm = ({ params, body }, res) => {
  updateInstituteFeeTermService(params, {
    instituteId: params.instituteId,
    ...body,
  })
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getInstituteFeeConfiguration = ({ params, query }, res) => {
  getInstituteFeeConfigurationService(params, query)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateInstituteFeeConfiguration = ({ params, body }, res) => {
  updateInstituteFeeConfigurationService(params, {
    instituteId: params.instituteId,
    ...body,
  })
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const deleteInstituteFeeConfiguration = ({ params }, res) => {
  deleteInstituteFeeConfigurationService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const removeArrayItemInstituteFeeConfiguration = ({ params }, res) => {
  removeArrayItemInstituteFeeConfigurationService(params)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
