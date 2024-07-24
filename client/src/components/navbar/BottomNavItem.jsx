import React from "react";
import { NavLink } from "react-router-dom";

export default function BottomNavItem({ name, setNavbarOpen }) {
  return (
    <NavLink
      to={`/${name.toLowerCase()}`}
      className={({ isActive }) =>
        `text-2xl ${isActive ? "font-bold text-blue-900 " : ""}`
      }
      onClick={() => setNavbarOpen(false)}
    >
      {name}
    </NavLink>
  );
}
