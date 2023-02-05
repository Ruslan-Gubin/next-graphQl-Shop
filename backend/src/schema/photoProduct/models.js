import mongoose from "mongoose";
const Schema = mongoose.Schema;

const photoProductSchema = new Schema(
  {
    images: {
      type: Array,
    },
    product_id: {
      type:  String,
    }
  },
  { timestamps: true }
);

export const PhotoProductModel = mongoose.model("PhotoProduct", photoProductSchema);
