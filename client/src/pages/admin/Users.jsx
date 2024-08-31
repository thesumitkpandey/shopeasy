import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Users() {
  const [users, setUsers] = useState(useLoaderData());
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    joinedDate: "",
    isActive: "",
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user._id.includes(searchTerm) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const userJoinedDate = new Date(user.createdAt).toISOString().split("T")[0];
    const matchesDate = filters.joinedDate
      ? userJoinedDate === filters.joinedDate
      : true;

    const matchesActiveStatus =
      filters.isActive === ""
        ? true
        : filters.isActive === "active"
        ? user.active
        : !user.active;

    return matchesSearch && matchesDate && matchesActiveStatus;
  });

  async function handleToggleActive(id) {
    try {
      const updatedUser = await axios.put(`/api/admin/users`, { _id: id });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id
            ? { ...user, isActive: updatedUser.data.isActive }
            : user
        )
      );
      toast.success(`User ${id} status updated`);
    } catch (err) {
      console.error("Failed to update user status", err);
      toast.error(err.message);
    }
  }

  async function handleDeleteUser(id) {
    try {
      await axios.delete(`/api/admin/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      toast.success(`User ${id} deleted`);
    } catch (err) {
      console.error("Failed to delete user", err);
      toast.error(err.message);
    }
  }

  return (
    <div className="ml-72 p-4">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-2xl">{users.length}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Active Users</h2>
          <p className="text-2xl">
            {users.filter((user) => user.active).length}
          </p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Users Joined Today</h2>
          <p className="text-2xl">
            {
              users.filter(
                (userElement) =>
                  new Date().toLocaleDateString() ==
                  new Date(userElement.createdAt).toLocaleDateString()
              ).length
            }
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap justify-between items-center">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Name, Email, or User ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded mb-2 md:mb-0 "
          />
        </div>

        <div className="flex space-x-4">
          <input
            type="date"
            value={filters.joinedDate}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, joinedDate: e.target.value }))
            }
            className="border p-2 rounded"
          />

          <select
            value={filters.isActive}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, isActive: e.target.value }))
            }
            className="border p-2 rounded"
          >
            <option value="">Active Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="shadow-md sm:rounded-lg">
          <table className="w-full text-xs text-left text-gray-500">
            <thead className="text-lg text-gray-700 uppercase bg-gray-50">
              <tr>
                {[
                  "User ID",
                  "Name",
                  "Email",
                  "Phone",
                  "Joined On",
                  "Active",
                  "Actions",
                ].map((item) => (
                  <th key={item} className="py-2 px-2 border-b border-gray-200">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="text-sm">
                  <td className="py-2 px-2 border-b border-gray-200">
                    {user._id}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-200">
                    {user.name}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-200">
                    {user.email}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-200">
                    {user.phone}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-200">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-200 text-center">
                    {user.active ? "Active" : "Inactive"}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-200 text-center">
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleToggleActive(user._id)}
                        className={`${
                          user.active
                            ? "bg-myYellow hover:bg-yellow-600"
                            : "bg-myGray hover:bg-gray-500"
                        } text-white font-bold py-1 px-2 rounded transition duration-150 ease-in-out`}
                      >
                        {user.active ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded transition duration-150 ease-in-out"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
