//NO NEED TO EVEN TOUCH THE DESIGN JUST TOUCH THE LOGIC AND LINKS
import logo from "../../assets/logo.jpg";
import { FaUserCircle, FaSearch, FaShoppingCart } from "react-icons/fa";
import { TiThMenuOutline } from "react-icons/ti";

export default function TopNav({ setNavbarOpen, navbarOpen }) {
  return (
    <div className="flex justify-between items-center md:px-16 px-2 h-16">
      <TiThMenuOutline
        onClick={() => setNavbarOpen(!navbarOpen)}
        className="md:hidden text-6xl text-[rgb(25,186,146)] cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125 hover:text-[rgb(19,145,113)] active:scale-100 active:text-[rgb(16,124,97)]"
      />
      <img
        src={logo}
        className="h-10 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
        alt="ShopEasy Logo"
      />
      <form className="flex items-center w-full max-w-lg mx-4 border-2 border-transparent bg-[rgb(25,186,146)] rounded-lg overflow-hidden transition duration-200 ease-in-out hover:scale-105 h-10">
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
      <div className="flex items-center space-x-4">
        <FaShoppingCart className="text-[rgb(25,186,146)] text-4xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110" />
        <FaUserCircle className="text-[rgb(25,186,146)] text-4xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110" />
      </div>
    </div>
  );
}
