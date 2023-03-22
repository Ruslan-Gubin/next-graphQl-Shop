import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "../../../apps/store/srote";


import { IBasketProduct } from "../../Basket/libs/types/IBasketSlice";

const initialState: { favorites: IBasketProduct[] } = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {

    addFavorites(state, action: PayloadAction<{ product: IBasketProduct }>) {
      const checkFavorites = state.favorites.some(item => item.id === action.payload.product.id)

      if (!checkFavorites) {
        state.favorites = [action.payload.product, ...state.favorites];
      }
    },

    removeFavorites(state, action: PayloadAction<{ id: string }>) {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
    },

  },
});

export const selectFavorites = (state: TypeRootState) => state.favorites;

export const favoritesAction = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
