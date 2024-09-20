import React from "react";

export default function PageNumber({ pageNumber, isCurrent, onSelect }) {
  return (
    <div className={"flex flex-grow justify-center"}>
      <div
        className={`w-1/2 text-center flex flex-col justify-center hover:cursor-pointer ${
          isCurrent && "border rounded-md"
        }`}
        onClick={(e) => onSelect(e, pageNumber)}
      >
        {pageNumber}
      </div>
    </div>
  );
}
