import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
 
import { Link, useNavigate } from 'react-router-dom';
 
import 'bootstrap/dist/css/bootstrap.min.css';
 
function AdminNavbar({onLogout}) {
 
const navigate = useNavigate();
 
  const handleLogout = () => {
    onLogout();
    navigate('/');
  };
 
  return (
    <Navbar expand="lg" bg="dark" variant='dark'>
      <Container>
        <Navbar.Brand href="#home">Inventory Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Orders" id="basic-nav-dropdown">
              <NavDropdown.Item href="/orders/update">Update Order</NavDropdown.Item>   
            </NavDropdown>
         
           <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item href="/products/list">Product Lists</NavDropdown.Item>
              <NavDropdown.Item href="/products/add">Add Product</NavDropdown.Item>   
              {/* <NavDropdown.Item href="/products/update">Update Product</NavDropdown.Item>   */}
              <NavDropdown.Item href="/products/delete">Delete Product</NavDropdown.Item>       
              <NavDropdown.Item href="/products/filter">Filter Product</NavDropdown.Item> 
            </NavDropdown>
            
            
           
            <NavDropdown title="Stocks" id="basic-nav-dropdown">
              <NavDropdown.Item href="/stocks/all">All Stocks</NavDropdown.Item>          
              <NavDropdown.Item href="/stocks/add">Add Stock</NavDropdown.Item>
              <NavDropdown.Item href="/stocks/reduce">Reduce Stock</NavDropdown.Item>
              <NavDropdown.Item href="/stocks/discard">Discard Stock</NavDropdown.Item>
              <NavDropdown.Item href="/stocks/out-of-stock">Out Of Stock</NavDropdown.Item>
            </NavDropdown>
           
            <NavDropdown title="Supplier" id="basic-nav-dropdown">
              <NavDropdown.Item href="/supplier/details">Supplier Details</NavDropdown.Item>          
              <NavDropdown.Item href="/supplier/add">Add Supplier</NavDropdown.Item>
              <NavDropdown.Item href="/supplier/update">Update Supplier</NavDropdown.Item>
              <NavDropdown.Item href="/supplier/delete">Delete Supplier</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Reports" id="basic-nav-dropdown">
              <NavDropdown.Item href="/reports/user-order">User Order Report</NavDropdown.Item>          
              <NavDropdown.Item href="/reports/stock-level">Stock Level Report</NavDropdown.Item>
              <NavDropdown.Item href="/reports/sales-report">Sales Report</NavDropdown.Item>
            </NavDropdown>
            
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile/acc">Account</NavDropdown.Item>
              <NavDropdown.Item href="/profile/loggedout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}
 
export default AdminNavbar
