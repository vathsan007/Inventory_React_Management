
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FilterProductsComponent() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [supplierIds, setSupplierIds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productIds, setProductIds] = useState([]);

  const [selectedSupplierId, setSelectedSupplierId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5203/api/Products')
      .then(res => {
        setAllProducts(res.data);
        setFilteredProducts(res.data);

        const suppliers = [...new Set(res.data.map(p => p.supplierId))];
        const cats = [...new Set(res.data.map(p => p.category))];
        const ids = res.data.map(p => p.productId);

        setSupplierIds(suppliers);
        setCategories(cats);
        setProductIds(ids);
      })
      .catch(() => alert('Failed to load products'));
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    if (selectedSupplierId)
      filtered = filtered.filter(p => p.supplierId.toString() === selectedSupplierId);
    if (selectedCategory)
      filtered = filtered.filter(p => p.category === selectedCategory);
    if (selectedProductId)
      filtered = filtered.filter(p => p.productId === selectedProductId);

    setFilteredProducts(filtered);
  }, [selectedSupplierId, selectedCategory, selectedProductId]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Filter Products</h2>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <select
          value={selectedSupplierId}
          onChange={(e) => setSelectedSupplierId(e.target.value)}
        >
          <option value="">All Suppliers</option>
          {supplierIds.map(id => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          <option value="">All Products</option>
          {productIds.map(id => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {filteredProducts.map(product => (
          <div
            key={product.productId}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              width: '250px',
              borderRadius: '8px'
            }}
          >
            <h4>{product.productName}</h4>
            <p><strong>ID:</strong> {product.productId}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> ₹{product.unitPrice}</p>
            <p><strong>Quantity:</strong> {product.availableQuantity}</p>
            <p><strong>Supplier ID:</strong> {product.supplierId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterProductsComponent;