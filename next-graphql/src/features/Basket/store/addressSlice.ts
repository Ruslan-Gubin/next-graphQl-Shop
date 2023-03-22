import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "../../../apps/store/srote";
import { IAddress, IAddressSlice } from "../libs/types/IAddressSlice";



const initialState: IAddressSlice = {
  address: [] as IAddress[],
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {

   setAddressBuyer(state, action: PayloadAction<{value: IAddress}>) {
    if (state.address.length) {
    state.address = state.address.map(item => {
      return { ...item, selected: false }
    })
    }
    const newAddress = action.payload.value
    newAddress.selected = true
    newAddress.id = `${action.payload.value.street}${Date.now()}`
    state.address = [action.payload.value, ...state.address]
   },

   removeAddress(state, action: PayloadAction<{id: string | undefined}>) {
    state.address = state.address.filter(item => item.id !== action.payload.id)
   },

   selectedAddress(state, action: PayloadAction<{id: string | undefined}>) {
    state.address.find(item => {
      if (item.id === action.payload.id) {
        item.selected = true
      } else {
        item.selected = false
      }
    })
   },
   

  },
});

export const selectAddress = (state: TypeRootState) => state.address;

export const addressAction = addressSlice.actions;

export const addressReducer = addressSlice.reducer;