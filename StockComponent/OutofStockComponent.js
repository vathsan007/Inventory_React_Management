import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OutOfStockComponent() {
  const [outOfStock, setOutOfStock] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5203/api/Stock/OutofStock')
      .then(res => setOutOfStock(res.data))
      .catch(() => alert('Failed to fetch out-of-stock data'));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Out of Stock Products</h2>
      {outOfStock.length === 0 ? (
        <p style={{ color: 'gray' }}>No product is out of stock</p>
      ) : (
        <div style={{ display: 'flex', overflowX: 'scroll', gap: '15px' }}>
          {outOfStock.map(stock => (
            <div key={stock.productId} style={{ border: '1px solid #f44336', padding: '15px', borderRadius: '8px', minWidth: '250px', backgroundColor: '#ffe6e6' }}>
              <h4>Product ID: {stock.productId}</h4>
              <p><strong>Product Name:</strong> {stock.productName}</p>
              <p><strong>Available Quantity:</strong> {stock.availableQuantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OutOfStockComponent;