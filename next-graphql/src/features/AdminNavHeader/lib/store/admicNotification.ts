import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "../../../../apps/store/srote";

interface IInitialState {
searchValue: string;
burgerStatus: boolean;
}

const initialState: IInitialState = {
  searchValue: '',
  burgerStatus: false,
};

const adminNavHeaderSlice = createSlice({
  name: "adminNavHeader",
  initialState,
  reducers: {

    toggleBurgerStatus(state) {
    if (state.burgerStatus) {
      state.burgerStatus = false
    } else {
      state.burgerStatus = true
    }
    },

    getValueInput(state, action: PayloadAction<{value: string}>) {
     state.searchValue = action.payload.value
    },

  },
});

export const selectAdminNavHeader = (state: TypeRootState) => state.adminNavHeader;

export const adminNavHeaderAction = adminNavHeaderSlice.actions;

export const adminNavHeaderReducer = adminNavHeaderSlice.reducer;
