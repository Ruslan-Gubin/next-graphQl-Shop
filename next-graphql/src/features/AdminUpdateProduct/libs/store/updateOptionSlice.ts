import { TypeRootState } from "../../../../apps/store/srote";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUpdateOptionSlice } from "../types/IUpdateOptionSlice";



const initialState: IUpdateOptionSlice = {  
updateProductStatus: false,
updateProductId: '',
optionValue: {} as { name:string, value: string}[],
addImage: [] as string[],
};

const updateOptionSlice = createSlice({
  name: "updateOption",
  initialState,
  reducers: {

    getOptions(state, action: PayloadAction<{ name:string, value: string, __typename: string}[]>) {
      const result = []
      for (let key of action.payload) {
        result.push({name: key.name, value: key.value})
      }
      state.optionValue = result
    },
    

    getProductId(state, action: PayloadAction<{id: string}>) {
      state.updateProductId = action.payload.id
    },

    setProductStatusUpdate(state, action: PayloadAction<{active: boolean}>) {
      state.updateProductStatus = action.payload.active
    },

    getOptionsValue(state, action: PayloadAction<{ind: number, value: string | number}>) {
      const ind = action.payload.ind
      state.optionValue[ind].value = action.payload.value;
    },


    getAddImages(state, action: PayloadAction<{img: string}>) {
      state.addImage = [...state.addImage, action.payload.img]
    },

    cancelAddImages(state, action: PayloadAction<{imag: string}>) {
      state.addImage = state.addImage.filter(item => item !== action.payload.imag)
    },

    cancelAddImage(state) {
      state.addImage = []
    },
    

  },
});

export const selectUpdateOption = (state: TypeRootState) => state.updateOption;

export const updateOptionAction = updateOptionSlice.actions;

export const updateOptionReducer = updateOptionSlice.reducer;