

import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SalesReport.css';

const SalesReportComponent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState('');

  const fetchSalesReport = async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5203/api/Report/sales', {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      });
      setSalesData(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch report.');
    }
  };

  const formatDate = (str) => {
    const d = new Date(str);
    return d.toLocaleDateString('en-US');
  };

  return (
    <div className="report-container">
      <h2>Sales Report</h2>
      <div className="date-picker-group">
        <div>
          <label>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm:ss"
            className="datepicker"
          />
        </div>
        <div>
          <label>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm:ss"
            className="datepicker"
          />
        </div>
        <button className="generate-btn" onClick={fetchSalesReport}>Generate</button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      {salesData.length > 0 && (
        <table className="report-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Qty Sold</th>
              <th>Total Sales</th>
              <th>Sales Date</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((item, index) => (
              <tr key={index}>
                <td>{item.productId}</td>
                <td>{item.productName}</td>
                <td>{item.quantitySold}</td>
                <td>₹{item.totalSalesAmount}</td>
                <td>{formatDate(item.salesDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesReportComponent;
