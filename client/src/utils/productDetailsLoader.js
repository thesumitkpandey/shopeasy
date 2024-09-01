import axios from "axios";
async function productDetailLoader({ params }) {
  if (params.id == "new") {
    return {};
  }
  try {
    const productDetails = await axios.get(
      `${process.env.VITE_SERVER}/api/products/${params.id}`
    );
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
