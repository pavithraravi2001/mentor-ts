import mongoose, { Schema } from "mongoose";

const MetadataContentSchema = new Schema({
  contentKey: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  content: {
    type: String,
    index: true,
    trim: true,
  },
});

MetadataContentSchema.methods = {
  view() {
    const view = {};
    const fields = ["contentKey", "content"];
    fields.forEach((field) => {
      view[field] = this[field];
    });
    return view;
  },
};

export const MetadataContent = mongoose.model(
  "MetadataContent",
  MetadataContentSchema
);

export const schema = MetadataContent.schema;
