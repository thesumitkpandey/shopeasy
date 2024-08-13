import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addShipping } from "../redux/cartSlice";
import Steps from "../components/steps/Steps";

export default function Shipping() {
  const cart = useSelector((state) => state.cart);
  const { shipping } = cart;
  const [shippingInfo, setShippingInfo] = useState({
    locality: shipping.locality || "",
    city: shipping.city || "",
    state: shipping.state || "",
    pincode: shipping.pincode || "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  function handleChange(e) {
    setShippingInfo({
      ...shippingInfo,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addShipping({ ...shippingInfo }));
    navigate("/payment");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-4">
      <Steps step1={true} step2={true} />
      <h1 className="text-4xl font-bold mb-8 text-center">
        Shipping Information
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="form-group mb-4">
          <label className="block mb-2" htmlFor="locality">
            Locality
          </label>
          <input
            type="text"
            id="locality"
            value={shippingInfo.locality}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block mb-2" htmlFor="city">
            City
          </label>
          <input
            type="text"
            id="city"
            value={shippingInfo.city}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block mb-2" htmlFor="state">
            State
          </label>
          <input
            type="text"
            id="state"
            value={shippingInfo.state}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block mb-2" htmlFor="pincode">
            Postal Code
          </label>
          <input
            type="number"
            id="pincode"
            value={shippingInfo.pincode}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-myYellow text-white w-full py-3 rounded-lg shadow-md hover:bg-yellow-500 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
