import { useDispatch } from "react-redux";
import "./App.css";
import { setProductsData } from "./Business/Store/productsSlice";

const Cart = ({ productDetails, productsData, setProductList }) => {
  const { image, name, price, quantity, id } = productDetails;
  const dispatch = useDispatch();

  const handleRemoveProduct = () => {
    const updatedProductList = productsData?.filter(
      (product) => product.id !== id
    );
    dispatch(setProductsData(updatedProductList))
 
  };
  return (
    <div className="product-details">
      <div className="checkoutCard">
        <img className="product-img" src={image} alt={name} />
        <div className="container">
          <h4>
            <b>{name?.slice(0,30)+ "..."}</b>
          </h4>
          <p>Price Rs: {price}/Piece</p>
          <p>Quantity Added: {quantity}</p>
          <p>Cost: {quantity * price}</p>
          <button className="viewCartButton" onClick={handleRemoveProduct}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
