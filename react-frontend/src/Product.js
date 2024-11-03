import "./App.css";
import React, { useState, useEffect } from "react";

function Product(props) {
  let [quantity, setquantity] = useState(
    props.productDetails.quantity ? props.productDetails.quantity : 0
  );
  let [hasProductAdded, sethasProductAdded] = useState(
    props.productDetails.quantity ? true : false
  );

  let handleAddCart = () => {
    sethasProductAdded(true);
    increment();
  };

  let increment = () => {
    if (quantity < props.productDetails.quantityAvailable) {
      setquantity(quantity + 1);
    }
  };
  useEffect(() => {
    props.updateQuantity(props.productDetails.id, quantity);
  }, [quantity]);

  let decrement = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
    } else if (quantity === 1) {
      setquantity(quantity - 1);
      sethasProductAdded(false);
    }
  };

  return (
    <span className="product-details">
      <div class="card">
        <img className="product-img" src={props.productDetails.image} alt="" />
        <div class="container">
          <h4>
            <b>{props.productDetails.name}</b>
          </h4>
          <p>Price: Rs: {props.productDetails.Price}/Piece</p>
          {!hasProductAdded ? (
            <p>
              <button className="addToChartButton" onClick={handleAddCart}>
                Add to cart
              </button>
            </p>
          ) : (
            <>
              <button className="incrementDecrementButton" onClick={increment}>
                +
              </button>

              <button className="incrementDecrementButton" onClick={decrement}>
                -
              </button>

              <h6 className="quantityTitle">Quantity Added :{quantity}</h6>
            </>
          )}
        </div>
      </div>
    </span>
  );
}

export default Product;
