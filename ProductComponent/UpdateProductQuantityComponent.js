
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UpdateProductQuantityComponent() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantityToAdd, setQuantityToAdd] = useState('');

  // Fetch all products
  const fetchProducts = () => {
    axios.get('http://localhost:5203/api/Products')
      .then(res => setProducts(res.data))
      .catch(() => alert('Failed to load products'));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdate = () => {
    if (!selectedProductId || !quantityToAdd) {
      alert('Please select a product and enter quantity');
      return;
    }

    const url = `http://localhost:5203/api/Products/${selectedProductId}?quantityAdded=${quantityToAdd}`;
    
    axios.put(url)
      .then(() => {
        alert('Product quantity updated');
        setQuantityToAdd('');
        fetchProducts();
      })
      .catch(() => alert('Failed to update product'));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Update Product Quantity</h2>

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

      <input
        type="number"
        placeholder="Quantity to Add"
        value={quantityToAdd}
        onChange={(e) => setQuantityToAdd(e.target.value)}
        style={{ padding: '8px', width: '160px' }}
      />

      <button onClick={handleUpdate} style={{ padding: '8px 16px', marginLeft: '10px' }}>
        Update
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

export default UpdateProductQuantityComponent;
