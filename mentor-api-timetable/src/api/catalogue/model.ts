import mongoose, { Schema } from "mongoose";

const CatalogueSchema = new Schema({
  groupName: {type: String, required: true},
  instituteName: String,
  branch: String,
  board: String,
  addressLine1: String,
  addressLine2: String,
  addressLine3: String,
});

export const Catalogue = mongoose.model("Catalogue", CatalogueSchema);
export const schema = Catalogue.schema;
