// DESIGN MUST BE CHANGED, LOGIC ACCORDINGLY IMPLEMENTATION OF NAVLINKS REQUIRED
import categories from "../../utils/categories";
import BottomNavItem from "./BottomNavItem";
import { MdOutlineCancel } from "react-icons/md";
export default function BottomNav({ navbarOpen, setNavbarOpen }) {
  return (
    <div
      className={`md:flex z-50 ${
        navbarOpen ? "block fixed inset-0 bg-red-800" : "hidden"
      } md:flex-row flex-col justify-center items-center py-2 h-screen md:h-auto w-screen md:w-auto md:bg-white`}
    >
      <MdOutlineCancel
        className="md:hidden"
        onClick={() => setNavbarOpen(false)}
      />

      {Object.keys(categories).map((el) => (
        <BottomNavItem key={el} name={el} />
      ))}
    </div>
  );
}
