import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "../../../apps/store/srote";


interface ISizeCardSlice {
  sizeCard: string
}

const initialState: ISizeCardSlice = {
sizeCard: 'small',
};

const sizeCatalogCardSlice = createSlice({
  name: "catalogSizeCard",
  initialState,
  reducers: {

   setSizeCard(state, action: PayloadAction<{value: string}>) {
    state.sizeCard = action.payload.value
   },

  },
});

export const selectSizeCatalogCard = (state: TypeRootState) => state.catalogSizeCard;

export const sizeCatalogCardAction = sizeCatalogCardSlice.actions;

export const sizeCatalogCardReducer = sizeCatalogCardSlice.reducer;