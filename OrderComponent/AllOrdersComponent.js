import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllOrdersComponent() {
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5203/api/Order/details')
      .then(res => setOrders(res.data))
      .catch(() => alert('Failed to fetch orders'));
  }, []);

  return (
    <div>
      <h2>All Orders</h2>
    <div style={{ padding: '20px', width:'auto' ,display:'flex' , flexDirection:'row', gap:'100px' , flexWrap:'wrap' ,justifyContent:'Center'}}>
      
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div
            key={order.orderId}
            style={{
              border: '1px solid #ccc',
              padding: '30px',
              marginBottom: '10px',
              borderRadius: '10px',
              
            }}
          >
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

