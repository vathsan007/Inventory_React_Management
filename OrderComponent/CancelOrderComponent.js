import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CancelOrderComponent.css';

function CancelOrderComponent() {
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

  const handleCancel = async (orderId) => {
    if (window.confirm(`Are you sure you want to cancel order ${orderId}?`)) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`http://localhost:5203/api/Order/cancelorder/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert(`Order ${orderId} cancelled successfully`);
        fetchOrders(); // refresh orders
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert('Failed to cancel the order');
      }
    }
  };

  return (
    <div className="cancel-orders-container">
      <h2 className="cancel-orders-title">Cancel Orders</h2>

      <div className="orders-grid">
        {orders.length === 0 ? (
          <p className="no-orders-message">No orders found.</p>
        ) : (
          orders.map(order => (
            <div key={order.orderId} className="order-card">
              <h4>{order.productName}</h4>
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>User:</strong> {order.userName}</p>
              <p><strong>Quantity:</strong> {order.orderedQuantity}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <button className="cancel-button" onClick={() => handleCancel(order.orderId)}>
                Cancel Order
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CancelOrderComponent;