"use client";
import React, { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };
  console.log(products);
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.length > 0 && (
        <div className="text-2xl">
          {products.map((prod) => {
            return <span key={prod.id}>{prod.title}</span>;
          })}
        </div>
      )}
    </div>
  );
}
