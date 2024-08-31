import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";

export default function CategoryBanner({ category, products }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-myYellow">
        Best of {category}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {products
          .filter((p) => p.category == category)
          .sort((a, b) => b.ratings - a.ratings)
          .splice(0, 4)
          .map((product, index) => (
            <Link to={`/products/${product._id}`} key={index}>
              <div className="border rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-cyan-900">
                    {product.name}
                  </h3>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-myYellow font-bold text-xl">
                      ₹{product.price}
                    </span>
                    <span className="text-yellow-500 flex items-center">
                      <span className="mx-2 text-sm">{`${product.reviewCounts} Reviews`}</span>
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
