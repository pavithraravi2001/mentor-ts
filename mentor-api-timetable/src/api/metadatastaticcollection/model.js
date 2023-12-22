import mongoose, { Schema } from "mongoose";

const metadataCollectionItem = new Schema({
  optionKey: String,
  optionValue: String,
  default: Boolean,
  description: String,
  order: Number,
  parent: String,
});

const MetadataCollectionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  version: Number,
  status: String,
  items: [metadataCollectionItem],
});

export const MetadataCollection = mongoose.model(
  "MetadataCollection",
  MetadataCollectionSchema
);

export const schema = MetadataCollection.schema;
