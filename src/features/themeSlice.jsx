import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  darkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setDarkMode: (state, action) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setTheme, setDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
