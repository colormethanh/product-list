import React, { useEffect, useState } from "react";
import Button from "./Button";
import PaginationNumbers from "./PaginationNumbers";

export default function PaginatorBar({
  pageData,
  fetchFunction,
  queries,
  setQueries,
}) {
  const { current_page, max_page } = pageData;

  const onPageSelect = (e, page) => {
    e.preventDefault();
    const updatedQuery = { ...queries, page: page };
    setQueries(updatedQuery);
    fetchFunction(updatedQuery);
  };

  return (
    <div className="w-full flex justify-center mb-3">
      <div className="w-full sm:w-1/2 flex flow-row justify-between">
        <div className="w-1/5 flex justify-end">
          <Button
            classText={current_page === 1 && "hidden"}
            onClick={(e) => onPageSelect(e, current_page - 1)}
          >
            {" "}
            Prev{" "}
          </Button>
        </div>
        <div className="w-3/5 flex justify-center">
          <PaginationNumbers pageData={pageData} onPageSelect={onPageSelect} />
        </div>
        <div className="w-1/5 flex justify-start">
          <Button
            classText={current_page === max_page && "hidden"}
            onClick={(e) => onPageSelect(e, current_page + 1)}
          >
            {" "}
            Next{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}
