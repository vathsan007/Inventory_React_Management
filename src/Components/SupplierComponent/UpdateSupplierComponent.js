import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UpdateSupplierComponent.css';

function UpdateSupplierComponent() {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formData, setFormData] = useState({
    supplierName: '',
    phone: '',
    email: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const suppliersPerPage = 5;

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:5203/api/Supplier');
      setSuppliers(response.data);
    } catch (error) {
      alert('Failed to fetch suppliers');
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleEdit = (supplier) => {
    console.log('Editing supplier (from handleEdit):', supplier);
    setEditingSupplier(supplier);
    setFormData({
      supplierName: supplier.supplierName,
      phone: supplier.phone,
      email: supplier.email
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSupplier(null);
    setFormData({ supplierName: '', phone: '', email: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (!editingSupplier) return;
    console.log('Updating supplier (before update):', editingSupplier);
    console.log('Form data (before update):', formData);

    axios.put(`http://localhost:5203/api/Supplier/${editingSupplier.supplierId}`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        alert('Supplier updated successfully');
        fetchSuppliers(); // Reload suppliers
        handleCloseModal();
      })
      .catch((err) => {
        console.error('Error updating supplier:', err);
        alert('Failed to update supplier');
      });
  };

  const indexOfLastSupplier = currentPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = suppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);
  const totalPages = Math.ceil(suppliers.length / suppliersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

  return (
    <div className='upd'>
    <div className="update-supplier-container">
      <h2>Update Supplier</h2>

      <table className="supplier-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentSuppliers.map(supplier => (
            <tr key={supplier.supplierId}>
              <td>{supplier.supplierId}</td>
              <td>{supplier.supplierName}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.email}</td>
              <td>
                <button onClick={() => handleEdit(supplier)} className="edit-button">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Supplier - ID: {editingSupplier?.supplierId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Supplier Name</Form.Label>
              <Form.Control
                type="text"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleChange}
                placeholder="Enter supplier name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update Supplier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
}

export default UpdateSupplierComponent;