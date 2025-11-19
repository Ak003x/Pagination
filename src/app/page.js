"use client";
import React, { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data) {
      setProducts(data.products);
    }
  };
  console.log(products);
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-black w-full h-full">
      {products.length > 0 && (
        <div className="grid grid-cols-5 gap-5 p-5  bg-black ">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span
                key={prod.id}
                className="p-5 text-xl text-center rounded-2xl bg-yellow-400 cursor-pointer "
              >
                <img src={prod.images[0]} alt={prod.id} className="object-cover" />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      <div>
        <span>👈</span>
        <span>
          {products.length > 0 &&
            [...Array(products.length / 10)].map((_, i) => {
              return <span key={i}>{i + 1}</span>;
            })}
        </span>
        <span>👉</span>
      </div>
    </div>
  );
}
