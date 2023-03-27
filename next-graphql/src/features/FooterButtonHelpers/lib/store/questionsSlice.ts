import { TypeRootState } from "../../../../apps/store/srote";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IInitialState {
  textQuestion: string;
  questionsId: string | '';
}

const initialState: IInitialState = {
  textQuestion: "",
  questionsId: '',
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {

    getValueInput(state, action) {
      state.textQuestion = action.payload
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
