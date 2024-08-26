import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaCartArrowDown, FaUser } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import logo from "../../assets/logo.svg";
import SidebarItems from "./SidebarItems.jsx";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/authSlice";
import { Navigate } from "react-router-dom";
export default function AdminSidebar() {
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
    Navigate("/");
  }
  return (
    <div className="bg-gray-800 text-white w-72 space-y-8 py-10 px-4 fixed left-0 top-0 h-full">
      <div className="flex items-center justify-center mb-12">
        <img src={logo} alt="Admin Logo" className="h-12 w-auto" />
      </div>

      <nav className="mt-12 space-y-4">
        <SidebarItems
          name="Dashboard"
          icon={<MdDashboard size={28} />}
          to="/"
        />
        <SidebarItems
          name="Products"
          icon={<MdDashboard size={28} />}
          to="/admin-products"
        />
        <SidebarItems
          name="Orders"
          icon={<FaCartArrowDown size={28} />}
          to="/admin-orders"
        />
        <SidebarItems
          name="Users"
          icon={<FaUser size={28} />}
          to="/admin-users"
        />
        <SidebarItems
          name="Reviews"
          icon={<MdRateReview size={28} />}
          to="/admin-reviews"
        />
      </nav>

      <div className="absolute bottom-4 left-0 w-full px-4">
        <button
          onClick={handleSignOut}
          className="w-full py-4 text-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
