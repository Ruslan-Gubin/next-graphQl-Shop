import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "../../../../apps/store/srote";
import { IProductType } from "../../../../apps/types";

interface IProductDetailsInitial {
  watchedProduct: IProductType[]
}


const initialState: IProductDetailsInitial = {
  watchedProduct: [],
};

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {

    addProduct(state, action: PayloadAction<{product: IProductType}>) {
      const newProduct = {
        _id: action.payload.product._id,
        photo: action.payload.product.photo,
        price: action.payload.product.price,
        oldPrice: action.payload.product.oldPrice,
        name: action.payload.product.name,
        discount: action.payload.product.discount,
      }
      const wathed = state.watchedProduct.some(item => item._id === newProduct._id)
      if (!wathed) {
        state.watchedProduct = [(newProduct as IProductType), ...state.watchedProduct]

        if (state.watchedProduct.length > 5) {
          state.watchedProduct.pop() 
        }
      }
    },

  },
});

export const selectProductDetails = (state: TypeRootState) => state.productDetails;

export const productDetailsAction = productDetailsSlice.actions;

export const productDetailsReducer = productDetailsSlice.reducer;

