import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddProductComponent.css';
import { ToastContainer,toast } from 'react-toastify';
 
const API_URL = 'http://localhost:5203/api/Products';
 
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
    const [isAdding, setIsAdding] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;
    const [existingCategories, setExistingCategories] = useState([]);
    const [existingSupplierIds, setExistingSupplierIds] = useState([]);
 
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
 
            // Extract existing categories and supplier IDs
            const categories = [...new Set(response.data.map(p => p.category))];
            setExistingCategories(categories);
            const supplierIds = [...new Set(response.data.map(p => p.supplierId))];
            setExistingSupplierIds(supplierIds);
 
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to fetch products');
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
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page when search term changes
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        // Validation for unit price
        if (parseFloat(formData.unitPrice) < 0) {
            toast.warn('Unit price cannot be negative.');
            return;
        }
 
        try {
            const token = localStorage.getItem('token');
            if (editingProduct) {
                const updatePayload = { ...formData };
                delete updatePayload.availableQuantity; // Remove availableQuantity for update
                await axios.put(`${API_URL}/${formData.productId}`, updatePayload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setToastMessage('Product updated successfully');
            } else {
                await axios.post(API_URL, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setToastMessage('Product added successfully');
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
            setIsAdding(false);
            fetchProducts();
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error('Error submitting product:', error);
            toast.error('Failed to submit product');
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
        setIsAdding(true); // Open the form in edit mode
    };
 
    const handleDelete = (productId) => {
        setDeleteConfirmationId(productId);
    };
 
    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/${deleteConfirmationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setToastMessage('Product deleted successfully');
            fetchProducts();
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            setDeleteConfirmationId(null);
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
        }
    };
 
    const cancelDelete = () => {
        setDeleteConfirmationId(null);
    };
 
    const handleAddButtonClick = () => {
        setIsAdding(true);
        setEditingProduct(null);
        setFormData({ // Reset formData to initial state
            productId: '',
            productName: '',
            description: '',
            category: '',
            availableQuantity: '',
            unitPrice: '',
            supplierId: '',
            image: ''
        });
        fetchProducts(); // To ensure the next product ID is up-to-date
    };
 
    const handleCancelAdd = () => {
        setIsAdding(false);
        setEditingProduct(null);
    };
 
    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
 
    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
 
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
 
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
 
        return (
            <nav>
                <ul className="pagination justify-content-center mt-3">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button onClick={() => paginate(currentPage - 1)} className="page-link">Previous</button>
                    </li>
                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                            <button onClick={() => paginate(number)} className="page-link">{number}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button onClick={() => paginate(currentPage + 1)} className="page-link">Next</button>
                    </li>
                </ul>
            </nav>
        );
    };
 
    return (
        <div className="container mt-4">
            <ToastContainer/>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <h2>All Products</h2>
                <button onClick={handleAddButtonClick} className="btn btn-primary">Add New Product</button>
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search by product name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
 
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Image</th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Supplier</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map(product => (
                        <tr key={product.productId}>
                            <td className="product-image-cell">
                                {product.image && <img src={product.image} alt={product.productName} className="product-image-table-small img-thumbnail" style={{ width: '70px', height: '70px' }} />}
                            </td>
                            <td>{product.productId}</td>
                            <td>{product.productName}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td>{product.availableQuantity}</td>
                            <td>₹{product.unitPrice}</td>
                            <td>{product.supplierId}</td>
                            <td>
                                <button onClick={() => handleEdit(product)} className="btn btn-sm btn-info me-2">Edit</button>
                                <button onClick={() => handleDelete(product.productId)} className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
 
 
            {filteredProducts.length > productsPerPage && renderPageNumbers()}
 
            {isAdding && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title">{editingProduct ? 'Edit Product' : 'Add New Product'}</h5>
                                <button type="button" className="btn-close" onClick={handleCancelAdd}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-4">
                                            <label htmlFor="productId" className="form-label">Product ID</label>
                                            <input type="text" className="form-control" id="productId" name="productId" value={formData.productId} onChange={handleChange} required readOnly />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="productName" className="form-label">Product Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="productName"
                                                name="productName"
                                                value={formData.productName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="category" className="form-label">Category</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="category"
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                required
                                                list="categoryOptions"
                                            />
                                            <datalist id="categoryOptions">
                                                {existingCategories.map(cat => (
                                                    <option key={cat} value={cat} />
                                                ))}
                                            </datalist>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required />
                                        </div>
                                        {!editingProduct && (
                                            <div className="col-md-3">
                                                <label htmlFor="availableQuantity" className="form-label">Available Quantity</label>
                                                <input type="number" className="form-control" id="availableQuantity" name="availableQuantity" value={formData.availableQuantity} onChange={handleChange} required />
                                            </div>
                                        )}
                                        <div className="col-md-3">
                                            <label htmlFor="unitPrice" className="form-label">Unit Price</label>
                                            <div className="input-group">
                                                <span className="input-group-text">₹</span>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="unitPrice"
                                                    name="unitPrice"
                                                    value={formData.unitPrice}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="supplierId" className="form-label">Supplier ID</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="supplierId"
                                                name="supplierId"
                                                value={formData.supplierId}
                                                onChange={handleChange}
                                                required
                                                list="supplierIdOptions"
                                            />
                                            <datalist id="supplierIdOptions">
                                                {existingSupplierIds.map(supId => (
                                                    <option key={supId} value={supId} />
                                                ))}
                                            </datalist>
                                        </div>
                                        <div className="col-md-8">
                                            <label htmlFor="image" className="form-label">Image URL</label>
                                            <input type="text" className="form-control" id="image" name="image" value={formData.image} onChange={handleImageChange} />
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <button type="submit" className="btn btn-primary">{editingProduct ? 'Update Product' : 'Add Product'}</button>
                                        {/* <button type="button" className="btn btn-secondary ms-2" onClick={handleCancelAdd}>Cancel</button> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
 
            {deleteConfirmationId && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-warning">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" onClick={cancelDelete}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete product ID: {deleteConfirmationId}?</p>
                            </div>
                            <div className="modal-footer">
                                <button onClick={cancelDelete} className="btn btn-secondary">Cancel</button>
                                <button onClick={confirmDelete} className="btn btn-danger">Yes, Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
 
            {showToast && (
                <div className="toast-container position-fixed bottom-0 end-0 p-3">
                    <div className="toast bg-success text-white fade show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-body">
                            {toastMessage}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
 
export default AddProductComponent;
 