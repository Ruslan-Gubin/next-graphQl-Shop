import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "@/apps/store/srote";
import { IAddress, IBasketProduct, IBasketSlice } from "../libs/types/IBasketSlice";


const initialState: IBasketSlice = {
basket: [],
address: [] as IAddress[],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {

    addProduct(state, action: PayloadAction<{product: IBasketProduct}>) {
      state.basket = [action.payload.product, ...state.basket]
    },

   setAddressBuyer(state, action: PayloadAction<{value: IAddress}>) {
    if (state.address.length) {
    state.address = state.address.map(item => {
      return { ...item, selected: false }
    })
    }
    const newAddress = action.payload.value
    newAddress.selected = true
    newAddress.id = `${action.payload.value.street}${Date.now()}`
    state.address = [action.payload.value, ...state.address]
   },

   removeAddress(state, action: PayloadAction<{id: string | undefined}>) {
    state.address = state.address.filter(item => item.id !== action.payload.id)
   },

   selectedAddress(state, action: PayloadAction<{id: string | undefined}>) {
    state.address.find(item => {
      if (item.id === action.payload.id) {
        item.selected = true
      } else {
        item.selected = false
      }
    })
   },

   increment(state, action: PayloadAction<{id: string}>) {
    state.basket = state.basket.map(item => {
      if (item.id === action.payload.id) {
        item.count++
      }
      return item
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

   removeProduct(state, action: PayloadAction<{id: string}>) {
    state.basket = state.basket.filter(item => item.id !== action.payload.id)
   },

    

  },
});

export const selectBasket = (state: TypeRootState) => state.basket;

export const basketAction = basketSlice.actions;

export const basketReducer = basketSlice.reducer;