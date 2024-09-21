import React, { use, useState } from "react";
import { createKey } from "../utilities/helpers";

export default function SearchAndFilterBar({
  categories,
  queries,
  setQueries,
}) {
  const [productNameInput, setProductNameInput] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSortSelect = (e) => {
    setSelectedSort(e.target.value);
    setQueries((prev) => ({ ...prev, price: e.target.value }));
  };

  const handleCategorySelect = (e) => {
    setSelectedCategory(e.target.value);
    setQueries((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleProductSearch = (e) => {
    if (e.key === "Enter") {
      setQueries((prev) => ({ ...prev, productName: productNameInput }));
      setProductNameInput("");
    }
  };

  const handleInputChange = (e) => {
    setProductNameInput(e.target.value);
  };

  return (
    <div className="text-[#904420] w-full mt-3 mx-3 flex justify-center">
      <input
        type="text"
        className="w-3/5 border rounded-sm px-4 py-2 focus:outline-none hidden sm:block"
        placeholder="Enter text"
        value={productNameInput}
        onChange={handleInputChange}
        onKeyUp={handleProductSearch}
      />
      <select
        className="border mx-3 rounded-sm px-4 py-2 focus:outline-none"
        value={selectedSort}
        onChange={handleSortSelect}
      >
        <option value=""> sort: Most Relevant </option>
        <option value="-1">Sort: Price Highest first</option>
        <option value="1">Sort: Price Lowest first</option>
      </select>
      <select
        className="border rounded-sm px-4 py-2 focus:outline-none"
        value={selectedCategory}
        onChange={handleCategorySelect}
      >
        <option key={createKey()} value="">
          Search from category
        </option>
        {categories.map((category) => (
          <option key={createKey()} value={category}>
            {" "}
            {category}{" "}
          </option>
        ))}
      </select>
    </div>
  );
}
