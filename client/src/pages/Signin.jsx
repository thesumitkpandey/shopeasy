import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Error from "../components/errors/Error";
import { Link } from "react-router-dom";
import Loading from "../components/errors/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { signIn } from "../redux/authSlice";
export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users", {
        email: userDetails.email,
        password: userDetails.password,
      });

      dispatch(signIn({ ...response.data }));
      navigate(redirect);
      toast.success(`Logged in as ${response.data.name}`);
    } catch (err) {
      setIsError(true);
      toast.error(err.response.data.message || "Please try again later");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : (
        <div className="min-h-screen  flex items-center justify-center md:bg-sign-in-bg bg-cover bg-center md:relative">
          <div className="bg-white md:absolute   md:left-16  p-8 rounded-lg shadow-lg w-full max-w-md md:bg-opacity-20 backdrop-blur-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Sign In
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  value={userDetails.email}
                  onChange={handleChange}
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
                  value={userDetails.password}
                  onChange={handleChange}
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
                Don't have an account?{" "}
                <Link
                  to={
                    redirect != "/" ? `/signup?redirect=${redirect}` : "/signup"
                  }
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
