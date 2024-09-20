"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";
import useProducts from "./hooks/useProducts";
import ProductCard from "./components/ProductCard";
import ProductsContainer from "./components/ProductsContainer";
import { createKey } from "./utilities/helpers";
import PaginatorBar from "./components/PaginatorBar";
import SearchAndFilterBar from "./components/SearchAndFilterBar";

// Todo examine responsiveness 

export default function Home() {
  const [queries, setQueries] = useState({});
  const { fetchProducts, products, pageData, isLoading } = useProducts(queries);

  return (
    <div className={styles.page}>
      <SearchAndFilterBar
        queries={queries}
        setQueries={setQueries}
        categories={!isLoading ? pageData.categories : []}
      />
      {!isLoading && (
        <>
          {pageData.product_count === 0 && (
            <h1 className="text-3xl text-center"> No products found :( </h1>
          )}
          <ProductsContainer>
            {pageData.product_count > 0 &&
              products.map((product) => {
                return <ProductCard key={createKey()} product={product} />;
              })}
          </ProductsContainer>
          <PaginatorBar
            pageData={pageData}
            fetchFunction={fetchProducts}
            queries={queries}
            setQueries={setQueries}
          />
        </>
      )}
    </div>
  );
}
