import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "@/apps/store/srote";
import { IAddress, IBasketProduct, IBasketSlice } from "../libs/types/IBasketSlice";


const initialState: IBasketSlice = {
basket: [],
address: [] as IAddress[],
favorites: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {

    addProduct(state, action: PayloadAction<{product: IBasketProduct}>) {
      state.basket = [action.payload.product, ...state.basket]
    },

    addFavorites(state, action: PayloadAction<{product: IBasketProduct}>) {
      state.favorites = [action.payload.product, ...state.favorites]
    },

    removeFavorites(state, action: PayloadAction<{id: string}>) {
      state.favorites = state.favorites.filter(item => item.id !== action.payload.id)
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

   addFavoritAndRemoveBasket(state, action: PayloadAction<{product: IBasketProduct}>) {
    const check = state.favorites.find(item => item.id === action.payload.product.id)
    if (!check) {
      state.favorites = [action.payload.product, ...state.favorites]
    }
    state.basket = state.basket.filter(item => item.id !== action.payload.product.id)
   },

   addBasketAndRemoveFavorites(state, action: PayloadAction<{product: IBasketProduct}>) {
    const check = state.basket.find(item => item.id === action.payload.product.id)
    if (!check) {
      state.basket = [action.payload.product, ...state.basket]
    }
    state.favorites = state.favorites.filter(item => item.id !== action.payload.product.id)
   },

   resetBasket(state) {
    state.basket = []
   },

    

  },
});

export const selectBasket = (state: TypeRootState) => state.basket;

export const basketAction = basketSlice.actions;

export const basketReducer = basketSlice.reducer;