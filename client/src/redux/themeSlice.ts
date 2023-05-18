import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types";

const user: User = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")!)
  : null;

const initState = {
  theme: user?.theme || "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initState,
  reducers: {
    light: (state) => {
      state.theme = "light";
    },
    dark: (state) => {
      state.theme = "dark";
    },
  },
});

export default themeSlice.reducer;
export const { light, dark } = themeSlice.actions;
