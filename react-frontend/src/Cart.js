import './App.css';

const Cart = ({ productDetails }) => {
  const { image, name, Price, quantity } = productDetails;
  
  return (
    <div className='product-details'>
      <div className="card">
        <img className='product-img' src={image} alt={name} />
        <div className="container">
          <h4><b>{name}</b></h4> 
          <p>Price Rs: {Price}/Piece</p> 
          <p>Quantity Added: {quantity}</p> 
          <p>Cost: {quantity * Price}</p> 
        </div>
      </div>
    </div>
  );
};

export default Cart;
