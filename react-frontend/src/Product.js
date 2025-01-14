import Axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  productsDataSelector,
  setProductsData,
} from "./Business/Store/productsSlice";

function Product() {
  const dispatch = useDispatch();
  const productsData = useSelector(productsDataSelector);
  const fetchProducts = () => {
    Axios.get(
      `${process.env.REACT_APP_NODE_SERVER_PORT_URL}/api/products/getProducts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        console.log(response.data, "response");
        let productData = response?.data;
        let updatedProductData = productData?.map((product) => {
          return {
            ...product,
            isAddedToCart: product?.isAddedToCart
              ? product?.isAddedToCart
              : false,
            cartQuantity: product.cartQuantity ? product.cartQuantity : 0,
          };
        });
        console.log(updatedProductData);
        dispatch(setProductsData(updatedProductData));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  let handleAddCart = (selectedProduct) => {
    let updatedProductData = productsData?.map((product) => {
      if (product.id === selectedProduct.id) {
        return { ...product, isAddedToCart: true, cartQuantity: 1 };
      } else {
        return product;
      }
    });
    console.log(updatedProductData);
    increment(selectedProduct);
    dispatch(setProductsData(updatedProductData));
  };

  let increment = (product) => {
    updateQuantity(product.id, product.cartQuantity + 1);
  };

  const updateQuantity = (id, cartQuantity) => {
    console.log(productsData, "productsdata");
    const updatedProductList = productsData?.map((product) => {
      if (product.id === id && product.cartQuantity !== cartQuantity) {
        return { ...product, cartQuantity: cartQuantity };
      }
      return product;
    });
    dispatch(setProductsData(updatedProductList));
    Axios.post(`${process.env.REACT_APP_SPRINGBOOT_SERVER_PORT_URL}/api/cartData`,
      [{
        "productId": String(id),
        "quantity": cartQuantity
      }] ,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
         
      
    )
    .catch(
      (error) => {
        console.log(error);
      }
    )
  };

  let decrement = (product) => {
    if (product.cartQuantity > 1) {
      updateQuantity(product.id, product.cartQuantity - 1);
    } else if (product.cartQuantity === 1) {
      updateQuantity(product.id, product.cartQuantity - 1);
    }
  };

  return (
    <div>
      {productsData?.map((product, index) => (
        <>
          <span className="product-details">
            <div class="card" key={product.id}>
              <img className="product-img" src={product.image} alt="" />
              <div class="container">
                <h4>
                  <b>{product.name.slice(0, 20) + "..."}</b>
                </h4>
                <p>Price: ₹{product.price}</p>
                {!product?.cartQuantity ? (
                  <p>
                    <button
                      className="addToCartButton"
                      onClick={() => handleAddCart(product)}
                    >
                      Add to cart
                    </button>
                  </p>
                ) : (
                  <div class="counter-button">
                  <button
                    class="quantityButton minus"
                    onClick={() => decrement(product, productsData)}
                  >
                    -
                  </button>
                  <span class="quantityValue">{product?.cartQuantity}</span>
                  <button
                    class="quantityButton plus"
                    onClick={() => increment(product, productsData)}
                  >
                    +
                  </button>
                </div>
                )}
              </div>
            </div>
          </span>
        </>
      ))}
      ;
    </div>
  );
}

export default Product;
