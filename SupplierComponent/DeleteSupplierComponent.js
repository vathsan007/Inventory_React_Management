import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeleteSupplierComponent() {
  const [suppliers, setSuppliers] = useState([]);

  const fetchSuppliers = () => {
    axios.get('http://localhost:5203/api/Supplier')
      .then(res => setSuppliers(res.data))
      .catch(() => toast.error('Failed to fetch suppliers'));
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5203/api/Supplier/${id}`)
      .then(() => {
        toast.success('Supplier deleted successfully!');
        fetchSuppliers(); // refresh list
      })
      .catch(() => toast.error('Failed to delete supplier'));
  };

  return (
    <div style={{ padding: '20px' }}>
      <ToastContainer />
      <h2>All Suppliers</h2>
      {suppliers.length === 0 ? (
        <p>No suppliers found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          {suppliers.map(supplier => (
            <div key={supplier.supplierId} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              width: '300px'
            }}>
              <h4>{supplier.supplierName}</h4>
              <p><strong>Phone:</strong> {supplier.phone}</p>
              <p><strong>Email:</strong> {supplier.email}</p>
              <button
                onClick={() => handleDelete(supplier.supplierId)}
                style={{
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeleteSupplierComponent;
