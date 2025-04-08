import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { addToWishlist } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
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
      } else {
        toast.error("Please try again");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <span onClick={changeWishlist}>
      {userInfo.wishlist.includes(id) ? <FaHeart /> : <FaRegHeart />}
    </span>
  );
}
