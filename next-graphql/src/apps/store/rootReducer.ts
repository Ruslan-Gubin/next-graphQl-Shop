import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { getPersistConfig } from "redux-deep-persist";
import * as redusers from "@/features";
import { adminNavReducer } from "@/widgets/AdminLayout";

const rootReducer = combineReducers({
  burgerLayout: redusers.burgerLayoutReducer,
  layoutSearch: redusers.layoutSearchReducer,
  questions: redusers.questionsReducer,
  adminNotification: redusers.AdminNotificationReducer,
  adminNavHeader: redusers.adminNavHeaderReducer,
  adminNav: adminNavReducer,
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
    "adminNavHeader",
    // rtkQuery.productsApi.reducerPath,
  ],
  rootReducer,
});

export { config, rootReducer };
