import React from "react";
import { NavLink } from "react-router-dom";

export default function BottomNavItem({ name }) {
  return (
    <NavLink
      to={`/${name.toLowerCase()}`}
      className={(isActive) =>
        isActive
          ? ""
          : "text-white md:text-gray-900 text-2xl md:text-xl hover:text-blue-500 hover:font-bold hover:underline hover:text-3xl md:hover:text-2xl px-4 py-2 transition-transform transform hover:scale-105"
      }
      onClick={() => setNavbarOpen(false)}
    >
      {name}
    </NavLink>
  );
}
