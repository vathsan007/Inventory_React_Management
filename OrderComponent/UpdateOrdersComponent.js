import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UpdateOrdersComponent.css'; // Import the CSS file

function UpdateOrdersComponent() {
  const [orders, setOrders] = useState([]);
  const [editId, setEditId] = useState('');
  const [newStatus, setNewStatus] = useState('');

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

    axios.put(`http://localhost:5203/api/Order/${editId}`, `"${newStatus}"`, { // Ensure newStatus is sent as a string
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

  return (
    <div className="update-orders-container">
      <h2 className="update-orders-title">All Orders</h2>

      <div className="update-status-section">
        <input
          type="text"
          className="update-status-input"
          placeholder="Enter Order ID"
          value={editId}
          onChange={(e) => setEditId(e.target.value)}
        />
        <select
          className="update-status-select"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Placed">Placed</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button className="update-status-button" onClick={handleUpdateStatus}>Update Status</button>
      </div>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <ul className="orders-list">
          {orders.map(order => (
            <li key={order.orderId} className="order-item">
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
      )}
    </div>
  );
}

export default UpdateOrdersComponent;