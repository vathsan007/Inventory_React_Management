import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserOrderReport.css';

const UserOrderReport = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5203/api/Report/user-order-details/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order report:', error);
      }
    };

    if (userId) fetchUserOrders();
  }, [userId]);

  if (!orders.length) return <div className="loading">Loading report...</div>;

  return (
    <div className="report-container">
      {orders.map((order, index) => (
        <div className="order-card" key={index}>
          <h3>{order.productName}</h3>
          <p><strong>User ID:</strong> {order.userId}</p>
          <p><strong>User Name:</strong> {order.userName}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Product ID:</strong> {order.productId}</p>
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Ordered Quantity:</strong> {order.orderedQuantity}</p>
        </div>
      ))}
    </div>
  );
};

export default UserOrderReport;