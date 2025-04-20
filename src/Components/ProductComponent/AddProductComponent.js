import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddProductComponent.css';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:5203/api/Products';
const PRODUCTS_PER_PAGE = 2;

const AddProductComponent = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        productId: '',
        productName: '',
        description: '',
        category: '',
        availableQuantity: '',
        unitPrice: '',
        supplierId: '',
        image: ''
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const addProductSectionRef = React.useRef(null); // Create a ref for the add product section

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(API_URL);
            setProducts(response.data);

            const highestProductId = response.data.reduce((maxId, product) => {
                const numericId = parseInt(product.productId.replace('p', ''), 10);
                return numericId > maxId ? numericId : maxId;
            }, 0);

            const nextProductId = `p${String(highestProductId + 1).padStart(3, '0')}`;
            setFormData(prev => ({ ...prev, productId: nextProductId }));
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Failed to fetch products');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.value }));
    };

    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        setCurrentPage(1);
        if (newSearchTerm.length > 0) {
            const suggestions = products
                .filter(product =>
                    product.productName.toLowerCase().includes(newSearchTerm.toLowerCase())
                )
                .map(product => product.productName);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (editingProduct) {
                await axios.put(`${API_URL}/${formData.productId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                alert('Product updated successfully');
            } else {
                await axios.post(API_URL, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                alert('Product added successfully');
            }
            setFormData({
                productId: '',
                productName: '',
                description: '',
                category: '',
                availableQuantity: '',
                unitPrice: '',
                supplierId: '',
                image: ''
            });
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error('Error submitting product:', error);
            alert('Failed to submit product');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            productId: product.productId,
            productName: product.productName,
            description: product.description,
            category: product.category,
            availableQuantity: product.availableQuantity,
            unitPrice: product.unitPrice,
            supplierId: product.supplierId,
            image: product.image || ''
        });

        // Scroll to the add product section
        if (addProductSectionRef.current) {
            addProductSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleDelete = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    const fields = [
        { name: 'productId', label: 'Product ID', type: 'text' },
        { name: 'productName', label: 'Product Name', type: 'text' },
        { name: 'description', label: 'Description', type: 'text' },
        { name: 'category', label: 'Category', type: 'text' },
        { name: 'availableQuantity', label: 'Available Quantity', type: 'number', readOnly: editingProduct !== null },
        { name: 'unitPrice', label: 'Unit Price', type: 'number' },
        { name: 'supplierId', label: 'Supplier ID', type: 'number' },
        { name: 'image', label: 'Image URL', type: 'text' }
    ];

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <Button
                    key={i}
                    variant={currentPage === i ? 'primary' : 'outline-primary'}
                    onClick={() => paginate(i)}
                    className={`pagination-button stylish-button ${currentPage === i ? 'active' : ''}`}
                >
                    {i}
                </Button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="product-container">
            <div className="add-product-section stylish-container" ref={addProductSectionRef}> {/* Add the ref here */}
                <h2 className="add-product-title">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <Card className="add-product-card stylish-card">
                    <Card.Body>
                        <form onSubmit={handleSubmit} className="add-product-form">
                            <div className="form-grid">
                                {fields.map(field => (
                                    <div key={field.name} className="form-group">
                                        <label className="form-label">{field.label}</label>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            required={field.name !== 'image'}
                                            className="form-input stylish-input"
                                            readOnly={field.readOnly}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button type="submit" className="add-product-button stylish-button">
                                {editingProduct ? 'Update Product' : 'Add Product'}
                            </button>
                        </form>
                    </Card.Body>
                </Card>
            </div>

            <div className="product-list-section">
                <h2 className="product-list-title">All Products</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by product name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar stylish-input"
                        onFocus={() => setIsDropdownVisible(searchTerm.length > 0 && searchSuggestions.length > 0)}
                        onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
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
                <ul className="product-list-items">
                    {currentProducts.map(product => (
                        <li key={product.productId} className="product-item">
                            <h4>Product ID: {product.productId}</h4>
                            <p><strong>Product Name:</strong> {product.productName}</p>
                            <p><strong>Description:</strong> {product.description}</p>
                            <p><strong>Category:</strong> {product.category}</p>
                            <p><strong>Available Quantity:</strong> {product.availableQuantity}</p>
                            <p><strong>Unit Price:</strong> ₹{product.unitPrice}</p>
                            <p><strong>Supplier ID:</strong> {product.supplierId}</p>
                            {product.image && (
                                <div className="product-image-container">
                                    <img
                                        src={product.image}
                                        alt={product.productName}
                                        className="product-image"
                                        style={{ width: '150px', height: '150px', objectFit: 'contain' }}
                                    />
                                </div>
                            )}
                            <div className="product-actions">
                                <Button variant="info" onClick={() => handleEdit(product)} className="edit-button stylish-button">Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(product.productId)} className="delete-button stylish-button">Delete</Button>
                            </div>
                        </li>
                    ))}
                </ul>
                {totalPages > 1 && (
                    <div className="pagination">
                        {renderPageNumbers()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddProductComponent;