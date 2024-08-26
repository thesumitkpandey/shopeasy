import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState(useLoaderData());
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    inStock: "",
    category: "",
    priceRange: "",
  });

  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product._id !== productId));
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product._id.includes(searchTerm) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesInStock = filters.inStock
      ? filters.inStock === "inStock"
        ? product.inStock > 0
        : product.inStock === 0
      : true;

    const matchesCategory = filters.category
      ? product.category === filters.category
      : true;

    const matchesPrice = (() => {
      switch (filters.priceRange) {
        case "low":
          return product.price < 1000;
        case "1-5000":
          return product.price >= 1000 && product.price < 5000;
        case "5000-10000":
          return product.price >= 5000 && product.price < 10000;
        case "10000-15000":
          return product.price >= 10000 && product.price < 15000;
        case "15000-20000":
          return product.price >= 15000 && product.price < 20000;
        case "20000-above":
          return product.price >= 20000;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesInStock && matchesCategory && matchesPrice;
  });

  const truncateName = (name) => {
    return name.length > 20 ? `${name.slice(0, 20)}...` : name;
  };

  return (
    <div className="ml-72 p-4">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Total Products</h2>
          <p className="text-2xl">{products.length}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Out of Stock</h2>
          <p className="text-2xl">
            {products.filter((product) => product.stocks === 0).length}
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap justify-between items-center">
        <input
          type="text"
          placeholder="Product ID, Name, or Description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded mb-2 md:mb-0"
        />

        <div className="flex space-x-4">
          <select
            value={filters.inStock}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, inStock: e.target.value }))
            }
            className="border p-2 rounded"
          >
            <option value="">Stock Status</option>
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
            className="border p-2 rounded"
          >
            <option value="">Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
            <option value="beauty">Beauty</option>
          </select>

          <select
            value={filters.priceRange}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, priceRange: e.target.value }))
            }
            className="border p-2 rounded"
          >
            <option value="">Price Range</option>
            <option value="low">Below ₹1000</option>
            <option value="1-5000">₹1000 to ₹5000</option>
            <option value="5000-10000">₹5000 to ₹10000</option>
            <option value="10000-15000">₹10000 to ₹15000</option>
            <option value="15000-20000">₹15000 to ₹20000</option>
            <option value="20000-above">₹20000 and Above</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="shadow-md sm:rounded-lg">
          <table className="w-full text-xs text-left text-gray-500">
            <thead className="text-lg text-gray-700 uppercase bg-gray-50">
              <tr>
                {[
                  "ID",
                  "Image",
                  "Product Name",
                  "Stocks",
                  "Price (₹)",
                  "Actions",
                ].map((item) => (
                  <th key={item} className="py-2 px-2 border-b border-gray-200">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id} className="text-sm">
                  <td className="py-2 px-2 border-b border-gray-200">
                    {product._id}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-2 px-2 border-b border-gray-200">
                    {truncateName(product.name)}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-200">
                    {product.inStock}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-200">
                    ₹{product.price}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-200 space-x-2">
                    <Link
                      to={`/admin-products/${product._id}`}
                      className="bg-myYellow hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded transition duration-150 ease-in-out"
                    >
                      Modify
                    </Link>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition duration-150 ease-in-out"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
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
