import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AddProductComponent from './Components/ProductComponent/AddProductComponent';
import AddSupplierComponent from './Components/SupplierComponent/AddSupplierComponent';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import LogoutComponent from './Components/LoginComponent/LogoutComponent';
import PlaceOrderComponent from './Components/OrderComponent/PlaceOrderComponent';
import CommonNavbar from './Components/HomepageComponent/CommonNavbar';
import RegisterComponent from './Components/RegisterComponent/RegisterComponent';
import AdminNavbar from './Components/HomepageComponent/AdminNavbar';
import UserNavbar from './Components/HomepageComponent/UserNavbar';
import GetAllProductsComponent from './Components/ProductComponent/GetAllProductsComponent';
import UpdateOrdersComponent from './Components/OrderComponent/UpdateOrdersComponent';
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
import HomePage from './Components/HomepageComponent/HomePage';
import AllUserOrdersReport from './Components/ReportComponent/AllUserOrdersReport';
import SalesReport from './Components/ReportComponent/SalesReport';
import StockLevelReport from './Components/ReportComponent/StockLevelReport';
import UserOrderReport from './Components/ReportComponent/UserOrderReportt';
 
function App() {
  const [role, setRole] = useState(localStorage.getItem('role') || '');
 
  const handleLogin = (userRole) => {
    setRole(userRole);
  };
 
  const handleLogout = () => {
    setRole('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  };
 
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);
 
  return (
    <Router>
      <div>
        {role === 'Admin' ? <AdminNavbar onLogout={handleLogout} /> : role === 'User' ? <UserNavbar onLogout={handleLogout} /> : <CommonNavbar />}
        <Routes>
          <Route path="/" element={<HomePage/>} />
           <Route path="/profile/logout" element={<LogoutComponent onLogin={handleLogin} />} /> 
          <Route path="/login" element={<LoginComponent onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/adminnavbar" element={<AdminNavbar />} />
          <Route path="/usernavbar" element={<UserNavbar />} />
          <Route path="/products/add" element={<AddProductComponent />} />
          <Route path="/supplier/add" element={<AddSupplierComponent />} />
          <Route path="/order/place" element={<PlaceOrderComponent />} />
          <Route path="/products/list" element={<GetAllProductsComponent />} />
          <Route path="/products/update" element={<UpdateOrdersComponent />}/>
          <Route path="/products/delete" element={<DeleteProductComponent />}/>
          <Route path="/products/filter" element={<FilterProductsComponent />}/>
          <Route path="/orders/update" element={<UpdateOrdersComponent />}/>
          <Route path="/stocks/all" element={<GetAllStockComponent />}/>
          <Route path="/stocks/add" element={<AddStockComponent />}/>
          <Route path="/stocks/reduce" element={<ReduceStockComponent />}/>
          <Route path="/stocks/discard" element={<DiscardStockComponent />}/>
          <Route path="/stocks/out-of-stock" element={<OutOfStockComponent />}/>
          <Route path="/supplier/details" element={<AllSupplierComponent />}/>
          <Route path="/supplier/add" element={<AddSupplierComponent/>}/>
          <Route path="/supplier/update" element={<UpdateSupplierComponent/>}/>
          <Route path="/supplier/delete" element={<DeleteSupplierComponent/>}/>
          {/* <Route path="/profile/account" element={</>}/> */}
          <Route path="/order/history" element={<AllUserOrdersReport/>}/>
          <Route path="/order/cancel" element={<CancelOrderComponent/>}/>
          <Route path="/product/supplier" element={<AllSupplierComponent/>}/>
          <Route path="/product/category" element={<FilterProductsComponent/>}/>

          {/* Report module */}
          <Route path ='/reports/sales-report' element={<SalesReport/>}/>
          <Route path='/reports/stock-level' element={<StockLevelReport/>}/>
          <Route path='/reports/user-order' element={<UserOrderReport/>}/>
{/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
      
  );
}
 
export default App;