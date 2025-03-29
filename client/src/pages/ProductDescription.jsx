import { useState, useEffect } from "react";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { IoBagCheckSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import Loader from "../components/Loader";
import Ratings from "../components/products/Ratings";
import { CiShop } from "react-icons/ci";
import { FaTags, FaDollarSign, FaUndo } from "react-icons/fa";

const ProductDescription = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance(`/api/products/${id}`);
        console.log(response);
        setProductDetails(response.data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <Loader />;

  if (!productDetails) {
    return (
      <p className="text-center text-red-500 text-xl font-semibold">
        Product not found.
      </p>
    );
  }

  return (
    <div className="h-full w-full ">
      <div className="flex flex-col lg:flex-row gap-8 m-4 bg-white">
        <div className="md:w-1/3 w-full md:sticky md:top-4  p-4 h-full ">
          <img
            src={productDetails.image || "/placeholder.jpg"}
            alt={productDetails.name || "Product"}
            className="w-full h-[350px] object-contain rounded-lg"
          />
          <div className="flex mt-4 text-white font-bold">
            <button className="w-1/2 bg-yellow hover:bg-yellowhover transition-all p-4 rounded-l flex justify-center gap-2 items-center">
              <IoBagCheckSharp /> Buy Now
            </button>
            <button className="w-1/2 bg-gray-800 hover:bg-gray-900 transition-all p-4 rounded-r flex justify-center gap-2 items-center">
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>

        <div className="lg:w-2/3 w-full space-y-4 m-6">
          <h2 className="text-2xl">{productDetails.name}</h2>
          <p className="text-green-800 mb-0 text-sm">Special Price</p>
          <div className="flex ">
            <h3 className="text-3xl text-black font-bold">
              {productDetails.price}
            </h3>
            <span
              className={`ml-20 text-center text-white content-center p-2 justify-center ${
                productDetails.inStock > 0 ? "bg-green-800" : "bg-red-600"
              }  rounded-md`}
            >
              {productDetails.inStock == 0
                ? "Out of Stock"
                : `In Stock - ${productDetails.inStock}`}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2   gap-1 text-yellow-500">
              <span className="flex  items-center font-bold justify-self-start">
                <Ratings rating={productDetails.finalRating} /> Ratings
              </span>
              <span className="text-green-800 justify-self-end ">
                {productDetails.ratingsCounter} People Rated
              </span>
            </div>
          </div>

          <div className=" ">
            <p>{productDetails.description}</p>
          </div>
          <div className="p-4 border rounded-lg shadow-md bg-white w-fit flex justify-center text-center items-center">
            <h2 className="text-lg font-semibold">
              <CiShop />
            </h2>
            <p className="text-gray-700">Seller name</p>
          </div>
          <div className=" ">
            <h2 className="text-xl font-semibold  mb-4">Customer Reviews</h2>
            {productDetails.reviews.length > 0 ? (
              productDetails.reviews.map((review, index) => (
                <div
                  key={index}
                  className=" bg-white  mb-3 flex items-center gap-4"
                >
                  <img
                    src={review.user.photo || "/default-avatar.jpg"}
                    alt={review.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{review.user.name}</h3>
                    <div className="flex gap-1 text-yellow items-center">
                      <Ratings rating={review.userRating} />
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6  ">
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow">
          <FaTags className="text-blue-500 text-2xl" />
          <p className="text-lg font-semibold">Trending Style</p>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow">
          <FaDollarSign className="text-green-500 text-2xl" />
          <p className="text-lg font-semibold">Best Price</p>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow">
          <FaUndo className="text-red-500 text-2xl" />
          <p className="text-lg font-semibold">Easy Return</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
