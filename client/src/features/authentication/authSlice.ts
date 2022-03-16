import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { setToken } from "../../utils/axiosInterceptor";
import { AuthState, LoginDTO, RegisterDTO, User } from "./interface";
import {
  loginAPI,
  logoutAPI,
  registerAPI,
  setNotificationReadAPI,
} from "./userApi";

const initialState: AuthState = {
  isLoadingAuth: true,
  loginUser: null,
  notifications: [],
};

export const readNotificationAction = createAsyncThunk(
  "user/read-notification",
  async (notificationIds: string[], thunkAPI) => {
    try {
      await setNotificationReadAPI(notificationIds);
    } catch (err: any) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const registerAction = createAsyncThunk(
  "user/registration",
  async (body: RegisterDTO, thunkAPI) => {
    try {
      const { data } = await registerAPI(body);
      return data.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const loginAction = createAsyncThunk(
  "user/login",
  async (body: LoginDTO, thunkAPI) => {
    try {
      const { data } = await loginAPI(body);
      setToken(data.token);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const logoutAction = createAsyncThunk("user/logout", async () => {
  await logoutAPI();
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginUser: (state, action: PayloadAction<User>) => {
      state.loginUser = action.payload;
      state.isLoadingAuth = false;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readNotificationAction.fulfilled, (state) => {
      state.notifications.map((ntf) => (ntf.isRead = true));
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.loginUser = null;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      const { user, notifications } = action.payload;
      state.isLoadingAuth = false;
      state.notifications = notifications;
      state.loginUser = user;
    });
  },
});

export const { setLoginUser, setNotifications } = userSlice.actions;
export const selectUserState = (state: RootState) => state.auth;

export default userSlice.reducer;
