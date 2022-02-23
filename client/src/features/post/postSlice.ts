import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Alert } from "../alert/interface";
import { PostState } from "./interface";
import { createPostAPI, getPostsAPI } from "./postApi";

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

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
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

export const {} = postSlice.actions;
export const selectPostState = (state: RootState) => state.post;

export default postSlice.reducer;
