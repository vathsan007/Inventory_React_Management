import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FilterProductsComponent.css'; // Import CSS file

function FilterProductsComponent() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [supplierIds, setSupplierIds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productIds, setProductIds] = useState([]);

  const [selectedSupplierId, setSelectedSupplierId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3; // Adjust as needed

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5203/api/Products');
      setAllProducts(res.data);
      setFilteredProducts(res.data);

      const suppliers = [...new Set(res.data.map(p => p.supplierId))].sort((a, b) => a - b);
      const cats = [...new Set(res.data.map(p => p.category))].sort();
      const ids = res.data.map(p => p.productId).sort();

      setSupplierIds(['', ...suppliers]); // Add empty option for "All"
      setCategories(['', ...cats]);
      setProductIds(['', ...ids]);
    } catch (error) {
      alert('Failed to load products');
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    let filtered = allProducts;

    if (selectedSupplierId) {
      filtered = filtered.filter(p => p.supplierId.toString() === selectedSupplierId);
    }
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (selectedProductId) {
      filtered = filtered.filter(p => p.productId === selectedProductId);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset page on filter change
  }, [selectedSupplierId, selectedCategory, selectedProductId, allProducts]);

  // Pagination logic for filtered products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='filter'>

    
    <div className="filter-products-container stylish-container">
      {/* <h2 className="filter-products-title">Filter Products</h2> */}

      <div className="filter-options stylish-card">
        <div className="form-group">
          <label htmlFor="supplierFilter" className="form-label">Supplier:</label>
          <select
            id="supplierFilter"
            className="form-select"
            value={selectedSupplierId}
            onChange={(e) => setSelectedSupplierId(e.target.value)}
          >
            {supplierIds.map(id => (
              <option key={id} value={id}>{id === '' ? 'All Suppliers' : id}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="categoryFilter" className="form-label">Category:</label>
          <select
            id="categoryFilter"
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === '' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="productFilter" className="form-label">Product ID:</label>
          <select
            id="productFilter"
            className="form-select"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
          >
            {productIds.map(id => (
              <option key={id} value={id}>{id === '' ? 'All Products' : id}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="products-grid">
        {currentProducts.map(product => (
          <div key={product.productId} className="product-card stylish-card">
            <h4>{product.productName}</h4>
            <p><strong>ID:</strong> {product.productId}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> ₹{product.unitPrice}</p>
            <p><strong>Quantity:</strong> {product.availableQuantity}</p>
            <p><strong>Supplier ID:</strong> {product.supplierId}</p>
          </div>
        ))}
        {filteredProducts.length === 0 && <p className="no-products-message">No products match your filters.</p>}
      </div>

      {filteredProducts.length > productsPerPage && (
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
    </div>
    </div>
  );
}

export default FilterProductsComponent;