import mongoose from "mongoose";
const Schema = mongoose.Schema;

const brandSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    products: {
      type:  [String],
      require: true,
    },
    category: {
      type:  [String],
      require: true,
    }
  },
  { timestamps: true }
);

export const BrandModel = mongoose.model("Brand", brandSchema);
