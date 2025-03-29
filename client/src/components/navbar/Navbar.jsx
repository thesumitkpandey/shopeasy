import React, { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import CartIcon from "../../assets/cart.svg";
import UserIcon from "../../assets/profile.svg";
import MenuIcon from "../../assets/hamburger.svg";
import SearchIcon from "../../assets/search.svg";
import Logo from "../../assets/logo.png";
import HeartIcon from "../../assets/heart.svg";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/authSlice";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for profile dropdown
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const categories = [
    "Fashion",
    "Electronics",
    "Fitness",
    "Furniture",
    "Grocery",
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md font-poppins mb-4">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left Section (Logo + Categories) */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <img src={Logo} alt="Logo" className="h-10 w-auto" />

          {/* Desktop Categories */}
          <div className="hidden md:flex gap-6">
            {categories.map((category, index) => {
              const isActive = searchParams.get("category") === category;

              return (
                <Link
                  key={index}
                  to={`/products?category=${category}`}
                  className={`relative text-charcoal transition-all duration-300 ${
                    isActive
                      ? "font-bold border-b-2 border-charcoal"
                      : "after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[3px] after:bg-charcoal after:transition-all after:duration-300 hover:after:w-full"
                  }`}
                >
                  {category}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Section (Search, Icons, Auth) */}
        <div className="flex items-center gap-5">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-32 lg:w-48 bg-transparent outline-none text-charcoal"
            />
            <img
              src={SearchIcon}
              alt="Search"
              className="w-5 cursor-pointer transition-transform duration-300 hover:scale-125 hover:opacity-80"
            />
          </div>

          {/* Cart Icon (Always Visible) */}
          <img
            src={CartIcon}
            alt="Cart"
            className="w-7 cursor-pointer transition-transform duration-300 hover:scale-125 hover:opacity-80"
          />

          {/* Authenticated User Icons */}
          {isAuthenticated ? (
            <>
              <img
                src={HeartIcon}
                alt="Liked"
                className="w-7 cursor-pointer transition-transform duration-300 hover:scale-125 hover:opacity-80"
              />
              {/* Profile Icon with Dropdown */}
              <div className="relative">
                <img
                  src={userInfo.photo}
                  alt="User"
                  className="w-9 h-9 rounded-full border-2 border-charcoal cursor-pointer transition-transform duration-300 hover:scale-130 hover:opacity-80"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <ProfileDropdown setIsDropdownOpen={setIsDropdownOpen} />
                )}
              </div>
            </>
          ) : (
            // Sign In Button
            <Link
              to="/signin"
              className="text-charcoal border border-charcoal font-medium rounded-lg text-lg px-6 py-1 transition-all duration-300 hover:bg-charcoal hover:text-white"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <img
              src={MenuIcon}
              alt="Menu"
              className="w-7 transition-transform duration-300 hover:scale-125 hover:opacity-80"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md py-3">
          <div className="space-y-2 text-center">
            {categories.map((category, index) => {
              const isActive = searchParams.get("category") === category;

              return (
                <Link
                  key={index}
                  to={`/products?category=${category}`}
                  className={`block text-charcoal py-1 transition-all duration-300 ${
                    isActive ? "font-bold border-b-2 border-charcoal" : ""
                  }`}
                >
                  {category}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
