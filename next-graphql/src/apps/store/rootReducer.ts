import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { getPersistConfig } from "redux-deep-persist";
import * as redusers from "@/features";
import { layoutShopReducer } from "@/widgets";
import { productDetailsReducer } from "@/entities";


const rootReducer = combineReducers({
  layoutShop: layoutShopReducer,
  questions: redusers.questionsReducer,
  adminNotification: redusers.AdminNotificationReducer,
  adminNavHeader: redusers.adminNavHeaderReducer,
  adminQuestion: redusers.adminQuestionReducer,
  createdProduct: redusers.createdProductReducer,
  createdProductImages: redusers.createdProductImagesReducer,
  updateProduct: redusers.updateProductReducer,
  updateOption: redusers.updateOptionReducer,
  catalogPage: redusers.catalogPageReducer,
  basket: redusers.basketReducer,
  User: redusers.userReducer,
  productDetails: productDetailsReducer,
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
    "catalogPage.categoryValue"
    // "updateOption",
    // rtkQuery.productsApi.reducerPath,
  ],
  rootReducer,
});

export { config, rootReducer };
