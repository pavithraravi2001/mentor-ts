import { success } from "../../common/response";
import {
  addApplicationTableConfigService,
  addEmailTemplateConfigService,
  addEmployeeTableConfigService,
  addPaymentConfigService,
  addStudentTableConfigService,
  getAllApplicationTableConfigService,
  getAllEmployeeTableConfigService,
  getAllStudentTableConfigService,
  getApplicationTableConfigService,
  getEmailTemplateConfigByNameService,
  getEmailTemplateConfigService,
  getEmployeeTableConfigService,
  getMetaDataTableNamesService,
  getMongoSchemaByEntityNameService,
  getPaymentConfigService,
  getStudentTableConfigService,
  getTableMetaDataConfigService,
  updateApplicationTableConfigsService,
  updateEmailTemplateConfigService,
  updateEmployeeTableConfigsService,
  updatePaymentConfigService,
  updateStudentTableConfigsService,
  upsertTableMetaDtaConfigService,
} from "./service";

export const addPaymentConfig = ({ body }, res) => {
  addPaymentConfigService(body)
    .then(success(res, 201))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const updatePaymentConfig = ({ params, body }, res) => {
  updatePaymentConfigService(params, body)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getPaymentConfig = (req, res) => {
  getPaymentConfigService()
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const addApplicationTableConfigs = ({ body }, res) => {
  addApplicationTableConfigService(body)
    .then(success(res, 201))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const updateApplicationTableConfigs = ({ body }, res) => {
  updateApplicationTableConfigsService(body)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getAllApplicationTableConfigs = ({ params }, res) => {
  getAllApplicationTableConfigService(params.tableName)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};
export const getApplicationTableConfigs = ({ params }, res) => {
  getApplicationTableConfigService(params.tableName)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const addEmployeeTableConfigs = ({ body }, res) => {
  addEmployeeTableConfigService(body)
    .then(success(res, 201))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const updateEmployeeTableConfigs = ({ body }, res) => {
  updateEmployeeTableConfigsService(body)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getAllEmployeeTableConfigs = ({ params }, res) => {
  getAllEmployeeTableConfigService(params.tableName)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};
export const getEmployeeTableConfigs = ({ params }, res) => {
  getEmployeeTableConfigService(params.tableName)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const addStudentTableConfigs = ({ body }, res) => {
  addStudentTableConfigService(body)
    .then(success(res, 201))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const updateStudentTableConfigs = ({ body }, res) => {
  updateStudentTableConfigsService(body)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getAllStudentTableConfigs = ({ params }, res) => {
  getAllStudentTableConfigService(params.tableName)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getStudentTableConfigs = ({ params }, res) => {
  getStudentTableConfigService(params.tableName)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const upsertTableMetaDtaConfig = ({ body }, res) => {
  upsertTableMetaDtaConfigService(body)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getMetaDataTableNames = (req, res) => {
  getMetaDataTableNamesService()
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getTableMetaDataConfig = ({ params }, res) => {
  getTableMetaDataConfigService(params.tableName)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getMongoSchemaByEntityName = ({ params }, res) => {
  getMongoSchemaByEntityNameService(params.entityName)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const addEmailTemplateConfig = ({ body }, res) => {
  addEmailTemplateConfigService(body)
    .then(success(res, 201))
    .catch((err) => {
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const updateEmailTemplateConfig = ({ params, body }, res) => {
  updateEmailTemplateConfigService(params, body)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getEmailTemplateConfig = (req, res) => {
  getEmailTemplateConfigService()
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};

export const getEmailTemplateConfigByName = ({ params }, res) => {
  getEmailTemplateConfigByNameService(params)
    .then(success(res, 200))
    .catch((err) => {
      console.log(err);
      return res.status(err && err.status ? err.status : 400).json(err);
    });
};
