import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserOrderReport.css'; // Import the CSS file

function UserOrderReport() {
  const [allOrders, setAllOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5); // 5 items per page

  useEffect(() => {
    fetchOrders();
  }, []); // Fetch all orders once

  // Fetch all orders without pagination parameters initially
  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5203/api/Report/user-order-details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to fetch orders');
    }
  };

  // Logic for client-side pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(allOrders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="user-order-report all-in-one-card-layout">
      <h2>Your Orders</h2>
      <div className="report-card">
        <div className="orders-container">
          {currentOrders.length === 0 ? (
            <p className="no-orders">No orders found.</p>
          ) : (
            currentOrders.map((order) => (
              <div key={order.orderId} className="order-item">
                <h4>{order.productName}</h4>
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
                  <strong>Ordered Quantity:</strong> {order.orderedQuantity}
                </p>
                <p>
                  <strong>Unit Price:</strong> ₹{order.unitPrice}
                </p>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination-container">
            <div className="pagination">
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              {renderPageNumbers()}
              <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserOrderReport;