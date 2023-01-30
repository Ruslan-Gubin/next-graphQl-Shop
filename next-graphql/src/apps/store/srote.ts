import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import * as persist from "redux-persist";
import { config, rootReducer } from "./rootReducer";


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
