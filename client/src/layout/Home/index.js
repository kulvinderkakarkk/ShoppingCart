import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { StyledCardContainer } from "./styles";
import SearchBar from "../../components/SearchBar";
import useProducts from "../../utils/hooks/useProducts";
import { v4 as uuidv4 } from 'uuid';
import { saveOrder } from "../../redux/slices/saveOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import SnackBar from "../../components/SnackBar";

export default function Home(props) {
  const products = useProducts("https://dummyjson.com/products");
  
  const [allProducts, setAllProducts] = useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setAllProducts(products.products);
  }, [products]);
  
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.saveOrder.orders);

  // Save to cart or update cart
  const addToCart = (id, title, price, quantity) => {
    let prevList = []//orderList;
    const record = {
      product_id: id,
      product_name: title,
      product_price: price,
      product_quantity: quantity    
  }
    let found = false
    orderList.forEach((order, index)=>{
      if(order.product_id != id) {
        prevList.push(order)
      } else {
        found = true
        prevList.push(record)
      }})
      if(found == false) {
        prevList.push(record)
      }
      console.log('prevList', prevList)
    dispatch(saveOrder(prevList));
    setOpen(true);
  };

  const filterProducts = (text) => {
    if (text.length != 0) {
      let oldProducts = products.products;
      let filteredProducts = oldProducts.filter((product) =>
        product.title.toLowerCase().includes(text.toLowerCase())
      );
      setAllProducts(filteredProducts);
    } else {
      setAllProducts(products.products);
    }
  };

  return (
    <>
      <SnackBar open={open} handleClose={handleClose} message='Item added to cart' />
      <SearchBar filterProducts = {filterProducts} />
      <StyledCardContainer>
        {allProducts &&
          allProducts.length != 0 &&
          allProducts.map((product) => (
            <ProductCard id={uuidv4()} product={product} addToCart={addToCart} />
          ))}
      </StyledCardContainer>
    </>
  );
}
