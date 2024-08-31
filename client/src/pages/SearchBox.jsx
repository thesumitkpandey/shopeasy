import { useLoaderData, useSearchParams } from "react-router-dom";
import ProductList from "../components/products/Products";

export default function SearchBox() {
  const products = useLoaderData();
  const [params] = useSearchParams();
  const searchQuery = params.get("query")?.toLowerCase() || "";
  const searchedResultProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  return <ProductList products={searchedResultProducts} />;
}
