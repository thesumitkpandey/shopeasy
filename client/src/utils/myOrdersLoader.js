import axios from "axios";
async function myOrdersLoader() {
  try {
    const allOrders = await axios.get("/api/orders");
    if (allOrders) {
      return allOrders.data.orders;
    } else {
      return null;
    }
  } catch (err) {
    return err;
  }
}
export default myOrdersLoader;
