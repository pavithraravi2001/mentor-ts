"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeeConcessionService = exports.updateFeeConcessionService = exports.getMetadataFeeConcessionService = exports.getMetadataFeeConcessionByConcessionKeyService = exports.createFeeConcessionService = void 0;
const response_1 = require("../../common/response");
const model_1 = require("./model");
const createFeeConcessionService = (body) => {
    return new Promise((resolve, reject) => {
        return model_1.MetadataFeeConcession.create(body)
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
exports.createFeeConcessionService = createFeeConcessionService;
const getMetadataFeeConcessionByConcessionKeyService = (params) => {
    return new Promise((resolve, reject) => {
        model_1.MetadataFeeConcession.findOne({
            concessionKey: params.concessionKey,
        })
            .then((feeConcessionKey) => {
            if (!feeConcessionKey) {
                const error = new Error();
                error.status = 404;
                error.message = `Fee concession with key ${params.concessionKey} not found`;
                return reject(error);
            }
            resolve(feeConcessionKey);
        })
            .catch(reject);
    });
};
exports.getMetadataFeeConcessionByConcessionKeyService = getMetadataFeeConcessionByConcessionKeyService;
const getMetadataFeeConcessionService = () => {
    return new Promise((resolve, reject) => {
        return model_1.MetadataFeeConcession.find()
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
};
exports.getMetadataFeeConcessionService = getMetadataFeeConcessionService;
const updateFeeConcessionService = (body) => {
    return new Promise((resolve, reject) => {
        model_1.MetadataFeeConcession.findOneAndUpdate({ concessionKey: body.concessionKey }, body, { new: true })
            .then((result) => {
            if (!result) {
                const error = new Error();
                error.message = `${body.concessionKey} not found`;
                error.status = 404;
                return reject(error);
            }
            const response = { status: 200, message: `Fee concession with key ${body.concessionKey} updated successfully` };
            resolve(response);
        })
            .catch(reject);
    });
};
exports.updateFeeConcessionService = updateFeeConcessionService;
const deleteFeeConcessionService = (params) => {
    return new Promise((resolve, reject) => {
        model_1.MetadataFeeConcession.deleteOne({
            concessionKey: params.concessionKey,
        })
            .then((result) => {
            if (result.deletedCount > 0) {
                resolve({ status: 200, message: 'Metadata fee concession deleted successfully' });
            }
            else {
                const error = new Error();
                error.status = 404;
                error.message = "Metadata fee concession content key not found";
                reject(error);
            }
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.deleteFeeConcessionService = deleteFeeConcessionService;
