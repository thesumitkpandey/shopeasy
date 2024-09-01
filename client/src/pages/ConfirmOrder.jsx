import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Steps from "../components/steps/Steps";
import axios from "axios";
import { clearCart } from "../redux/cartSlice";
import toast from "react-hot-toast";

export default function ConfirmOrder() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch((state) => state.cart);
  const userInfo = useSelector((state) => state.auth);

  useEffect(() => {
    if (!cart.shipping) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);
  async function handleConfirmOrder() {
    try {
      const orderInfo = await axios.post(
        `${process.env.VITE_SERVER}/api/orders/`,
        {
          orderItems: cart.cartItems,
          totalPrice: cart.cartPrice,
          paymentMethod: cart.paymentMethod,
          shipping: cart.shipping,
        }
      );
      navigate(`/orders/${orderInfo.data.orderDetails._id}`);
      dispatch(clearCart());
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    }
  }

  return (
    <>
      <div className="flex justify-center mb-8">
        <Steps step1={true} step2={true} step3={true} />
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-xl  rounded-lg p-8 max-w-4xl w-full">
          <h1 className="text-3xl font-bold text-center mb-6">Confirm Order</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <p className="text-gray-700">
              {cart.shipping.locality}, {cart.shipping.city}
            </p>
            <p className="text-gray-700">
              {cart.shipping.pincode}, {cart.shipping.state}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
            <ul className="divide-y divide-gray-300">
              {cart.cartItems.map((item, index) => (
                <li key={index} className="py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">
                        ₹{item.price} x {item.quantity} ={" "}
                        <span className="font-semibold text-gray-900">
                          ₹{item.price * item.quantity}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <div className="flex justify-between">
              <p className="font-medium text-gray-700">Total Price:</p>
              <p className="font-bold text-gray-900">₹{cart.cartPrice}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <p className="text-gray-700">
              {cart.paymentMethod === "paypal" ? "Paypal" : "Cash On Delivery"}
            </p>
          </div>

          <div className="text-center">
            <button
              type="submit"
              onClick={handleConfirmOrder}
              disabled={cart.cartItems.length > 0 ? false : true}
              className="bg-myYellow text-white font-semibold px-6 py-3 rounded-md hover:bg-yellow-500"
            >
              {cart.paymentMethod == "paypal" ? "Proceed to Pay" : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
