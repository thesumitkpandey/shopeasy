import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaStore,
  FaUserShield,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import axiosInstance from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import GoogleSignIn from "../components/Google"; // Import the Google sign-in component

export default function SignIn() {
  const [role, setRole] = useState("User");
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { type: "User", icon: <FaUser className="text-blue-500 text-4xl" /> },
    { type: "Seller", icon: <FaStore className="text-green-500 text-4xl" /> },
    { type: "Admin", icon: <FaUserShield className="text-red-500 text-4xl" /> },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  function signinChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/api/users/auth", {
        email: form.email,
        password: form.password,
      });

      dispatch(signIn({ ...response.data }));
      navigate("/");
      toast.success(response.message);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Please try again later");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-10">
      <div className="bg-white py-4 px-12 rounded-2xl shadow-2xl w-full max-w-xl">
        {/* Role Selection Tabs */}
        <div className="flex justify-between mb-8 border-b pb-4 text-lg">
          {roles.map(({ type, icon }) => (
            <button
              key={type}
              className={`flex flex-col items-center w-1/3 py-3 text-gray-700 text-xl ${
                role === type
                  ? "text-yellow-500 border-b-4 border-yellow-500 font-bold"
                  : ""
              }`}
              onClick={() => setRole(type)}
            >
              {icon}
              <span className="mt-2">{type}</span>
            </button>
          ))}
        </div>

        {/* Sign In Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl" />
            <input
              type="email"
              name="email"
              className="w-full p-5 pl-14 border-2 rounded-xl focus:ring-4 focus:ring-yellow-500 outline-none text-xl"
              placeholder="Enter your email"
              onChange={signinChange}
              value={form.email}
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl" />
            <input
              type="password"
              name="password"
              className="w-full p-5 pl-14 border-2 rounded-xl focus:ring-4 focus:ring-yellow-500 outline-none text-xl"
              placeholder="Enter your password"
              value={form.password}
              onChange={signinChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-charcoal text-white py-4 text-xl rounded-xl font-bold hover:bg-yellow-600 transition"
          >
            Sign In as {role}
          </button>
        </form>

        {/* Google Sign In Button */}
        <div className="mt-4">
          <GoogleSignIn />
        </div>

        {/* Extra Links */}
        <div className="mt-6 text-center text-lg text-gray-700">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-yellow-700 font-semibold">
              Sign Up
            </a>
          </p>
          <p className="mt-3">
            Forgot password?{" "}
            <a href="/reset" className="text-yellow-700 font-semibold">
              Reset Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
