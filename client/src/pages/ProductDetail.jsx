import React, { useState, useEffect } from "react";
import Ratings from "../components/products/Ratings";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../components/errors/Error";
import Loading from "../components/errors/Loading";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice.js";
export default function ProductDetail() {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchSingleProduct() {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        setIsError(true);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSingleProduct();
  }, [id]);

  function addCart() {
    dispatch(addToCart({ product, quantity }));
    navigate("/cart");
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isError ? (
        <Error />
      ) : (
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
                  <Ratings rating={product.ratings} />
                </div>
                <span className="ml-2 text-gray-600">
                  ({product.reviewCounts} reviews)
                </span>
              </div>
              <div className="mb-4">
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
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
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
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
      )}
    </>
  );
}
