import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./NavBar";
import Product from "./Product";
import Cart from "./Cart";
import Billing from "./Billing";
import AddProducts from "./Business/Components/AddProducts";
import Banana from "./Images/Banana.png";
import Mango from "./Images/Mango.jpg";
import Apple from "./Images/Apple.jpg";
import brinjal from "./Images/brinjal.jpg";
import coconutOil from "./Images/coconutOil.jpg";
import drumstick from "./Images/drumstick.png";
import FormalShirt from "./Images/FormalShirt.jpg";
import mazza from "./Images/mazza.jpg";
import oranges from "./Images/oranges.jpg";
import ponds from "./Images/ponds.jpg";
import potatoes from "./Images/potatoes.jpg";
import rosewater from "./Images/rosewater.jpg";
import sunscreen from "./Images/suncreen.jpg";
import Teeshirt from "./Images/Teeshirt.jpg";
import Thumpsup from "./Images/Thumpsup.png";
import tie from "./Images/tie.jpg";
import Tomato from "./Images/Tomato.jpg";
import Axios from "axios"; // Make sure to import Axios
import { useSelector, useDispatch } from "react-redux";
import { setProductsData } from "../src/Business/Store/productsSlice";
import { productsDataSelector } from "../src/Business/Store/productsSlice";
import Register from "./Business/Pages/Register";
import Login from "./Business/Pages/Login";

const App = () => {
  const [navBarKey, setNavBarKey] = useState("home");
  const [productList, setProductList] = useState([
    {
      id: 1,
      name: "Mango",
      price: 30,
      quantityAvailable: 12,
      category: "Fruits",
      image: Mango,
      quantity: 0,
    },
    {
      id: 2,
      name: "Apple",
      price: 50,
      quantityAvailable: 20,
      category: "Fruits",
      image: Apple,
      quantity: 0,
    },
    {
      id: 3,
      name: "Banana",
      price: 10,
      quantityAvailable: 100,
      category: "Fruits",
      image: Banana,
      quantity: 0,
    },
    {
      id: 4,
      name: "Orange",
      price: 25,
      quantityAvailable: 25,
      category: "Fruits",
      image: oranges,
      quantity: 0,
    },
    {
      id: 5,
      name: "Pond's Powder",
      price: 130,
      quantityAvailable: 12,
      category: "Cosmetics",
      image: ponds,
      quantity: 0,
    },
    {
      id: 6,
      name: "VLCC Sun Screen",
      price: 200,
      quantityAvailable: 12,
      category: "Cosmetics",
      image: sunscreen,
      quantity: 0,
    },
    {
      id: 7,
      name: "Coconut oil",
      price: 80,
      quantityAvailable: 12,
      category: "Cosmetics",
      image: coconutOil,
      quantity: 0,
    },
    {
      id: 8,
      name: "Rose Water",
      price: 40,
      quantityAvailable: 12,
      category: "Cosmetics",
      image: rosewater,
      quantity: 0,
    },
    {
      id: 9,
      name: "Tomatoes",
      price: 30,
      quantityAvailable: 12,
      category: "Vegetables",
      image: Tomato,
      quantity: 0,
    },
    {
      id: 10,
      name: "Brinjal",
      price: 30,
      quantityAvailable: 12,
      category: "Vegetables",
      image: brinjal,
      quantity: 0,
    },
    {
      id: 11,
      name: "Drum Stick",
      price: 10,
      quantityAvailable: 12,
      category: "Vegetables",
      image: drumstick,
      quantity: 0,
    },
    {
      id: 12,
      name: "Potatoes",
      price: 30,
      quantityAvailable: 12,
      category: "Vegetables",
      image: potatoes,
      quantity: 0,
    },
    {
      id: 13,
      name: "T-shirt",
      price: 500,
      quantityAvailable: 12,
      category: "Clothing",
      image: Teeshirt,
      quantity: 0,
    },
    {
      id: 14,
      name: "Formal Shirt",
      price: 30,
      quantityAvailable: 12,
      category: "Clothing",
      image: FormalShirt,
      quantity: 0,
    },
    {
      id: 15,
      name: "Tie",
      price: 100,
      quantityAvailable: 12,
      category: "Clothing",
      image: tie,
      quantity: 0,
    },
    {
      id: 16,
      name: "Thumbs Up",
      price: 80,
      quantityAvailable: 12,
      category: "Beverages",
      image: Thumpsup,
      quantity: 0,
    },
    {
      id: 17,
      name: "Mazza",
      price: 110,
      quantityAvailable: 12,
      category: "Beverages",
      image: mazza,
      quantity: 0,
    },
  ]);
  const productsData = useSelector(productsDataSelector)
 const dispatch = useDispatch()
  const fetchProducts =()=>{
    Axios.get('http://localhost:8080/api/products')
    .then((response) => {
      console.log(response.data,"response")
      
      dispatch(setProductsData(response['data']))
    })
    .catch((error)=>{
       console.log(error);
     
    })
  }
   useEffect(()=> {
     fetchProducts()
   },[])
   
  const handleClick = (index) => {
    setNavBarKey(index);
    if (index === "logout") {
      window.location.reload();
    }
  };
  const updateQuantity = (id, quantity) => {
    const updatedProductList = productsData?.map((product) => {
      if (product.id === id && product.quantity !== quantity) {
        return { ...product, quantity: quantity };
      }
      return product;
    });

    // Only update state if the product list has actually changed
    dispatch(setProductsData(updatedProductList))
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
      <NavBar handleClick={handleClick} navBarKey={navBarKey} />
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

      {navBarKey  === "register" && <Register handleClick={handleClick}/>}
      {navBarKey === "login" && <Login handleClick={handleClick} setNavBarKey={setNavBarKey}/>}
    </div>
  );
};

export default App;
