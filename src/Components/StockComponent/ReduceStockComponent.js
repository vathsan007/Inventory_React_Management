import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReduceStockComponent.css'; // Import CSS file

function ReduceStockComponent() {
  const [stocks, setStocks] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantityToReduce, setQuantityToReduce] = useState(1); // Default to 1
  const [currentPage, setCurrentPage] = useState(1);
  const stocksPerPage = 3; // Adjust as needed

  const fetchStocks = () => {
    axios.get('http://localhost:5203/api/Stock/AllStock')
      .then(res => setStocks(res.data))
      .catch(() => alert('Failed to fetch stock data'));
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleReduceStock = () => {
    if (!productId) {
      alert('Please enter product ID');
      return;
    }
    if (quantityToReduce <= 0) {
      alert('Please enter a valid quantity to reduce');
      return;
    }

    axios.post(`http://localhost:5203/api/Stock/ReduceStock?productId=${productId}&quantity=${quantityToReduce}`)
      .then(() => {
        alert('Stock reduced successfully');
        setProductId('');
        setQuantityToReduce(1); // Reset quantity
        fetchStocks(); // Refresh list
      })
      .catch(() => alert('Failed to reduce stock. Check product ID or quantity.'));
  };

  const handleIncrement = () => {
    setQuantityToReduce(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantityToReduce(prev => Math.max(1, prev - 1)); // Ensure quantity doesn't go below 1
  };

  // Pagination logic
  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(stocks.length / stocksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="reduce-stock-container">
   

      <section className="reduce-section stylish-card">
        <h3>Reduce Stock</h3>
        <div className="reduce-form">
          <div className="form-group">
            <label htmlFor="productId" className="form-label">Product ID:</label>
            <input
              type="text"
              id="productId"
              className="form-input"
              placeholder="Enter Product ID"
              value={productId}
              onChange={e => setProductId(e.target.value)}
            />
          </div>
          <div className="form-group quantity-control">
            <label htmlFor="quantityToReduce" className="form-label">Quantity to Reduce:</label>
            <div className="quantity-adjust">
              <button type="button" className="quantity-button decrement" onClick={handleDecrement}>-</button>
              <input
                type="number"
                id="quantityToReduce"
                className="form-input quantity-input"
                value={quantityToReduce}
                readOnly // Prevent direct editing for better control with buttons
              />
              <button type="button" className="quantity-button increment" onClick={handleIncrement}>+</button>
            </div>
          </div>
          <button onClick={handleReduceStock} className="reduce-button stylish-button">Reduce Stock</button>
        </div>
      </section>

      <section className="current-stock-section stylish-card">
        <h3>Current Stock</h3>
        <div className="stock-list">
          {currentStocks.map(stock => (
            <div key={stock.productId} className="stock-item">
              <h4>Product ID: {stock.productId}</h4>
              <p><strong>Product Name:</strong> {stock.productName}</p>
              <p><strong>Available Quantity:</strong> {stock.availableQuantity}</p>
            </div>
          ))}
          {stocks.length === 0 && <p className="no-stock-message">No stock data available.</p>}
        </div>

        {stocks.length > stocksPerPage && (
          <nav className="pagination">
            <ul className="pagination-list">
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`pagination-item ${currentPage === number ? 'active' : ''}`}
                >
                  <button onClick={() => paginate(number)} className="pagination-link stylish-pagination-button">
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </section>

      
    </div>
  );
}

export default ReduceStockComponent;