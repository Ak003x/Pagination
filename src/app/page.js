import React from 'react'

export default function App() {
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products")
    const data = await res.json();
    console.log(data);
  }



  return (
    <div></div>
  )
}

