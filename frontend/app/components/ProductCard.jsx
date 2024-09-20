import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="px-12 py-10">
      <div className="bg-white text-black h-full rounded-sm">
        <div className="px-3 flex justify-between">
          <div className="mt-1">
            Category: <span className="font-semibold">{product.category}</span>
          </div>
          <div className="mt-1 text-2xl font-semibold">$ {product.price}</div>
        </div>
        <div className="flex flex-col mb-1">
          <img className="p-3" src={product.image} alt="product image" />
          <span className="px-3 text-3xl font-bold"> {product.name} </span>
        </div>
      </div>
    </div>
  );
}
