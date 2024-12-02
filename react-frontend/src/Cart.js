import "./App.css";

const Cart = ({ productDetails, productList, setProductList }) => {
  const { image, name, Price, quantity, id } = productDetails;

  const handleRemoveProduct = () => {
    const updatedProductList = productList.filter(
      (product) => product.id !== id
    );
    setProductList(updatedProductList);
  };
  return (
    <div className="product-details">
      <div className="checkoutCard">
        <img className="product-img" src={image} alt={name} />
        <div className="container">
          <h4>
            <b>{name}</b>
          </h4>
          <p>Price Rs: {Price}/Piece</p>
          <p>Quantity Added: {quantity}</p>
          <p>Cost: {quantity * Price}</p>
          <button className="viewCartButton" onClick={handleRemoveProduct}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
