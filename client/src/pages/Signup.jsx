import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaStore } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function signUpChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function signUpSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Password and confirm password should be the same");
    } else if (form.password.length < 6) {
      toast.error("Password should be at least 6 characters long");
    } else {
      try {
        setIsLoading(true);
        await axiosInstance.post("/api/users/signup", {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        });
        setIsLoading(false);
        toast.success("Sign Up successful! Please Sign In to continue.");
        searchParams.get("redirect")
          ? navigate(`signin?redirect=${searchParams.get("redirect")}`)
          : navigate("/signin");
      } catch (err) {
        setIsLoading(false);
        toast.error(
          err.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    }
  }
  if (isLoading) {
    return <Loader />;
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-10">
      <div className="bg-white py-6 px-12 rounded-2xl shadow-2xl w-full max-w-xl">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Create an Account
        </h2>

        {/* Sign Up Form */}
        <form className="space-y-6" onSubmit={signUpSubmit}>
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl" />
            <input
              type="text"
              name="name"
              className="w-full p-5 pl-14 border-2 rounded-xl focus:ring-4 focus:ring-yellow-500 outline-none text-lg"
              placeholder="Full Name"
              value={form.name}
              onChange={signUpChange}
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl" />
            <input
              type="email"
              name="email"
              className="w-full p-5 pl-14 border-2 rounded-xl focus:ring-4 focus:ring-yellow-500 outline-none text-lg"
              placeholder="Email Address"
              value={form.email}
              onChange={signUpChange}
              required
            />
          </div>
          <div className="relative">
            <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl" />
            <input
              type="tel"
              name="phone"
              className="w-full p-5 pl-14 border-2 rounded-xl focus:ring-4 focus:ring-yellow-500 outline-none text-lg"
              placeholder="Phone Number"
              value={form.phone}
              onChange={signUpChange}
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl" />
            <input
              type="password"
              name="password"
              className="w-full p-5 pl-14 border-2 rounded-xl focus:ring-4 focus:ring-yellow-500 outline-none text-lg"
              placeholder="Password"
              value={form.password}
              onChange={signUpChange}
              required
            />
          </div>
          {/* Confirm Password Field */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl" />
            <input
              type="password"
              name="confirmPassword"
              className="w-full p-5 pl-14 border-2 rounded-xl focus:ring-4 focus:ring-yellow-500 outline-none text-lg"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={signUpChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-charcoal text-white py-4 text-xl rounded-xl font-bold hover:bg-yellow-600 transition"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Large Become a Seller Button */}
        <div className="mt-6 text-center">
          <button className="w-full bg-green-600 text-white py-5 text-2xl font-bold rounded-xl flex justify-center items-center gap-3 hover:bg-green-700 transition shadow-md">
            <FaStore className="text-white text-3xl" />
            Become a Seller
          </button>
        </div>

        {/* Extra Links */}
        <div className="mt-6 text-center text-lg text-gray-700">
          <p>
            Already have an account?{" "}
            <a href="/signin" className="text-yellow-700 font-semibold">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
