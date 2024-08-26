import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const getMonthName = (monthIndex) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[monthIndex];
};

export default function LineChartComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    async function getOrdersData() {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/admin/orders");
        setOrderData(response.data);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getOrdersData();
  }, []);

  const aggregateDataByMonth = (data) => {
    const monthTotals = Array(12).fill(0); // Array to store total values for each month

    data.forEach((order) => {
      const month = new Date(order.createdAt).getMonth();
      monthTotals[month] += order.totalOrderValue; // Sum up values for each month
    });

    return monthTotals.map((total, index) => ({
      name: getMonthName(index),
      value: total,
    }));
  };

  const data = aggregateDataByMonth(orderData);

  return (
    <div className="ml-72 p-4">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <LineChart width={1000} height={500} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      )}
    </div>
  );
}
