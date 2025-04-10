


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CancelOrderComponent() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    axios.get('http://localhost:5203/api/Order/details')
      .then(res => setOrders(res.data))
      .catch(() => alert('Failed to fetch orders'));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = (orderId) => {
    if (window.confirm(`Are you sure you want to cancel order ${orderId}?`)) {
      axios.delete(`http://localhost:5203/api/Order/cancelorder/${orderId}`)
        .then(() => {
          alert(`Order ${orderId} cancelled successfully`);
          fetchOrders(); // refresh orders
        })
        .catch(() => alert('Failed to cancel the order'));
    }
  };

  return (
    <div>
        <h2>Cancel Orders</h2>
    
    <div style={{ padding: '20px', width:'auto', display:'flex', flexDirection:'row', flexWrap:'wrap',gap:'100px',justifyContent:'center'}}>
      
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div
            key={order.orderId}
            style={{
              border: '1px solid #ccc',
              padding: '20px',
              
              borderRadius: '8px',
              
            }}
          >
            <h4>{order.productName}</h4>
            <p><strong>Order ID:</strong> {order.orderId}</p>
            <p><strong>User:</strong> {order.userName}</p>
            <p><strong>Quantity:</strong> {order.orderedQuantity}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <button onClick={() => handleCancel(order.orderId)} style={{ background: 'red', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}>
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