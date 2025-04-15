import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AllUserOrdersReport.css';
import ReactPaginate from 'react-paginate';

const AllUserOrdersReport = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(4); // You can adjust the number of items per page
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    let token;
    try {
      token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
      alert('Failed to retrieve token');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5203/api/Report/order-history', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrderHistory(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error('Error fetching order history:', error);
      alert('Failed to fetch order history');
    }
  };

  const handleFilter = () => {
    let filtered = orderHistory;

    if (startDate) {
      filtered = filtered.filter(order => new Date(order.orderDate) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter(order => new Date(order.orderDate) <= new Date(endDate));
    }

    if (status) {
      filtered = filtered.filter(order => order.status.toLowerCase() === status.toLowerCase());
    }

    setFilteredOrders(filtered);
    setCurrentPage(0); // Reset to the first page after filtering
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleUpdateStatus = (orderId) => {
    navigate(`/orders/update/${orderId}`, { state: { orderId } });
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div className="order-report-container">
      <h2 className="report-title">Order History</h2>
      <div className="filter-section">
        <div className="filter-input">
          <label className="filter-label">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="filter-control"
          />
        </div>
        <div className="filter-input">
          <label className="filter-label">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="filter-control"
          />
        </div>
        <div className="filter-input">
          <label className="filter-label">Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="filter-control"
            placeholder="Enter status"
          />
        </div>
        <button onClick={handleFilter} className="filter-button">
          Filter
        </button>
      </div>
      <div className="order-grid">
        {currentOrders.map(order => (
          <div className="order-card" key={order.orderId}>
            <h5 className="card-order-id">Order ID: {order.orderId}</h5>
            <p className="card-info">User ID: {order.userId}</p>
            <p className="card-info">Product ID: {order.productId}</p>
            <p className="card-info">Quantity: {order.orderedQuantity}</p>
            <p className="card-info">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            <p className={`card-status status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
              Status: {order.status}
            </p>
            <button onClick={() => handleUpdateStatus(order.orderId)} className="update-button">
              Update Status
            </button>
          </div>
        ))}
        {filteredOrders.length === 0 && <p className="no-orders">No orders found based on the applied filters.</p>}
      </div>
      {filteredOrders.length > itemsPerPage && (
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
        />
      )}
    </div>
  );
};

export default AllUserOrdersReport;