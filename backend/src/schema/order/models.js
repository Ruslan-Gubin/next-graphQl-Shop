import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user_id: { type: String, require: true },
    street: { type: String, require: true },
    flat: { type: String, require: true },
    floor: { type: String },
    entrance: { type: String },
    intercom: { type: String },
    privateHome: { type: Boolean },
    
    products: {
      type: [{
         brandName: { type: String },
         count: { type: Number },
         id: { type: String },
         img: { type: String },
         name: { type: String },
         price: { type: Number },
         oldPrice: { type: Number },  
     }],
    require: true,
  },

    status: {
      type: String,
      default: 'new'
    },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Order", orderSchema);
