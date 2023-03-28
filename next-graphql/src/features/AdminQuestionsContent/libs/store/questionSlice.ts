import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "../../../../apps/store/srote";


interface IquestionSlice {
questionMenu: 'vieweds' | 'allQuestions'
}

const initialState: IquestionSlice = {
  questionMenu: 'vieweds',
};

const adminQuestionSlice = createSlice({
  name: "adminQuestion",
  initialState,
  reducers: {

    setMenuSortQuestions(state, action: PayloadAction<{value: 'vieweds' | 'allQuestions'}>) {
      state.questionMenu = action.payload.value
    }

  },
});

export const selectAdminQuestion = (state: TypeRootState) => state.adminQuestion;

export const adminQuestionAction = adminQuestionSlice.actions;

export const adminQuestionReducer = adminQuestionSlice.reducer;