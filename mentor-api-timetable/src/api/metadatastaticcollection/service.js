import { notFoundError } from "../../common/response";
import { MetadataCollection } from "./model";

export const createCollectionService = (body) => {
  return new Promise((resolve, reject) => {
    MetadataCollection.findOne({ name: body.name })
      .then((existingCollection) => {
        if (existingCollection) {
          const error = new Error();
          error.status = 409;
          error.message = "Collection key already exist"
          return reject(error);
        }
        return MetadataCollection.create(body)
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
};


export const getCollectionByNameService = (params) => {
  return new Promise((resolve, reject) => {
    return MetadataCollection.findOne({ name: params.name })
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const getCollectionsService = (params) => {
  return new Promise((resolve, reject) => {
    return MetadataCollection.find()
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const prepareList = (reject, query) => (entity) => {
  if (entity && entity.length >= 1) {
    var listItems = [];
    if (query.parent) {
      entity[0].collectionItems.forEach((element) => {
        if (element.parent == query.parent) {
          listItems.push({ label: element.label, value: element.value });
        }
      });
    } else {
      entity[0].collectionItems.forEach((element) =>
        listItems.push({ label: element.label, value: element.value })
      );
    }
    return listItems;
  }
  return reject({
    status: 404,
    message: "not found",
  });
};

export const getCollectionForDropDownService = async (params, query) => {
  return new Promise((resolve, reject) => {
    return MetadataCollection.aggregate([
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
      .then(prepareList(reject, query))
      .then(notFoundError(reject))
      .then(resolve)
      .catch(reject);
  });
};

export const updateCollectionService = (body) => {
  return new Promise((resolve, reject) => {
    MetadataCollection.findOne({ name: body.name })
      .then((collection) => {
        if (!collection) {
          const error = new Error();
          error.status = 404;
          error.message = `Collection with name ${body.name} not found`;
          return reject(error);
        }

        return MetadataCollection.findOneAndUpdate({ name: body.name }, body, { new: true })
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

export const deleteCollectionService = (params) => {
  return new Promise((resolve, reject) => {
    MetadataCollection.deleteOne({ name: params.name })
      .then((result) => {
        if (result.deletedCount > 0) {
          resolve({ status: 200, message: `${params.name} deleted successfully`});
        } else {
          const error = new Error();
          error.status = 404;
          error.message = `${params.name} not found`
          reject(error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
