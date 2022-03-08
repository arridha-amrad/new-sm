import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Alert } from "../alert/interface";
import { User } from "../user/interface";
import { Post, PostState, UpdatePostDTO } from "./interface";
import {
  createPostAPI,
  getPostsAPI,
  likePostAPI,
  updatePostAPI,
} from "./postApi";
import {
  IComment,
  DeleteCommentDTO,
  LikeComment,
  UnsetReplyCommentForm,
} from "../comment/interface";
import { WritableDraft } from "immer/dist/internal";
import {
  createReplyAPI,
  deleteReplyAPI,
} from "../replyComment/replyCommentApi";
import {
  ReplyComment,
  ReplyCommentDTO,
  ReplyCommentResult,
} from "../replyComment/interface";

const initialState: PostState = {
  alert: null,
  isLoading: false,
  post: null,
  posts: [],
};

export const updatePostAction = createAsyncThunk(
  "post/update",
  async (dto: UpdatePostDTO, thunkAPI) => {
    try {
      const { data } = await updatePostAPI(dto);
      return data.post;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

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

export const replyComment = createAsyncThunk(
  "post/replyComment",
  async (body: ReplyCommentDTO, thunkAPI) => {
    try {
      const { data } = await createReplyAPI(
        body.body,
        body.receiver,
        body.commentId
      );
      return data.reply;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteReplyAction = createAsyncThunk(
  "post/deleteReply",
  async (replyId: string, thunkAPI) => {
    try {
      await deleteReplyAPI(replyId);
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
    deleteReplyComment: (state, action: PayloadAction<ReplyCommentResult>) => {
      const { commentIndex, postIndex, reply } = action.payload;
      const comment = state.posts[postIndex].comments[commentIndex];
      comment.replies = comment.replies.filter(
        (rply) => rply._id !== reply._id
      );
    },
    replyCommentResult: (state, action: PayloadAction<ReplyCommentResult>) => {
      const { commentIndex, postIndex, reply } = action.payload;
      state.posts[postIndex].comments[commentIndex].replies.push(
        reply as WritableDraft<ReplyComment>
      );
    },
    setShowReplyCommentInput: (state, action: PayloadAction<IComment>) => {
      const comment = action.payload;
      const indexPost = state.posts.findIndex(
        (post) => post._id === comment.post
      );
      state.posts[indexPost].comments = state.posts[indexPost].comments.map(
        (cmt) => ({
          ...cmt,
          isShowInput: cmt._id === comment._id,
        })
      );
    },
    unsetReplyCommentForm: (
      state,
      action: PayloadAction<UnsetReplyCommentForm>
    ) => {
      const { comment, commentIndex } = action.payload;
      const indexPost = state.posts.findIndex(
        (post) => post._id === comment.post
      );
      state.posts[indexPost].comments[commentIndex].isShowInput = false;
    },
    toggleIsEdit: (state, action: PayloadAction<number>) => {
      state.posts[action.payload].isEdit = !state.posts[action.payload].isEdit;
    },
    unsetIsEdit: (state, action: PayloadAction<number>) => {
      state.posts[action.payload].isEdit = false;
    },
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
    setLikeComment: (state, action: PayloadAction<LikeComment>) => {
      const { comment, isLiked, user } = action.payload;
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i]._id === comment.post) {
          state.posts[i].comments.find(
            (cmt) =>
              cmt._id === comment._id &&
              (isLiked
                ? (cmt.likes = cmt.likes.filter((usr) => usr._id !== user._id))
                : cmt.likes.push(user))
          );
          break;
        }
      }
    },
    setComment: (state, action) => {
      const comment = action.payload;
      const post = state.posts.find((post) => post._id === comment.post);
      if (post) {
        post.comments.splice(0, 0, comment);
      }
    },
    removeComment: (state, action: PayloadAction<DeleteCommentDTO>) => {
      const { commentId, postId } = action.payload;
      const post = state.posts.find((post) => post._id === postId);
      if (post) {
        post.comments = post.comments.filter(
          (comment) => comment._id !== commentId
        );
      }
    },
    removePost: (state, action: PayloadAction<Post>) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatePostAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.isLoading = false;
      const post = action.payload;
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i]._id === post._id) {
          state.posts[i].body = post.body;
          break;
        }
        continue;
      }
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.isLoading = false;
      const newAlert: Alert = {
        text: action.payload as string,
        type: "error",
      };
      state.alert = newAlert;
    });
    builder.addCase(getPostsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPostsAction.fulfilled, (state, action: any) => {
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
      const newPost = action.payload as WritableDraft<Post>;
      state.isLoading = false;
      state.posts.unshift(newPost);
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

export const {
  deleteReplyComment,
  replyCommentResult,
  setLikePost,
  removePost,
  setComment,
  removeComment,
  toggleIsEdit,
  unsetIsEdit,
  setLikeComment,
  setShowReplyCommentInput,
  unsetReplyCommentForm,
} = postSlice.actions;

export const selectPostState = (state: RootState) => state.post;

export default postSlice.reducer;
