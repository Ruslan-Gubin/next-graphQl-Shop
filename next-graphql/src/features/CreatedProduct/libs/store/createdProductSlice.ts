import { TypeRootState } from "@/apps/store/srote";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { additationInitialState, additationSize, basicValueInitial } from "../../constants/additationInitialState";
import { OPTIONS_DEPARTMENT } from "../../constants/optionsMenu";
import { ICreatedProductSlice } from "../types/ICreatedProductSlice";
import { Ioption, IOptionDepartment } from "../types/IOptionsMenu";


const initialState: ICreatedProductSlice = { 
departmentMenu: OPTIONS_DEPARTMENT[0],
subdepartmentMenu: {value: '', label: ''},
categoriesMenu: {value: 'Новая категория', label: 'new-category'},
additationalOption: additationInitialState, 
additationSize: additationSize,
basicValue: basicValueInitial,
};

const createdProductSlice = createSlice({
  name: "createdProduct",
  initialState,
  reducers: {

    getDepartmentValue(state, action: PayloadAction<{value: IOptionDepartment}>) {
      state.departmentMenu = action.payload.value
      if (state.departmentMenu.subdepartment) {
        state.subdepartmentMenu = state.departmentMenu.subdepartment[0]
      }
    },

    getSubDepartmentValue(state, action: PayloadAction<{value: Ioption}>) {
      state.subdepartmentMenu = action.payload.value
    },
    
    getCategoriesValue(state, action: PayloadAction<{value: Ioption}>) {
      state.categoriesMenu = action.payload.value
    },

    getAdditationValue(state, action: PayloadAction<{key: string, value: string}>) {
      const keys = action.payload.key
       state.additationalOption[keys] = action.payload.value
    },

    getAdditationSizeValue(state, action: PayloadAction<{key: string, value: string}>) {
      const keys = action.payload.key
       state.additationSize[keys] = action.payload.value
    },

    getBasicValue(state, action: PayloadAction<{key: string, value: string | number}>) {
      const keys = action.payload.key
       state.basicValue[keys] = action.payload.value
    },

    clearValuesInputs(state) {

    },
 

  },
});

export const selectCreatedProduct = (state: TypeRootState) => state.createdProduct;

export const createdProductAction = createdProductSlice.actions;

export const createdProductReducer = createdProductSlice.reducer;