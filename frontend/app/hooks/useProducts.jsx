import { useState, useEffect } from "react";

export default function useProducts(page = 1) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products");

        if (!response.ok) {
          console.log(response);
          throw new Error("Api response was not okay");
        }

        const data = await response.json();
        console.log(data);
        setIsLoading(false);
        setProducts(data.products);
        setPageData({
          product_count: data.product_count,
          current_page: data.current_page,
          max_page: data.max_page,
        });
      } catch (err) {
        console.log("Error fetching", err);
      }
    };

    fetchProducts();
  }, [page]);

  return { products, pageData, isLoading };
}
