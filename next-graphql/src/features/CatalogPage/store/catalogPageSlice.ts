import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "../../../apps/store/srote";
import { ICatalogPageSlice } from "../model/ICatalogPageSlice";
import { sortProductOption } from "../constants/sortProductOption";


const initialState: ICatalogPageSlice = {
sortProduct: sortProductOption[0],
sizeCard: 'small',
page: 1,
perPage: 50,
categoryValue: {value: "Категория", label: "Категория", id: "",},
};

const catalogPageSlice = createSlice({
  name: "catalogPage",
  initialState,
  reducers: {

    getSortProductValue(state, action: PayloadAction<{value: any}>) {
      state.sortProduct = action.payload.value
    },

   setSizeCard(state, action: PayloadAction<{value: string}>) {
    state.sizeCard = action.payload.value
   },

   setPageValue(state, action: PayloadAction<{page: number}>) {
    state.page = action.payload.page
   },

   setCategoryValue(state, action: PayloadAction<{value: string, label: string, id: string}>) {
    state.categoryValue = action.payload
   },
    

  },
});

export const selectCatalogPage = (state: TypeRootState) => state.catalogPage;

export const catalogPageAction = catalogPageSlice.actions;

export const catalogPageReducer = catalogPageSlice.reducer;