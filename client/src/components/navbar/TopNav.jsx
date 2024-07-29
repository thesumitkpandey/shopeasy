//NO NEED TO EVEN TOUCH THE DESIGN JUST TOUCH THE LOGIC AND LINKS
import logo from "../../assets/logo.jpg";
import { FaUserCircle, FaSearch, FaShoppingCart } from "react-icons/fa";
import { TiThMenuOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
export default function TopNav({ setNavbarOpen, navbarOpen }) {
  const { cartItems } = useSelector((state) => state.cart);

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
        <div className="relative">
          <FaShoppingCart className="text-[rgb(25,186,146)] text-4xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          )}
        </div>
        <FaUserCircle className="text-[rgb(25,186,146)] text-4xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110" />
      </div>
    </div>
  );
}
