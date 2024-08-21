import axios from "axios";
async function allProducts() {
  try {
    const products = await axios.get("/api/admin/products");
    if (products) {
      return products.data;
    } else {
      throw new Error("Failed to load products");
    }
  } catch (err) {
    return err.message;
  }
}
export default allOrders;
