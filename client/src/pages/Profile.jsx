import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { signOut } from "../redux/authSlice";

export default function Profile() {
  const { userInfo } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone || "",
  });
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  function handleEnableEditing() {
    setIsEditing(!isEditing);
  }

  async function handleSaveChanges() {
    try {
      const updateResponse = await axios.put("/api/users", {
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
      });
      dispatch(signOut());
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen z-10 flex items-center justify-center md:bg-update-profile-bg bg-cover bg-center md:relative">
      <div className="bg-white md:absolute   md:left-16  p-8 rounded-lg shadow-lg w-full max-w-2xl md:bg-opacity-20 backdrop-blur-md">
        <h2 className="text-3xl font-semibold mb-6">Profile Page</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={isEditing ? handleSaveChanges : handleEnableEditing}
              type="submit"
              className={`px-6 py-3 ${
                isEditing ? "bg-myYellow" : "bg-myGray"
              } text-white rounded-md`}
            >
              {isEditing ? "Save" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
