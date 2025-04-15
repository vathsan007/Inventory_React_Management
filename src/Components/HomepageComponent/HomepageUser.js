import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HomepageUser.css'; // Import CSS for styling

const HomepageUser = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3); // Adjust as needed

  // Combined Carousel Ref
  const combinedCarouselRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5203/api/Products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (price) {
      filtered = filtered.filter(product =>
        product.unitPrice <= parseFloat(price)
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset pagination on search
  };

  const handlePlaceOrder = (productId) => {
    navigate(`/order/place`);
  };

  // Pagination logic for products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Automatic combined carousel scroll
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (combinedCarouselRef.current) {
        const containerWidth = combinedCarouselRef.current.offsetWidth;
        combinedCarouselRef.current.scrollLeft = (combinedCarouselRef.current.scrollLeft + containerWidth) % (containerWidth * 2); // Scroll by container width (for the two sections)
      }
    }, 5000); // Scroll every 5 seconds (adjust as needed)

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="homepage-container">
      <div className="carousel-cardd">
              <h2>Welcome to Our Inventory Management System!</h2>
              <p>Explore a curated selection of our top products and discover seamless ordering.</p>
      </div>
      <div className="combined-carousel-container">
      
        <div className="combined-carousel-track" ref={combinedCarouselRef}>
       
          <div className="carousel-section welcome-section-carousel">
           
            <div className="carousel-card welcome-card">
              <h2>Effortless Inventory at Your Fingertips</h2>
              <p>Browse our extensive catalog with ease and place orders in just a few clicks.</p>
            </div>
            <div className="carousel-card welcome-card">
              <h2>Your Central Hub for Product Ordering</h2>
              <p>Find the products you need quickly and efficiently with our intuitive system.</p>
            </div>
          </div>
          <div className="carousel-section why-us-section-carousel">
            <div className="carousel-card why-us-card">
              <h2>Why Choose Our Platform?</h2>
              <p>Experience streamlined ordering and efficient inventory management.</p>
              <ul>
                <li><strong>Intuitive Interface:</strong> Easy to navigate and find products.</li>
              </ul>
            </div>
            <div className="carousel-card why-us-card">
              <h2>Real-time Inventory Insights</h2>
              <p>Stay informed with up-to-date availability and product details.</p>
              <ul>
                <li><strong>Comprehensive Details:</strong> All the information you need in one place.</li>
              </ul>
            </div>
            <div className="carousel-card why-us-card">
              <h2>Simplified Ordering Process</h2>
              <p>Place orders quickly and efficiently, saving you valuable time.</p>
              <ul>
                <li><strong>One-Click Ordering:</strong> Initiate orders with a single click.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <h1>Product List</h1>
      <div className="search-filters-container">
        <div className="search-filters">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="number"
            placeholder="Search by price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="product-grid">
        {currentProducts.map(product => (
          <div key={product.productId} className="product-card">
            <h3>{product.productName}</h3>
            <p className="description">{product.description}</p>
            <div className="details">
              <p>Category: <span>{product.category}</span></p>
              <p>Available: <span>{product.availableQuantity}</span></p>
              <p>Price: <span>${product.unitPrice}</span></p>
            </div>
            <button className="order-button" onClick={() => handlePlaceOrder(product.productId)}>Place Order</button>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HomepageUser;