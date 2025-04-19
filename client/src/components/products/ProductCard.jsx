import React from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product._id}`}>
        <div className="relative pb-[100%] overflow-hidden">
          <img
            src={product.image || "/placeholder-product.jpg"}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate">
            {product.name}
          </h3>
          <div className="flex items-center mb-2">
            <span className=" text-sm ml-1 flex text-yellow justify-center items-center">
              <Ratings rating={product.finalRating} />
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">₹{product.price}</span>
            {product.inStock > 0 ? (
              <span className="text-green-500 text-sm">
                {product.inStock} left
              </span>
            ) : (
              <span className="text-red-500 text-sm">Out of Stock</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
