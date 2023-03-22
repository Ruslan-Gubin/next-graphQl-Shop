import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "../../../apps/store/srote";
import {  IBasketProduct, IBasketSlice } from "../libs/types/IBasketSlice";


const initialState: IBasketSlice = {
  basket: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    
    addProduct(state, action: PayloadAction<{product: IBasketProduct}>) {
      state.basket = [action.payload.product, ...state.basket]
    },

    removeProduct(state, action: PayloadAction<{id: string}>) {
     state.basket = state.basket.filter(item => item.id !== action.payload.id)
    },

   increment(state, action: PayloadAction<{id: string}>) {
    state.basket.forEach(item => {
      if (item.id === action.payload.id) {
        item.count++
      }
    })
   },

   decrement(state, action: PayloadAction<{id: string}>) {
    state.basket = state.basket.map(item => {
      if (item.id === action.payload.id) {
        item.count--;
      }
      return item
    })
   },

   resetBasket(state) {
    state.basket = []
   },

    

  },
});

export const selectBasket = (state: TypeRootState) => state.basket;

export const basketAction = basketSlice.actions;

export const basketReducer = basketSlice.reducer;