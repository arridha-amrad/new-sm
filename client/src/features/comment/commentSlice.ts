import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Alert } from "../alert/interface";
import { removeComment, setComment } from "../post/postSlice";
import { createCommentAPI, deleteCommentAPI } from "./commentApi";
import { CommentState, CreateCommentDTO, DeleteCommentDTO } from "./interface";

const initialState: CommentState = {
  comment: null,
  comments: [],
  isFetchingComment: false,
  isLoadingComment: false,
  alert: null,
};

export const createCommentAction = createAsyncThunk(
  "comment/create",
  async (dto: CreateCommentDTO, thunkAPI) => {
    try {
      const { data } = await createCommentAPI(dto);
      thunkAPI.dispatch(setComment(data.comment));
      return data.comment;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteCommentAction = createAsyncThunk(
  "comment/delete",
  async (dto: DeleteCommentDTO, thunkAPI) => {
    try {
      await deleteCommentAPI(dto.commentId);
      thunkAPI.dispatch(removeComment(dto));
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCommentAction.pending, (state) => {
      state.isLoadingComment = true;
    });
    builder.addCase(createCommentAction.fulfilled, (state) => {
      state.isLoadingComment = false;
    });
    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.isLoadingComment = false;
      const newAlert: Alert = {
        text: action.payload as string,
        type: "error",
      };
      state.alert = newAlert;
    });
  },
});

// export const {} = commentSlice.actions;

export const selectCommentState = (state: RootState) => state.comment;

export default commentSlice.reducer;
