import axios from "axios";
async function allOrders() {
  try {
    const orders = await axios.get(
      `${process.env.VITE_SERVER}/api/admin/orders`
    );
    if (orders) {
      return orders.data;
    } else {
      throw new Error("Failed to load orders");
    }
  } catch (err) {
    return err.message;
  }
}
export default allOrders;
