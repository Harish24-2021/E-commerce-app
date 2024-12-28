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
      `${process.env.REACT_APP_SPRINGBOOT_SERVER_PORT_URL}/api/products`,
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
    updateQuantity(product.id, product.quantity + 1);
  };

  const updateQuantity = (id, quantity) => {
    console.log(productsData, "productsdata");
    const updatedProductList = productsData?.map((product) => {
      if (product.id === id && product.quantity !== quantity) {
        return { ...product, quantity: quantity };
      }
      return product;
    });
    dispatch(setProductsData(updatedProductList));
    Axios.post(`${process.env.REACT_APP_SPRINGBOOT_SERVER_PORT_URL}/api/cartData`,
      [{
        "productId": String(id),
        "quantity": quantity
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
    if (product.quantity > 1) {
      updateQuantity(product.id, product.quantity - 1);
    } else if (product.quantity === 1) {
      updateQuantity(product.id, product.quantity - 1);
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
                {product?.isAddedToCart == false ? (
                  <p>
                    <button
                      className="addToCartButton"
                      onClick={() => handleAddCart(product)}
                    >
                      Add to cart
                    </button>
                  </p>
                ) : (
                  <>
                    <button
                      className="incrementDecrementButton"
                      onClick={() => increment(product)}
                    >
                      +
                    </button>

                    <button
                      className="incrementDecrementButton"
                      onClick={() => decrement(product)}
                    >
                      -
                    </button>

                    <h6 className="quantityTitle">
                      Quantity Added :{product.quantity}
                    </h6>
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
          </span>
        </>
      ))}
      ;
    </div>
  );
}

export default Product;
