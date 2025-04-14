import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddSupplierComponent.css'; // Import the CSS file

function AddSupplierComponent() {
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState({
    supplierId: 0,
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
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5203/api/Supplier', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      toast.error('Failed to fetch suppliers');
    }
  };

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5203/api/Supplier', supplier, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success('Supplier added successfully!');
      setSupplier({ supplierId: 0, supplierName: '', phone: '', email: '' });
      fetchSuppliers();
    } catch (err) {
      console.error('Error adding supplier:', err);
      if (err.response && err.response.status === 409) {
        toast.error('Supplier with same name or email already exists!');
      } else {
        toast.error('Failed to add supplier.');
      }
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination logic
  const indexOfLastSupplier = currentPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = suppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);

  const totalPages = Math.ceil(suppliers.length / suppliersPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='addsup'>

    
    <div className="container">
      <ToastContainer />
      <h2 className="formTitle">Add New Supplier</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="supplierId" placeholder="Supplier Id" value={supplier.supplierId} onChange={handleChange} required />
        <input type="text" name="supplierName" placeholder="Supplier Name" value={supplier.supplierName} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={supplier.phone} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={supplier.email} onChange={handleChange} required />
        <button type="submit">Add Supplier</button>
      </form>

      <h3 className="suppliersTitle"> Suppliers</h3>
      <table className="suppliersTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentSuppliers.map(sup => (
            <tr key={sup.supplierId}>
              <td>{sup.supplierId}</td>
              <td>{sup.supplierName}</td>
              <td>{sup.phone}</td>
              <td>{sup.email}</td>
            </tr>
          ))}
          {currentSuppliers.length === 0 && (
            <tr>
              <td colSpan="4" className="noSuppliers">No suppliers found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {suppliers.length > suppliersPerPage && (
        <div className="pagination">
          <ul>
            {pageNumbers.map(number => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={currentPage === number ? 'active' : ''}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
}

export default AddSupplierComponent;