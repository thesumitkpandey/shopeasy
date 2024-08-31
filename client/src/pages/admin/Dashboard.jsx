import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import PieChartComponent from "../../components/admin/PieChartComponent";
import LineChartComponent from "../../components/admin/LineChartComponent";
import BarGraphComponent from "../../components/admin/BarGraphComponent";

export default function Dashboard() {
  const productDetails = useLoaderData();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      try {
        const { data } = await axios.get("/api/admin/orders");
        setOrders(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    getOrders();
  }, []);

  return (
    <div className="ml-72 p-4 grid grid-cols-12 gap-4">
      {/* Top row with Pie Chart and Bar Graph */}
      <div className="col-span-6">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Category wise products
          </h2>
          <PieChartComponent products={productDetails} />
        </div>
      </div>
      <div className="col-span-6">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-center">
            User Registrations (Last 7 Days)
          </h2>
          <BarGraphComponent />
        </div>
      </div>

      {/* Bottom row with Line Graph spanning the full width */}
      <div className="col-span-12">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Daily Orders
          </h2>
          <LineChartComponent orders={orders} />
        </div>
      </div>
    </div>
  );
}
