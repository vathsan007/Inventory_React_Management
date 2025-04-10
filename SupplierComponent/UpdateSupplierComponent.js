import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UpdateSupplierComponent() {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [formData, setFormData] = useState({
    supplierName: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5203/api/Supplier')
      .then(res => setSuppliers(res.data))
      .catch(() => alert('Failed to fetch suppliers'));
  }, []);

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setFormData({
      supplierName: supplier.supplierName,
      phone: supplier.phone,
      email: supplier.email
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (!selectedSupplier) return;

    axios.put(`http://localhost:5203/api/Supplier/${selectedSupplier.supplierId}`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        alert('Supplier updated successfully');
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to update supplier');
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Update Supplier</h2>
      {suppliers.map(supplier => (
        <div
          key={supplier.supplierId}
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            marginBottom: '10px',
            borderRadius: '8px'
          }}
        >
          <h4>{supplier.supplierName}</h4>
          <p><strong>Supplier ID:</strong> {supplier.supplierId}</p>
          <p><strong>Phone:</strong> {supplier.phone}</p>
          <p><strong>Email:</strong> {supplier.email}</p>
          <button onClick={() => handleEdit(supplier)}>Edit</button>
        </div>
      ))}

      {selectedSupplier && (
        <div style={{ marginTop: '30px', border: '1px solid #888', padding: '20px', borderRadius: '8px' }}>
          <h3>Edit Supplier - ID: {selectedSupplier.supplierId}</h3>
          <input
            type="text"
            name="supplierName"
            placeholder="Supplier Name"
            value={formData.supplierName}
            onChange={handleChange}
            style={{ display: 'block', marginBottom: '10px' }}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ display: 'block', marginBottom: '10px' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{ display: 'block', marginBottom: '10px' }}
          />
          <button onClick={handleUpdate}>Update Supplier</button>
        </div>
      )}
    </div>
  );
}

export default UpdateSupplierComponent;