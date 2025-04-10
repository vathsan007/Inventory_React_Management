import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReduceStockComponent() {
  const [stocks, setStocks] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');

  const fetchStocks = () => {
    axios.get('http://localhost:5203/api/Stock/AllStock')
      .then(res => setStocks(res.data))
      .catch(() => alert('Failed to fetch stock data'));
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleReduceStock = () => {
    if (!productId || !quantity) {
      alert('Please fill all fields');
      return;
    }

    axios.post(`http://localhost:5203/api/Stock/ReduceStock?productId=${productId}&quantity=${quantity}`)
      .then(() => {
        alert('Stock reduced successfully');
        setProductId('');
        setQuantity('');
        fetchStocks(); // Refresh list
      })
      .catch(() => alert('Failed to reduce stock. Check product ID or quantity.'));
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

      <h3>Reduce Stock</h3>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={e => setProductId(e.target.value)}
          style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
        />
        <input
          type="number"
          placeholder="Quantity to Reduce"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
        />
        <button onClick={handleReduceStock} style={{ padding: '10px 15px', width: '100%' }}>Reduce Stock</button>
      </div>
    </div>
  );
}

export default ReduceStockComponent;
