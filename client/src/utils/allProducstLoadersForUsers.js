import axios from "axios";
async function allProducstLoadersForUsers() {
  try {
    const products = await axios.get(`${process.env.VITE_SERVER}/api/products`);
    if (products) {
      return products.data;
    } else {
      throw new Error("Failed to load products");
    }
  } catch (err) {
    return err.message;
  }
}
export default allProducstLoadersForUsers;
