import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserOrderReport.css';
const StockLevelReport = () => {
 const [stockData, setStockData] = useState([]);
 const [filteredData, setFilteredData] = useState([]);
 const [supplierFilter, setSupplierFilter] = useState('');
 const [productFilter, setProductFilter] = useState('');
 const [quantityFilter, setQuantityFilter] = useState('');
 useEffect(() => {
   const fetchStockReport = async () => {
     const token = localStorage.getItem('token');
     try {
       const response = await axios.get('http://localhost:5203/api/Report/stock-level', {
         headers: {
           Authorization: `Bearer ${token}`
         }
       });
       setStockData(response.data);
       setFilteredData(response.data);
     } catch (error) {
       console.error('Error fetching stock level report:', error);
     }
   };
   fetchStockReport();
 }, []);
 useEffect(() => {
   const filtered = stockData.filter(item => {
     const matchSupplier = item.supplierName?.toLowerCase().includes(supplierFilter.toLowerCase());
     const matchProduct = item.productName?.toLowerCase().includes(productFilter.toLowerCase());
     const matchQuantity = quantityFilter ? item.availableQuantity >= parseInt(quantityFilter) : true;
     return matchSupplier && matchProduct && matchQuantity;
   });
   setFilteredData(filtered);
 }, [supplierFilter, productFilter, quantityFilter, stockData]);
 return (
<div className="user-order-report">
<div className="report-header">
<h2>Stock Level Report</h2>
<div className="filters">
<input
           type="text"
           placeholder="Filter by supplier"
           value={supplierFilter}
           onChange={(e) => setSupplierFilter(e.target.value)}
         />
<input
           type="text"
           placeholder="Filter by product"
           value={productFilter}
           onChange={(e) => setProductFilter(e.target.value)}
         />
<input
           type="number"
           placeholder="Minimum quantity"
           value={quantityFilter}
           onChange={(e) => setQuantityFilter(e.target.value)}
         />
</div>
</div>
<div className="report-cards">
       {filteredData.map((item, index) => (
<div key={index} className="report-card">
<h3>{item.productName}</h3>
<p><strong>Product ID:</strong> {item.productId}</p>
<p><strong>Available Quantity:</strong> {item.availableQuantity}</p>
<p><strong>Supplier Name:</strong> {item.supplierName}</p>
</div>
       ))}
</div>
</div>
 );
};
export default StockLevelReport;