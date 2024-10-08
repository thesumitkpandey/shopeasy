import axios from "axios";
async function myOrdersLoader() {
  try {
    const allOrders = await axios.get(`${process.env.VITE_SERVER}/api/orders`);
    if (allOrders) {
      return allOrders.data.orders;
    } else {
      throw new Error("Failed to fetch orders");
    }
  } catch (err) {
    return err.message;
  }
}
export default myOrdersLoader;
