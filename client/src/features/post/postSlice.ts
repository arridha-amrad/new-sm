import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "../alert/interface";
import { PostState } from "./interface";
import { createPostAPI } from "./postApi";

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

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPostAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts.push(action.payload);
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
