import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DiscardStockComponent() {
  const [stocks, setStocks] = useState([]);
  const [productId, setProductId] = useState('');

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
        alert('All stock discarded successfully');
        setProductId('');
        fetchStocks();
      })
      .catch(() => alert('Failed to discard stock. Check product ID.'));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Current Stock</h2>
      <div style={{ display: 'flex', overflowX: 'scroll', gap: '15px', paddingBottom: '20px' }}>
        {stocks.map(stock => (
          <div key={stock.productId} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', minWidth: '250px' }}>
            <h4>Product ID: {stock.productId}</h4>
            <p><strong>Product Name:</strong> {stock.productName}</p>
            <p><strong>Available Quantity:</strong> {stock.availableQuantity}</p>
          </div>
        ))}
      </div>

      <h3>Discard All Stock</h3>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={e => setProductId(e.target.value)}
          style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
        />
        <button onClick={handleDiscardStock} style={{ padding: '10px 15px', width: '100%' }}>Discard Stock</button>
      </div>
    </div>
  );
}

export default DiscardStockComponent;



