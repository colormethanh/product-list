"use client";
import Image from "next/image";
import styles from "./page.module.css";
import useProducts from "./hooks/useProducts";
import ProductCard from "./components/ProductCard";
import ProductsContainer from "./components/ProductsContainer";
import { createKey } from "./utilities/helpers";
import PaginatorBar from "./components/PaginatorBar";
import SearchAndFilterBar from "./components/SearchAndFilterBar";

export default function Home() {
  const {fetchProducts, products, pageData, isLoading } = useProducts();

  return (
    <div className={styles.page}>
      <h1> Products </h1>
      <SearchAndFilterBar />
      {!isLoading && (
        <>
          <ProductsContainer>
            {products.map((product) => {
              return <ProductCard key={createKey()} product={product} />;
            })}
          </ProductsContainer>
          <PaginatorBar pageData={pageData} fetchFunction={fetchProducts} />
        </>
      )}
    </div>
  );
}
