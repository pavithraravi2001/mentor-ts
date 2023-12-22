"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmailTemplateConfigByNameService = exports.getEmailTemplateConfigService = exports.updateEmailTemplateConfigService = exports.addEmailTemplateConfigService = exports.getMongoSchemaByEntityNameService = exports.getMetaDataTableNamesService = exports.getTableMetaDataConfigService = exports.upsertTableMetaDtaConfigService = exports.getStudentTableConfigService = exports.getAllStudentTableConfigService = exports.updateStudentTableConfigsService = exports.addStudentTableConfigService = exports.getEmployeeTableConfigService = exports.getAllEmployeeTableConfigService = exports.updateEmployeeTableConfigsService = exports.addEmployeeTableConfigService = exports.getApplicationTableConfigService = exports.getAllApplicationTableConfigService = exports.updateApplicationTableConfigsService = exports.addApplicationTableConfigService = exports.getPaymentConfigService = exports.updatePaymentConfigService = exports.addPaymentConfigService = void 0;
const mongodb_1 = require("mongodb");
const model_1 = require("../application/model");
const model_2 = require("../employee/model");
const model_3 = require("../student/model");
const model_4 = require("./model");
const jsonSchemaConfig = require("mongoose-schema-jsonschema/config");
const addPaymentConfigService = (body) => {
    return new Promise((resolve, reject) => {
        return model_4.PaymentConfigs.create(body)
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.addPaymentConfigService = addPaymentConfigService;
const updatePaymentConfigService = (params, body) => {
    const idString = params.id;
    const objectId = new mongodb_1.ObjectId(idString);
    return new Promise((resolve, reject) => {
        return model_4.PaymentConfigs.findOneAndUpdate({ _id: objectId }, body)
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.updatePaymentConfigService = updatePaymentConfigService;
const getPaymentConfigService = () => {
    return new Promise((resolve, reject) => {
        return model_4.PaymentConfigs.find()
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.getPaymentConfigService = getPaymentConfigService;
const addApplicationTableConfigService = (body) => {
    return new Promise((resolve, reject) => {
        return model_4.ApplicationTableConfigModel.insertMany(body)
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.addApplicationTableConfigService = addApplicationTableConfigService;
const updateApplicationTableConfigsService = (body) => {
    console.log(body);
    return new Promise((resolve, reject) => {
        if (!body || !Array.isArray(body) || body.length === 0) {
            return reject(new Error("Invalid Params"));
        }
        model_4.ApplicationTableConfigModel.bulkWrite(body.map((item) => {
            if (item._id) {
                return {
                    updateOne: {
                        filter: { _id: item._id },
                        update: { $set: item },
                    },
                };
            }
            else {
                return {
                    insertOne: {
                        document: item,
                    },
                };
            }
        }))
            .then(resolve)
            .catch(reject);
    });
};
exports.updateApplicationTableConfigsService = updateApplicationTableConfigsService;
const getAllApplicationTableConfigService = (tableName) => {
    return new Promise((resolve, reject) => {
        return model_4.ApplicationTableConfigModel.find()
            .select("displayName tableNames fieldName filter sortable optional")
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.getAllApplicationTableConfigService = getAllApplicationTableConfigService;
const getApplicationTableConfigService = (tableName) => {
    return new Promise((resolve, reject) => {
        return model_4.ApplicationTableConfigModel.find({ tableNames: tableName })
            .select("displayName fieldName filter sortable optional")
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.getApplicationTableConfigService = getApplicationTableConfigService;
const addEmployeeTableConfigService = (body) => {
    return new Promise((resolve, reject) => {
        return model_4.EmployeeTableConfigModel.insertMany(body)
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.addEmployeeTableConfigService = addEmployeeTableConfigService;
const updateEmployeeTableConfigsService = (body) => {
    return new Promise((resolve, reject) => {
        if (!body || !Array.isArray(body) || !body.length) {
            return reject(new Error("Invalid Params"));
        }
        model_4.EmployeeTableConfigModel.bulkWrite(body.map((item) => {
            if (item._id) {
                return {
                    updateOne: {
                        filter: { _id: item._id },
                        update: { $set: item },
                    },
                };
            }
            else {
                return {
                    updateOne: {
                        filter: { _id: item._id },
                        update: { $set: item },
                        upsert: true,
                    },
                };
            }
        }))
            .then(resolve)
            .catch(reject);
    });
};
exports.updateEmployeeTableConfigsService = updateEmployeeTableConfigsService;
const getAllEmployeeTableConfigService = (tableName) => {
    return new Promise((resolve, reject) => {
        return model_4.EmployeeTableConfigModel.find()
            .select("displayName tableNames fieldName filter sortable optional")
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.getAllEmployeeTableConfigService = getAllEmployeeTableConfigService;
const getEmployeeTableConfigService = (tableName) => {
    return new Promise((resolve, reject) => {
        return model_4.EmployeeTableConfigModel.find({ tableNames: tableName })
            .select("displayName fieldName filter sortable optional")
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.getEmployeeTableConfigService = getEmployeeTableConfigService;
const addStudentTableConfigService = (body) => {
    return new Promise((resolve, reject) => {
        return model_4.StudentTableConfigModel.insertMany(body)
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.addStudentTableConfigService = addStudentTableConfigService;
const updateStudentTableConfigsService = (body) => {
    return new Promise((resolve, reject) => {
        if (!body || !Array.isArray(body) || !body.length) {
            return reject(new Error("Invalid Params"));
        }
        model_4.StudentTableConfigModel.bulkWrite(body.map((item) => {
            if (item._id) {
                return {
                    updateOne: {
                        filter: { _id: item._id },
                        update: { $set: item },
                    },
                };
            }
            else {
                return {
                    updateOne: {
                        filter: { _id: item._id },
                        update: { $set: item },
                        upsert: true,
                    },
                };
            }
        }))
            .then(resolve)
            .catch(reject);
    });
};
exports.updateStudentTableConfigsService = updateStudentTableConfigsService;
const getAllStudentTableConfigService = (tableName) => {
    return new Promise((resolve, reject) => {
        return model_4.StudentTableConfigModel.find()
            .select("displayName tableNames fieldName filter sortable optional")
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.getAllStudentTableConfigService = getAllStudentTableConfigService;
const getStudentTableConfigService = (tableName) => {
    return new Promise((resolve, reject) => {
        return model_4.StudentTableConfigModel.find({ tableNames: tableName })
            .select("displayName fieldName filter sortable optional")
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.getStudentTableConfigService = getStudentTableConfigService;
const upsertTableMetaDtaConfigService = (body) => {
    return new Promise((resolve, reject) => {
        return model_4.TableMetaDataConfigModel.findOneAndUpdate({ tableName: body.tableName }, body, { returnNewDocument: true, upsert: true })
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.upsertTableMetaDtaConfigService = upsertTableMetaDtaConfigService;
const getTableMetaDataConfigService = (tableName) => {
    return new Promise((resolve, reject) => {
        model_4.TableMetaDataConfigModel.find({ tableName })
            .select("columns")
            .then((result) => {
            if (result && result.length > 0) {
                resolve(result[0].columns);
            }
            else {
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
exports.getTableMetaDataConfigService = getTableMetaDataConfigService;
const getMetaDataTableNamesService = () => {
    return new Promise((resolve, reject) => {
        return model_4.TableMetaDataConfigModel.find()
            .select("tableName entityName")
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.getMetaDataTableNamesService = getMetaDataTableNamesService;
const getMongoSchemaByEntityNameService = (entityName) => {
    return new Promise((resolve, reject) => {
        switch (entityName) {
            case "Application":
                jsonSchemaConfig({ fieldOptionsMapping: [], forceRebuild: true });
                resolve(model_1.Application.jsonSchema());
                break;
            case "Employee":
                jsonSchemaConfig({ fieldOptionsMapping: [], forceRebuild: true });
                resolve(model_2.Employee.jsonSchema());
                break;
            case "Student":
                jsonSchemaConfig({ fieldOptionsMapping: [], forceRebuild: true });
                resolve(model_3.Student.jsonSchema());
                break;
            case "InterviewScheduler":
                jsonSchemaConfig({ fieldOptionsMapping: [], forceRebuild: true });
                resolve(model_1.InterviewScheduler.jsonSchema());
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
exports.getMongoSchemaByEntityNameService = getMongoSchemaByEntityNameService;
const addEmailTemplateConfigService = (body) => {
    return new Promise((resolve, reject) => {
        return model_4.EmailTemplateConfigModel.create(body)
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.addEmailTemplateConfigService = addEmailTemplateConfigService;
const updateEmailTemplateConfigService = ({ name }, body) => {
    return new Promise((resolve, reject) => {
        return model_4.EmailTemplateConfigModel.findOneAndUpdate({ name }, body)
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.updateEmailTemplateConfigService = updateEmailTemplateConfigService;
const getEmailTemplateConfigService = () => {
    return new Promise((resolve, reject) => {
        return model_4.EmailTemplateConfigModel.find()
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.getEmailTemplateConfigService = getEmailTemplateConfigService;
const getEmailTemplateConfigByNameService = ({ name }) => {
    return new Promise((resolve, reject) => {
        return model_4.EmailTemplateConfigModel.findOne({ name })
            .then(resolve)
            .catch((err) => {
            const errMessage = err;
            reject(errMessage);
        });
    });
};
exports.getEmailTemplateConfigByNameService = getEmailTemplateConfigByNameService;
