import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  RegisterUser,
  UpdateUser,
  UserDataWithEmail,
} from '../../interfaces/UserInterfaces';
import { authServices } from '../Services/authServices';

interface InitStateAuthProps {
  loading: boolean;
  error: string | null;
  user: UserDataWithEmail | null;
  refreshing: boolean;
}

const initialState: InitStateAuthProps = {
  loading: false,
  refreshing: true,
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      localStorage.removeItem('x-token');
    },
    removeError: (state) => {
      state.error = null;
    },
    handlePostQuantity: (state, { payload }) => {
      state.user!.metaData.posts += payload;
    },
    handleLikeQuantity: (state, { payload }) => {
      state.user!.metaData.likes += payload;
    },
    handleFriendsQuantity: (state, { payload }) => {
      state.user!.metaData.friends += payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          startLogin.fulfilled,
          startUserUpdate.fulfilled,
          startRefreshToken.fulfilled
        ),
        (state, { payload }) => {
          state.loading = false;
          state.error = null;
          state.user = payload.user;
          localStorage.setItem('x-token', payload.token);
        }
      )
      .addMatcher(isAnyOf(startRegister.fulfilled), (state) => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(
          startRegister.rejected,
          startLogin.rejected,
          startRefreshToken.rejected
        ),
        (state: any, { payload }) => {
          state.loading = false;
          state.error = payload;
          state.user = null;
          localStorage.removeItem('x-token');
        }
      )
      .addMatcher(
        isAnyOf(startUserUpdate.rejected),
        (state: any, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      )
      .addMatcher(
        isAnyOf(
          startLogin.pending,
          startRegister.pending,
          startRefreshToken.pending,
          startUserUpdate.pending
        ),
        (state) => {
          state.loading = true;
        }
      );
  },
});
export const startRegister = createAsyncThunk(
  'auth/register',
  async (user: RegisterUser, { rejectWithValue }) => {
    try {
      return await authServices.register(user);
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);

export const startLogin = createAsyncThunk(
  'auth/login',
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await authServices.login(user);
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);

export const startUserUpdate = createAsyncThunk(
  'auth/update',
  async (user: UpdateUser, { rejectWithValue }) => {
    try {
      return await authServices.userUpdate(user);
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);

export const startRefreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      return await authServices.refreshToken();
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);
export const authActions = authSlice.actions;
