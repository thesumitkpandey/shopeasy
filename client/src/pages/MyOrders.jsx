import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const orders = useLoaderData();
  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between transition-transform transform hover:scale-105"
            >
              <div className="flex-grow mb-4 md:mb-0 md:mr-6">
                <p className="text-2xl font-bold text-gray-900">
                  Order #{order._id}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-lg font-medium text-gray-800">
                  Total: ₹{order.totalOrderValue}
                </p>
                <p className="text-gray-800">
                  Method:{" "}
                  {order.paymentMethod === "cash_on_delivery"
                    ? "Cash on Delivery"
                    : "Paypal"}
                </p>
                <p className="text-gray-800">
                  Status:{" "}
                  {order.paymentStatus === "pending" ? "Pending" : "Done"}
                </p>
              </div>

              <div className="flex-grow mb-4 md:mb-0 md:mr-6">
                <p className="text-gray-800 font-semibold mb-2">Items:</p>
                <ul className="list-disc list-inside text-gray-800">
                  {order.items.length > 0 ? (
                    order.items.map((item) => (
                      <li key={item._id} className="mb-1">
                        {item.name} - ₹{item.price} (x{item.quantity})
                      </li>
                    ))
                  ) : (
                    <li>No items found</li>
                  )}
                </ul>
              </div>

              <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mr-4 ${
                    order.isDelivered
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "On Way"}
                </span>
                <Link
                  to={`/orders/${order._id}`}
                  className="bg-myYellow text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-500"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              No Orders Yet!
            </h3>
            <p className="text-gray-600 mb-6">
              You haven’t placed any orders yet. Start exploring our products
              and place your first order.
            </p>
            <Link
              to="/products"
              className="bg-myYellow text-white px-6 py-3 rounded-lg shadow hover:bg-yellow-500 transition"
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
