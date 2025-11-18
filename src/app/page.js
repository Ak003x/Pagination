"use client"
import React, { useEffect, useState } from 'react'

export default function App() {
  const [products, setProducts] = useState([])


  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products")
    const data = await res.json();


    if (data && data.products) {
      setProducts(data.products)
    }
  }
  console.log(products);
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div></div>
  )
}

