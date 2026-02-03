import { configureStore } from "@reduxjs/toolkit";
import { specialistsApi } from "./specialistsApi";

export const store = configureStore({
  reducer: {
    [specialistsApi.reducerPath]: specialistsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(specialistsApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
