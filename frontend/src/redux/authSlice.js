import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cssTransition, toast } from "react-toastify";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";

export const register = createAsyncThunk(
  "user/register",
  async ({ role, name, email, password }) => {
    try {
      const response = await UserService.createUser({
        role,
        name,
        email,
        password,
      });
      const data = await response.data;
      console.log("data", data);
      if (response.status >= 400 && response.status < 600) {
        throw new Error(data.failure);
      }

      return data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const authenticate = createAsyncThunk(
  "user/authenticate",
  async ({ email, password }) => {
    try {
      const response = await AuthService.login({ email, password });
      const data = await response.data;
      if (response.status >= 400 && response.status < 600) {
        throw new Error(data.failure);
      }
      const role = data.user.role || null;

      const token = response.data.accessToken;

      localStorage.setItem(
        "user",
        JSON.stringify({
          accessToken: token,
        })
      );
      localStorage.setItem("role", role);
      return data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const userInfo = createAsyncThunk("user/userInfo", async () => {
  const response = await AuthService.userInfo();
  const data = await response.data;
  if (response.status >= 400 && response.status < 600) {
    throw new Error(data.failure);
  }
  return data;
});
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    data: {},
    isAuth: localStorage.getItem("user") ? true : false,
    role: null,
    userInfoLoading: false,
  },
  reducers: {
    logout: () => ({
      loading: false,
      error: null,
      data: null,
      isAuth: false,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.loading = true;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
        state.error = action.error.message;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.loading = false;
        if (typeof action.payload.user !== "undefined") {
          state.isAuth = true;
          state.data = {
            userId: action.payload.user._id,
            name: action.payload.user.name,
            email: action.payload.user.email,
            role: action.payload.user.role,
          };
        } else {
          toast.error(action.payload);
        }
      })
      .addCase(userInfo.pending, (state) => {
        state.userInfoLoading = true;
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.userInfoLoading = false;
        toast.error(action.error.message);
        state.error = action.error.message;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.userInfoLoading = false;
        state.data = action.payload;
        state.role = action.payload?.roles?.length && action.payload.roles[0];
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
        state.error = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log("action.payload", action.payload);
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
