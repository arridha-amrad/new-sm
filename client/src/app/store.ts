import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/user/userSlice";
import alertReducer from "../features/alert/alertSlice";
import postReducer from "../features/post/postSlice";
import commentReducer from "../features/comment/commentSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    alert: alertReducer,
    post: postReducer,
    comment: commentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
