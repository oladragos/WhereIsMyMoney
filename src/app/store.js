import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import statsReducer from "../features/stats";

export const store = configureStore({
  reducer: {
    user: userReducer,
    stats: statsReducer,
  },
});
