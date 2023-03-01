import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "../../../../apps/store/srote";
import { IQuestion } from "../types/IQueston";


interface IquestionSlice {
valueAnswer: string;
checkVieweds: IQuestion[];
questionMenu: 'vieweds' | 'allQuestions'
}

const initialState: IquestionSlice = {
  valueAnswer: '',
  checkVieweds: [],
  questionMenu: 'vieweds',
};

const adminQuestionSlice = createSlice({
  name: "adminQuestion",
  initialState,
  reducers: {

    getFilterMenuArray(state, action: PayloadAction<{data: IQuestion[]}>) {
        const filterCheckViewed = action.payload.data.filter((item: any) => !item.viewed)
        state.checkVieweds = filterCheckViewed
    },

    setUpdateAfterRemove(state, action: PayloadAction<{id: string}>) {
        state.checkVieweds = state.checkVieweds.filter((item: IQuestion) => item._id !== action.payload.id)
    },

    showAllQuestions(state, action: PayloadAction<{data: IQuestion[]}>) {
        state.checkVieweds = action.payload.data
    },

    getValueInput(state, action: PayloadAction<{value: string}>) {
      state.valueAnswer = action.payload.value
    },

    clearValueInput(state) {
      state.valueAnswer = ''
    },

    setMenuSortQuestions(state, action: PayloadAction<{value: 'vieweds' | 'allQuestions'}>) {
      state.questionMenu = action.payload.value
    }

  },
});

export const selectAdminQuestion = (state: TypeRootState) => state.adminQuestion;

export const adminQuestionAction = adminQuestionSlice.actions;

export const adminQuestionReducer = adminQuestionSlice.reducer;