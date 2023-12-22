import { notFoundError } from "../../common/response";
import { Catalogue } from "./model";

export const createCatalogueService = (body) => {
  return new Promise((resolve, reject) => {
    return Catalogue.create(body)
      .then(resolve)
      .catch((err) => {
        if (err.name === "MongoError" && err.code === 11000) {
          const error = new Error();
          error.status = 409;
          error.message = "InstituteName is already exists";
          reject(error);
        } else {
          reject(err);
        }
      });
  });
};

export const getBranchesByGroupNameService = (params) => {
  return new Promise((resolve, reject) => {
    return Catalogue.find({ groupName: params.groupName })
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const updateCatalogueService = (body) => {
  return new Promise((resolve, reject) => {
    Catalogue.findById(body._id)
      .then((result) => {
        Catalogue.findByIdAndUpdate(body._id, body, { new: true })
          .then((updateCatalogue) => {
            if (!updateCatalogue) {
              const error = new Error();
              error.status = 500;
              error.message = `Failed to update catalogue with _id '${body._id}'`
              return reject(error);
            }
            resolve(updateCatalogue);
          })
          .catch(reject);
      })
      .catch(reject);
  });
};

export const deleteCatalogueService = (params) => {
  return new Promise((resolve, reject) => {
    return Catalogue.deleteOne({ groupName: params.groupName })
      .then((result) => {
        if (result.deletedCount > 0) {
          resolve({ status: 200, message: 'Catalogue deleted successfully' });
        } else {
          const error = new Error();
          error.status = 404;
          error.message = `not found`
          reject(error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
