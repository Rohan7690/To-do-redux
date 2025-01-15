import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkTheme: true,
  isBlockView: true,
  currentFilter: 'all',
  searchTerm: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    toggleView: (state) => {
      state.isBlockView = !state.isBlockView;
    },
    setFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    }
  }
});

export const { toggleTheme, toggleView, setFilter, setSearchTerm } = uiSlice.actions;
export default uiSlice.reducer;

