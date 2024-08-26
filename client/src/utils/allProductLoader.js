import axios from "axios";
async function allProducstLoaders() {
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
export default allProducstLoaders;
