import { useParams } from "react-router-dom";
import Loading from "../components/errors/Loading";
import Error from "../components/errors/Error";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function OrderDescription() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    async function getOrderInfo() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.VITE_SERVER}/api/orders/${id}`
        );
        setOrderDetails(response.data.orderInfo);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        setIsLoading(false);
      }
    }

    getOrderInfo();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-4xl font-bold mb-10 text-center">
            Order Details
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Order Information</h2>
              <div className="space-y-3 text-lg">
                <p>
                  <strong>Order ID:</strong> {id}
                </p>
                <p>
                  <strong>Order Date:</strong>
                  {new Date(orderDetails?.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Payment Method:</strong> {orderDetails?.paymentMethod}
                </p>

                <p>
                  <strong>Total Price:</strong> ₹{orderDetails?.totalOrderValue}
                </p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Shipping Details</h2>
              <div className="space-y-3 text-lg">
                <p>
                  <strong>Recipient:</strong>
                  {userInfo.name}
                </p>
                <p>
                  <strong>Phone: </strong>
                  {userInfo.phone ? userInfo.phone : "NA"}
                </p>
                <p>
                  <strong>Locality:</strong>
                  {orderDetails?.address?.locality}
                </p>
                <p>
                  <strong>City:</strong> {orderDetails?.address?.city}
                </p>
                <p>
                  <strong>Pin Code:</strong>
                  {orderDetails?.address?.pincode}
                </p>
                <p>
                  <strong>State: </strong>
                  {orderDetails?.address.state}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-8 mt-10">
            <h2 className="text-2xl font-semibold mb-6">Products Ordered</h2>
            <div className="space-y-6">
              {orderDetails?.items?.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>
                    <p className="text-lg font-semibold">{product.name}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: ₹{product.price}</p>
                  </div>
                  <div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-8 mt-10">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <p className="font-semibold">Subtotal</p>
                <p>₹{orderDetails?.totalOrderValue - 40}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Shipping</p>
                <p>₹{40}</p>
              </div>
              <div className="flex justify-between font-bold text-xl">
                <p>Total</p>
                <p>₹{orderDetails?.totalOrderValue}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
