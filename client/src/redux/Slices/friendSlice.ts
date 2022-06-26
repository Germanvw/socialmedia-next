import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  FriendRequestListProps,
  InitStateFriendProps,
} from '../../interfaces/FriendInterfaces';
import { UserAtFriendList } from '../../interfaces/UserInterfaces';
import { friendServices } from '../Services/friendServices';
import { authActions } from './authSlice';
import { uiActions } from './uiSlice';

const initialState: InitStateFriendProps = {
  loading: false,
  error: null,
  friendList: [],
  friendRequestList: [],
};
export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          startFriendRequestFetch.pending,
          startFriendRequestSend.pending,
          startFriendRequestResponse.pending,
          startFriendFetchAll.pending,
          startFriendAdd.pending,
          startFriendRemove.pending
        ),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(startFriendFetchAll.fulfilled),
        (state, { payload }) => {
          state.friendList = payload.friendList;
          state.loading = false;
        }
      )
      .addMatcher(
        isAnyOf(startFriendRequestFetch.fulfilled),
        (state, { payload }) => {
          state.friendRequestList = payload.friendRequestList;
          state.loading = false;
        }
      )
      .addMatcher(
        isAnyOf(startFriendAdd.fulfilled),
        (state: any, { payload }) => {
          state.loading = false;
          state.friendList.push(payload.user);
        }
      )
      .addMatcher(isAnyOf(startFriendRequestSend.fulfilled), (state) => {
        state.loading = false;
      })
      .addMatcher(
        isAnyOf(startFriendRequestResponse.fulfilled),
        (state, { payload }) => {
          state.friendRequestList = state.friendRequestList.filter(
            (frItem: FriendRequestListProps) =>
              frItem.user.id !== payload.friend
          );
          state.loading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          startFriendRequestFetch.rejected,
          startFriendRequestSend.rejected,
          startFriendRequestResponse.rejected,
          startFriendFetchAll.rejected,
          startFriendAdd.rejected,
          startFriendRemove.rejected
        ),
        (state: any, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      )
      .addMatcher(
        isAnyOf(startFriendRemove.fulfilled),
        (state, { payload }) => {
          state.loading = false;
          state.friendList = state.friendList.filter(
            (friend: UserAtFriendList) => friend.id !== payload.id
          );
        }
      );
  },
});

export const startFriendRequestFetch = createAsyncThunk(
  'friend/startFriendRequestFetch',
  async (_, { rejectWithValue }) => {
    try {
      return await friendServices.friendRequestFetch();
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);

export const startFriendRequestSend = createAsyncThunk(
  'friend/startFriendRequestSend',
  async (id: number, { dispatch }) => {
    try {
      const answ = await friendServices.friendRequestSend(id);
      if (answ?.ok)
        dispatch(
          uiActions.handleAlert({
            status: 'success',
            title: 'Success',
            body: 'Friend Request Sent!',
            show: true,
          })
        );
      return answ;
    } catch (err: any) {
      console.log(err.toString());
      return dispatch(
        uiActions.handleAlert({
          status: 'error',
          title: 'Error',
          body: err.toString().split(': ')[1],
          show: true,
        })
      );
    }
  }
);

export const startFriendRequestResponse = createAsyncThunk(
  'friend/startFriendRequestResponse',
  async (
    response: { id: number; response: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const answ = await friendServices.friendRequestResponse(response);
      console.log(answ);
      if (answ.response === 1) dispatch(startFriendAdd(answ.friend));
      return answ;
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);
export const startFriendFetchAll = createAsyncThunk(
  'friend/startFriendFetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await friendServices.friendFetchAll();
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);

export const startFriendAdd = createAsyncThunk(
  'friend/startFriendAdd',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const answ = await friendServices.friendAdd(id);
      // Icrement friend count
      dispatch(authActions.handleFriendsQuantity(1));
      return answ;
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);

export const startFriendRemove = createAsyncThunk(
  'friend/startFriendRemove',
  async (id: any, { rejectWithValue, dispatch }) => {
    try {
      const answ = await friendServices.friendRemove(id);
      // Dicrement friend count
      dispatch(
        uiActions.handleAlert({
          status: 'success',
          title: 'Success',
          body: 'Friend Removed.',
          show: true,
        })
      );
      dispatch(authActions.handleFriendsQuantity(-1));
      return answ;
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);
