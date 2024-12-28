import { Axios } from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  productsDataSelector,
  setProductsData,
} from "./Business/Store/productsSlice";

const Cart = ({ productDetails }) => {
  const productsData = useSelector(productsDataSelector);
  const { image, name, price, cartQuantity, id } = productsData;
  const dispatch = useDispatch();

  const handleRemoveProduct = () => {
    const updatedProductList = productsData?.filter(
      (product) => product.id !== id
    );
    dispatch(setProductsData(updatedProductList));
  };

  let increment = (product) => {
    console.log("20")
    updateQuantity(product.id, product.cartQuantity + 1);
  };

  const updateQuantity = (id, cartQuantity) => {
    console.log("26")
    
    const updatedProductList = productsData?.map((product) => {
      if (product.id === id && product.cartQuantity !== cartQuantity) {
        return { ...product, cartQuantity: cartQuantity };
      }
      return product;
    });
    // Only update state if the product list has actually changed
    dispatch(setProductsData(updatedProductList));
  };

  let decrement = (product) => {
    if (product.cartQuantity > 1) {
      updateQuantity(product.id, product.cartQuantity - 1);
    } else if (product.cartQuantity === 1) {
      updateQuantity(product.id, product.cartQuantity - 1);
    }
  };
  return productsData?.map((product, index) => {
    return product.cartQuantity ? (
      <div className="">
        <div className="checkoutCard">
          <img
            className="checkoutCardImage"
            src={product?.image}
            alt={product?.name}
          />
          <div className="container">
            <h4>
              <b>{product?.name}</b>
            </h4>
            <p>Price Rs: {product?.price}/Piece</p>
            <p>Cost: {product?.cartQuantity * product?.price}</p>
           

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
            <button className="deleteFromCartButton" onClick={handleRemoveProduct}>
              Delete
            </button>
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  });
};

export default Cart;
