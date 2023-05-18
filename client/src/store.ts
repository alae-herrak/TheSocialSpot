import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./redux/themeSlice";
import userSlice from "./redux/userSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice
  },
});
