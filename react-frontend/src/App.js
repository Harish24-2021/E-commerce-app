import Axios from "axios"; // Make sure to import Axios
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsDataSelector, setProductsData } from "../src/Business/Store/productsSlice";
import "./App.css";
import RoutesConfig from "./Business/RoutesConfig";
import NavBar from "../src/Business/Components/NavBar";

const App = () => {
  const [navBarKey, setNavBarKey] = useState("home");
  
const productsData = useSelector(productsDataSelector)
 const dispatch = useDispatch()
 console.log(localStorage.getItem('token') )
 
   
  const handleClick = (index) => {
    setNavBarKey(index);
    if (index === "logout") {
      window.location.reload();
    }
  };


  

  const handleCheckout = () => {
    setNavBarKey("billing");
  };

  const handlePlaceOrder = () => {
    alert("Order placed..Thank you for shopping");
    window.location.reload();
  };

  console.log(productsData, "productList");
  console.log(productsData,"productsData")

  return (

    
    <div className="App">
      <NavBar/>
       
      {/* <NavBar handleClick={handleClick} navBarKey={navBarKey} />
      {navBarKey === "home" &&
        productsData?.map((product, key) => (
          <Product
            key={product.id}
            index={key}
            productDetails={product}
            updateQuantity={updateQuantity}
            handleClick={handleClick}
          />
        ))}

      {navBarKey === "cart" && (
        <div>
          <button className="checkoutButton" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}

      {navBarKey === "cart" &&
        productsData?.filter((product) => product.quantity !== 0)
          .map((product, key) => (
            <Cart
              key={key}
              index={key}
              productDetails={product}
              productsData={productsData}

            />
          )) 
          
          }

      {navBarKey === "billing" && (
        <Billing
          handlePlaceOrder={handlePlaceOrder}
          productsData={productsData}
        />
      )}

      {navBarKey === "addproducts" && <AddProducts />}


      
       */
      <>
      <RoutesConfig/>
      </>
       }
   
    </div>
  );
};

export default App;
