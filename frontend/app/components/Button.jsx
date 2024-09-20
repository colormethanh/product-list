import React from "react";

export default function Button({children, onClick = (e) => {e.preventDefault}, classText}) {
  return (
    <button
      className={`bg-[#904420] hover:bg-[#6F371C] text-white font-semibold py-1 px-2 rounded ${classText}`}
      onClick={(e) => onClick(e)}
    >
      {children}
    </button>
  );
}
