import React from "react";
import { Route, Routes } from "react-router";
import Billing from "../Billing";
import Cart from "../Cart";
import Product from "../Product";
import AddProducts from "./Components/AddProducts";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const RoutesConfig = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        {/* <Route path="/logout" element={<Logout />} /> */}
        <Route path="products" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        {/* <Route path="checkout" element={<Checkout />} /> */}
        <Route path="checkout" element={<Billing />} />
        <Route path="addproducts" element={<AddProducts />} />
      </Routes>
    </div>
  );
};

export default RoutesConfig;
