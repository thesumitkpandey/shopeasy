import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, signIn } from "./redux/authSlice";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "./utils/axios";
import Loader from "./components/Loader";
import Error from "./pages/Error";
import Products from "./pages/Products";

import ProductDescription from "./pages/ProductDescription";
export default function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    async function checkAuthentication() {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/api/users/auth");

        if (response.data.success) {
          dispatch(checkAuth(response.data));
        }
      } catch (err) {
        console.log(err);
        toast.error("Internal Server Error, Please try again");
      } finally {
        setIsLoading(false);
      }
    }
    checkAuthentication();
  }, []);
  if (isLoading) {
    return;
    <>
      <Loader />
    </>;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<Products />} />
          <Route path=":id" element={<ProductDescription />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
