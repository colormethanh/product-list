import React from "react";

export default function PageNumber({ pageNumber, isCurrent, onSelect }) {
  return (
    <div className={"flex flex-grow justify-center"}>
      <div
        className={`w-8 text-center text-[#A5EAEF] font-semibold flex flex-col justify-center hover:cursor-pointer ${
          isCurrent && "border-2 border-[#904420] rounded-md"
        }`}
        onClick={(e) => onSelect(e, pageNumber)}
      >
        {pageNumber}
      </div>
    </div>
  );
}
