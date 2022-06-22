import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { commentServices } from '../Services/commentServices';
import { CommentItemProp } from '../../interfaces/CommentInterfaces';
import { postActions } from './postSlice';

const initialState = {
  loading: false,
  error: false,
  ammount: 0,
  commentList: [],
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          startCreateComment.rejected,
          startDeleteComment.rejected,
          startFetchComments.rejected
        ),
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(startFetchComments.fulfilled),
        (state, { payload }) => {
          state.loading = false;
          state.error = false;
          state.commentList = payload;
          state.ammount = payload.length;
        }
      )
      .addMatcher(
        isAnyOf(startCreateComment.fulfilled),
        (state: any, { payload }) => {
          state.loading = false;
          state.error = false;
          state.ammount += 1;
          state.commentList = [payload.comment, ...state.commentList];
        }
      )
      .addMatcher(
        isAnyOf(startDeleteComment.fulfilled),
        (state, { payload }) => {
          state.loading = false;
          state.error = false;
          state.ammount -= 1;
          state.commentList = state.commentList.filter(
            (comment: CommentItemProp) => comment.id !== payload
          );
        }
      );
  },
});

export const startCreateComment = createAsyncThunk(
  'comment/createComment',
  async (
    data: { id: string; comment: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const answ = await commentServices.createComment(data);
      // Increment the ammount of comments of post
      dispatch(
        postActions.handlePostCommentQuantity({ id: data.id, quantity: 1 })
      );
      return answ;
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);

export const startDeleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const answ = await commentServices.deleteComment(id);
      // Dicrement the ammount of comments of post
      dispatch(postActions.handlePostCommentQuantity({ id: id, quantity: -1 }));
      return answ;
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);

export const startFetchComments = createAsyncThunk(
  'comment/fetchComments',
  async (id: string, { rejectWithValue }) => {
    try {
      return await commentServices.fetchCommentsByPost(id);
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);
