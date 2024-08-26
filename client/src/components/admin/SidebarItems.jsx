import { NavLink } from "react-router-dom";
export default function SidebarItems({ name, icon, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-3 px-6 rounded-lg text-lg transition-colors ${
          isActive
            ? "bg-gray-700 text-yellow-500"
            : "text-white hover:bg-gray-700 hover:text-yellow-500"
        }`
      }
    >
      <span className="mr-4">{icon}</span>
      <span>{name}</span>
    </NavLink>
  );
}
