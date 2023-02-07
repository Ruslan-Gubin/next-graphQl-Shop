import { TypeRootState } from "@/apps/store/srote";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { additationInitialState, additationSize, basicValueInitial } from "../../constants/additationInitialState";
import { OPTIONS_DEPARTMENT } from "../../constants/optionsMenu";
import { ICreatedProductSlice } from "../types/ICreatedProductSlice";
import { Ioption, IOptionDepartment } from "../types/IOptionsMenu";


const initialState: ICreatedProductSlice = {  
departmentMenu: OPTIONS_DEPARTMENT[0],
subdepartmentMenu: OPTIONS_DEPARTMENT[0].subdepartment[0],
categoriesMenu: {value: '', label: '', id: ''},
brandMenu: {value: '', label: '', id: ''},
colorMenu: {value: 'Цвет не указан', label: 'no-color'},
additationalOption: additationInitialState, 
additationSize: additationSize,
basicValue: basicValueInitial,
brandValue: '',
categoryValue: '',
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
    
    getCategoriesValue(state, action: PayloadAction<{value: {value: string, label: string, id: string | undefined}}>) {
      state.categoriesMenu = action.payload.value
      if (state.categoriesMenu.id) {
        state.categoryValue = state.categoriesMenu.value
      } else {
        state.categoryValue = ''
      }
    },

    setBrandMenu(state, action: PayloadAction<{value: {value: string, label: string, id: string | undefined}}>) {
      state.brandMenu = action.payload.value
      if (state.brandMenu.id) {
        state.brandValue = state.brandMenu.value
      } else {
        state.brandValue = ''
      }
    },

    getCategoryValue(state, action: PayloadAction<{value: string | number}>) {
      state.categoryValue = action.payload.value
    },

    getBrandValue(state, action: PayloadAction<{value: string | number}>) {
      state.brandValue = action.payload.value
    },

    getBasicValue(state, action: PayloadAction<{key: string, value: string | number}>) {
      const keys = action.payload.key
       state.basicValue[keys] = action.payload.value
    },

    setAdditationValue(state, action: PayloadAction<{key: string, value: string}>) {
      const keys = action.payload.key
       state.additationalOption[keys] = action.payload.value
    },

    setAdditationSizeValue(state, action: PayloadAction<{key: string, value: string}>) {
      const keys = action.payload.key
       state.additationSize[keys] = action.payload.value
    },

    setColorMenu(state, action: PayloadAction<{value:{value: string, label: string}}>) {
       state.colorMenu = action.payload.value
    },

    clearValuesInputs(state) {
      for (let key in state.basicValue) {
        state.basicValue[key] = ''
      }
      for (let key in state.additationSize) {
        state.additationSize[key] = ''
      }
      for (let key in state.additationalOption) {
        state.additationalOption[key] = ''
      }

      state.colorMenu = {value: 'Цвет не указан', label: 'no-color'}
      
    },
 

  },
});

export const selectCreatedProduct = (state: TypeRootState) => state.createdProduct;

export const createdProductAction = createdProductSlice.actions;

export const createdProductReducer = createdProductSlice.reducer;