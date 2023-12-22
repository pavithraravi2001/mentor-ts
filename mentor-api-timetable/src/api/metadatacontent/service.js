import { notFoundError } from "../../common/response";
import { MetadataContent } from "./model";

export const createMetadataContentService = (body) => {
  return new Promise((resolve, reject) => {
    return MetadataContent.create(body)
      .then(resolve)
      .catch((err) => {
        if (err.name === "MongoError" && err.code === 11000) {
          const error = new Error();
          error.status = 409;
          error.message = "ContentKey is already registered";
          reject(error);
        } else {
          reject(err);
        }
      });
  });
};

export const getMetadataContentByKeyService = (params) => {
  return new Promise((resolve, reject) => {
    return MetadataContent.findOne({ contentKey: params.contentKey })
      .then(notFoundError(reject))
      .then((metadataContent) =>
        metadataContent ? metadataContent.view() : null
      )
      .then(resolve)
      .catch(reject);
  });
};

export const updateMetadataContentService = (body) => {
  return new Promise((resolve, reject) => {
    MetadataContent.findOneAndUpdate(
      { contentKey: body.contentKey },
      body,
      { new: true }
    )
      .then((result) => {
        if (!result) {
          const error = new Error();
          error.status = 404
          error.message = "Content key not found";
          throw error;
        }
        resolve(result);
      })
      .catch(reject);
  });
};


export const deleteMetadataContentService = (params) => {
  return new Promise((resolve, reject) => {
    MetadataContent.deleteOne({ contentKey: params.contentKey })
      .then((result) => {
        if (result.deletedCount > 0) {
          resolve({ status: 200, message: 'Metadata content deleted successfully' });
        } else {
          const error = new Error();
          error.status = 404;
          error.message = "Metadata content not found"
          reject(error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
