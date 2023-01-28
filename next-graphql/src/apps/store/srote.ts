import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import storage from "redux-persist/lib/storage";
import * as persist from "redux-persist";
import { getPersistConfig } from "redux-deep-persist";
import { productReducer } from "./produstSlice";
import { burgerLayoutReducer } from "@/features/LayoutHeaderBurger";
import { layoutSearchReducer } from "@/features/LayoutHeaderSearch";




export const rootReducer = combineReducers({
  product: productReducer,
  burgerLayout: burgerLayoutReducer,
  layoutSearch : layoutSearchReducer,
  // [rtkQuery.productsApi.reducerPath]: rtkQuery.productsApi.reducer,
})


export const config = getPersistConfig({
  key: "root",
  version: 1,
  storage, 
  blacklist: [
    "auth.password",
    "product",
    "burgerLayout",
    // rtkQuery.productsApi.reducerPath,
  ],
  rootReducer,
});

const persistedReducer = persist.persistReducer(config, rootReducer);
const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>  
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          persist.FLUSH,
          persist.REHYDRATE,
          persist.PAUSE,
          persist.PERSIST,
          persist.PURGE,
          persist.REGISTER,
        ],
      },
    }).concat([
      // rtkQuery.postApi.middleware, 
    ]),
});



const persistor = persist.persistStore(store);
export default store;

type AppDispatch = typeof store.dispatch;
const useAppDispatch = () => useDispatch<AppDispatch>();

type TypeRootState = ReturnType<typeof store.getState>;

export type { AppDispatch, TypeRootState };

export { persistor, useAppDispatch };
