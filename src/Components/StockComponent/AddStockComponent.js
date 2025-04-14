import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddStockComponent.css'; // Import CSS file

function AddStockComponent() {
  const [stocks, setStocks] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const stocksPerPage = 2; // You can adjust this number

  const fetchStocks = () => {
    axios.get('http://localhost:5203/api/Stock/AllStock')
      .then(res => setStocks(res.data))
      .catch(() => alert('Failed to fetch stock data'));
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleAddStock = () => {
    if (!productId || !quantity) {
      alert('Please fill all fields');
      return;
    }

    axios.post(`http://localhost:5203/api/Stock/AddStock?productId=${productId}&quantity=${quantity}`)
      .then(() => {
        alert('Stock added successfully');
        setProductId('');
        setQuantity('');
        fetchStocks(); // Refresh stock list
      })
      .catch(() => alert('Failed to add stock. Product ID may be invalid.'));
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
    <div className='addstock'>
      <div className="add-stock-container stylish-container">
        <h2 className="add-stock-title">Manage Stock</h2>
        <section className="add-stock-section stylish-card">
          <h3>Add New Stock</h3>
          <div className="add-stock-form">
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
            <div className="form-group">
              <label htmlFor="quantity" className="form-label">Quantity to Add:</label>
              <input
                type="number"
                id="quantity"
                className="form-input"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
            </div>
            <button onClick={handleAddStock} className="add-stock-button stylish-button">Add Stock</button>
          </div>
        </section>
        <section className="stock-list-section stylish-card">
          <h3>Current Stock Levels</h3>
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
    </div>
  );
}

export default AddStockComponent;