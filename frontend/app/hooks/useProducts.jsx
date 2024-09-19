import { useState, useEffect } from "react";

export default function useProducts(page = 1) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [pageData, setPageData] = useState(null);

  const fetchProducts = async (queries = {}) => {
    setIsLoading(true);
    
    try {
      const defaultQueries = { price: "", productName: "", page: 1 };
      const url = "http://localhost:8000/products";
      const searchUrl = `${url}?price=${
        queries.price || defaultQueries.price
      }&productName=${queries.productName || defaultQueries.productName}&page=${
        queries.page || defaultQueries.page
      }`;
      console.log(`fetching url: ${searchUrl}`)

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
      });
    } catch (err) {
      // Todo: set up error handling
      console.log("Error fetching", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { fetchProducts, products, pageData, isLoading };
}
