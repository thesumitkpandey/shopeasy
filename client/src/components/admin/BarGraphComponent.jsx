import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BarGraphComponent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const { data } = await axios.get("/api/admin/users");
        setUsers(data);
      } catch (err) {
        console.error(err.message);
      }
    }

    getUsers();
  }, []);

  const today = new Date();
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - i);

    const dateString = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    const userCount = users.filter((user) => {
      const userDate = new Date(user.createdAt);
      return (
        userDate.getDate() === date.getDate() &&
        userDate.getMonth() === date.getMonth() &&
        userDate.getFullYear() === date.getFullYear()
      );
    }).length;

    return { date: dateString, users: userCount };
  }).reverse();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="users" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
