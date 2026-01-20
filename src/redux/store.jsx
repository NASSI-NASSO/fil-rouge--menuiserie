import { configureStore } from "@reduxjs/toolkit";
import devisReducer from "./devisSlice";

export const store = configureStore({
  reducer: {
    devis: devisReducer,
  },
});
