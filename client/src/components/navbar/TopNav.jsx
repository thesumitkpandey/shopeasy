import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { FaUser, FaSearch, FaShoppingCart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

export default function TopNav({ setNavbarOpen, navbarOpen }) {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }
  function signOutController() {
    dispatch(signOut());
    navigate("/");
  }
  return (
    <div className="flex justify-between items-center md:px-16 px-2 h-16">
      <IoMenu
        onClick={() => setNavbarOpen(!navbarOpen)}
        className="text-myYellow md:hidden text-4xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
      />
      <Link to="/">
        <img
          src={logo}
          className="h-10 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
          alt="ShopEasy Logo"
        />
      </Link>
      <form className="flex items-center w-full max-w-lg mx-4 border-2 border-transparent bg-myYellow blue-500 rounded-lg overflow-hidden transition duration-200 ease-in-out hover:scale-105 h-10">
        <input
          type="text"
          placeholder="Search here"
          className="flex-grow px-4 py-2 text-gray-700 focus:outline-none h-full"
        />
        <button
          type="submit"
          className="px-4 text-gray-600 hover:text-gray-800 focus:outline-none h-full"
        >
          <FaSearch className="text-3xl text-white" />
        </button>
      </form>
      <div className="flex items-center space-x-4 relative">
        <div className="relative">
          <Link to="/cart">
            <FaShoppingCart className="text-myYellow text-4xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-myGray text-white text-xs font-bold px-2 py-1 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
        {userInfo ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-myYellow text-2xl cursor-pointers"
            >
              {userInfo.name}
              <IoIosArrowDropdownCircle
                className={`transition-transform duration-300 text-myGray ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Orders
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={signOutController}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signin">
            <FaUser className="text-myYellow text-4xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110" />
          </Link>
        )}
      </div>
    </div>
  );
}
