import { TypeRootState } from "@/apps/store/srote";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  searchValue: string
}

const initialState: IInitialState = {
  searchValue: '',

}

const layoutSearchSlice = createSlice({
  name: 'layoutSearch',
  initialState,
  reducers: ({

    getSearchValue(state, action) {
      state.searchValue = action.payload.value
    }


  })
})

export const selectLayoutSherch = (state: TypeRootState) => state.layoutSearch;

export const layoutSearchAction = layoutSearchSlice.actions;

export const layoutSearchReducer = layoutSearchSlice.reducer;