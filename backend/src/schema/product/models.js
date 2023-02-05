import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    oldPrice: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    count: {
      type: Number,
      default: 0,
    },
    colors_names: {
      type: String,
    },
    photo_count: {
      type: Number,
    },
    brand_id: {
      type: String,
    },
    photo_id: {
      type: String,
    },
    category_id: {
      type: String,
    },
    comments: {type: [String]},
    views: {
      type: Number,
      default: 0,
    },
    options: {
      type: Array,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", productSchema);
