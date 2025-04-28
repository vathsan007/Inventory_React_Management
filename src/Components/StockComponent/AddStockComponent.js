import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddStockComponent.css'; // Import CSS file
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

function AddStockComponent() {
    const [stocks, setStocks] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [quantityErrors, setQuantityErrors] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const stocksPerPage = 2; // You can adjust this number

    const fetchStocks = () => {
        axios.get('http://localhost:5203/api/Stock/AllStock')
            .then(res => setStocks(res.data))
            .catch(() => toast.error('Failed to fetch stock data'));
    };

    useEffect(() => {
        fetchStocks();
    }, []);

    const handleQuantityChange = (productId, value) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: value
        }));
        // Immediate validation
        if (parseInt(value, 10) < 0) {
            setQuantityErrors(prevErrors => ({
                ...prevErrors,
                [productId]: 'Quantity cannot be negative'
            }));
        } else {
            setQuantityErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[productId];
                return newErrors;
            });
        }
    };

    const canSubmit = (productId) => {
        return !quantityErrors[productId] && quantities[productId] && parseInt(quantities[productId], 10) >= 0;
    };

    const handleAddStock = (productId) => {
        const quantity = quantities[productId];
        if (!quantity) {
            toast.error('Please enter a quantity');
            return;
        }
        if (parseInt(quantity, 10) < 0) {
            toast.error('Quantity cannot be negative');
            return;
        }

        axios.post(`http://localhost:5203/api/Stock/AddStock?productId=${productId}&quantity=${quantity}`)
            .then(() => {
                toast.success('Stock added successfully');
                setQuantities(prevQuantities => ({
                    ...prevQuantities,
                    [productId]: ''
                }));
                fetchStocks(); // Refresh stock list
            })
            .catch(() => toast.error('Failed to add stock. Product ID may be invalid.'));
    };

    const handleReduceStock = (productId) => {
        const quantity = quantities[productId];
        if (!quantity) {
            toast.error('Please enter a quantity');
            return;
        }
        if (parseInt(quantity, 10) < 0) {
            toast.error('Quantity cannot be negative');
            return;
        }

        axios.post(`http://localhost:5203/api/Stock/ReduceStock?productId=${productId}&quantity=${quantity}`)
            .then(() => {
                toast.success('Stock reduced successfully');
                setQuantities(prevQuantities => ({
                    ...prevQuantities,
                    [productId]: ''
                }));
                fetchStocks(); // Refresh stock list
            })
            .catch(() => toast.error('Failed to reduce stock. Product ID may be invalid.'));
    };

    const handleDiscardStock = (productId) => {
        axios.post(`http://localhost:5203/api/Stock/DiscardAllStock?productId=${productId}`)
            .then(() => {
                toast.success('Stock discarded successfully');
                fetchStocks(); // Refresh stock list
            })
            .catch(() => toast.error('Failed to discard stock. Product ID may be invalid.'));
    };

    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        setCurrentPage(1);
        if (newSearchTerm.length > 0) {
            const suggestions = stocks
                .filter(stock =>
                    stock.productName.toLowerCase().includes(newSearchTerm.toLowerCase())
                )
                .map(stock => stock.productName);
            setSearchSuggestions(suggestions);
            setIsDropdownVisible(true);
        } else {
            setSearchSuggestions([]);
            setIsDropdownVisible(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        setIsDropdownVisible(false);
    };

    // Pagination logic
    const indexOfLastStock = currentPage * stocksPerPage;
    const indexOfFirstStock = indexOfLastStock - stocksPerPage;
    const filteredStocks = stocks.filter(stock =>
        stock.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentStocks = filteredStocks.slice(indexOfFirstStock, indexOfLastStock);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredStocks.length / stocksPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='addstock'>
            <div className="add-stock-container stylish-container">
                <ToastContainer autoClose={3000} position='bottom-right' />

                <div className="search-container">
                    {/* <p className="add-stock-title">Manage Stock</p> */}
                    <input
                        type="text"
                        placeholder="Search by product name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar stylish-input"
                        onFocus={() => setIsDropdownVisible(searchTerm.length > 0 && searchSuggestions.length > 0)}
                        onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)} // Slight delay for click
                    />
                    {isDropdownVisible && searchSuggestions.length > 0 && (
                        <ul className="search-dropdown">
                            {searchSuggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="search-suggestion-item"
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <section className="stock-list-section stylish-card">
                    {/* <p className="add-stock-title">Manage Stock</p> */}
                    <h3>Current Stock Levels</h3>
                    <div className="stock-list">
                        {currentStocks.map(stock => (
                            <div key={stock.productId} className="stock-item">
                                <h5><strong>Product Name:</strong> {stock.productName}</h5>
                                <h4>Product ID: {stock.productId}</h4>
                                <p><strong>Available Quantity:</strong> {stock.availableQuantity}</p>
                                <div className="form-group">
                                    <label htmlFor={`quantity-${stock.productId}`} className="form-label">Quantity:</label>
                                    <input
                                        type="number"
                                        id={`quantity-${stock.productId}`}
                                        className="form-input stylish-input"
                                        placeholder="Enter Quantity"
                                        value={quantities[stock.productId] || ''}
                                        onChange={e => handleQuantityChange(stock.productId, e.target.value)}
                                    />
                                    {quantityErrors[stock.productId] && (
                                        <p className="error-message">{quantityErrors[stock.productId]}</p>
                                    )}
                                </div>
                                <div className="stock-actions">
                                    <button
                                        onClick={() => handleAddStock(stock.productId)}
                                        className={`add-stock-button stylish-button ${!canSubmit(stock.productId) ? 'disabled' : ''}`}
                                        disabled={!canSubmit(stock.productId)}
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => handleReduceStock(stock.productId)}
                                        className={`reduce-stock-button stylish-button ${!canSubmit(stock.productId) ? 'disabled' : ''}`}
                                        disabled={!canSubmit(stock.productId)}
                                    >
                                        Reduce
                                    </button>
                                    <button
                                        onClick={() => handleDiscardStock(stock.productId)}
                                        className="discard-stock-button stylish-button"
                                    >
                                        Discard
                                    </button>
                                </div>
                            </div>
                        ))}
                        {filteredStocks.length === 0 && <p className="no-stock-message">No stock data available.</p>}
                    </div>
                    {filteredStocks.length > stocksPerPage && (
                        <nav className="pagination">
                            <ul className="pagination-list">
                                {pageNumbers.map((number) => (
                                    <li
                                        key={number}
                                        className={`pagination-item ${currentPage === number ? 'active' : ''}`}
                                    >
                                        <button onClick={() => paginate(number)} className="pagination-link stylish-pagination-button">
                                            {number}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </section>
            </div>
        </div>
    );
}

export default AddStockComponent;