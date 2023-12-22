import mongoose, { Schema } from "mongoose";

const metadataStandardFields = new Schema(
  {
    fieldName: String,
    dataType: String,
    caption: String,
    mandatory: Boolean,
    size: Number,
    order: Number,
    dataPoint: String,
  },
  { _id: false }
);

const metadataSchema = new Schema(
  {
    entityName:
    {
      type: String,
      unique: true,
    },
    version: Number,
    status: String,
    fields: [metadataStandardFields],
    formFields: [Object],
  },
  { strict: false }
);

export const MetadataSchema = mongoose.model("MetadataSchema", metadataSchema);

export const schema = MetadataSchema.schema;
