import mongoose, { Schema } from "mongoose";

const RolesClassModel = new Schema(
  {
    featureCode: {
      type: String,
      required: true,
    },
    all: {
      type: Boolean,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
    },
    write: {
      type: Boolean,
      required: true,
    },
    delete: {
      type: Boolean,
      required: true,
    },
    publish: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    _id: false,
  }
);

const RolesModel = new Schema(
  {
    instituteId: {
      type: String,
      required: true,
    },
    roleName: {
      type: String,
      required: true,
      unique: true,
    },
    roles: [RolesClassModel],
  },
  {
    strict: true,
    timestamps: true,
  }
);

export const InstituteRoles = mongoose.model("InstituteRoles", RolesModel);

const UserModel = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
  },
  {
    strict: true,
    timestamps: true,
  }
);

const UserRoleModel = new Schema(
  {
    instituteId: {
      type: String,
      required: true,
    },
    roleId: {
      type: String,
      required: true,
    },
    users: [UserModel],
  }
  // {
  //   _id: false,
  // }
);

export const UserRoles = mongoose.model("UserRoles", UserRoleModel);

const InstituteFeatureModel = new Schema(
  {
    instituteId: {
      type: String,
      required: true,
    },
    featureName: {
      type: String,
      required: true,
    },
    featureCode: {
      type: String,
      required: true,
      unique: true,
    },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  {
    strict: true,
    timestamps: true,
  }
);

export const InstituteFeature = mongoose.model(
  "InstituteFeature",
  InstituteFeatureModel
);
