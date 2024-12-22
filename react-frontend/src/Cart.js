import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  productsDataSelector,
  setProductsData,
} from "./Business/Store/productsSlice";

const Cart = ({ productDetails }) => {
  const productsData = useSelector(productsDataSelector);
  const { image, name, price, quantity, id } = productsData;
  const dispatch = useDispatch();

  const handleRemoveProduct = () => {
    const updatedProductList = productsData?.filter(
      (product) => product.id !== id
    );
    dispatch(setProductsData(updatedProductList));
  };

  let increment = (product) => {
    updateQuantity(product.id, product.quantity + 1);
  };

  const updateQuantity = (id, quantity) => {
    const updatedProductList = productsData?.map((product) => {
      if (product.id === id && product.quantity !== quantity) {
        return { ...product, quantity: quantity };
      }
      return product;
    });

    // Only update state if the product list has actually changed
    dispatch(setProductsData(updatedProductList));
  };

  let decrement = (product) => {
    if (product.quantity > 1) {
      updateQuantity(product.id, product.quantity - 1);
    } else if (product.quantity === 1) {
      updateQuantity(product.id, product.quantity - 1);
    }
  };
  return productsData?.map((product, index) => {
    return product.quantity ? (
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
            <p>Cost: {product?.quantity * product?.price}</p>
           

            <div class="counter-button">
              <button
                class="quantityButton minus"
                onClick={() => decrement(product, productsData)}
              >
                -
              </button>
              <span class="quantityValue">{product?.quantity}</span>
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
