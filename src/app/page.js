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

  const handleClick = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10)
      setPage(selectedPage);
  };

  return (
    <section className="bg-black w-full h-screen">
      {products.length > 0 && (
        <div className="grid grid-cols-5 gap-5 p-5  bg-black ">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span
                key={prod.id}
                className="p-5 text-xl text-center rounded-2xl bg-yellow-400 cursor-pointer "
              >
                <img
                  src={prod.images[0]}
                  alt={prod.id}
                  className="object-cover"
                />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      <div className=" flex justify-center mt-8 space-x-2 text-white">
        <button
          onClick={() => handleClick(page - 1)}
          className="px-4 py-2 bg-white text-black border border-gray-300 rounded-l-lg hover:bg-gray-500 transition disabled:opacity-0"
          disabled={page === 1}
        >
          👈
        </button>

        {products.length > 0 &&
          [...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                onClick={() => handleClick(i + 1)}
                className={`px-3 py-2 border border-gary-300 rounded cursor-pointer text-white transition${
                  page === i + 1
                    ? "bg-black font-semibold text-yellow-400 "
                    : " hover:text-black hover:bg-yellow-400"
                }`}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}

        <button
          onClick={() => handleClick(page + 1)}
          className="px-4 py-2 bg-white text-black border border-gray-300 rounded-r-lg hover:bg-gray-500 transition disabled:opacity-0"
          disabled={page >= Math.floor(products.length / 10)}
        >
          👉
        </button>
      </div>
    </section>
  );
}
