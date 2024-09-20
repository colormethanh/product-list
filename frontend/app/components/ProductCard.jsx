import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="px-6 py-4">
      <div className="bg-white  text-[#904420] h-full rounded-sm">
        <div className="px-6 flex justify-between">
          <div className="mt-1">
            Category: <span className="font-semibold">{product.category}</span>
          </div>
          <div className="mt-1 text-2xl font-semibold">${product.price}</div>
        </div>
        <div className="flex flex-col mb-10">
          <img className="px-6 py-4" src={product.image} alt="product image" />
          <span className="px-6 text-3xl font-bold"> {product.name} </span>
        </div>
      </div>
    </div>
  );
}
