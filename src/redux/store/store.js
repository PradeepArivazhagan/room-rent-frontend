import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/reducer";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
