import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { productsDataSelector, setProductsData } from "./Business/Store/productsSlice";

const Cart = ({ productDetails }) => {
  const productsData = useSelector(productsDataSelector)
  const { image, name, price, quantity, id } = productsData;
  const dispatch = useDispatch();

  const handleRemoveProduct = () => {
    const updatedProductList = productsData?.filter(
      (product) => product.id !== id
    );
    dispatch(setProductsData(updatedProductList))
 
  };
  return (
    productsData?.map((product,index)=> {
      return(
      <div className="product-details">
      <div className="checkoutCard">
        <img className="product-img" src={product?.image} alt={product?.name} />
        <div className="container">
          <h4>
            <b>{name?.slice(0,30)+ "..."}</b>
          </h4>
          <p>Price Rs: {product?.price}/Piece</p>
          <p>Quantity Added: {product?.quantity}</p>
          <p>Cost: {product?.quantity * product?.price}</p>
          <button className="viewCartButton" onClick={handleRemoveProduct}>
            Delete
          </button>
        </div>
      </div>
    </div>
      )
    })

  );
};

export default Cart;
