import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Local state for price inputs
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  // Handle filter change (except price range)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newParams = new URLSearchParams(searchParams);

    if (type === "checkbox") {
      checked ? newParams.set(name, "true") : newParams.delete(name);
    } else {
      value ? newParams.set(name, value) : newParams.delete(name);
    }

    setSearchParams(newParams);
  };

  // Apply price filter when "Go" button is clicked
  const applyPriceFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    if (minPrice) newParams.set("minPrice", minPrice);
    else newParams.delete("minPrice");

    if (maxPrice) newParams.set("maxPrice", maxPrice);
    else newParams.delete("maxPrice");

    setSearchParams(newParams);
  };

  return (
    <>
      {/* Mobile Button to Open Filters */}
      <button
        className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsFilterOpen(true)}
      >
        Open Filters
      </button>

      {/* Backdrop for Mobile */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsFilterOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-60 bg-white p-5 shadow-lg transition-transform transform z-50 
        ${isFilterOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:relative lg:w-64 lg:h-auto lg:shadow-none lg:block`}
      >
        {/* Close Button for Mobile */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            className="text-gray-600 text-lg"
            onClick={() => setIsFilterOpen(false)}
          >
            ✖
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <label className="block font-semibold">Category</label>
          <select
            name="category"
            value={searchParams.get("category") || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="fitness">Fitness</option>
            <option value="furniture">Furniture</option>
            <option value="grocery">Grocery</option>
          </select>
        </div>

        {/* Ratings Filter */}
        <div className="mb-4">
          <label className="block font-semibold">Ratings</label>
          <select
            name="ratings"
            value={searchParams.get("ratings") || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Any</option>
            <option value="5">5</option>
            <option value="4">4 & Above</option>
            <option value="3">3 & Above</option>
            <option value="2">2 & Above</option>
            <option value="1">1 & Above</option>
          </select>
        </div>

        {/* Price Range with "Go" Button */}
        <div className="mb-4">
          <label className="block font-semibold">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="minPrice"
              min={0}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              name="maxPrice"
              min={Number(minPrice) + 1 || 1}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max"
              className="w-full p-2 border rounded-md"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={applyPriceFilter}
            >
              Go
            </button>
          </div>
        </div>

        {/* In-Stock Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="inStock"
            checked={searchParams.get("inStock") === "true"}
            onChange={handleChange}
            className="h-5 w-5"
          />
          <label className="font-semibold">In Stock Only</label>
        </div>
      </aside>
    </>
  );
};

export default Filter;
