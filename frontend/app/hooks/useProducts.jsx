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

      const response = await fetch(searchUrl);

      if (!response.ok) {
        setPageData({
          product_count: 0,
          current_page: 0,
          max_page: 1,
          categories: [],
        });
        setProducts([]);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setIsLoading(false);
      setProducts(data.products);

      setPageData({
        product_count: data.product_count,
        current_page: data.current_page,
        max_page: data.max_page,
        categories: data.categories,
      });
    } catch (err) {

      setPageData({
        product_count: 0,
        current_page: 0,
        max_page: 0,
        categories: [],
      });
      setProducts([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(queries);
  }, [queries]);

  return { fetchProducts, products, pageData, isLoading };
}
