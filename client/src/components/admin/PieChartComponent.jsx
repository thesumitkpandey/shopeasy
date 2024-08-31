import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
const pieChartData = [
  { name: "Men", value: 0 },
  { name: "Women", value: 0 },
  { name: "Kids", value: 0 },
  { name: "Electronics", value: 0 },
  { name: "Furniture", value: 0 },
  { name: "Grocery", value: 0 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#D6D6D6",
  "#8D8D8D",
];

export default function PieChartComponent({ products }) {
  const counts = pieChartData.reduce((acc, category) => {
    acc[category.name] = 0;
    return acc;
  }, {});

  products.forEach((product) => {
    if (counts.hasOwnProperty(product.category)) {
      counts[product.category]++;
    }
  });
  const updatedPieChartData = pieChartData.map((category) => ({
    ...category,
    value: counts[category.name] || 0,
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={updatedPieChartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        label
      >
        {updatedPieChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
