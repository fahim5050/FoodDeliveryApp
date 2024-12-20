import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: false, // default to light mode
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state) => {
      state.darkMode = true;
    },
    setLightMode: (state) => {
      state.darkMode = false;
    },
  },
});

export const { toggleTheme, setDarkMode, setLightMode } = themeSlice.actions;
export default themeSlice.reducer;
