import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
export default function ProductList({ products }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <div className="border rounded-lg overflow-hidden  hover:shadow-2xl transition-shadow duration-300">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-myYellow font-bold text-2xl">
                    ₹{product.price}
                  </span>
                  <span className="text-yellow-500 flex">
                    <span className="mx-2 text-l">{`${product.reviewCounts} Reviews`}</span>
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
