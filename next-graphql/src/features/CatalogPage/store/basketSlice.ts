import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "@/apps/store/srote";
import { IBasketProduct, IBasketSlice } from "../libs/types/IBasketSlice";



const initialState: IBasketSlice = {
basket: []
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {

    addProduct(state, action: PayloadAction<{product: IBasketProduct}>) {
      state.basket = [...state.basket, action.payload.product]
    },

  //  setSizeCard(state, action: PayloadAction<{value: string}>) {
  //   state.sizeCard = action.payload.value
  //  },

    

  },
});

export const selectBasket = (state: TypeRootState) => state.basket;

export const basketAction = basketSlice.actions;

export const basketReducer = basketSlice.reducer;