import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";
import { toast } from "react-hot-toast";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userInfo: {},
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    checkAuth: (state, action) => {
      try {
        console.log(action.payload);
        state.userInfo = action.payload.userInfo;
        state.isAuthenticated = true;
        toast.success(action.payload.message);
      } catch (err) {
        toast.error(err.message);
        console.log(err);
      }
    },
    signIn: (state, action) => {
      try {
        localStorage.setItem("token", action.payload.token);

        delete action.payload.token;
        state.userInfo = { ...action.payload.userInfo };
        state.isAuthenticated = true;
      } catch (err) {
        toast.error(err.message);
        console.log(err);
      }
    },
    addToWishlist: (state, action) => {
      try {
      } catch (err) {}
    },
    signOut: (state, action) => {
      try {
        localStorage.removeItem("token");
        state.isAuthenticated = false;
        state.userInfo = {};
      } catch (err) {
        toast.error(err.message);
        console.log(err);
      }
    },
  },
});
export const { checkAuth, signIn, signOut, addToWishlist } = authSlice.actions;
export default authSlice.reducer;
