import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "../../../apps/store/srote";
import { ICatalogPageSlice } from "../model/ICatalogPageSlice";
import { sortProductOption } from "../constants/sortProductOption";


const initialState: ICatalogPageSlice = {
   page: 1,
   perPage: 50,
   totalLength: 0,
   productCount: 0,
   selected: {
     sort: sortProductOption[0],
     subDepartmen: {value: "", label: ""},
     category: {value: "Категория", label: "Категория", id: ""},
     brand: { value: "Бренд", label: "Бренд", id: ""  },
     price: { minPrice: 0, maxPrice: 30000}
    },
    optionsArr: {
     sort:  sortProductOption,
     brand: [],
    },
};

const catalogPageSlice = createSlice({
  name: "catalogPage",
  initialState,
  reducers: {

    setSubDepartment(state, action: PayloadAction<{ value: string, label: string}>) {
      state.selected.subDepartmen = action.payload
      state.selected.brand = { value: "Бренд", label: "Бренд", id: "" }
      state.page = 1
    },

    setCategoryValue(state, action: PayloadAction< {value: string, label: string, id: string}>) {
      state.selected.category = action.payload
      state.selected.brand = { value: "Бренд", label: "Бренд", id: "" }
      state.page = 1
    },

    setBrandOptions(state, action: PayloadAction< {value: string, label: string, id: string}[]>) {
      state.optionsArr.brand = action.payload
    },

    setBrandValue(state, action: PayloadAction< {value: string, label: string, id: string}>) {
      state.selected.brand = action.payload
      state.page = 1
    },

    setSortValue(state, action: PayloadAction<{value: any}>) {
      state.selected.sort = action.payload.value
    },

   setPageValue(state, action: PayloadAction<{page: number}>) {
    state.page = action.payload.page
   },

   setPrice(state, action: PayloadAction<{minPrice: number, maxPrice: number}>) {
    state.selected.price.maxPrice = action.payload.maxPrice
    state.selected.price.minPrice = action.payload.minPrice
    state.page = 1
   },

   setTotalLength(state, action: PayloadAction<{count: number}>) {
    state.totalLength = action.payload.count
   },

   setProductsCount(state, action: PayloadAction<{count: number}>) {
    state.productCount = action.payload.count
   },
    

  },
});

export const selectCatalogPage = (state: TypeRootState) => state.catalogPage;

export const catalogPageAction = catalogPageSlice.actions;

export const catalogPageReducer = catalogPageSlice.reducer;




// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { TypeRootState } from "../../../apps/store/srote";
// import { ICatalogPageSlice } from "../model/ICatalogPageSlice";
// import { sortProductOption } from "../constants/sortProductOption";


// const initialState: ICatalogPageSlice = {
// sortProduct: sortProductOption[0],
// page: 1,
// perPage: 50,
// categoryValue: { value: "Категория", label: "Категория", id: "" },

// };

// const catalogPageSlice = createSlice({
//   name: "catalogPage",
//   initialState,
//   reducers: {

//     getSortProductValue(state, action: PayloadAction<{value: any}>) {
//       state.sortProduct = action.payload.value
//     },

//    setPageValue(state, action: PayloadAction<{page: number}>) {
//     state.page = action.payload.page
//    },

//    setCategoryValue(state, action: PayloadAction<{value: string, label: string, id: string}>) {
//     state.categoryValue = action.payload
//    },
    

//   },
// });

// export const selectCatalogPage = (state: TypeRootState) => state.catalogPage;

// export const catalogPageAction = catalogPageSlice.actions;

// export const catalogPageReducer = catalogPageSlice.reducer;