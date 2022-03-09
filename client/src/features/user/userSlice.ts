import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axiosInstance from "../../utils/axiosInterceptor";
import { Alert } from "../alert/interface";
import { AuthState, LoginDTO, RegisterDTO, User } from "./interface";
import { getLoginUserAPI, loginAPI, logoutAPI, registerAPI } from "./userApi";

const initialState: AuthState = {
  isLoading: false,
  loginUser: null,
  alert: null,
};

export const getLoginUser = createAsyncThunk("user/setLoginUser", async () => {
  const { data } = await getLoginUserAPI();
  return data.user;
});

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
      return data.user;
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
    unsetAlert: (state) => {
      state.alert = null;
    },
    setLoginUser: (state, action: PayloadAction<User>) => {
      state.loginUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.isLoading = false;
      state.loginUser = null;
    });
    builder.addCase(logoutAction.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loginAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loginUser = action.payload;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      const alert: Alert = {
        text: action.payload as string,
        type: "error",
      };
      state.isLoading = false;
      state.alert = alert;
    });
    builder.addCase(registerAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      const alert: Alert = {
        text: action.payload,
        type: "success",
      };
      state.isLoading = false;
      state.alert = alert;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      const alert: Alert = {
        text: action.payload as string,
        type: "error",
      };
      state.isLoading = false;
      state.alert = alert;
    });
  },
});

export const { unsetAlert, setLoginUser } = userSlice.actions;
export const selectUserState = (state: RootState) => state.user;

export default userSlice.reducer;
