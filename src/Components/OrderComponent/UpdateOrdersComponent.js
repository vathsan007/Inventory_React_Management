import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UpdateOrdersComponent.css'; // Import the CSS file

function UpdateOrdersComponent() {
  const [orders, setOrders] = useState([]);
  const [editId, setEditId] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4; // You can adjust the number of orders per page

  const fetchOrders = () => {
    axios.get('http://localhost:5203/api/Order/details')
      .then(res => setOrders(res.data))
      .catch(() => alert('Failed to fetch orders'));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = () => {
    if (!editId || !newStatus) {
      alert('Please enter Order ID and select a status');
      return;
    }

    axios.put(`http://localhost:5203/api/Order/${editId}`, `"${newStatus}"`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        alert('Order status updated successfully');
        setEditId('');
        setNewStatus('');
        fetchOrders();
      })
      .catch(() => alert('Failed to update status'));
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(orders.length / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="update-orders-container">
      <h2 className="update-orders-title">All Orders</h2>

      <div className="update-status-section">
        <input
          type="text"
          className="update-status-input stylish-input"
          placeholder="Enter Order ID"
          value={editId}
          onChange={(e) => setEditId(e.target.value)}
        />
        <select
          className="update-status-select stylish-dropdown"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Placed">Placed</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button className="update-status-button stylish-button" onClick={handleUpdateStatus}>Update Status</button>
      </div>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <>
          <ul className="orders-list">
            {currentOrders.map(order => (
              <li key={order.orderId} className="order-item stylish-card">
                <h4>Product: {order.productName}</h4>
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Product ID:</strong> {order.productId}</p>
                <p><strong>Description:</strong> {order.description}</p>
                <p><strong>Unit Price:</strong> ₹{order.unitPrice}</p>
                <p><strong>Ordered Quantity:</strong> {order.orderedQuantity}</p>
                <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
              </li>
            ))}
          </ul>

          {orders.length > ordersPerPage && (
            <nav className="pagination">
              <ul className="pagination-list">
                {pageNumbers.map(number => (
                  <li key={number} className={`pagination-item ${currentPage === number ? 'active' : ''}`}>
                    <button onClick={() => paginate(number)} className="pagination-link stylish-pagination-button">
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

export default UpdateOrdersComponent;