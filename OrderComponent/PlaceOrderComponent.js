import React, { useState } from 'react';
import axios from 'axios';
 
function PlaceOrder() {
  const [productId, setProductId] = useState('');
  const [orderedQuantity, setOrderedQuantity] = useState('');
 
  const handlePlaceOrder = async () => {
    if (!productId || !orderedQuantity) {
      alert('Please fill in all fields');
      return;
    }
 
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5203/api/Order', {
        productId: productId.trim(), // ensures it's treated as string
        orderedQuantity: parseInt(orderedQuantity)
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
 
      alert('Order placed successfully!');
      setProductId('');
      setOrderedQuantity('');
    } catch (error) {
      console.error('Error response:', error.response);
      if (error.response) {
        alert(`Failed to place order: ${error.response.data}`);
      } else if (error.request) {
        alert('Failed to place order: No response from server');
      } else {
        alert(`Failed to place order: ${error.message}`);
      }
    }
  };
 
 
  return (
    <div style={{ padding: '20px' }}>
      <h2>Place Order</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>Product ID:</label><br />
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter Product ID"
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Ordered Quantity:</label><br />
        <input
          type="number"
          value={orderedQuantity}
          onChange={(e) => setOrderedQuantity(e.target.value)}
          placeholder="Enter Quantity"
        />
      </div>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}
 
export default PlaceOrder;