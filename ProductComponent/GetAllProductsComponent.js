
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GetAllProductsComponent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5203/api/Products')
      .then(res => setProducts(res.data))
      .catch(() => alert('Failed to fetch products'));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '16px',
          padding: '10px',
          scrollSnapType: 'x mandatory'
        }}>
          {products.map((product) => (
            <div key={product.productId} style={{
              minWidth: '250px',
              flex: '0 0 auto',
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '15px',
              scrollSnapAlign: 'start',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              <h3>{product.productName}</h3>
              <p><strong>Product ID:</strong> {product.productId}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Price:</strong> ₹{product.unitPrice}</p>
              <p><strong>Available:</strong> {product.availableQuantity}</p>
              <p><strong>Supplier ID:</strong> {product.supplierId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetAllProductsComponent;
