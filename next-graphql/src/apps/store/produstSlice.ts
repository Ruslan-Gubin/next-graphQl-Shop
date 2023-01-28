import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {TypeRootState} from './srote'


const initialState: any = {

};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {

    setTitleValue(state, action: PayloadAction<{ value: number | string }>) {
    
    },

  }
});

export const selectProduct = (state: TypeRootState) => state.product;

export const productAction = productSlice.actions;

export const productReducer = productSlice.reducer;