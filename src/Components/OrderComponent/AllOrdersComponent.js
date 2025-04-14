import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllOrdersComponent.css'; // Import the CSS file
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function AllOrdersComponent() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6; // Adjust as needed

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5203/api/Order/details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to fetch orders');
    }
  };

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(orders.length / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  // Carousel Settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Default number of cards to show
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="all-orders-container stylish-container">
      <h2 className="all-orders-title">All Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders-message">No orders found.</p>
      ) : (
        <>
          {orders.length > ordersPerPage ? (
            <Slider {...settings} className="orders-carousel">
              {currentOrders.map((order) => (
                <div key={order.orderId} className="order-card stylish-card">
                  <h4>Product: {order.productName}</h4>
                  <p>
                    <strong>Order ID:</strong> {order.orderId}
                  </p>
                  <p>
                    <strong>Product ID:</strong> {order.productId}
                  </p>
                  <p>
                    <strong>Description:</strong> {order.description}
                  </p>
                  <p>
                    <strong>Unit Price:</strong> ₹{order.unitPrice}
                  </p>
                  <p>
                    <strong>Ordered Quantity:</strong> {order.orderedQuantity}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ₹{order.totalPrice}
                  </p>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="orders-grid">
              {orders.map((order) => (
                <div key={order.orderId} className="order-card stylish-card">
                  <h4>Product: {order.productName}</h4>
                  <p>
                    <strong>Order ID:</strong> {order.orderId}
                  </p>
                  <p>
                    <strong>Product ID:</strong> {order.productId}
                  </p>
                  <p>
                    <strong>Description:</strong> {order.description}
                  </p>
                  <p>
                    <strong>Unit Price:</strong> ₹{order.unitPrice}
                  </p>
                  <p>
                    <strong>Ordered Quantity:</strong> {order.orderedQuantity}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ₹{order.totalPrice}
                  </p>
                </div>
              ))}
            </div>
          )}

          {orders.length > ordersPerPage && (
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
  );
}

export default AllOrdersComponent;