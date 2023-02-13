import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "@/apps/store/srote";

interface IInitialState {
  asideLayoutStatus: boolean
}

const initialState: IInitialState = {
  asideLayoutStatus: false
};

const burgerLayoutSlice = createSlice({
  name: "burgerLayout",
  initialState,
  reducers: {

    asideLayoutToggle(state) {
      if (!state.asideLayoutStatus) {
        state.asideLayoutStatus = true
      } else {
        state.asideLayoutStatus = false
      }
    },

  }
});

export const selectLayoutBurger = (state: TypeRootState) => state.burgerLayout;

export const burgerLayoutAction = burgerLayoutSlice.actions;

export const burgerLayoutReducer = burgerLayoutSlice.reducer;