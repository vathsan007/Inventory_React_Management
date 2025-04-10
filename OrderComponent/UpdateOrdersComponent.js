
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    axios.put(`http://localhost:5203/api/Order/${editId}`, newStatus, {
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
    <div>
      <h2>All Orders</h2>

      <div style={{padding: '20px', width:'auto' ,display:'flex' , flexDirection:'row', gap:'100px' , flexWrap:'wrap' ,justifyContent:'Center' }}>
        <input
          type="text"
          placeholder="Enter Order ID"
          value={editId}
          onChange={(e) => setEditId(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Placed">Placed</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button onClick={handleUpdateStatus} style={{ marginLeft: '10px' }}>Update Status</button>
      </div>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div
            key={order.orderId}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              
              display:'list-item',justifyContent:'Center'
            }}
          >
            <h4>Product: {order.productName}</h4>
            <p><strong>Order ID:</strong> {order.orderId}</p>
            <p><strong>Status:</strong> {order.status}</p>
            {/* <p><strong>User:</strong> {order.userName}</p> */}
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
  );
}

export default UpdateOrdersComponent;
