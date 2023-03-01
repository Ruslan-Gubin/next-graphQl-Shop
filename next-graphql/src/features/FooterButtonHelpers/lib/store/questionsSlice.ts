import { TypeRootState } from "../../../../apps/store/srote";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  modalStatus: boolean;
  textQuestion: string;
  questionsId: string | null;
}

const initialState: IInitialState = {
  modalStatus: false,
  textQuestion: "",
  questionsId: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {

    getActivModal(state) {
      if (!state.modalStatus) {
        state.modalStatus = true;
      } else {
        state.modalStatus = false;
      }
    },

    getValueInput(state, action: PayloadAction<{value: string}>) {
      state.textQuestion = action.payload.value
    },

    textValueClear(state) {
      state.textQuestion = ''
    },

    setNewQuestionId(state, action: PayloadAction<{id: string}>) {
      state.questionsId = action.payload.id
    }



  },
});

export const selectQuestions = (state: TypeRootState) => state.questions;

export const questionsAction = questionsSlice.actions;

export const questionsReducer = questionsSlice.reducer;
