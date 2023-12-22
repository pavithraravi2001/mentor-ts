"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCatalogueService = exports.updateCatalogueService = exports.getBranchesByGroupNameService = exports.createCatalogueService = void 0;
const response_1 = require("../../common/response");
const model_1 = require("./model");
const createCatalogueService = (body) => {
    return new Promise((resolve, reject) => {
        return model_1.Catalogue.create(body)
            .then(resolve)
            .catch((err) => {
            if (err.name === "MongoError" && err.code === 11000) {
                const error = new Error();
                error.status = 409;
                error.message = "InstituteName is already exists";
                reject(error);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.createCatalogueService = createCatalogueService;
const getBranchesByGroupNameService = (params) => {
    return new Promise((resolve, reject) => {
        return model_1.Catalogue.find({ groupName: params.groupName })
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
};
exports.getBranchesByGroupNameService = getBranchesByGroupNameService;
const updateCatalogueService = (body) => {
    return new Promise((resolve, reject) => {
        model_1.Catalogue.findById(body._id)
            .then((result) => {
            model_1.Catalogue.findByIdAndUpdate(body._id, body, { new: true })
                .then((updateCatalogue) => {
                if (!updateCatalogue) {
                    const error = new Error();
                    error.status = 500;
                    error.message = `Failed to update catalogue with _id '${body._id}'`;
                    return reject(error);
                }
                resolve(updateCatalogue);
            })
                .catch(reject);
        })
            .catch(reject);
    });
};
exports.updateCatalogueService = updateCatalogueService;
const deleteCatalogueService = (params) => {
    return new Promise((resolve, reject) => {
        return model_1.Catalogue.deleteOne({ groupName: params.groupName })
            .then((result) => {
            if (result.deletedCount > 0) {
                resolve({ status: 200, message: 'Catalogue deleted successfully' });
            }
            else {
                const error = new Error();
                error.status = 404;
                error.message = `not found`;
                reject(error);
            }
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.deleteCatalogueService = deleteCatalogueService;
