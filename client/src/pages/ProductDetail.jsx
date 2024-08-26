import React, { useState, useEffect } from "react";
// import Ratings from "../components/products/Ratings";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";
import Error from "../components/errors/Error";
import Loading from "../components/errors/Loading";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice.js";
export default function ProductDetail() {
  const product = useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function addCart() {
    dispatch(addToCart({ product, quantity }));
    navigate("/cart");
  }
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
            ₹{product.price}
          </p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <div className="text-myYellow flex">
              {/*<Ratings rating={product.ratings} />*/}
            </div>
            <span className="ml-2 text-gray-600">
              ({product.reviewCounts} reviews)
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
          <div className="mb-4">
            <label htmlFor="quantity" className="font-semibold">
              Quantity:
            </label>
            <select
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="ml-2 p-2 border border-gray-300 rounded-md bg-white shadow-sm"
            >
              {product.inStock >= 5 ? (
                [1, 2, 3, 4, 5].map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))
              ) : product.inStock == 0 ? (
                <option className="text-red-600 font-bold">Out Of Stock</option>
              ) : (
                [1, 2, 3, 4]
                  .filter((el) => el <= product.inStock)
                  .map((val) => (
                    <option key={val} val={val}>
                      {val}
                    </option>
                  ))
              )}
            </select>
          </div>
          <button
            id="test"
            className="bg-myYellow text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition duration-300 mr-2"
            onClick={addCart}
            disabled={product.inStock === 0 ? true : false}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
