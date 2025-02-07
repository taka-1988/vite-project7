import { configureStore, createReducer } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import cartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
