import React, { useEffect, useState } from "react";
import Button from "./Button";
import PaginationNumbers from "./PaginationNumbers";


export default function PaginatorBar({
  pageData,
  fetchFunction,
  queries,
  setQueries,
}) {
  const { current_page, max_page, product_count } = pageData;

  const onNextPage = (e) => {
    e.preventDefault();
    const updatedQuery = { ...queries, page: parseInt(current_page) + 1 };
    setQueries(updatedQuery);
    fetchFunction(updatedQuery);
  };

  const onPrevPage = (e) => {
    e.preventDefault();
    const updatedQuery = { ...queries, page: parseInt(current_page) - 1 };
    setQueries(updatedQuery);
    fetchFunction(updatedQuery);
  };

  

  return (
    <div className="w-full flex justify-center mb-3">
      <div className="w-3/4 flex justify-between">
        <Button onClick={(e) => onPrevPage(e)}> Prev Page </Button>
        {/* Todo: add proper pagination numbers in pagination numbers */}
        <PaginationNumbers pageData={pageData} /> 
        <Button onClick={(e) => onNextPage(e)}> Next Page </Button>
      </div>
    </div>
  );
}
