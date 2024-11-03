import React, { useState } from 'react';
import Axios from 'axios'; // Make sure to import Axios
import { useSelector, useDispatch } from 'react-redux'
import {setProductsData}  from '../Store/productsSlice'

const AddProducts = () => {
  const [formValues, setFormValues] = useState({
    productName: '',
    productPrice: '',
    productQuantity: '',
    productImage:''
  });
  const dispatch = useDispatch()

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value
    });
  };

  // Submit handler (replace with actual API call or logic)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Values:', formValues); // Log the values
  
    Axios.post('http://127.0.0.1:8000/api/createProduct', formValues)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          dispatch(setProductsData(response.data))
          // setFormValues({ name: '', price: '', quantity: '' });
        }
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };
  
  // Inline styles
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    margin: '10px 0',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="productName"
          value={formValues.name}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="productPrice"
          value={formValues.price}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="text"
          id="productQuantity"
          value={formValues.quantity}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      <div>
      <label htmlFor='productImage'>Product Image</label>
        <input
        type='file'
        id='productImage'
        onChange={handleInputChange}
        style={inputStyle}

        />
      </div>
      {/* Submit button */}
      <button type="submit" style={buttonStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}>
        Add Product
      </button>
    </form>
  );
};

export default AddProducts;
