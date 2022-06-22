import { createSlice } from '@reduxjs/toolkit';

interface uiSliceInitialProps {
  error: string | null;
  sidebarOpen: boolean;
  darkTheme: boolean;
}

const initialState: uiSliceInitialProps = {
  error: null,
  sidebarOpen: false,
  darkTheme: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    handleError: (state, { payload }) => {
      state.error = payload;
    },
    handleSidebar: (state, { payload }) => {
      state.sidebarOpen = payload;
    },
    handleDarkTheme: (state, { payload }) => {
      state.darkTheme = payload;
    },
  },
});

export const uiActions = uiSlice.actions;
