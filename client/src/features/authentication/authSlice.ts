import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { setToken } from "../../utils/axiosInterceptor";
import { AuthState, LoginDTO, RegisterDTO, User } from "./interface";
import { getLoginUserAPI, loginAPI, logoutAPI, registerAPI } from "./userApi";

const initialState: AuthState = {
  isLoadingAuth: true,
  loginUser: null,
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
    unsetLoading: (state) => {
      state.isLoadingAuth = false;
    },
    setLoginUser: (state, action: PayloadAction<User>) => {
      state.loginUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.loginUser = null;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.isLoadingAuth = false;
      state.loginUser = user;
    });
  },
});

export const { setLoginUser, unsetLoading } = userSlice.actions;
export const selectUserState = (state: RootState) => state.auth;

export default userSlice.reducer;
