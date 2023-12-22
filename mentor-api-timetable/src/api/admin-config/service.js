import { ObjectId } from "mongodb";
import { Application, InterviewScheduler } from "../application/model";
import { Employee } from "../employee/model";
import { Student } from "../student/model";
import {
  ApplicationTableConfigModel,
  EmailTemplateConfigModel,
  EmployeeTableConfigModel,
  PaymentConfigs,
  StudentTableConfigModel,
  TableMetaDataConfigModel,
} from "./model";
const jsonSchemaConfig = require("mongoose-schema-jsonschema/config");

export const addPaymentConfigService = (body) => {
  return new Promise((resolve, reject) => {
    return PaymentConfigs.create(body)
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const updatePaymentConfigService = (params, body) => {
  const idString = params.id;
  const objectId = new ObjectId(idString);
  return new Promise((resolve, reject) => {
    return PaymentConfigs.findOneAndUpdate({ _id: objectId }, body)
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const getPaymentConfigService = () => {
  return new Promise((resolve, reject) => {
    return PaymentConfigs.find()
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const addApplicationTableConfigService = (body) => {
  return new Promise((resolve, reject) => {
    return ApplicationTableConfigModel.insertMany(body)
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const updateApplicationTableConfigsService = (body) => {
  console.log(body);
  return new Promise((resolve, reject) => {
    if (!body || !Array.isArray(body) || body.length === 0) {
      return reject(new Error("Invalid Params"));
    }
    ApplicationTableConfigModel.bulkWrite(
      body.map((item) => {
        if (item._id) {
          return {
            updateOne: {
              filter: { _id: item._id },
              update: { $set: item },
            },
          };
        } else {
          return {
            insertOne: {
              document: item,
            },
          };
        }
      })
    )
      .then(resolve)
      .catch(reject);
  });
};

export const getAllApplicationTableConfigService = (tableName) => {
  return new Promise((resolve, reject) => {
    return ApplicationTableConfigModel.find()
      .select("displayName tableNames fieldName filter sortable optional")
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const getApplicationTableConfigService = (tableName) => {
  return new Promise((resolve, reject) => {
    return ApplicationTableConfigModel.find({ tableNames: tableName })
      .select("displayName fieldName filter sortable optional")
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const addEmployeeTableConfigService = (body) => {
  return new Promise((resolve, reject) => {
    return EmployeeTableConfigModel.insertMany(body)
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const updateEmployeeTableConfigsService = (body) => {
  return new Promise((resolve, reject) => {
    if (!body || !Array.isArray(body) || !body.length) {
      return reject(new Error("Invalid Params"));
    }
    EmployeeTableConfigModel.bulkWrite(
      body.map((item) => {
        if (item._id) {
          return {
            updateOne: {
              filter: { _id: item._id },
              update: { $set: item },
            },
          };
        } else {
          return {
            updateOne: {
              filter: { _id: item._id },
              update: { $set: item },
              upsert: true,
            },
          };
        }
      })
    )
      .then(resolve)
      .catch(reject);
  });
};

export const getAllEmployeeTableConfigService = (tableName) => {
  return new Promise((resolve, reject) => {
    return EmployeeTableConfigModel.find()
      .select("displayName tableNames fieldName filter sortable optional")
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const getEmployeeTableConfigService = (tableName) => {
  return new Promise((resolve, reject) => {
    return EmployeeTableConfigModel.find({ tableNames: tableName })
      .select("displayName fieldName filter sortable optional")
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const addStudentTableConfigService = (body) => {
  return new Promise((resolve, reject) => {
    return StudentTableConfigModel.insertMany(body)
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const updateStudentTableConfigsService = (body) => {
  return new Promise((resolve, reject) => {
    if (!body || !Array.isArray(body) || !body.length) {
      return reject(new Error("Invalid Params"));
    }
    StudentTableConfigModel.bulkWrite(
      body.map((item) => {
        if (item._id) {
          return {
            updateOne: {
              filter: { _id: item._id },
              update: { $set: item },
            },
          };
        } else {
          return {
            updateOne: {
              filter: { _id: item._id },
              update: { $set: item },
              upsert: true,
            },
          };
        }
      })
    )
      .then(resolve)
      .catch(reject);
  });
};

export const getAllStudentTableConfigService = (tableName) => {
  return new Promise((resolve, reject) => {
    return StudentTableConfigModel.find()
      .select("displayName tableNames fieldName filter sortable optional")
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const getStudentTableConfigService = (tableName) => {
  return new Promise((resolve, reject) => {
    return StudentTableConfigModel.find({ tableNames: tableName })
      .select("displayName fieldName filter sortable optional")
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const upsertTableMetaDtaConfigService = (body) => {
  return new Promise((resolve, reject) => {
    return TableMetaDataConfigModel.findOneAndUpdate(
      { tableName: body.tableName },
      body,
      { returnNewDocument: true, upsert: true }
    )
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const getTableMetaDataConfigService = (tableName) => {
  return new Promise((resolve, reject) => {
    TableMetaDataConfigModel.find({ tableName })
      .select("columns")
      .then((result) => {
        if (result && result.length > 0) {
          resolve(result[0].columns);
        } else {
          const error = {
            status: 404,
            message: "not found",
          };
          reject(error);
        }
      })
      .catch((err) => {
        reject("Failed to fetch metadata table config");
      });
  });
};

export const getMetaDataTableNamesService = () => {
  return new Promise((resolve, reject) => {
    return TableMetaDataConfigModel.find()
      .select("tableName entityName")
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const getMongoSchemaByEntityNameService = (entityName) => {
  return new Promise((resolve, reject) => {
    switch (entityName) {
      case "Application":
        jsonSchemaConfig({ fieldOptionsMapping: [], forceRebuild: true });
        resolve(Application.jsonSchema());
        break;
      case "Employee":
        jsonSchemaConfig({ fieldOptionsMapping: [], forceRebuild: true });
        resolve(Employee.jsonSchema());
        break;
      case "Student":
        jsonSchemaConfig({ fieldOptionsMapping: [], forceRebuild: true });
        resolve(Student.jsonSchema());
        break;
      case "InterviewScheduler":
        jsonSchemaConfig({ fieldOptionsMapping: [], forceRebuild: true });
        resolve(InterviewScheduler.jsonSchema());
        break;
      default:
        return resolve({
          message: "not found",
          available_entities: [
            "Application",
            "Employee",
            "Student",
            "InterviewScheduler",
          ],
        });
    }
  });
};

export const addEmailTemplateConfigService = (body) => {
  return new Promise((resolve, reject) => {
    return EmailTemplateConfigModel.create(body)
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const updateEmailTemplateConfigService = ({ name }, body) => {
  return new Promise((resolve, reject) => {
    return EmailTemplateConfigModel.findOneAndUpdate({ name }, body)
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const getEmailTemplateConfigService = () => {
  return new Promise((resolve, reject) => {
    return EmailTemplateConfigModel.find()
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};

export const getEmailTemplateConfigByNameService = ({ name }) => {
  return new Promise((resolve, reject) => {
    return EmailTemplateConfigModel.findOne({ name })
      .then(resolve)
      .catch((err) => {
        const errMessage = err;
        reject(errMessage);
      });
  });
};
