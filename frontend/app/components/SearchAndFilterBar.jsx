import React from "react";

export default function SearchAndFilterBar() {
  return (
    <div className="text-black">
      <input
        type="text"
        className="border rounded-sm px-4 py-2 focus:outline-none"
        placeholder="Enter text"
      />
      <select class="border rounded-sm mx-1 px-4 py-2 focus:outline-none">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <select class="border rounded-sm mx-1 px-4 py-2 focus:outline-none">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
}
