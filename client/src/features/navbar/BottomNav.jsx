import React from "react";
import { NavLink } from "react-router-dom";
import categories from "../../utils/categories";
import { MdOutlineCancel } from "react-icons/md";
import BottomNavItem from "./BottomNavItem";
export default function BottomNav({ navbarOpen, setNavbarOpen }) {
  return (
    <div
      className={`md:flex z-50 ${
        navbarOpen ? "block fixed inset-0 bg-gray-900 bg-opacity-90" : "hidden"
      } md:flex-row flex-col justify-center items-center py-2 h-screen md:h-auto w-screen md:w-auto md:bg-white transition-all duration-300`}
    >
      <MdOutlineCancel
        className="text-white text-3xl md:hidden absolute top-4 right-4 cursor-pointer"
        onClick={() => setNavbarOpen(false)}
      />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center">
        {categories.map((el) => (
          <BottomNavItem name={el} key={el} />
        ))}
      </div>
    </div>
  );
}
