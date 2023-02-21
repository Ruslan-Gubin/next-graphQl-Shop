import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "@/apps/store/srote";
import { IUser } from "@/apps/types";
import { IUserSlice } from "../libs/types/IUserSlice";


const initialState: IUserSlice = {
user: {} as IUser

};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {

    createdUser(state, action: PayloadAction<{user: IUser}>) {
      state.user = action.payload.user
    },
 

  },
});

export const selectUser = (state: TypeRootState) => state.User;

export const userAction = userSlice.actions;

export const userReducer = userSlice.reducer;
