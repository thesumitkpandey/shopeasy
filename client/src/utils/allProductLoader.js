import axios from "axios";

async function allProducstLoaders({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;

  try {
    const products = await axios.get(`/api/admin/products?page=${page}`);
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
