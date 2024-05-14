import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishlistslice";
export const store = configureStore({
  reducer: {
    wishlistReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
