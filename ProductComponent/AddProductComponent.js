import React, { useState } from 'react';
import axios from 'axios';

function AddProductComponent() {
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    description: '',
    category: '',
    availableQuantity: '',
    unitPrice: '',
    supplierId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5203/api/Products', {
      ...formData,
      availableQuantity: parseInt(formData.availableQuantity),
      unitPrice: parseFloat(formData.unitPrice),
      supplierId: parseInt(formData.supplierId)
    })
      .then(() => {
        alert('Product added successfully');
        setFormData({
          productId: '',
          productName: '',
          description: '',
          category: '',
          availableQuantity: '',
          unitPrice: '',
          supplierId: ''
        });
      })
      .catch(() => alert('Failed to add product'));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        {['productId', 'productName', 'description', 'category', 'availableQuantity', 'unitPrice', 'supplierId'].map(field => (
          <div key={field} style={{ marginBottom: '10px' }}>
            <label>{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: '10px', width: '100%' }}>Add Product</button>
      </form>
    </div>
  );
}

export default AddProductComponent;
