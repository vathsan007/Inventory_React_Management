import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
 
function SalesReport() {
  const [reportData, setReportData] = useState([]);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const startDate = queryParams.get('startDate');
  const endDate = queryParams.get('endDate');
 
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get('http://localhost:5203/api/Report/sales', {
          params: {
            startDate: startDate,
            endDate: endDate
          }
        });
        setReportData(response.data);
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };
 
    fetchReport();
  }, [startDate, endDate]);
 
  return (
    <div className="container mt-4">
      <h3>Sales Report ({startDate} to {endDate})</h3>
      {reportData.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
                <th>Product Id</th>
              <th>Product Name</th>
              <th>Quantity Sold</th>
              <th>Total Sales Amount</th>
              {/* Add more columns if needed */}
            </tr>
          </thead>
          <tbody>
            {reportData.map((item, index) => (
              <tr key={index}>
                <td>{item.productId}</td>
                <td>{item.productName}</td>
                <td>{item.quantitySold}</td>
                <td>{item.totalSalesAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
 
export default SalesReport;
 