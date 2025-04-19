import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../redux/authSlice";
import axiosInstance from "../../utils/axios";
import toast from "react-hot-toast";

export default function Wishlist({ id }) {
  const { userInfo } = useSelector((state) => state.auth);
  const [wishlist, setWishlist] = useState(userInfo.wishlist.includes(id));
  const dispatch = useDispatch();

  async function changeWishlist() {
    try {
      const response = await axiosInstance.put("/api/users/wishlist", {
        productId: id,
      });

      if (response.data.success) {
        dispatch(addToWishlist({ id }));
        setWishlist((prev) => !prev); // update local state immediately
      } else {
        toast.error("Please try again");
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
      toast.error("Something went wrong");
    }
  }

  return (
    <span
      onClick={changeWishlist}
      className="text-red-500 text-2xl cursor-pointer"
    >
      {wishlist ? <FaHeart /> : <FaRegHeart />}
    </span>
  );
}
