import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./UpdateSupplierComponent.css"; // Import the CSS file
import { Table, Button, Modal, Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";
 
const API_URL = "http://localhost:5203/api/Supplier";
 
const UpdateSupplierComponent = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [editFormData, setEditFormData] = useState({
        supplierId: "",
        supplierName: "",
        phone: "",
        email: "",
    });
 
    const fetchSuppliers = useCallback(async () => {
        setError('');
        try {
            const response = await axios.get(API_URL);
            if (response.status === 200) {
                setSuppliers(response.data);
            } else {
                setError(`Failed to load suppliers. Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching suppliers:", error);
            setError(`Failed to load suppliers: ${error.message}`);
        }
    }, []);
 
    useEffect(() => {
        fetchSuppliers();
    }, [fetchSuppliers]);
 
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
 
    const handleEditClick = (supplier) => {
        setSelectedSupplier(supplier);
        setEditFormData({ ...supplier });
        setShowEditModal(true);
    };
 
    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedSupplier(null);
        setEditFormData({
            supplierId: "",
            supplierName: "",
            phone: "",
            email: "",
        });
    };
 
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };
 
    const handleUpdateSupplier = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.put(`${API_URL}/${editFormData.supplierId}`, editFormData);
            if (response.status === 200) {
                alert("Supplier updated successfully!");
                handleCloseEditModal();
                fetchSuppliers(); // Refresh the supplier list
            } else {
                setError(`Failed to update supplier. Status: ${response.status}`);
            }
        } catch (error) {
            setError(`Failed to update supplier: ${error.message}`);
        }
    };
 
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = suppliers.slice(indexOfFirstItem, indexOfLastItem);
 
    const pageCount = Math.ceil(suppliers.length / itemsPerPage);
 
    return (
        <div className="Splt">
        <div className="supplier-list-container">
            <h2>Supplier List</h2>
            {error && <p className="error-message">{error}</p>}
 
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((supplier) => (
                        <tr key={supplier.supplierId}>
                            <td>{supplier.supplierId}</td>
                            <td>{supplier.supplierName}</td>
                            <td>{supplier.phone}</td>
                            <td>{supplier.email}</td>
                            <td>
                                <Button variant="primary" size="sm" onClick={() => handleEditClick(supplier)}>
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
 
            {suppliers.length > itemsPerPage && (
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
 
            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Supplier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <p className="text-danger">{error}</p>}
                    <Form onSubmit={handleUpdateSupplier}>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Supplier Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="supplierName"
                                value={editFormData.supplierName || ""}
                                onChange={handleEditInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={editFormData.phone || ""}
                                onChange={handleEditInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={editFormData.email || ""}
                                onChange={handleEditInputChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update Supplier
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </div>
    );
};
 
export default UpdateSupplierComponent;