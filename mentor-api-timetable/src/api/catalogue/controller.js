"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCatalogueByGroupName = exports.updateCatalogue = exports.getBranchesByGroupName = exports.createCatalogue = void 0;
const response_1 = require("../../common/response");
const service_1 = require("./service");
const createCatalogue = ({ bodymen: { body } }, res) => {
    (0, service_1.createCatalogueService)(body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.createCatalogue = createCatalogue;
const getBranchesByGroupName = ({ params }, res) => {
    (0, service_1.getBranchesByGroupNameService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.getBranchesByGroupName = getBranchesByGroupName;
const updateCatalogue = ({ bodymen: { body } }, res) => {
    (0, service_1.updateCatalogueService)(body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateCatalogue = updateCatalogue;
const deleteCatalogueByGroupName = ({ params }, res) => {
    (0, service_1.deleteCatalogueService)(params)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.deleteCatalogueByGroupName = deleteCatalogueByGroupName;
