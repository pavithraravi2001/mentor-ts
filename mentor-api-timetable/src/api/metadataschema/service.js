import { notFoundError } from "../../common/response";
import { MetadataSchema } from "./model";

export const createSchemaService = (body) => {
  return new Promise((resolve, reject) => {
    MetadataSchema.findOne({ entityName: body.entityName })
      .then((existingEntity) => {
        if (existingEntity) {
          const error = new Error(`${body.entityName} already exists`);
          error.status = 409;
          return reject(error);
        }
        return MetadataSchema.create(body)
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
};

export const getSchemaByEntityNameService = (params) => {
  return new Promise((resolve, reject) => {
    MetadataSchema.findOne({ entityName: params.entityName })
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

export const updateSchemaService = (body) => {
  return new Promise((resolve, reject) => {
    return MetadataSchema.findOneAndUpdate(
      { entityName: body.entityName },
      body
    )
      .then(resolve)
      .catch(reject);
  });
};

export const deleteSchemaService = (params) => {
  return new Promise((resolve, reject) => {
    MetadataSchema.deleteOne({ entityName: params.entityName })
      .then((result) => {
        if (result.deletedCount > 0) {
          resolve({ status: 200, message: `${params.entityName} deleted successfully` });
        } else {
          const error = new Error();
          error.status = 404;
          error.message = `${params.entityName} not found`
          reject(error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};