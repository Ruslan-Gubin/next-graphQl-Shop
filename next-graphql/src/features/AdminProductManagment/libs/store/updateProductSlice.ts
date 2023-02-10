import { OPTIONS_DEPARTMENT } from "@/apps/constants";
import { TypeRootState } from "@/apps/store/srote";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ioption, IOptionDepartment, IUpdateProductInitial } from "../types/IUpdateProductInitial";


const initialState: IUpdateProductInitial = {  
departmentMenu: OPTIONS_DEPARTMENT[0],
subdepartmentMenu: OPTIONS_DEPARTMENT[0].subdepartment[0],
categoriesMenu: {value: '', label: '', id: ''},
page: 1,
perPage: 7,
};

const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {

    getDepartmentValue(state, action: PayloadAction<{value: IOptionDepartment}>) {
      state.departmentMenu = action.payload.value
      if (state.departmentMenu.subdepartment) {
        state.subdepartmentMenu = state.departmentMenu.subdepartment[0]
      }
      state.page = 1
    },

    getSubDepartmentValue(state, action: PayloadAction<{value: Ioption}>) {
      state.subdepartmentMenu = action.payload.value
      state.page = 1
    },
    
    setCategoriesValue(state, action: PayloadAction<{value: Ioption}>) {
      state.categoriesMenu = action.payload.value
      state.page = 1
    },

    setPageValue(state, action: PayloadAction<{value: number}>) {
      state.page = action.payload.value
    }


  },
});

export const selectUpdateProduct = (state: TypeRootState) => state.updateProduct;

export const updateProductAction = updateProductSlice.actions;

export const updateProductReducer = updateProductSlice.reducer;