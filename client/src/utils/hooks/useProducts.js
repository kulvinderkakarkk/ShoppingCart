import React, { useEffect, useState } from "react";
import { get } from "../../api";

export default function useProducts(url) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(allProducts => setProducts(allProducts));
  }, []);
  return products;
}
