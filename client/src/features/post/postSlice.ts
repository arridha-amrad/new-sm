import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Alert } from "../alert/interface";
import { User } from "../user/interface";
import { Post, PostState } from "./interface";
import {
  createCommentAPI,
  CreateCommentDTO,
  createPostAPI,
  getPostsAPI,
  likePostAPI,
} from "./postApi";

const initialState: PostState = {
  alert: null,
  isLoading: false,
  post: null,
  posts: [],
};

export const createPostAction = createAsyncThunk(
  "post/createPost",
  async (formData: FormData, thunkAPI) => {
    try {
      const { data } = await createPostAPI(formData);
      return data.post;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getPostsAction = createAsyncThunk(
  "post/getPosts",
  async (_, thunkAPI) => {
    try {
      const { data } = await getPostsAPI();
      return data.posts;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const likePostAction = createAsyncThunk(
  "post/likePost",
  async (postId: string, thunkAPI) => {
    try {
      const { data } = await likePostAPI(postId);
      return data.post;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const createCommentAction = createAsyncThunk(
  "post/createComment",
  async (dto: CreateCommentDTO, thunkAPI) => {
    try {
      const { data } = await createCommentAPI({
        data: dto.data,
        postId: dto.postId,
      });
      return data.comment;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

interface LikePost {
  postIndex: number;
  user: User;
  isLiked: boolean;
}
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setLikePost: (state, action: PayloadAction<LikePost>) => {
      const { postIndex, user, isLiked } = action.payload;
      if (isLiked) {
        state.posts[postIndex].likes = state.posts[postIndex].likes.filter(
          (like) => like._id !== user._id
        );
      } else {
        state.posts[postIndex].likes.push(user);
      }
    },
    removePost: (state, action: PayloadAction<Post>) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPostsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPostsAction.rejected, (state, action) => {
      state.isLoading = false;
      const newAlert: Alert = {
        text: action.payload as string,
        type: "error",
      };
      state.alert = newAlert;
    });
    builder.addCase(createPostAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts.splice(0, 0, action.payload);
    });
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.isLoading = false;
      const newAlert: Alert = {
        text: action.payload as string,
        type: "error",
      };
      state.alert = newAlert;
    });
  },
});

export const { setLikePost, removePost } = postSlice.actions;

export const selectPostState = (state: RootState) => state.post;

export default postSlice.reducer;
