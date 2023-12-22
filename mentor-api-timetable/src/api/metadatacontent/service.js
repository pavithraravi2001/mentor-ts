"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMetadataContentService = exports.updateMetadataContentService = exports.getMetadataContentByKeyService = exports.createMetadataContentService = void 0;
const response_1 = require("../../common/response");
const model_1 = require("./model");
const createMetadataContentService = (body) => {
    return new Promise((resolve, reject) => {
        return model_1.MetadataContent.create(body)
            .then(resolve)
            .catch((err) => {
            if (err.name === "MongoError" && err.code === 11000) {
                const error = new Error();
                error.status = 409;
                error.message = "ContentKey is already registered";
                reject(error);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.createMetadataContentService = createMetadataContentService;
const getMetadataContentByKeyService = (params) => {
    return new Promise((resolve, reject) => {
        return model_1.MetadataContent.findOne({ contentKey: params.contentKey })
            .then((0, response_1.notFoundError)(reject))
            .then((metadataContent) => metadataContent ? metadataContent.view() : null)
            .then(resolve)
            .catch(reject);
    });
};
exports.getMetadataContentByKeyService = getMetadataContentByKeyService;
const updateMetadataContentService = (body) => {
    return new Promise((resolve, reject) => {
        model_1.MetadataContent.findOneAndUpdate({ contentKey: body.contentKey }, body, { new: true })
            .then((result) => {
            if (!result) {
                const error = new Error();
                error.status = 404;
                error.message = "Content key not found";
                throw error;
            }
            resolve(result);
        })
            .catch(reject);
    });
};
exports.updateMetadataContentService = updateMetadataContentService;
const deleteMetadataContentService = (params) => {
    return new Promise((resolve, reject) => {
        model_1.MetadataContent.deleteOne({ contentKey: params.contentKey })
            .then((result) => {
            if (result.deletedCount > 0) {
                resolve({ status: 200, message: 'Metadata content deleted successfully' });
            }
            else {
                const error = new Error();
                error.status = 404;
                error.message = "Metadata content not found";
                reject(error);
            }
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.deleteMetadataContentService = deleteMetadataContentService;
