import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FilterProductsComponent.css'; // Import CSS file
import { ToastContainer,toast } from 'react-toastify';
 
function FilterProductsComponent() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
 
  const [categories, setCategories] = useState([]);
  const [productNames, setProductNames] = useState([]);
 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');
 
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
 
      const uniqueCategories = [...new Set(res.data.map(p => p.category))].sort();
      setCategories(['', ...uniqueCategories]);
 
      // Initially set all product names
      const allProductNames = res.data.map(p => p.productName).sort();
      setProductNames(['', ...allProductNames]);
    } catch (error) {
      toast.error('Failed to load products');
      console.error("Error fetching products:", error);
    }
  };
 
  useEffect(() => {
    let filtered = allProducts;
 
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
 
      // Update product names based on the selected category
      const categoryProductNames = filtered.map(p => p.productName).sort();
      setProductNames(['', ...categoryProductNames]);
      // Reset selected product name when category changes
      setSelectedProductName('');
    } else {
      // If no category is selected, show all product names
      const allProductNames = allProducts.map(p => p.productName).sort();
      setProductNames(['', ...allProductNames]);
    }
 
    if (selectedProductName) {
      filtered = filtered.filter(p => p.productName === selectedProductName);
    }
 
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset page on filter change
  }, [selectedCategory, allProducts]);
 
  useEffect(() => {
    let filtered = allProducts;
 
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (selectedProductName) {
      filtered = filtered.filter(p => p.productName === selectedProductName);
    }
 
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedProductName]);
 
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
      <ToastContainer position='bottom-right' autoClose={3000}/>

      <div className="filter-products-container stylish-container">
        <h3><center>Welcome To Inventory Management System - Admin </center></h3>
        <div className="filter-options stylish-card">
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
            <label htmlFor="productFilter" className="form-label">Product Name:</label>
            <select
              id="productFilter"
              className="form-select"
              value={selectedProductName}
              onChange={(e) => setSelectedProductName(e.target.value)}
              disabled={!selectedCategory} // Disable if no category is selected
            >
              {productNames.map(name => (
                <option key={name} value={name}>{name === '' ? selectedCategory ? 'All Products in Category' : 'Select Category First' : name}</option>
              ))}
            </select>
          </div>
        </div>
 
        <div className="products-grid">
          {currentProducts.map(product => (
            <div key={product.productId} className="product-card stylish-card">
              <h4>{product.productName}</h4>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> ₹{product.unitPrice}</p>
              <p><strong>Quantity:</strong> {product.availableQuantity}</p>
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
 