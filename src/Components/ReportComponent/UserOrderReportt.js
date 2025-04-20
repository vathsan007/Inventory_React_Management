import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserOrderReport() {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(3);
    const [filter, setFilter] = useState('Placed');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5203/api/Report/user-order-details', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrders(response.data);
            setCurrentPage(1);
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to fetch orders');
        }
    };

    const cancelOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:5203/api/Order/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success('Order cancelled successfully!');
            fetchOrders();
        } catch (error) {
            console.error('Error cancelling order:', error);
            toast.error('Failed to cancel order');
        }
    };

    const filteredOrders = orders.filter(order => order.status === filter);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredOrders.length / ordersPerPage); i++) {
        pageNumbers.push(i);
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Placed':
                return 'info';
            case 'Cancelled':
                return 'danger';
            case 'Delivered':
                return 'success';
            case 'Shipped':
                return 'warning';
            default:
                return 'secondary';
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Order History</h2>
            <div className="d-flex justify-content-center mb-3">
                <div className="btn-group">
                    <button
                        className={`btn btn-outline-${filter === 'Placed' ? getStatusColor('Placed') : 'primary'} ${filter === 'Placed' ? 'active' : ''}`}
                        onClick={() => setFilter('Placed')}
                    >
                        Placed
                    </button>
                    <button
                        className={`btn btn-outline-${filter === 'Cancelled' ? getStatusColor('Cancelled') : 'primary'} ${filter === 'Cancelled' ? 'active' : ''}`}
                        onClick={() => setFilter('Cancelled')}
                    >
                        Cancelled
                    </button>
                    <button
                        className={`btn btn-outline-${filter === 'Delivered' ? getStatusColor('Delivered') : 'primary'} ${filter === 'Delivered' ? 'active' : ''}`}
                        onClick={() => setFilter('Delivered')}
                    >
                        Delivered
                    </button>
                    <button
                        className={`btn btn-outline-${filter === 'Shipped' ? getStatusColor('Shipped') : 'primary'} ${filter === 'Shipped' ? 'active' : ''}`}
                        onClick={() => setFilter('Shipped')}
                    >
                        Shipped
                    </button>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {currentOrders.length === 0 ? (
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text text-muted">No orders found with the current filter.</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    currentOrders.map(order => (
                        <div key={order.orderId} className="col">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Product: {order.productName}</h5>
                                    <p className="card-text"><strong>Ordered Quantity:</strong> {order.orderedQuantity}</p>
                                    <p className="card-text">
                                        <strong>Status:</strong>{' '}
                                        <span className={`badge bg-${getStatusColor(order.status)}`}>{order.status}</span>
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Date: {new Date(order.orderDate).toLocaleDateString('en-IN', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </small>
                                    </p>
                                    {order.status === 'Placed' && (
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => cancelOrder(order.orderId)}
                                        >
                                            Cancel Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {filteredOrders.length > ordersPerPage && (
                <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                        </li>
                        {pageNumbers.map(number => (
                            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                <button onClick={() => paginate(number)} className="page-link">
                                    {number}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                        </li>
                    </ul>
                </nav>
            )}

            <ToastContainer position="bottom-right" autoClose={2000} />
        </div>
    );
}

export default UserOrderReport;