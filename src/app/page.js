"use client";
import React, { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch(
      "https://api.escuelajs.co/api/v1/products?limit=100"
    );
    const data = await res.json();

    if (data) {
      setProducts(data);
    }
  };
  console.log(products);
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.length > 0 && (
        <div className="grid grid-cols-4 gap-5">
          {products.map((prod) => {
            return (
              <span key={prod.id}>
                <img src={prod.images} alt={prod.id} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
