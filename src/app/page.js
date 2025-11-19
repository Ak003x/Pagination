"use client";
import React, { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    console.log(data);

    if (data) {
      setProducts(data.products);
      setTotalPage(Math.ceil(data.total / 10)); //Backend method
    }
  };
  console.log(products);
  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleClick = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPage) {
      setPage(selectedPage);
    }
  };

  return (
    <section className="bg-black w-full min-h-screen">
      {products.length > 0 && (
        <div className="grid grid-cols-5 gap-5 p-5  bg-black ">
          {products.map((prod) => {
            return (
              <span
                key={prod.id}
                className="flex flex-col justify-between items-center h-105 p-5 text-xl text-center rounded-2xl bg-yellow-400 cursor-pointer"
              >
                <img
                  src={prod.images[0]}
                  alt={prod.title}
                  className="w-full h-full object-cover rounded "
                />
                <span className="mt-auto">{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      <div className=" flex justify-center space-x-2 text-white">
        <button
          onClick={() => handleClick(page - 1)}
          className="px-4 py-2 bg-white text-black border border-yellow-400 rounded-l-lg hover:bg-gray-500 transition disabled:opacity-0"
          disabled={page === 1}
        >
          👈
        </button>

        {products.length > 0 &&
          (() => {
            const start = Math.floor((page - 1) / 10) * 10 + 1;
            const end = Math.min(start + 9, totalPage);
            return Array.from({ length: end - start + 1 }, (_, i) => (
              <span
                onClick={() => handleClick(start + i)}
                className={`px-3 py-2 border border-gray-300 rounded cursor-pointer text-white transition${
                  page === start + i
                    ? "bg-black font-semibold text-yellow-400 "
                    : " hover:text-black hover:bg-yellow-400"
                }`}
                key={start + i}
              >
                {start + i}
              </span>
            ));
          })()}

        <button
          onClick={() => handleClick(page + 1)}
          className="px-4 py-2 bg-white text-black border border-yellow-400 rounded-r-lg hover:bg-gray-500 transition disabled:opacity-0"
          disabled={page === totalPage}
        >
          👉
        </button>
      </div>
    </section>
  );
}
