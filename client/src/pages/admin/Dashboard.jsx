import React from "react";
import LineChartComponent from "../../components/admin/LineChart";

import PieChartComponent from "../../components/admin/PieChartComponent";
export default function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <LineChartComponent />
        <PieChartComponent />
      </div>
    </div>
  );
}
