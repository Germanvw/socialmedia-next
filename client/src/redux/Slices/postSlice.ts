import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { PostItemProps } from '../../interfaces/PostInterfaces';
import { postServices } from '../Services/postServices';
import { authActions } from './authSlice';
interface InitStatePostProps {
  loading: boolean;
  postList: PostItemProps[];
  postListFav: PostItemProps[];
}

const initialState: InitStatePostProps = {
  loading: false,
  postList: [],
  postListFav: [],
};
export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    handlePostCommentQuantity: (state, { payload }) => {
      state.postList = state.postList.map((post: PostItemProps) => {
        if (post.id === parseInt(payload.id)) post.comments += payload.quantity;

        return post;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        startPostFetchAll.pending,
        startPostFetchByUser.pending,
        startPostCreate.pending,
        startPostDelete.pending,
        startPostFetchFavorite.pending,
        startPostChangeFavorite.pending
      ),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        startPostFetchAll.rejected,
        startPostFetchByUser.rejected,
        startPostCreate.rejected,
        startPostDelete.rejected,
        startPostFetchFavorite.rejected,
        startPostChangeFavorite.rejected
      ),
      (state) => {
        state.loading = false;
      }
    );
    builder.addMatcher(
      isAnyOf(startPostFetchAll.fulfilled, startPostFetchByUser.fulfilled),
      (state, { payload }) => {
        state.postList = payload.posts;
        state.loading = false;
      }
    );
    builder.addMatcher(
      isAnyOf(startPostCreate.fulfilled),
      (state, { payload }: any) => {
        state.postList = [payload.post, ...state.postList];
        state.loading = false;
      }
    );
    builder.addMatcher(
      isAnyOf(startPostDelete.fulfilled),
      (state, { payload }: any) => {
        state.postList = state.postList.filter(
          (post) => post.id !== parseInt(payload.answ.id)
        );
        state.loading = false;
      }
    );
    builder.addMatcher(
      isAnyOf(startPostFetchFavorite.fulfilled),
      (state, { payload }) => {
        state.postListFav = payload;
        state.loading = false;
      }
    );
    builder.addMatcher(
      isAnyOf(startPostChangeFavorite.fulfilled),
      (state, { payload }: any) => {
        if (payload.favorite) {
          state.postListFav = [payload.post, ...state.postListFav];
        } else {
          state.postListFav = state.postListFav.filter(
            (post) => post.id !== parseInt(payload.id)
          );
        }
        state.loading = false;
      }
    );
  },
});

export const startPostFetchAll = createAsyncThunk(
  'post/fetchAllPosts',
  async (_, { rejectWithValue }) => {
    try {
      return await postServices.postFetchAll();
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);

export const startPostFetchByUser = createAsyncThunk(
  'post/fetchPostsByUser',
  async (id: number, { rejectWithValue }) => {
    try {
      return await postServices.postFetchByUser(id);
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);

export const startPostCreate = createAsyncThunk(
  'post/createPost',
  async (
    data: { text: string; image: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const answ = await postServices.postCreate(data);
      if (answ.ok) {
        dispatch(authActions.handlePostQuantity(1));
        return answ;
      }
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);

export const startPostDelete = createAsyncThunk(
  'post/deletePost',
  async (
    data: { id: number; likesCount: number; redirect: boolean },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const answ = await postServices.postDelete(data.id);
      if (answ.ok) {
        dispatch(authActions.handlePostQuantity(-1));
        dispatch(authActions.handleLikeQuantity(-data.likesCount));
        return { answ, redirect: data.redirect };
      }
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);

export const startPostFetchFavorite = createAsyncThunk(
  'post/fetchFavoritePosts',
  async (_, { rejectWithValue }) => {
    try {
      const { ok, posts } = await postServices.postFetchFavorite();
      if (ok) {
        return posts;
      }
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);
export const startPostChangeFavorite = createAsyncThunk(
  'post/changeFavorite',
  async (id: number, { rejectWithValue }) => {
    try {
      const { favorite, ok, post } = await postServices.postChangeFavorite(id);
      if (ok) {
        return { id, favorite, post };
      }
    } catch (err: any) {
      return rejectWithValue(err.toString().split(': ')[1]);
    }
  }
);

export const postActions = postSlice.actions;
