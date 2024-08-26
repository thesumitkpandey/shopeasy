import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PieChartComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    async function fetchCategoryData() {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/admin/products");
        const products = response.data;
        const categoryTotals = {};
        products.forEach((product) => {
          const { category } = product;
          if (categoryTotals[category]) {
            categoryTotals[category] += 1;
          } else {
            categoryTotals[category] = 1;
          }
        });
        const formattedData = Object.keys(categoryTotals).map((category) => ({
          name: category,
          value: categoryTotals[category],
        }));

        setCategoryData(formattedData);
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategoryData();
  }, []);

  return (
    <div className="p-4">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
