import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export default function orders() {
  const [orders, setOrders] = useState(useLoaderData());
  async function handleDelivery(id) {
    try {
      await axios.put("/api/admin/orders", { _id: id });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, isDelivered: true } : order
        )
      );
    } catch (err) {
      console.error("Failed to update delivery status", err);
      toast.error(err.message);
    }
  }
  async function handleCancellation(id) {
    try {
      const cancellationStatus = await axios.delete("/api/admin/orders", {
        data: { _id: id },
      });
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
      toast.success(`Order ${id} Deleted`);
    } catch (err) {
      toast.error(err.response.data.message || err.message);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Admin Order Details
      </h1>
      <div className="overflow-x-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {[
                  "Order ID",
                  "Customer ID",
                  "Items",
                  "Total (₹)",
                  "Payment Status",
                  "Delivery Status",
                  "Date",
                  "Actions",
                ].map((item) => (
                  <th key={item} className="px-2 py-2 border-b border-gray-200">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-2 py-2 border-b border-gray-200">
                    {order._id}
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200">
                    {order.userId}
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200">
                    <ul className="list-disc pl-3">
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.productId} (x{item.quantity}) - ₹
                          {item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200">
                    ₹{order.totalOrderValue}
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200">
                    {order.paymentStatus}
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200">
                    {order.isDelivered ? (
                      <span className="text-green-600 font-semibold">
                        Delivered
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200 text-center">
                    <div className="flex justify-center space-x-1">
                      <button
                        disabled={order.isDelivered ? true : false}
                        onClick={() => handleDelivery(order._id)}
                        className={`${
                          !order.isDelivered
                            ? "hover:bg-yellow-500 bg-myYellow cursor-pointer"
                            : "bg-myGray  cursor-not-allowed"
                        }  text-white font-bold py-1 px-2 rounded transition duration-150 ease-in-out`}
                      >
                        Mark Delivered
                      </button>
                      <button
                        onClick={() => handleCancellation(order._id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition duration-150 ease-in-out"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
