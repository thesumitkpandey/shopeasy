import React, { useState, useEffect } from "react";
import Ratings from "../components/products/Ratings";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice.js";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { userInfo } = useSelector((state) => state.auth);
  const loadedProduct = useLoaderData();
  const [product, setProduct] = useState(loadedProduct);
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({
    comment: "",
    rating: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setProduct(loadedProduct);
  }, [loadedProduct]);

  function addCart() {
    dispatch(addToCart({ product, quantity }));
    navigate("/cart");
  }

  function handleReviewChange(e) {
    setReviewForm({
      ...reviewForm,
      [e.target.id]: e.target.value,
    });
  }

  async function handleReviewSubmit(e) {
    e.preventDefault();
    if (product.reviews.some((p) => p._id === userInfo._id)) {
      toast.error("You have already submitted a review.");
    } else if (!reviewForm.rating) {
      toast.error("Please select a rating.");
    } else {
      try {
        const response = await axios.post(
          `${process.env.VITE_SERVER}/api/products/${product._id}/reviews`,
          { rating: reviewForm.rating, comment: reviewForm.comment }
        );
        if (response.status === 201) {
          setProduct(response.data);
          toast.success("Review submitted successfully.");
        }
      } catch (err) {
        toast.error("Failed to submit review.");
      }
    }
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
              <Ratings rating={product.ratings} />
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
              {[...Array(Math.min(5, product.inStock)).keys()].map((el) => (
                <option key={el + 1} value={el + 1}>
                  {el + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            id="test"
            className="bg-myYellow text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition duration-300 mr-2"
            onClick={addCart}
            disabled={product.inStock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {userInfo && (
        <div className="mt-12 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Leave a Review</h2>
          <form
            className="grid grid-cols-1 gap-4"
            onSubmit={handleReviewSubmit}
          >
            <div>
              <label
                htmlFor="rating"
                className="block text-lg font-semibold mb-2"
              >
                Rating:
              </label>
              <select
                id="rating"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                value={reviewForm.rating}
                onChange={handleReviewChange}
              >
                <option>Select Rating</option>
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="comment"
                className="block text-lg font-semibold mb-2"
              >
                Comment:
              </label>
              <input
                type="text"
                id="comment"
                value={reviewForm.comment}
                onChange={handleReviewChange}
                placeholder="Enter your review"
                required
                maxLength={300}
                minLength={1}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-myYellow text-white py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300"
              disabled={!reviewForm.rating || !reviewForm.comment}
            >
              Submit Review
            </button>
          </form>
        </div>
      )}

      <div className="mt-12 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">
          {product.reviews.length > 0 ? "Reviews" : "No Reviews Yet"}
        </h2>
        <div className="mb-6">
          {product.reviews.map((review, id) => (
            <div className="border-b pb-4 mb-4" key={id}>
              <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">{review.name}</span>
                <div className="flex text-yellow-500">
                  <Ratings rating={review.rating} />
                </div>
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
