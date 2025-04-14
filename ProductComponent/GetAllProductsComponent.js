import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './PlaceOrder.css'; // Import the CSS file

function PlaceOrderComponent() {
  const [productId, setProductId] = useState('');
  const [orderedQuantity, setOrderedQuantity] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5203/api/Products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    }
  };

  useEffect(() => {
    const foundProduct = products.find(p => p.productId === productId);
    setSelectedProduct(foundProduct);
  }, [productId, products]);

  const handlePlaceOrder = async () => {
    if (!productId || !orderedQuantity) {
      alert('Please select a product and enter the quantity');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5203/api/Order',
        {
          productId: productId.trim(),
          orderedQuantity: parseInt(orderedQuantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      alert('Order placed successfully!');
      setProductId('');
      setOrderedQuantity('');
    } catch (error) {
      console.error('Error placing order:', error);
      if (error.response) {
        alert(`Failed to place order: ${error.response.data}`);
      } else if (error.request) {
        alert('Failed to place order: No response from server');
      } else {
        alert(`Failed to place order: ${error.message}`);
      }
    }
  };

  return (
    <div className="place-order-container stylish-container">
      <h2 className="place-order-title">Place Order</h2>

      <div className="form-group">
        <label className="form-label">Select Product:</label><br />
        <select
          className="form-select stylish-dropdown"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Select a product</option>
          {products.map(product => (
            <option key={product.productId} value={product.productId}>
              {product.productName} ({product.productId})
            </option>
          ))}
        </select>
      </div>

      {selectedProduct && (
        <div className="product-details stylish-card">
          <h3>Product Details</h3>
          <p><strong>Name:</strong> {selectedProduct.productName}</p>
          <p><strong>Price:</strong> ₹{selectedProduct.unitPrice}</p>
          <p><strong>Available Quantity:</strong> {selectedProduct.availableQuantity}</p>
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Ordered Quantity:</label><br />
        <input
          type="number"
          className="form-input stylish-input"
          value={orderedQuantity}
          onChange={(e) => setOrderedQuantity(e.target.value)}
          placeholder="Enter Quantity"
        />
      </div>

      <button className="place-order-button stylish-button" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
}

export default PlaceOrderComponent;