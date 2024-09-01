import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Orders() {
  const [orders, setOrders] = useState(useLoaderData());
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    date: "",
    priceRange: "",
    deliveryStatus: "",
  });

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.includes(searchTerm) || order.userId.includes(searchTerm);

    const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
    const matchesDate = filters.date ? orderDate === filters.date : true;

    const matchesPrice = (() => {
      switch (filters.priceRange) {
        case "low":
          return order.totalOrderValue < 1000;
        case "1-5000":
          return order.totalOrderValue >= 1000 && order.totalOrderValue < 5000;
        case "5000-10000":
          return order.totalOrderValue >= 5000 && order.totalOrderValue < 10000;
        case "10000-15000":
          return (
            order.totalOrderValue >= 10000 && order.totalOrderValue < 15000
          );
        case "15000-20000":
          return (
            order.totalOrderValue >= 15000 && order.totalOrderValue < 20000
          );
        case "20000-above":
          return order.totalOrderValue >= 20000;
        default:
          return true;
      }
    })();

    const matchesDelivery = filters.deliveryStatus
      ? filters.deliveryStatus === "delivered"
        ? order.isDelivered
        : !order.isDelivered
      : true;

    return matchesSearch && matchesDate && matchesPrice && matchesDelivery;
  });

  async function handleDelivery(id) {
    try {
      await axios.put(`${process.env.VITE_SERVER}/api/admin/orders`, {
        _id: id,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, isDelivered: true } : order
        )
      );
      toast.success(`Marked Order ${id} delivered`);
    } catch (err) {
      console.error("Failed to update delivery status", err);
      toast.error(err.message);
    }
  }

  async function handleCancellation(id) {
    try {
      await axios.delete(`${process.env.VITE_SERVER}/api/admin/orders`, {
        data: { _id: id },
      });
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
      toast.success(`Order ${id} Deleted`);
    } catch (err) {
      toast.error(err.response.data.message || err.message);
    }
  }

  return (
    <div className="ml-72 p-4">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Total Orders</h2>
          <p className="text-2xl">{orders.length}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Daily Orders</h2>
          <p className="text-2xl">
            {
              orders.filter(
                (orderElement) =>
                  new Date().toLocaleDateString() ==
                  new Date(orderElement.createdAt).toLocaleDateString()
              ).length
            }
          </p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Daily Orders Value</h2>
          <p className="text-2xl">
            ₹
            {orders
              .filter(
                (orderElement) =>
                  new Date().toLocaleDateString() ==
                  new Date(orderElement.createdAt).toLocaleDateString()
              )
              .reduce((acc, cur) => (acc += cur.totalOrderValue), 0)}
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap justify-between items-center">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Customer or Order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded mb-2 md:mb-0 "
          />
        </div>

        <div className="flex space-x-4">
          <input
            type="date"
            value={filters.date}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, date: e.target.value }))
            }
            className="border p-2 rounded"
          />

          <select
            value={filters.priceRange}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, priceRange: e.target.value }))
            }
            className="border p-2 rounded"
          >
            <option value="">Price Range</option>
            <option value="low">Below ₹1000</option>
            <option value="1-5000">₹1000 to ₹5000</option>
            <option value="5000-10000">₹5000 to ₹10000</option>
            <option value="10000-15000">₹10000 to ₹15000</option>
            <option value="15000-20000">₹15000 to ₹20000</option>
            <option value="20000-above">₹20000 and Above</option>
          </select>

          <select
            value={filters.deliveryStatus}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                deliveryStatus: e.target.value,
              }))
            }
            className="border p-2 rounded"
          >
            <option value="">Delivery Status</option>
            <option value="delivered">Delivered</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="shadow-md sm:rounded-lg">
          <table className="w-full text-xs text-left text-gray-500">
            <thead className="text-lg text-gray-700 uppercase bg-gray-50">
              <tr>
                {[
                  "Order ID",
                  "Customer ID",
                  "Total (₹)",
                  "Payment",
                  "Date",
                  "Actions",
                ].map((item) => (
                  <th key={item} className="py-2 px-2 border-b border-gray-200">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="text-sm">
                  <td className="py-2 px-2 border-b border-gray-200">
                    {order._id}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-200">
                    {order.userId}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-200">
                    ₹{order.totalOrderValue}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-200">
                    {order.paymentStatus}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-200">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-200 text-center">
                    <div className="flex flex-col space-y-2">
                      <button
                        disabled={order.isDelivered}
                        onClick={() => handleDelivery(order._id)}
                        className={`${
                          !order.isDelivered
                            ? "hover:bg-yellow-500 bg-myYellow cursor-pointer"
                            : "bg-myGray cursor-not-allowed"
                        } text-white font-bold py-1 px-2 rounded transition duration-150 ease-in-out`}
                      >
                        {order.isDelivered ? "Delivered" : "Mark Delivered"}
                      </button>
                      <button
                        onClick={() => handleCancellation(order._id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition duration-150 ease-in-out"
                      >
                        Delete
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
