

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AddProductComponent from './Components/ProductComponent/AddProductComponent';
import AddSupplierComponent from './Components/SupplierComponent/AddSupplierComponent';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import LogoutComponent from './Components/LoginComponent/LogoutComponent';
import PlaceOrderComponent from './Components/OrderComponent/PlaceOrderComponent';
import CommonNavbar from './Components/HomepageComponent/CommonNavbar';
import RegisterComponent from './Components/RegisterComponent/RegisterComponent';
import AdminNavbar from './Components/HomepageComponent/AdminNavbar';
import UserNavbar from './Components/HomepageComponent/UserNavbar';
import AccountComponent from './Components/ProfileComponent/AccountComponent';
import HomePage from './Components/HomepageComponent/HomePage';
import UpdateOrdersComponent from './Components/OrderComponent/UpdateOrdersComponent';
import GetAllProductsComponent from './Components/ProductComponent/GetAllProductsComponent';
import DeleteProductComponent from './Components/ProductComponent/DeleteProductComponent';
import FilterProductsComponent from './Components/ProductComponent/FilterProductsComponent';
import GetAllStockComponent from './Components/StockComponent/GetAllStockComponent';
import AddStockComponent from './Components/StockComponent/AddStockComponent';
import ReduceStockComponent from './Components/StockComponent/ReduceStockComponent';
import DiscardStockComponent from './Components/StockComponent/DiscardStockComponent';
import OutOfStockComponent from './Components/StockComponent/OutofStockComponent';
import AllSupplierComponent from './Components/SupplierComponent/AllSupplierComponent';
import UpdateSupplierComponent from './Components/SupplierComponent/UpdateSupplierComponent';
import DeleteSupplierComponent from './Components/SupplierComponent/DeleteSupplierComponent';
import CancelOrderComponent from './Components/OrderComponent/CancelOrderComponent';
import SalesReport from './Components/ReportComponent/SalesReport';
import StockLevelReport from './Components/ReportComponent/StockLevelReport';
import UserOrderReport from './Components/ReportComponent/UserOrderReportt';
import AllUserOrdersReport from './Components/ReportComponent/AllUserOrdersReport';
import UserDashboard from './Components/HomepageComponent/UserDashboard';
import AllOrdersComponent from './Components/OrderComponent/AllOrdersComponent';


function App() {
  // const [role, setRole] = useState(localStorage.getItem('role') || '');

  // const handleLogin = (userRole) => {
  //   setRole(userRole);
  //   localStorage.setItem('role', userRole);
  // };

  // const handleLogout = () => {
  //   setRole('');
  //   localStorage.clear();
  // };

  // const isLoggedIn = role === 'Admin' || role === 'User';

  return (
    // <Router>
    //   <div>
    //     {role === 'Admin' && <AdminNavbar onLogout={handleLogout} />}
    //     {role === 'User' && <UserNavbar onLogout={handleLogout} />}
    //     {!role && <CommonNavbar />}

    //     <Routes>
    //       {/* Public */}
    //       {!isLoggedIn && <Route path="/" element={<HomePage />} />}
    //       {isLoggedIn && <Route path="/" element={<Navigate to="/userdashboard" />} />}
    //       <Route path="/login" element={<LoginComponent onLogin={handleLogin} />} />
    //       <Route path="/register" element={<RegisterComponent />} />

    //       {/* Profile */}
    //       <Route path="/profile/account" element={<AccountComponent />} />
    //       <Route path="/profile/logout" element={<LogoutComponent onLogout={handleLogout} />} />

    //       {/* Admin Only */}
    //       {role === 'Admin' ? (
    //         <>
    //           <Route path="/products/add" element={<AddProductComponent />} />
    //           <Route path="/products/delete" element={<DeleteProductComponent />} />
    //           <Route path="/products/filter" element={<FilterProductsComponent />} />
    //           <Route path="/products/list" element={<GetAllProductsComponent />} />
    //           <Route path="/stocks/all" element={<GetAllStockComponent />} />
    //           <Route path="/stocks/add" element={<AddStockComponent />} />
    //           <Route path="/stocks/reduce" element={<ReduceStockComponent />} />
    //           <Route path="/stocks/discard" element={<DiscardStockComponent />} />
    //           <Route path="/stocks/out-of-stock" element={<OutOfStockComponent />} />
    //           <Route path="/supplier/add" element={<AddSupplierComponent />} />
    //           <Route path="/supplier/details" element={<AllSupplierComponent />} />
    //           <Route path="/supplier/update" element={<UpdateSupplierComponent />} />
    //           <Route path="/supplier/delete" element={<DeleteSupplierComponent />} />
    //           <Route path="/orders/update" element={<UpdateOrdersComponent />} />
    //           <Route path="/report/sales-report" element={<SalesReport />} />
    //           <Route path="/report/stock-level" element={<StockLevelReport />} />
    //           <Route path="/report/user-order" element={<AllUserOrdersReport />} />
    //           <Route path="/report/user-order-details" element={<UserOrderReport/>}/>
    //         </>
    //       ) : (
    //         <>
    //           <Route path="/products/*" element={<Navigate to="/" />} />
    //           <Route path="/stocks/*" element={<Navigate to="/" />} />
    //           <Route path="/supplier/*" element={<Navigate to="/" />} />
    //           <Route path="/orders/update" element={<Navigate to="/" />} />
    //           <Route path="/report/sales-report" element={<Navigate to="/" />} />
    //           <Route path="/report/stock-level" element={<Navigate to="/" />} />
    //           <Route path="/report/user-order" element={<Navigate to="/" />} />
    //         </>
    //       )}

    //       {/* User Only */}
    //       {role === 'User' ? (
    //         <>
    //           <Route path="/userdashboard" element={<UserDashboard />} />
              
    //           <Route path="/order/place" element={<PlaceOrderComponent />} />
    //           <Route path="/order/cancel" element={<CancelOrderComponent />} />
    //           <Route path="/product/list" element={<GetAllProductsComponent />} />
    //           <Route path="/product/supplier" element={<FilterProductsComponent />} />
              

    //         </>
    //       ) : (
    //         <>
    //           <Route path="/order/place" element={<Navigate to="/" />} />
    //           <Route path="/order/cancel" element={<Navigate to="/" />} />
    //           {/* <Route path="/reports/user-order-details" element={<Navigate to="/" />} /> */}
    //         </>
    //       )}

    //       {/* Catch-all */}
    //       <Route path="*" element={<Navigate to="/login" />} />
    //     </Routes>
    //   </div>
    // </Router>
    <AllOrdersComponent/>
   
  );
}

export default App;
