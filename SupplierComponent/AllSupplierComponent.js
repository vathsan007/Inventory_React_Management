import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllSupplierComponent() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5203/api/Supplier')
      .then(res => setSuppliers(res.data))
      .catch(() => alert('Failed to fetch suppliers'));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Suppliers</h2>
      {suppliers.length === 0 ? (
        <p>No suppliers found.</p>
      ) : (
        <div style={{ display: 'flex', overflowX: 'auto', gap: '15px' }}>
          {suppliers.map(s => (
            <div key={s.supplierId} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', minWidth: '250px' }}>
              <h4>Supplier ID: {s.supplierId}</h4>
              <p><strong>Name:</strong> {s.supplierName}</p>
              <p><strong>Phone:</strong> {s.phone}</p>
              <p><strong>Email:</strong> {s.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllSupplierComponent;
