import { TypeRootState } from "@/apps/store/srote";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
activeLink: string;
}

const initialState: IInitialState = {
  activeLink: '',
};

const adminNavSlice = createSlice({
  name: "adminNav",
  initialState,
  reducers: {

    setActivLink(state, action : PayloadAction<{label: string}>) {
      state.activeLink = action.payload.label
    },



  },
});

export const selectAdminNavHeader = (state: TypeRootState) => state.adminNav;

export const adminNavAction = adminNavSlice.actions;

export const adminNavReducer = adminNavSlice.reducer;

