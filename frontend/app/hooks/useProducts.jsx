import { useState, useEffect } from "react";

export default function useProducts(queries) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [pageData, setPageData] = useState(null);

  const fetchProducts = async (queries = {}) => {
    setIsLoading(true);

    try {
      const url = "http://localhost:8000/products";
      const searchUrl = `${url}?price=${queries.price || ""}&productName=${
        queries.productName || ""
      }&page=${queries.page || 1}&category=${queries.category || ""}`;
      console.log(`fetching url: ${searchUrl}`);

      const response = await fetch(searchUrl);

      if (!response.ok) {
        // todo: set up error handling
        console.log(response);
        throw new Error("Api response was not okay");
      }

      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      setProducts(data.products);

      // Todo: make this code better with spread
      setPageData({
        product_count: data.product_count,
        current_page: data.current_page,
        max_page: data.max_page,
        categories: data.categories,
      });
    } catch (err) {
      // Todo: set up error handling
      console.log("Error fetching", err);
    }
  };

  useEffect(() => {
    fetchProducts(queries);
  }, [queries]);

  return { fetchProducts, products, pageData, isLoading };
}
