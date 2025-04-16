import React, { useState, Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ForgotPasswordComponent from "./Components/RegisterComponent/ForgotPasswordComponent";
import HomepageAdmin from "./Components/HomepageComponent/HomepageAdmin";
import HomepageUser from "./Components/HomepageComponent/HomepageUser";

// --- Lazy-loaded components ---
const AddProductComponent = lazy(() =>
  import("./Components/ProductComponent/AddProductComponent")
);
const AddSupplierComponent = lazy(() =>
  import("./Components/SupplierComponent/AddSupplierComponent")
);
const LoginComponent = lazy(() =>
  import("./Components/LoginComponent/LoginComponent")
);
const LogoutComponent = lazy(() =>
  import("./Components/LoginComponent/LogoutComponent")
);
const PlaceOrderComponent = lazy(() =>
  import("./Components/OrderComponent/PlaceOrderComponent")
);
// const CommonNavbar = lazy(() => import("./Components/HomepageComponent/CommonNavbar")); // No longer needed as functionality is in HomePage
const RegisterComponent = lazy(() =>
  import("./Components/RegisterComponent/RegisterComponent")
);
const AdminNavbar = lazy(() =>
  import("./Components/HomepageComponent/AdminNavbar")
);
const UserNavbar = lazy(() =>
  import("./Components/HomepageComponent/UserNavbar")
);
const AccountComponent = lazy(() =>
  import("./Components/ProfileComponent/AccountComponent")
);
const HomePage = lazy(() => import("./Components/HomepageComponent/HomePage"));
const UpdateOrdersComponent = lazy(() =>
  import("./Components/OrderComponent/UpdateOrdersComponent")
);
const GetAllProductsComponent = lazy(() =>
  import("./Components/ProductComponent/GetAllProductsComponent")
);
const DeleteProductComponent = lazy(() =>
  import("./Components/ProductComponent/DeleteProductComponent")
);
const FilterProductsComponent = lazy(() =>
  import("./Components/ProductComponent/FilterProductsComponent")
);
const GetAllStockComponent = lazy(() =>
  import("./Components/StockComponent/GetAllStockComponent")
);
const AddStockComponent = lazy(() =>
  import("./Components/StockComponent/AddStockComponent")
);
const ReduceStockComponent = lazy(() =>
  import("./Components/StockComponent/ReduceStockComponent")
);
const DiscardStockComponent = lazy(() =>
  import("./Components/StockComponent/DiscardStockComponent")
);
const OutOfStockComponent = lazy(() =>
  import("./Components/StockComponent/OutofStockComponent")
); // Corrected typo
const AllSupplierComponent = lazy(() =>
  import("./Components/SupplierComponent/AllSupplierComponent")
);
const UpdateSupplierComponent = lazy(() =>
  import("./Components/SupplierComponent/UpdateSupplierComponent")
);
const DeleteSupplierComponent = lazy(() =>
  import("./Components/SupplierComponent/DeleteSupplierComponent")
);
const CancelOrderComponent = lazy(() =>
  import("./Components/OrderComponent/CancelOrderComponent")
);
const SalesReport = lazy(() =>
  import("./Components/ReportComponent/SalesReport")
);
const StockLevelReport = lazy(() =>
  import("./Components/ReportComponent/StockLevelReport")
);
const UserOrderReport = lazy(() =>
  import("./Components/ReportComponent/UserOrderReportt") // Check filename
);
const AllUserOrdersReport = lazy(() =>
  import("./Components/ReportComponent/AllUserOrdersReport")
);
const UserDashboard = lazy(() =>
  import("./Components/HomepageComponent/UserDashboard")
);
const AllOrdersComponent = lazy(() =>
  import("./Components/OrderComponent/AllOrdersComponent") // Make sure this is used
);

const SuspenseFallback = () => (
  <div style={{ padding: "20px", textAlign: "center", fontSize: "1.2em" }}>
    Loading, please wait...
  </div>
);

function App() {
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");
  const isLoggedIn = role === "Admin" || role === "User";

  const handleLogin = (userRole) => {
    console.log("handleLogin called with role:", userRole);
    if (userRole === "Admin" || userRole === "User") {
      setRole(userRole);
      localStorage.setItem("role", userRole);
    } else {
      console.error("Invalid role received during login:", userRole);
      handleLogout();
    }
  };

  const handleLogout = () => {
    console.log("handleLogout called");
    setRole("");
    localStorage.clear();
  };

  return (
    <Router>
      <div>
        {role === "Admin" && <Suspense fallback={<SuspenseFallback />}><AdminNavbar onLogout={handleLogout} /></Suspense>}
        {role === "User" && <Suspense fallback={<SuspenseFallback />}><UserNavbar onLogout={handleLogout} /></Suspense>}

        <Suspense fallback={<SuspenseFallback />}>
          <Routes>
            {/* ----- Public Routes / Initial Redirects ----- */}
            <Route path="/" element={<HomePage />} /> {/* HomePage now handles the unauthenticated navbar */}
            <Route
              path="/login"
              element={<LoginComponent onLogin={handleLogin} />}
            />
            <Route
              path="/register"
              element={<RegisterComponent />}
            />
            <Route path="/forgot-password" element={<ForgotPasswordComponent />} />
            <Route path="/adminnavbar" element={<AdminNavbar />} />
            <Route path="/usernavbar" element={<UserNavbar />} />
            <Route path="/homeadmin" element={<HomepageAdmin />} />
            <Route path="/homeuser" element={<HomepageUser />} />
            {/* //<Route path="/order/place" element={<PlaceOrderComponent />} /> */}
            {/* ----- Shared Logged-In Routes (Profile/Logout) ----- */}
            {isLoggedIn && (
              <>
                <Route path="/profile/account" element={<AccountComponent />} />
                <Route
                  path="/profile/logout"
                  element={<LogoutComponent onLogout={handleLogout} />}
                />
              </>
            )}
            {/* Redirect profile routes if not logged in */}
            {!isLoggedIn && (
              <Route
                path="/profile/*"
                element={<Navigate to="/login" replace />}
              />
            )}

            {/* ----- Admin Only Routes ----- */}
            {role === "Admin" ? (
              <>
                {/* If an Admin lands on '/', they get redirected to dashboard by the rule above */}
                {/* Products */}
                <Route path="/products/add" element={<AddProductComponent />} />
                <Route
                  path="/products/delete"
                  element={<DeleteProductComponent />}
                />
                <Route
                  path="/products/filter"
                  element={<FilterProductsComponent />}
                />
                <Route
                  path="/products/list"
                  element={<GetAllProductsComponent />}
                />
                {/* Stocks */}
                <Route path="/stocks/all" element={<GetAllStockComponent />} />
                <Route path="/stocks/add" element={<AddStockComponent />} />
                <Route
                  path="/stocks/reduce"
                  element={<ReduceStockComponent />}
                />
                <Route
                  path="/stocks/discard"
                  element={<DiscardStockComponent />}
                />
                <Route
                  path="/stocks/out-of-stock"
                  element={<OutOfStockComponent />}
                />
                {/* Supplier */}
                <Route
                  path="/supplier/add"
                  element={<AddSupplierComponent />}
                />
                <Route
                  path="/supplier/details"
                  element={<AllSupplierComponent />}
                />
                <Route
                  path="/supplier/update"
                  element={<UpdateSupplierComponent />}
                />
                <Route
                  path="/supplier/delete"
                  element={<DeleteSupplierComponent />}
                />
                {/* Orders */}
                <Route
                  path="/orders/update"
                  element={<UpdateOrdersComponent />}
                />
                {/* Reports */}
                <Route path="/report/sales-report" element={<SalesReport />} />
                <Route
                  path="/report/stock-level"
                  element={<StockLevelReport />}
                />
                <Route
                  path="/report/user-order"
                  element={<AllUserOrdersReport />}
                />
                <Route
                  path="/report/user-order-details"
                  element={<UserOrderReport />}
                />{" "}
                {/* Check spelling UserOrderReportt */}
                {/* Admin might also need a dashboard */}
                <Route path="/homeuser" element={<HomepageUser />} />{" "}
                {/* Assuming Admin uses same dashboard for now */}
                {/* Add other Admin-specific routes here */}
              </>
            ) : (
              <>
                {/* If not Admin, redirect any attempt to access Admin routes */}
                <Route
                  path="/products/*"
                  element={
                    <Navigate
                      to={isLoggedIn ? "/homeuser" : "/login"}
                      replace
                    />
                  }
                />
                <Route
                  path="/stocks/*"
                  element={
                    <Navigate
                      to={isLoggedIn ? "/homeuser" : "/login"}
                      replace
                    />
                  }
                />
                <Route
                  path="/supplier/*"
                  element={
                    <Navigate
                      to={isLoggedIn ? "/homeuser" : "/login"}
                      replace
                    />
                  }
                />
                <Route
                  path="/orders/update"
                  element={
                    <Navigate
                      to={isLoggedIn ? "/homeuser" : "/login"}
                      replace
                    />
                  }
                />
                <Route
                  path="/report/*"
                  element={
                    <Navigate
                      to={isLoggedIn ? "/homeuser" : "/login"}
                      replace
                    />
                  }
                />
              </>
            )}

            {/* ----- User Only Routes ----- */}
            {role === "User" ? (
              <>
                {/* If a User lands on '/', they get redirected to dashboard by the rule above */}
                <Route path="/homeuser" element={<HomepageUser />} />
                {/* Orders */}
                <Route path="/order/place/" element={<PlaceOrderComponent />} />
                <Route
                  path="/order/cancel"
                  element={<CancelOrderComponent />}
                />
                {/* Products (View/Filter only) */}
                <Route
                  path="/product/list"
                  element={<GetAllProductsComponent />}
                />
                <Route
                  path="/product/supplier"
                  element={<FilterProductsComponent />}
                />
                <Route
                  path="/report/user-order-details"
                  element={<UserOrderReport/>}
                />
              
                
                {/* Add other User-specific routes here */}
              </>
            ) : (
              <>
                {/* If not User, redirect any attempt to access User-specific order routes */}
                {/* Note: /userdashboard is handled above. Redirect other specific User routes if needed. */}
                <Route
                  path="/order/place"
                  element={
                    <Navigate
                      to={role === "Admin" ? "/userdashboard" : "/login"}
                      replace
                    />
                  }
                />
                <Route
                  path="/order/cancel"
                  element={
                    <Navigate
                      to={role === "Admin" ? "/userdashboard" : "/login"}
                      replace
                    />
                  }
                />
                {/* Routes like /product/list might be intentionally accessible by Admin too (handled in Admin block) */}
              </>
            )}

            {/* ----- Catch-all Route ----- */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;