import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";

export default function ModifyProduct() {
  const [product, setProduct] = useState(useLoaderData());
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const updatedProductDetails = await axios.put(
        `/api/admin/products/${product._id}`,
        product
      );

      navigate("/admin-products");
      toast.success(`Product ${product.id} updated successfully`);
    } catch (err) {
      toast.error("Failed to update product");
      console.error(err);
    }
  }

  return (
    <div className="ml-72 p-6">
      <h1 className="text-3xl font-bold mb-6">Modify Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Brand Name
            </label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter brand name"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Stocks
            </label>
            <input
              type="number"
              name="stocks"
              value={product.inStock}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter stock quantity"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Grocery">Grocery</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter product description"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="col-span-2">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <input
              name="image"
              value={product.image}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter product Image link"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-150"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
