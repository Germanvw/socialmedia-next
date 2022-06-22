import { createSlice, isAnyOf, createAsyncThunk } from '@reduxjs/toolkit';
import { dropdownServices } from '../Services/dropdownServices';

interface dropdownSliceProps {
  loading: boolean;
  genders: [];
  countries: [];
}

const initialState: dropdownSliceProps = {
  loading: false,
  genders: [],
  countries: [],
};

export const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(startFetchGenders.pending, startFetchCountries.pending),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(startFetchCountries.fulfilled),
        (state: any, { payload }) => {
          state.loading = false;
          state.countries = payload;
        }
      )
      .addMatcher(
        isAnyOf(startFetchGenders.fulfilled),
        (state: any, { payload }) => {
          state.loading = false;
          state.genders = payload;
        }
      );
  },
});

export const startFetchGenders = createAsyncThunk(
  'dropdown/fetchGenders',
  async (_, { rejectWithValue }) => {
    try {
      const answ = await dropdownServices.fetchGenders();
      return answ;
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);

export const startFetchCountries = createAsyncThunk(
  'dropdown/fetchContries',
  async (_, { rejectWithValue }) => {
    try {
      const answ = await dropdownServices.fetchCountries();
      return answ;
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);

export const uiActions = dropdownSlice.actions;
