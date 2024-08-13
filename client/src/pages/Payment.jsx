import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Steps from "../components/steps/Steps";
import { addPaymentMethod } from "../redux/cartSlice";

export default function Payment() {
  const { shipping } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState(
    shipping.paymentMethod || ""
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!shipping) {
      navigate("/shippping");
    }
  }, [shipping, navigate]);
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addPaymentMethod(paymentMethod));
    navigate("/confirmorder");
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <Steps step1={true} step2={true} step3={true} />

      <h1 className="text-3xl font-bold mb-6 text-center">
        Select Payment Method
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 border border-myGray rounded-lg shadow-sm focus:outline-none focus:border-myGray"
          >
            <option>Select a method</option>
            <option value="paypal">PayPal</option>
            <option value="cash_on_delivery">Cash On Delivery</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-myYellow text-white w-full py-3 rounded-lg shadow-md hover:bg-yellow-500 transition duration-300"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
