import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../../redux/authSlice";
export default function ProfileDropdown({ setIsDropdownOpen }) {
  const dropDownOptions = ["Profile", "Orders", "SignOut"];
  const dispatch = useDispatch();
  function dropdownClick(option) {
    if (option == "SignOut") {
      dispatch(signOut());
      return;
    }
    setIsDropdownOpen(false);
  }
  return (
    <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
      {dropDownOptions.map((option) => (
        <Link
          key={option}
          to={`/${option == "SignOut" ? "" : option.toLowerCase()}`}
          onClick={() => dropdownClick(option)}
          className={`block px-5 py-3 text-[15px] font-medium text-charcoal transition-all duration-300
            ${
              option === "SignOut"
                ? "hover:bg-red-800 hover:text-white"
                : "hover:bg-charcoal hover:text-white"
            } rounded-md`}
        >
          {option}
        </Link>
      ))}
    </div>
  );
}
