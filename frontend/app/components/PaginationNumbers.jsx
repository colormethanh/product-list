import { useEffect, useState } from "react";
import { calculatePaginationIndex, createKey } from "../utilities/helpers";
import PageNumber from "./PageNumber";

export default function PaginationNumbers({pageData, onPageSelect}) {
  const [pagesArray, setPagesArray] = useState([]);
  const {current_page, max_page} = pageData;

  useEffect(() => {
    setPagesArray(calculatePaginationIndex(current_page, max_page));
  }, [pageData])
  
  return (
    <div className="flex flex-row w-full">
      {pagesArray.map((pageNumber) => (
        <PageNumber key={createKey()} pageNumber={pageNumber} isCurrent={pageNumber === current_page} onSelect={onPageSelect} />
      ))}
    </div>
  );
}

