import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const HomepageAdmin = () => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [outOfStockItems, setOutOfStockItems] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    // Fetch low stock items
    axios.get('http://localhost:5203/api/Report/low-stock')
      .then(response => setLowStockItems(response.data))
      .catch(error => console.error('Error fetching low stock items:', error));
 
    // Fetch out of stock items
    axios.get('http://localhost:5203/api/Stock/OutOfStock')
      .then(response => setOutOfStockItems(response.data))
      .catch(error => console.error('Error fetching out of stock items:', error));
  }, []);
 
  const handleReorderClick = (productId) => {
    navigate(`/stocks/add`, { state: { productId } });
  };
 
  return (
    
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col">
          <h2>Low Stock Items</h2>
          <div className="row">
            {lowStockItems.map(item => (
              <div className="col-md-4 mb-3" key={item.productId}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{item.productName}</h5>
                    <p className="card-text">Current Stock: {item.availableQuantity}</p>
                    <p className="card-text">Supplier Name: {item.supplierName}</p>
                    <button className="btn btn-primary" onClick={() => handleReorderClick(item.productId)}>Reorder</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      <div className="row mb-4">
        <div className="col">
          <h2>Out of Stock Items</h2>
          <div className="row">
            {outOfStockItems.map(stock => (
              <div className="col-md-4 mb-3" key={stock.productId}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{stock.productName}</h5>
                    <p className="card-text">Current Stock: {stock.availableQuantity}</p>
                    <p className="card-text">Product Name: {stock.productName}</p>
                    <button className="btn btn-primary" onClick={() => handleReorderClick(stock.productId)}>Reorder</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default HomepageAdmin;