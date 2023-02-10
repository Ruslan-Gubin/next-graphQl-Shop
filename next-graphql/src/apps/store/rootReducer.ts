import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { getPersistConfig } from "redux-deep-persist";
import * as redusers from "@/features";


const rootReducer = combineReducers({
  burgerLayout: redusers.burgerLayoutReducer,
  layoutSearch: redusers.layoutSearchReducer,
  questions: redusers.questionsReducer,
  adminNotification: redusers.AdminNotificationReducer,
  adminNavHeader: redusers.adminNavHeaderReducer,
  adminQuestion: redusers.adminQuestionReducer,
  createdProduct: redusers.createdProductReducer,
  createdProductImages: redusers.createdProductImagesReducer,
  updateProduct: redusers.updateProductReducer,
  updateOption: redusers.updateOptionReducer,
  // [rtkQuery.productsApi.reducerPath]: rtkQuery.productsApi.reducer,
});

const config = getPersistConfig({
  key: "root",
  version: 1,
  storage,
  blacklist: [
    "auth.password",
    "product",
    "burgerLayout",
    "adminNotification",
    // "updateOption",
    // rtkQuery.productsApi.reducerPath,
  ],
  rootReducer,
});

export { config, rootReducer };
