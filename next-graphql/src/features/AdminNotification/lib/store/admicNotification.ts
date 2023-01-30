import { TypeRootState } from "@/apps/store/srote";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {

}

const initialState: IInitialState = {

};

const adminNotificationSlice = createSlice({
  name: "adminNotification",
  initialState,
  reducers: {

    getActivModal(state) {
    
    },

    getValueInput(state, action: PayloadAction<{value: string}>) {
     
    },

    textValueClear(state) {
     
    },

    setNewQuestionId(state, action: PayloadAction<{id: string}>) {
   
    }



  },
});

export const selectAdminNotification = (state: TypeRootState) => state.adminNotification;

export const AdminNotificationAction = adminNotificationSlice.actions;

export const AdminNotificationReducer = adminNotificationSlice.reducer;
