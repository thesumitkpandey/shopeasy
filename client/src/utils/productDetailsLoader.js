import axios from "axios";
async function productDetailLoader({ params }) {
  try {
    const productDetails = await axios.get(`/api/products/${params.id}`);
    if (productDetails) {
      return productDetails.data;
    } else {
      throw new Error("Failed to fetch orders");
    }
  } catch (err) {
    return err.message;
  }
}
export default productDetailLoader;
