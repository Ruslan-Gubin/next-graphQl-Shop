import { TypeRootState } from "@/apps/store/srote";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {

}

const initialState: IInitialState = {

};

const adminNavHeaderSlice = createSlice({
  name: "adminNavHeader",
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

export const selectAdminNavHeader = (state: TypeRootState) => state.adminNavHeader;

export const adminNavHeaderAction = adminNavHeaderSlice.actions;

export const adminNavHeaderReducer = adminNavHeaderSlice.reducer;
