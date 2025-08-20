import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat((store) => (next) => (action) => {
      console.log("🛠 Redux Action:", action);
      return next(action);
    }),
});
