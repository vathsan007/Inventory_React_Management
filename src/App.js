import React, { useState, Suspense, lazy, useEffect } from "react"; // Added useEffect for potential use later if needed
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation, // Hook to detect route changes
} from "react-router-dom";

// --- Lazy-loaded components ---
// (Keep all your lazy import statements here as they were)
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
const CommonNavbar = lazy(() =>
  import("./Components/HomepageComponent/CommonNavbar")
);
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
); // Corrected typo: OutofStockComponent -> OutOfStockComponent
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
  import("./Components/ReportComponent/UserOrderReportt")
); // Check filename: UserOrderReportt or UserOrderReport?
const AllUserOrdersReport = lazy(() =>
  import("./Components/ReportComponent/AllUserOrdersReport")
);
const UserDashboard = lazy(() =>
  import("./Components/HomepageComponent/UserDashboard")
);
const AllOrdersComponent = lazy(() =>
  import("./Components/OrderComponent/AllOrdersComponent")
); // Make sure this is used or remove

// --- Helper component for Suspense Fallback ---
const SuspenseFallback = () => (
  <div style={{ padding: "20px", textAlign: "center", fontSize: "1.2em" }}>
    Loading, please wait...
  </div>
);

// --- Main App Component ---
function App() {
  // Initialize role state from localStorage
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");

  // Derived state for easier checking
  const isLoggedIn = role === "Admin" || role === "User";

  // --- Login Handler ---
  // This function is passed to LoginComponent.
  // LoginComponent MUST call this function with the correct role upon successful login.
  const handleLogin = (userRole) => {
    console.log("handleLogin called with role:", userRole); // Debug log
    if (userRole === "Admin" || userRole === "User") {
      setRole(userRole);
      localStorage.setItem("role", userRole);
      // NOTE: Navigation is handled declaratively by the <Navigate> components
      // within the <Routes> based on the updated 'role' state.
      // Avoid programmatic navigation (useNavigate) here unless absolutely necessary
      // and ensure it doesn't conflict with the Routes setup.
    } else {
      console.error("Invalid role received during login:", userRole);
      // Handle potential error, maybe logout just in case
      handleLogout();
    }
  };

  // --- Logout Handler ---
  const handleLogout = () => {
    console.log("handleLogout called"); // Debug log
    setRole("");
    localStorage.clear(); // Clear all localStorage (or just removeItem('role'))
    // Navigation back to public area (e.g., '/') will happen automatically
    // because 'role' state changes, triggering re-render and route recalculation.
    // Consider explicitly navigating to '/' or '/login' if needed: navigate('/login');
  };

  // --- Component Structure ---
  return (
    <Router>
      <div>
        {/* ----- Navbar Selection ----- */}
        {/* Conditionally render the correct Navbar based on role */}
        {/* CSS Fix Reminder: If CommonNavbar CSS is broken, check CSS import inside */}
        {/* CommonNavbar.js and use browser dev tools to check for conflicts/errors. */}
        {role === "Admin" && <AdminNavbar onLogout={handleLogout} />}
        {role === "User" && <UserNavbar onLogout={handleLogout} />}
        {!role && <CommonNavbar />}

        {/* ----- Main Content Area with Suspense ----- */}
        <Suspense fallback={<SuspenseFallback />}>
          <Routes>
            {/* ----- Public Routes / Initial Redirects ----- */}
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/userdashboard" replace />
                ) : (
                  <HomePage />
                )
              }
            />
            <Route
              path="/login"
              element={
                // If already logged in, redirect from login page to dashboard
                isLoggedIn ?  (
                  <Navigate to="/userdashboard" replace />
                ) : (
                  <LoginComponent onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/register"
              element={
                // If already logged in, redirect from register page to dashboard
                isLoggedIn ? (
                  <Navigate to="/userdashboard" replace />
                ) : (
                  <RegisterComponent />
                )
              }
            />

            {/* ----- Shared Logged-In Routes (Profile/Logout) ----- */}
            {isLoggedIn && (
              <>
                <Route path="/profile/account" element={<AccountComponent />} />
                {/* Logout Component might be better handled directly in Navbar,
                    but if it's a separate page/route, this is fine. */}
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
                <Route path="/userdashboard" element={<UserDashboard />} />{" "}
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
                      to={isLoggedIn ? "/userdashboard" : "/login"}
                      replace
                    />
                  }
                />
                <Route
                  path="/stocks/*"
                  element={
                    <Navigate
                      to={isLoggedIn ? "/userdashboard" : "/login"}
                      replace
                    />
                  }
                />
                <Route
                  path="/supplier/*"
                  element={
                    <Navigate
                      to={isLoggedIn ? "/userdashboard" : "/login"}
                      replace
                    />
                  }
                />
                <Route
                  path="/orders/update"
                  element={
                    <Navigate
                      to={isLoggedIn ? "/userdashboard" : "/login"}
                      replace
                    />
                  }
                />
                <Route
                  path="/report/*"
                  element={
                    <Navigate
                      to={isLoggedIn ? "/userdashboard" : "/login"}
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
                <Route path="/userdashboard" element={<UserDashboard />} />
                {/* Orders */}
                <Route path="/order/place" element={<PlaceOrderComponent />} />
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
            {/* Redirects any unmatched URL. Redirecting to '/' is often better than '/login',
                as '/' will then decide whether to show HomePage or redirect to the dashboard.
                If you strictly want to force login for any invalid URL, change to "/login". */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
