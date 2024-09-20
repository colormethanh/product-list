import { useEffect, useState } from "react";
import { calculatePaginationIndex } from "../utilities/helpers";

export default function usePaginationIndexes({pageData}) {
  const [indexArray, setIndexArray] = useState([]);
  const {current_page, max_page} = pageData;

  useEffect(() => {
    const arr = Array.from({length: calculatePaginationIndex(current_page, max_page) }, (_, i) => parseInt(current_page) + i)
    setIndexArray(arr);
  }, [pageData])
  
  return (
    <div className="">
      {indexArray.map((i) => (
        <div> {i} </div>
      ))}
    </div>
  );
}

