import mongoose, { Schema } from "mongoose";

const MetadataFeeConcessionSchema = new Schema({
  concessionKey: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  isPercentage: Boolean,
  percentage: Number,
  isFixedAmount: Boolean,
  fixedAmount: Number,
});

export const MetadataFeeConcession = mongoose.model(
  "MetadataFeeConcession",
  MetadataFeeConcessionSchema
);

export const schema = MetadataFeeConcession.schema;
