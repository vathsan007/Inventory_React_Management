

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DeleteProductComponent() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');

  const fetchProducts = () => {
    axios.get('http://localhost:5203/api/Products')
      .then(res => setProducts(res.data))
      .catch(() => alert('Failed to load products'));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = () => {
    if (!selectedProductId) {
      alert('Please select a product to delete');
      return;
    }

    axios.delete(`http://localhost:5203/api/Products/${selectedProductId}`)
      .then(() => {
        alert('Product deleted');
        setSelectedProductId('');
        fetchProducts();
      })
      .catch(() => alert('Failed to delete product'));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Delete Product</h2>

      <select
        value={selectedProductId}
        onChange={(e) => setSelectedProductId(e.target.value)}
        style={{ padding: '8px', marginRight: '10px' }}
      >
        <option value="">Select Product</option>
        {products.map(prod => (
          <option key={prod.productId} value={prod.productId}>
            {prod.productName} ({prod.productId})
          </option>
        ))}
      </select>

      <button onClick={handleDelete} style={{ padding: '8px 16px' }}>
        Delete Product
      </button>

      <div style={{ marginTop: '30px' }}>
        <h3>Current Products</h3>
        {products.map(product => (
          <div
            key={product.productId}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '6px'
            }}
          >
            <p><strong>Product ID:</strong> {product.productId}</p>
            <p><strong>Name:</strong> {product.productName}</p>
            <p><strong>Available Quantity:</strong> {product.availableQuantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeleteProductComponent;