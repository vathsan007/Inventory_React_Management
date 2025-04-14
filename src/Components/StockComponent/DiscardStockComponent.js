import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DiscardStockComponent.css'; // Import CSS file

function DiscardStockComponent() {
  const [stocks, setStocks] = useState([]);
  const [productId, setProductId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const stocksPerPage = 3; // You can adjust the number of items per page

  const fetchStocks = () => {
    axios.get('http://localhost:5203/api/Stock/AllStock')
      .then(res => setStocks(res.data))
      .catch(() => alert('Failed to fetch stock data'));
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleDiscardStock = () => {
    if (!productId) {
      alert('Please enter product ID');
      return;
    }

    axios.post(`http://localhost:5203/api/Stock/DiscardAllStock?productId=${productId}`)
      .then(() => {
        alert(`All stock for Product ID ${productId} discarded successfully`);
        setProductId('');
        fetchStocks();
      })
      .catch(() => alert('Failed to discard stock. Check product ID.'));
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
    <div className="discard-stock-container">
      


      <section className="discard-section stylish-card">
        <h3>Discard All Stock</h3>
        <div className="discard-form">
          <div className="form-group">
            <label htmlFor="productId" className="form-label">Product ID to Discard:</label>
            <input
              type="text"
              id="productId"
              className="form-input"
              placeholder="Enter Product ID"
              value={productId}
              onChange={e => setProductId(e.target.value)}
            />
          </div>
          <button onClick={handleDiscardStock} className="discard-button stylish-button">Discard All Stock</button>
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

export default DiscardStockComponent;