import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "@/apps/store/srote";

interface IInitialState {
  asideLayoutStatus: boolean
  searchValue: string
}

const initialState: IInitialState = {
  asideLayoutStatus: false,
  searchValue: '',
};

const layoutShopSlice = createSlice({
  name: "layoutShop",
  initialState,
  reducers: {

    asideLayoutToggle(state) {
      if (!state.asideLayoutStatus) {
        state.asideLayoutStatus = true
      } else {
        state.asideLayoutStatus = false
      }
    },

    getSearchValue(state, action) {
      state.searchValue = action.payload.value
    },

    asideCancel(state) {
      if (state.asideLayoutStatus) {
        state.asideLayoutStatus = false
      }
    }

  }
});

export const selectLayoutShop = (state: TypeRootState) => state.layoutShop;

export const layoutShopAction = layoutShopSlice.actions;

export const layoutShopReducer = layoutShopSlice.reducer;