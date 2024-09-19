"use client";
import Image from "next/image";
import styles from "./page.module.css";
import useProducts from "./hooks/useProducts";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const {products, pageData, isLoading} = useProducts();

  return (
    <div className={styles.page}>
     <h1> Hello world </h1>
     <div>
      {!isLoading && <> {products.map((product) => {
        return <ProductCard product={product} />
      })} </>}

      {!isLoading && <p> {pageData.product_count} </p>}
      
     </div>
    </div>
  );
}
