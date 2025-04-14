import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GetAllProductsComponent.css'; // Import CSS file

function GetAllProductsComponent() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3; // You can adjust this number

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5203/api/Products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      alert('Failed to fetch products');
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='product-list'>
    <div className="get-all-products-container stylish-container">
      <h2 className="get-all-products-title">All Products</h2>
      {products.length === 0 ? (
        <p className="no-products-message">No products found.</p>
      ) : (
        <>
          <div className="products-grid">
            {currentProducts.map((product) => (
              <div key={product.productId} className="product-card stylish-card">
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
          {products.length > productsPerPage && (
            <nav className="pagination">
              <ul className="pagination-list">
                {pageNumbers.map((number) => (
                  <li
                    key={number}
                    className={`pagination-item ${
                      currentPage === number ? 'active' : ''
                    }`}
                  >
                    <button
                      onClick={() => paginate(number)}
                      className="pagination-link stylish-pagination-button"
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
    </div>
  );
}

export default GetAllProductsComponent;