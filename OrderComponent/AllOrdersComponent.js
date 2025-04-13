import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllOrdersComponent.css'; // Import the CSS file

function AllOrdersComponent() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5203/api/Order/details', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to fetch orders');
    }
  };

  return (
    <div className="all-orders-container">
      <h2 className="all-orders-title">All Orders</h2>
      <div className="orders-grid">
        {orders.length === 0 ? (
          <p className="no-orders-message">No orders found.</p>
        ) : (
          orders.map(order => (
            <div key={order.orderId} className="order-card">
              <h4>Product: {order.productName}</h4>
              <p><strong>Order ID:</strong> {order.orderId}</p>
              {/* <p><strong>Username:</strong> {order.userName}</p> */}
              <p><strong>Product ID:</strong> {order.productId}</p>
              <p><strong>Description:</strong> {order.description}</p>
              <p><strong>Unit Price:</strong> ₹{order.unitPrice}</p>
              <p><strong>Ordered Quantity:</strong> {order.orderedQuantity}</p>
              <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
              {/* <p><strong>Address:</strong> {order.address}</p> */}
              {/* <p><strong>Phone:</strong> {order.phoneNumber}</p> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllOrdersComponent;