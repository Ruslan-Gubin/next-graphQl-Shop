import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "@/apps/store/srote";

interface IInitialState {
  active: boolean
}

const initialState: IInitialState = {
active: false
};

const burgerLayoutSlice = createSlice({
  name: "burgerLayout",
  initialState,
  reducers: {

    setActiveToggle(state) {
    state.active = !state.active
    },

  }
});

export const selectLayoutBurger = (state: TypeRootState) => state.burgerLayout;

export const burgerLayoutAction = burgerLayoutSlice.actions;

export const burgerLayoutReducer = burgerLayoutSlice.reducer;