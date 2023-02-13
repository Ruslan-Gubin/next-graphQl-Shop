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
    },
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

export const BrandModel = mongoose.model("Brand", brandSchema);
