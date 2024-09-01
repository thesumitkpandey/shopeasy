import React, { useState } from "react";
import {
  useLoaderData,
  Link,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { MdAddBox } from "react-icons/md";
import Pagination from "../../components/pagination/Pagination";
export default function Products() {
  const [products, setProducts] = useState(useLoaderData());
  const [searchTerm, setSearchTerm] = useState("");
  const [params, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    inStock: "",
    category: "",
    priceRange: "",
  });

  async function handleDelete(productId) {
    try {
      const deleteStatus = await axios.delete(
        `${process.env.VITE_SERVER}/api/admin/products`,
        {
          data: { _id: productId },
        }
      );

      toast.success(`Product ${productId} deleted successfully`);
    } catch (err) {
      toast.error(err.message);
    }
  }

  const filteredProducts = products.allProducts.filter((product) => {
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
      ? product.category.toLowerCase() === filters.category.toLowerCase()
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
  function onPageChange(newPageNumber) {
    navigate(`/admin-products?page=${newPageNumber}`);
  }
  return (
    <div className="ml-72 p-4">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Total Products</h2>
          <p className="text-2xl">{products.allProducts.length}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Out of Stock</h2>
          <p className="text-2xl">
            {
              products.allProducts.filter((product) => product.inStock === 0)
                .length
            }
          </p>
        </div>
        <Link
          to="/admin-products/new"
          className="bg-blue-500 flex items-center content-center flex-col text-white p-4 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-bold">Add New Product</h2>
          <MdAddBox className="text-4xl" />
        </Link>
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
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Grocery">Grocery</option>
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
      <Pagination
        currentPage={Number(params.get("page"))}
        totalPages={products.pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}
