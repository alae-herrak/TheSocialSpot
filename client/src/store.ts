import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./redux/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
});
