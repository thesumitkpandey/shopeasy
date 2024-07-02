import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
export default function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getAllProducts() {
      const { data } = await axios.get("/api/products");

      setProducts(data);
    }
    getAllProducts();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Product Listing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="border rounded-lg overflow-hidden  hover:shadow-2xl transition-shadow duration-300">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-green-600 font-bold">
                    ${product.price}
                  </span>
                  <span className="text-yellow-500 flex">
                    <span className="mx-2 text-l">{`${product.reviews} Reviews`}</span>
                    <Ratings rating={product.ratings} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
