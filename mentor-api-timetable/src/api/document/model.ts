import mongoose, { Schema } from "mongoose";
import { uid } from "rand-token";

const GenericFileUploadSchema = new Schema({
  originalFileName: {
    type: String,
  },
  fileKey: {
    type: String,
    unique: true,
    index: true,
    default: () => uid(32),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const GenericFileUpload = mongoose.model(
  "GenericFileUpload",
  GenericFileUploadSchema
);

export const schema = GenericFileUpload.schema;
