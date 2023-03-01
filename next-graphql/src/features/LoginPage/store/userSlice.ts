import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "../../../apps/store/srote";
import { IUser } from "../../../apps/types";
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
      window.localStorage.setItem('token', action.payload.user.token)
      window.localStorage.setItem('userId', action.payload.user._id)
    },

    updateUser(state, action: PayloadAction<{user: IUser}>) {
      state.user = {
        ...state.user,
        name: action.payload.user.name,
        email: action.payload.user.email,
        image: action.payload.user.image,
      }
    },

    removeUser(state) {
      state.user = {} as IUser
    },

    
 

  },
});

export const selectUser = (state: TypeRootState) => state.User;

export const userAction = userSlice.actions;

export const userReducer = userSlice.reducer;
