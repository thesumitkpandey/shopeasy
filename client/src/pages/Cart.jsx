import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteFromCart,
  clearCart,
} from "../redux/cartSlice";

export default function Cart() {
  const { cartItems, cartPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <h2 className="text-2xl mb-4">Your cart is empty</h2>
          <Link
            to="/"
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-6 p-4 border border-gray-200 rounded-lg shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 ml-4">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      className="px-3 py-1 bg-gray-200 rounded-l-lg"
                      onClick={() => dispatch(decreaseItemQuantity(item._id))}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-white border-t border-b border-gray-200">
                      {item.quantity}
                    </span>
                    <button
                      className="px-3 py-1 bg-gray-200 rounded-r-lg"
                      onClick={() => dispatch(increaseItemQuantity(item._id))}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 transition duration-200"
                  onClick={() => dispatch(deleteFromCart(item._id))}
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>₹ {cartPrice}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>₹ 40.00</span>
            </div>
            <div className="flex justify-between mb-6">
              <span>Total</span>
              <span>₹ {cartPrice > 0 ? Math.round(cartPrice + 40) : 0}</span>
            </div>
            <button className="bg-green-500 text-white w-full py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
