 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link,useNavigate } from 'react-router-dom';
 
import 'bootstrap/dist/css/bootstrap.min.css';
 
function UserNavbar({onLogout}) {
  const navigate = useNavigate();
 
  const handleLogout = () => {
    onLogout();
    navigate('/');
  };
  return (
    <Navbar bg='dark' variant='dark' expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Inventory Management System &nbsp;</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Orders" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/order/place">Place Order</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/order/history">Order History</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/order/cancel">Cancel Order</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/products/list">Product Lists</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/supplier">Product by Supplier</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/category">Product by Category</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Reports" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/reports/user-order-details">User Order Details Report</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile/account">Account</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/profile/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className="mr-sm-3"
            />
          </Col>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
 
export default UserNavbar;
 
 