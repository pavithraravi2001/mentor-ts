"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSchemaService = exports.updateSchemaService = exports.getSchemaByEntityNameService = exports.createSchemaService = void 0;
const model_1 = require("./model");
const createSchemaService = (body) => {
    return new Promise((resolve, reject) => {
        model_1.MetadataSchema.findOne({ entityName: body.entityName })
            .then((existingEntity) => {
            if (existingEntity) {
                const error = new Error(`${body.entityName} already exists`);
                error.status = 409;
                return reject(error);
            }
            return model_1.MetadataSchema.create(body)
                .then(resolve)
                .catch(reject);
        })
            .catch(reject);
    });
};
exports.createSchemaService = createSchemaService;
const getSchemaByEntityNameService = (params) => {
    return new Promise((resolve, reject) => {
        model_1.MetadataSchema.findOne({ entityName: params.entityName })
            .then((schema) => {
            if (!schema) {
                const error = new Error(`${params.entityName} not found`);
                error.status = 404;
                return reject(error);
            }
            resolve(schema);
        })
            .catch(reject);
    });
};
exports.getSchemaByEntityNameService = getSchemaByEntityNameService;
const updateSchemaService = (body) => {
    return new Promise((resolve, reject) => {
        return model_1.MetadataSchema.findOneAndUpdate({ entityName: body.entityName }, body)
            .then(resolve)
            .catch(reject);
    });
};
exports.updateSchemaService = updateSchemaService;
const deleteSchemaService = (params) => {
    return new Promise((resolve, reject) => {
        model_1.MetadataSchema.deleteOne({ entityName: params.entityName })
            .then((result) => {
            if (result.deletedCount > 0) {
                resolve({ status: 200, message: `${params.entityName} deleted successfully` });
            }
            else {
                const error = new Error();
                error.status = 404;
                error.message = `${params.entityName} not found`;
                reject(error);
            }
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.deleteSchemaService = deleteSchemaService;
