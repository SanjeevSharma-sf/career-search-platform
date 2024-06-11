import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobsReducer from "./jobSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
  },
});
