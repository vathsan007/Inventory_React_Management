import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HomepageUser.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from './ProductCard';

const HomepageUser = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  const [orderProductId, setOrderProductId] = useState(null);
  const [orderedQuantity, setOrderedQuantity] = useState('');
  const combinedCarouselRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselInterval = useRef(null);
  const numCarouselSections = 2; // Number of sections in the combined carousel

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

  useEffect(() => {
    handleSearch();
  }, [searchTerm, category, price]);

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
    setCurrentPage(1);
  };

  const initiatePlaceOrder = (productId) => {
    setOrderProductId(productId);
    setOrderedQuantity('1');
  };

  const handleQuantityChange = (e) => {
    setOrderedQuantity(e.target.value);
  };

  const confirmOrder = () => {
    if (!orderedQuantity || parseInt(orderedQuantity) <= 0) {
      toast.info('Please enter a valid quantity.');
      return;
    }
    localStorage.setItem('orderProductId', orderProductId);
    localStorage.setItem('orderedQuantity', orderedQuantity);
    navigate('/payment'); // Navigate to payment page
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    carouselInterval.current = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % numCarouselSections);
    }, 3000);

    return () => clearInterval(carouselInterval.current);
  }, []);

  useEffect(() => {
    if (combinedCarouselRef.current) {
      combinedCarouselRef.current.style.transform = `translateX(-${carouselIndex * 100}%)`;
    }
  }, [carouselIndex]);

  const goToCarouselPage = (index) => {
    setCarouselIndex(index);
    clearInterval(carouselInterval.current);
    carouselInterval.current = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % numCarouselSections);
    }, 3000);
  };

  return (
    <div className="homepage-container">
      <div className="carousel-cardd">
        <h2>Welcome to Our Inventory Management System!</h2>
        <p>Explore a curated selection of our top products and discover seamless ordering.</p>
      </div>
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
          {/* <button onClick={handleSearch}>Search</button> */}
        </div>
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
        <div className="carousel-pagination">
          {Array.from({ length: numCarouselSections }).map((_, index) => (
            <button
              key={index}
              className={carouselIndex === index ? 'active' : ''}
              onClick={() => goToCarouselPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <h1>Product List</h1>

      <div className="product-grid">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            orderProductId={orderProductId}
            orderedQuantity={orderedQuantity}
            onQuantityChange={handleQuantityChange}
            onInitiateOrder={initiatePlaceOrder}
            onPlaceOrder={confirmOrder}
          />
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

      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default HomepageUser;