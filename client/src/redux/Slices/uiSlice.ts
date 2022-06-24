import { createSlice } from '@reduxjs/toolkit';

interface uiSliceInitialProps {
  error: string | null;
  sidebarOpen: boolean;
  darkTheme: boolean;
  alert: AlertProps;
}

interface AlertProps {
  status: 'error' | 'success' | 'info' | 'warning';
  title: string;
  body: string;
  show: boolean;
}

const initialState: uiSliceInitialProps = {
  error: null,
  sidebarOpen: false,
  darkTheme: false,
  alert: {
    status: 'error',
    title: '',
    body: '',
    show: false,
  },
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
    handleAlert: (state, { payload }) => {
      state.alert = payload;
    },
  },
});

export const uiActions = uiSlice.actions;
