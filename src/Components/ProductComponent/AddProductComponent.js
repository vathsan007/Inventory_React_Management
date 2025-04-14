import React, { useState } from 'react';
import axios from 'axios';
import './AddProductComponent.css'; // Import the CSS file

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

  const fields = [
    { name: 'productId', label: 'Product ID', type: 'text' },
    { name: 'productName', label: 'Product Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'availableQuantity', label: 'Available Quantity', type: 'number' },
    { name: 'unitPrice', label: 'Unit Price', type: 'number' },
    { name: 'supplierId', label: 'Supplier ID', type: 'number' }
  ];

  return (
    <div className='product-container'>
    <div className="add-product-container stylish-container">
      <h2 className="add-product-title">Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="card-grid">
          {fields.map(field => (
            <div key={field.name} className="form-card stylish-card">
              <label className="form-label">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="form-input stylish-input"
              />
            </div>
          ))}
        </div>
        <button type="submit" className="add-product-button stylish-button">Add Product</button>
      </form>
    </div>
    </div>
  );
}

export default AddProductComponent;