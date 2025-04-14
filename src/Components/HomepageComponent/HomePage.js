import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Homepage.css'; // Import custom CSS
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import sampleImg from '../assets/imag.jpg'

const ProjectFeatures = [
  { title: 'Manage Stock Levels', description: 'Real-time tracking & adjustments.' },
  { title: 'Order & Shipment Mgmt', description: 'Streamlined processing & tracking.' },
  { title: 'Product Management', description: 'Easy add, edit & categorize.' },
  { title: 'Reporting & Analytics', description: 'Insights on sales & stock.' },

];

function HomePage() {
  //product carousel 
  
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:5203/api/Products')
      .then(res => setProducts(res.data))
      .catch(() => alert('Failed to fetch products'));
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };



  const [currentFeaturePage, setCurrentFeaturePage] = useState(0);
  const featuresPerPage = 2; // Number of features per page
  const totalFeaturePages = 2; // Fixed to two pages
  const intervalRef = useRef(null);


  useEffect(() => {
    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        setCurrentFeaturePage((prevPage) => (prevPage + 1) % totalFeaturePages);
      }, 3000); // Change page every 3 seconds
    };

    const stopAutoScroll = () => {
      clearInterval(intervalRef.current);
    };

    startAutoScroll();

    return () => stopAutoScroll(); // Cleanup on unmount
  }, [totalFeaturePages]);

  const goToFeaturePage = (pageNumber) => {
    setCurrentFeaturePage(pageNumber);
    clearInterval(intervalRef.current); // Stop auto-scroll on manual navigation
    intervalRef.current = setInterval(() => {
      setCurrentFeaturePage((prevPage) => (prevPage + 1) % totalFeaturePages);
    }, 3000); // Restart auto-scroll
  };

  const getFeaturesForPage = (pageNumber) => {
    const startIndex = pageNumber * featuresPerPage;
    const endIndex = Math.min(startIndex + featuresPerPage, ProjectFeatures.length);
    return ProjectFeatures.slice(startIndex, endIndex);
  };

  const productCarouselRef = useRef(null);
  const [marqueeOffset, setMarqueeOffset] = useState(0);
  const marqueeSpeed = 10; // Slower speed for marquee
  const isCarouselHovered = useRef(false);
  const [sampleProducts, setSampleProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5203/api/Products')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setSampleProducts(data);
      })
      .catch(error => {
        toast.error('Error fetching products:', error);
        // Optionally set a default or error state for sampleProducts
      });
  }, []);

  useEffect(() => {
    const scrollContainer = productCarouselRef.current;
    let animationFrameId;

    const animateMarquee = () => {
      if (scrollContainer && !isCarouselHovered.current) {
        setMarqueeOffset((prevOffset) => {
          const newOffset = prevOffset + marqueeSpeed;
          const maxOffset = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          if (newOffset > maxOffset) {
            return 0;
          }
          return newOffset;
        });
        scrollContainer.scrollLeft = marqueeOffset;
      }
      animationFrameId = requestAnimationFrame(animateMarquee);
    };

    animationFrameId = requestAnimationFrame(animateMarquee);

    return () => cancelAnimationFrame(animationFrameId);
  }, [marqueeSpeed, marqueeOffset]);

  const handleCarouselMouseEnter = () => {
    isCarouselHovered.current = true;
  };

  const handleCarouselMouseLeave = () => {
    isCarouselHovered.current = false;
  };

  const handleProductHover = (productId) => {
    setHoveredProductId(productId);
  };

  const handleProductMouseLeave = () => {
    setHoveredProductId(null);
  };

  const hoveredProductData = sampleProducts.find(product => product.id === hoveredProductId);

  return (
    <div className="home-page">
      <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      
      />
      

      <section className="hero">
        <div className="hero-content">
          <h1 className="display-3">Streamline Your Inventory</h1>
          <p className="lead">Manage, track, and grow your business with ease.</p>
          <p className="lead">
            <Link to="/login">
              <Button variant="primary" className="mr-5">
                Login
              </Button> 
            </Link>&nbsp;&nbsp;
            <Link to="/register">
              <Button variant="success">
                Register
              </Button>
            </Link>
          </p>
        </div>
      </section>

      <section className="features-carousel-section bg-white py-5">
        <div className="container">
          <h2 className="text-center mb-3">Key Features</h2>
          <div className="features-carousel-container">
            <div
              className="features-carousel-wrapper"
              style={{
                transform: `translateX(-${currentFeaturePage * 50}%)`,
              }}
            >
              {Array.from({ length: totalFeaturePages }).map((_, pageIndex) => (
                <div className="features-page" key={pageIndex}>
                  {getFeaturesForPage(pageIndex).map((feature, index) => (
                    <div className="feature-card" key={index}>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="page-indicator">
              {Array.from({ length: totalFeaturePages }).map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentFeaturePage ? 'active' : ''}`}
                  onClick={() => goToFeaturePage(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div
                ref={scrollRef}
                className="horizontal-scroll-container px-10 scrollbar-hide"
              >
                {products.map((product) => (
                  <div key={product.productId} className="flex-shrink-0">
                    <Card style={{ width: '20rem' }}>
                      <Card.Img variant="top" src={sampleImg} width='400px' height='200px' />
                      <Card.Body>
                        <Card.Title> {product.productName}</Card.Title>
                        <Card.Text>
                          Category: {product.category}
                        </Card.Text>
            
                        <Card.Text>Price: ₹{product.unitPrice}</Card.Text>
                        <Card.Text>Quantity: {product.availableQuantity}</Card.Text>
                        <Button variant="primary" onClick={() => toast.info('login')}>
                           Place Order
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
                
              </div>

              {/* Left Arrow */}
              {/* <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
              >
                ←
              </button> */}

              {/* Right Arrow */}
              {/* <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
              >
                →
              </button> */}
      <footer className="bg-light py-3 text-center border-top">
        <p>&copy; {new Date().getFullYear()} Inventory System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;