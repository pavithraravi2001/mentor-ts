"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCollectionService = exports.updateCollectionService = exports.getCollectionForDropDownService = exports.prepareList = exports.getCollectionsService = exports.getCollectionByNameService = exports.createCollectionService = void 0;
const response_1 = require("../../common/response");
const model_1 = require("./model");
const createCollectionService = (body) => {
    return new Promise((resolve, reject) => {
        model_1.MetadataCollection.findOne({ name: body.name })
            .then((existingCollection) => {
            if (existingCollection) {
                const error = new Error();
                error.status = 409;
                error.message = "Collection key already exist";
                return reject(error);
            }
            return model_1.MetadataCollection.create(body)
                .then(resolve)
                .catch(reject);
        })
            .catch(reject);
    });
};
exports.createCollectionService = createCollectionService;
const getCollectionByNameService = (params) => {
    return new Promise((resolve, reject) => {
        return model_1.MetadataCollection.findOne({ name: params.name })
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
};
exports.getCollectionByNameService = getCollectionByNameService;
const getCollectionsService = (params) => {
    return new Promise((resolve, reject) => {
        return model_1.MetadataCollection.find()
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
};
exports.getCollectionsService = getCollectionsService;
const prepareList = (reject, query) => (entity) => {
    if (entity && entity.length >= 1) {
        var listItems = [];
        if (query.parent) {
            entity[0].collectionItems.forEach((element) => {
                if (element.parent == query.parent) {
                    listItems.push({ label: element.label, value: element.value });
                }
            });
        }
        else {
            entity[0].collectionItems.forEach((element) => listItems.push({ label: element.label, value: element.value }));
        }
        return listItems;
    }
    return reject({
        status: 404,
        message: "not found",
    });
};
exports.prepareList = prepareList;
const getCollectionForDropDownService = (params, query) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        return model_1.MetadataCollection.aggregate([
            { $match: { name: params.name } },
            {
                $project: {
                    _id: 0,
                    collectionItems: {
                        $map: {
                            input: "$items",
                            as: "el",
                            in: {
                                value: "$$el.optionKey",
                                label: "$$el.optionValue",
                                parent: "$$el.parent",
                            },
                        },
                    },
                },
            },
        ])
            .then((0, exports.prepareList)(reject, query))
            .then((0, response_1.notFoundError)(reject))
            .then(resolve)
            .catch(reject);
    });
});
exports.getCollectionForDropDownService = getCollectionForDropDownService;
const updateCollectionService = (body) => {
    return new Promise((resolve, reject) => {
        model_1.MetadataCollection.findOne({ name: body.name })
            .then((collection) => {
            if (!collection) {
                const error = new Error();
                error.status = 404;
                error.message = `Collection with name ${body.name} not found`;
                return reject(error);
            }
            return model_1.MetadataCollection.findOneAndUpdate({ name: body.name }, body, { new: true })
                .then((updateCollection) => {
                if (!updateCollection) {
                    const error = new Error(`Failed to update ${body.name}`);
                    error.status = 500;
                    return reject(error);
                }
                const response = { status: 200, message: `${body.name} updated successfully` };
                resolve(response);
            })
                .catch(reject);
        })
            .catch(reject);
    });
};
exports.updateCollectionService = updateCollectionService;
const deleteCollectionService = (params) => {
    return new Promise((resolve, reject) => {
        model_1.MetadataCollection.deleteOne({ name: params.name })
            .then((result) => {
            if (result.deletedCount > 0) {
                resolve({ status: 200, message: `${params.name} deleted successfully` });
            }
            else {
                const error = new Error();
                error.status = 404;
                error.message = `${params.name} not found`;
                reject(error);
            }
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.deleteCollectionService = deleteCollectionService;
