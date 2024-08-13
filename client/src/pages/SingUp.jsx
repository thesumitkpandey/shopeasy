import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../components/errors/Loading";

import axios from "axios";
import toast from "react-hot-toast";
export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get("redirect");
  function signUpChange(e) {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  }
  async function signUpSumbit(e) {
    e.preventDefault();
    if (userDetails.password != userDetails.confirmPassword) {
      toast.error("Password and confirm password should be same");
    } else if (userDetails.password.length < 6) {
      toast.error("Password should be minimum 6 characters long");
    } else {
      try {
        setIsLoading(true);
        let res = await axios.post("/api/users/signup", {
          name: userDetails.name,
          email: userDetails.email,
          password: userDetails.password,
        });
        setIsLoading(false);
        navigate(redirect ? `/signin?redirect=${redirect}` : "signin");
        toast.success("Sign Up successful, Please Sign In to continue");
      } catch (err) {
        toast.error(err.response.data.message || "Please try again later");
      }
    }
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="min-h-screen flex items-center justify-center md:bg-sign-in-bg bg-cover bg-center md:relative">
          <div className="bg-white md:absolute md:left-16 p-8 rounded-lg shadow-lg w-full max-w-md md:bg-opacity-20 backdrop-blur-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Sign Up
            </h2>
            <form className="space-y-4" onSubmit={signUpSumbit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={signUpChange}
                  value={userDetails.name}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={signUpChange}
                  value={userDetails.email}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={signUpChange}
                  value={userDetails.password}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassowrd"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={signUpChange}
                  value={userDetails.confirmPassword}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <p className="text-lg text-black">
                Already have an account?{" "}
                <Link
                  to={redirect ? `/signin?redirect=${redirect}` : "/signin"}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
