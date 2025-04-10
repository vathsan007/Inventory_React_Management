import React, { useEffect, useState } from 'react';
import axios from 'axios';


function GetAllStockComponent() {
  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5203/api/Stock/AllStock')
      .then(res => setStockList(res.data))
      .catch(() => alert('Failed to fetch stock'));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Stock</h2>
      <div className="carousel-container">
        {stockList.length === 0 ? (
          <p>No stock available.</p>
        ) : (
          <div className="carousel-row">
            {stockList.map(stock => (
              <div key={stock.productId} className="carousel-card">
                <h4>{stock.productName}</h4>
                <p><strong>Product ID:</strong> {stock.productId}</p>
                <p><strong>Available Quantity:</strong> {stock.availableQuantity}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GetAllStockComponent;
