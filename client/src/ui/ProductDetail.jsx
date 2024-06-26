import React from "react";
import Ratings from "../features/products/Ratings";
import { useParams } from "react-router-dom";
import fake from "../features/products/fake";

export default function ProductDetail() {
  const { id } = useParams();
  const product = fake.find((el) => el.id == id);
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-800 mb-4">
            ${product.price}
          </p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <div className="text-yellow-500 flex">
              <Ratings rating={product.ratings} />
            </div>
            <span className="ml-2 text-gray-600">
              ({product.reviews} reviews)
            </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Category:</span> {product.category}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Stock:</span> {product.stock}{" "}
            available
          </div>
          <div className="mb-4">
            <span className="font-semibold">Brand:</span> {product.brand}
          </div>
          <button
            id="test"
            className="bg-customGreen text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
