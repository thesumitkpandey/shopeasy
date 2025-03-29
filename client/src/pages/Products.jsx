import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import FilterComponent from "../components/Filter";
import ProductCard from "../components/products/ProductCard";

export default function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    async function fetchProducts() {
      try {
        const response = await axiosInstance.get(
          `/api/products?${searchParams.toString()}`
        );
        setProducts(response.data.productsList); // Assuming your API returns { products: [...] }
      } catch (err) {
        setProducts((prev) => []);
        toast.error(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [searchParams]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - FilterComponent handles its own responsive behavior */}
      <FilterComponent />

      {/* Main Content Area */}
      <main className="flex-1 p-4">
        {/* Page Header */}

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-xl font-semibold text-gray-700">
              No products found
            </h2>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </main>
    </div>
  );
}
