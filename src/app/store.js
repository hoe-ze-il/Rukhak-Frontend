// import { configureStore } from "@reduxjs/toolkit";
// import productReducer from "../features/productSlice";
// import productInventoryReducer from "../features/inventorySlice";

// export const store = configureStore({
//   reducer: {
//     product: productReducer,
//     productInventory: productInventoryReducer,
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../utils/apiSlice";
import authReducer from "../features/auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import notificationReducer from "@/features/notification/notificationSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
