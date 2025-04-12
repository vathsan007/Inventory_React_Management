import React, { useEffect, useState } from 'react';

import axios from 'axios';

import './UserOrderReport.css';

import { CSVLink } from 'react-csv';

const AllUserOrdersReport = () => {

  const [orderReports, setOrderReports] = useState([]);

  const [filteredReports, setFilteredReports] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  const reportsPerPage = 6;

  useEffect(() => {

    const fetchAllReports = async () => {

      const token = localStorage.getItem('token');

      try {

        const response = await axios.get('http://localhost:5203/api/Report/user-order', {

          headers: {

            Authorization: `Bearer ${token}`

          }

        });

        setOrderReports(response.data);

        setFilteredReports(response.data);

      } catch (error) {

        console.error('Error fetching order reports:', error);

      }

    };

    fetchAllReports();

  }, []);

  useEffect(() => {

    const filtered = orderReports.filter(report =>

      report.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||

      report.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||

      report.productName?.toLowerCase().includes(searchTerm.toLowerCase())

    );

    setFilteredReports(filtered);

    setCurrentPage(1);

  }, [searchTerm, orderReports]);

  // Pagination

  const indexOfLast = currentPage * reportsPerPage;

  const indexOfFirst = indexOfLast - reportsPerPage;

  const currentReports = filteredReports.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
<div className="user-order-report">
<div className="report-header">
<h2>All User Order Reports</h2>
<input

          type="text"

          placeholder="Search by name, email, or product"

          value={searchTerm}

          onChange={(e) => setSearchTerm(e.target.value)}

        />
<CSVLink

          data={filteredReports}

          filename="user_orders.csv"

          className="export-btn"
>

          Export CSV
</CSVLink>
</div>
<div className="report-cards">

        {currentReports.map((report, index) => (
<div key={index} className="report-card">
<h3>{report.userName}</h3>
<p><strong>User ID:</strong> {report.userId}</p>
<p><strong>Email:</strong> {report.email}</p>
<p><strong>Order ID:</strong> {report.orderId}</p>
<p><strong>Product ID:</strong> {report.productId}</p>
<p><strong>Product Name:</strong> {report.productName}</p>
<p><strong>Total Ordered Quantity:</strong> {report.totalOrderedQuantity}</p>
</div>

        ))}
</div>

      {/* Pagination */}
<div className="pagination">

        {Array.from({ length: totalPages }, (_, i) => (
<button

            key={i + 1}

            className={currentPage === i + 1 ? 'active' : ''}

            onClick={() => handlePageChange(i + 1)}
>

            {i + 1}
</button>

        ))}
</div>
</div>

  );

};

export default AllUserOrdersReport; 