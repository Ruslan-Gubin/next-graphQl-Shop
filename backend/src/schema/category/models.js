import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    department: {
      type: String,
      require: true,
    },
    sub_department: {
      type: String,
      require: true,
    },
    products: {
      type:  [String],
      default: [],
      require: true,
    },
    brands: {
      type: [String],
      default: [],
    },
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

export const CategoryModel = mongoose.model("Category", categorySchema);
