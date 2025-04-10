

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddSupplierComponent() {
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState({
    supplierName: '',
    phone: '',
    email: ''
  });

  // Load all suppliers on mount
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    axios.get('http://localhost:5203/api/Supplier')
      .then(res => setSuppliers(res.data))
      .catch(() => toast.error('Failed to fetch suppliers.'));
  };

  const handleChange = e => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5203/api/Supplier', supplier)
      .then(() => {
        toast.success('Supplier added successfully!');
        setSupplier({ supplierName: '', phone: '', email: '' });
        fetchSuppliers();
      })
      .catch(err => {
        if (err.response && err.response.status === 409) {
          toast.error('Supplier with same name or email already exists!');
        } else {
          toast.error('Failed to add supplier.');
        }
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <ToastContainer />
      <h2>Add New Supplier</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" name="supplierName" placeholder="Supplier Name" value={supplier.supplierName} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={supplier.phone} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={supplier.email} onChange={handleChange} required />
        <button type="submit">Add Supplier</button>
      </form>

      <h3>All Suppliers</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {suppliers.map(sup => (
          <div key={sup.supplierId} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '15px',
            width: '250px'
          }}>
            <h4>{sup.supplierName}</h4>
            <p><strong>ID:</strong> {sup.supplierId}</p>
            <p><strong>Phone:</strong> {sup.phone}</p>
            <p><strong>Email:</strong> {sup.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddSupplierComponent;