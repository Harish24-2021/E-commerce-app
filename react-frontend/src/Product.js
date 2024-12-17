import "./App.css";
import React, { useState, useEffect } from "react";
import { productsDataSelector, setProductsData } from "./Business/Store/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import  Axios  from "axios";

function Product(props) {
  const dispatch = useDispatch();
  const productsData = useSelector(productsDataSelector)
  let [quantity, setquantity] = useState( 0
  );
  let [hasProductAdded, sethasProductAdded] = useState(false
  );

  const fetchProducts =()=>{
    Axios.get(`${process.env.REACT_APP_SPRINGBOOT_SERVER_PORT_URL}/api/products`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
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

  let handleAddCart = (product) => {
    sethasProductAdded(true);
    increment(product);
  };

  let increment = (product) => {
    if (quantity <=product.quantity) {
      setquantity(quantity + 1);
      updateQuantity(product.id, quantity+1);
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
  }

  let decrement = (product) => {
    if (product.quantity > 1) {
      setquantity(quantity - 1);
      updateQuantity(product.id, quantity-1);
    } else if (product.quantity === 1) {
      setquantity(quantity - 1);
      updateQuantity(product.id, quantity-1);
      sethasProductAdded(false);
    }
  };

  return (
    
      productsData?.map((product,index)=>(
 <>
           <span className="product-details">
          <div class="card">
            <img className="product-img" src={product.image} alt="" />
            <div class="container">
              <h4>
                <b>{product.name.slice(0,20)+'...'}</b>
              </h4>
              <p>Price: Rs: { product.price}/Piece</p>
              {!hasProductAdded ? (
                <p>
                  <button className="addToCartButton" onClick={()=>handleAddCart(product)}>
                    Add to cart
                  </button>
                </p>
              ) : (
                <>
                  <button className="incrementDecrementButton" onClick={()=>increment(product)}>
                    +
                  </button>
    
                  <button className="incrementDecrementButton" onClick={()=>decrement(product)}>
                    -
                  </button>
    
                  <h6 className="quantityTitle">Quantity Added :{quantity}</h6>
                  {/* <button
                    className="viewCartButton"
                    onClick={() => props.handleClick("cart")}
                  >
                    View Cart
                  </button> */}
                </>
              )}
            </div>
          </div>
        </span></>
      )        
      )
      );
}

export default Product;
