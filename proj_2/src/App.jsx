import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from './Products';
import { Routes, Route } from 'react-router-dom';
import Cart from './Cart';
import Details from './Details.class';
import Checkout from './Checkout.class';
import { useCart } from './CartContext';


export default function App() {
  const { dispatch: emptyCart } = useCart();
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome ...</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Details />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout emptyCart={emptyCart} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
