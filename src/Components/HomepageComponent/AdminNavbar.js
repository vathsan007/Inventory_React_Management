import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
 
import { Link, useNavigate } from 'react-router-dom';
 
import 'bootstrap/dist/css/bootstrap.min.css';
 
function AdminNavbar({onLogout}) {
 
const navigate = useNavigate();
 
  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };
 
  return (
    <Navbar expand="lg" bg="dark" variant='dark'>
      <Container>
        <Navbar.Brand href="/homeadmin">Inventory Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/homeadmin">Home</Nav.Link>
            <NavDropdown title="Orders" id="basic-nav-dropdown">
              <NavDropdown.Item href="/orders/update">Manage Orders</NavDropdown.Item>   
            </NavDropdown>
         
           <NavDropdown title="Products" id="basic-nav-dropdown">
              {/* <NavDropdown.Item href="/products/list">Product Lists</NavDropdown.Item> */}
              <NavDropdown.Item href="/products/add">Product Info</NavDropdown.Item>   
              {/* <NavDropdown.Item href="/products/update">Update Product</NavDropdown.Item>   */}
              {/* <NavDropdown.Item href="/products/delete">Delete Product</NavDropdown.Item>        */}
              {/* <NavDropdown.Item href="/products/filter">Filter Product</NavDropdown.Item>  */}
            </NavDropdown>
            
            
           
            <NavDropdown title="Stocks" id="basic-nav-dropdown">
              <NavDropdown.Item href="/stocks/all">All Stocks</NavDropdown.Item>          
              <NavDropdown.Item href="/stocks/add">Manage Stock</NavDropdown.Item>
              {/* <NavDropdown.Item href="/stocks/reduce">Reduce Stock</NavDropdown.Item> */}
              {/* <NavDropdown.Item href="/stocks/discard">Discard Stock</NavDropdown.Item> */}
              <NavDropdown.Item href="/stocks/out-of-stock">Out Of Stock</NavDropdown.Item>
            </NavDropdown>
           
            <NavDropdown title="Supplier" id="basic-nav-dropdown">
              {/* <NavDropdown.Item href="/supplier/details">Supplier Details</NavDropdown.Item>           */}
              <NavDropdown.Item href="/supplier/add">Manage Supplier</NavDropdown.Item>
              {/* <NavDropdown.Item href="/supplier/update">Update Supplier</NavDropdown.Item> */}
              {/* <NavDropdown.Item href="/supplier/delete">Delete Supplier</NavDropdown.Item> */}
            </NavDropdown>

            <NavDropdown title="Reports" id="basic-nav-dropdown">
              <NavDropdown.Item href="/report/user-order">User Order Report</NavDropdown.Item>          
              <NavDropdown.Item href="/report/stock-level">Stock Level Report</NavDropdown.Item>
              <NavDropdown.Item href="/report/sales-report">Sales Report</NavDropdown.Item>
            </NavDropdown>
            
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile/account">Account</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogoutClick}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}
 
export default AdminNavbar
