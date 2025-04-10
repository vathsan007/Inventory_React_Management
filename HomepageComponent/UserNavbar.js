import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserNavbar() {
  return (
    <Navbar bg='dark' variant='dark' expand="lg">
      <Container>
        <Navbar.Brand href="#home">Inventory Management System &nbsp;</Navbar.Brand>
        

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Orders" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Place Order</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Order history</NavDropdown.Item>
              
              <NavDropdown.Item href="#action/3.3">Cancel Order</NavDropdown.Item>
              
              
            </NavDropdown>
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Product Lists</NavDropdown.Item>        
              <NavDropdown.Item href="#action/3.2">Productby Supplier</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Productby Category</NavDropdown.Item>              
    
    
            </NavDropdown>
    
            <NavDropdown title="Reports" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">User Order details Report </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Profile' id="basic-nav-dropdown" className='text-light' aria-controls="basic-navbar-nav"> 
              <NavDropdown.Item href="#action/3.1">Account </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Logout </NavDropdown.Item>
            </NavDropdown>
            
            
          </Nav>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-3"
            />
          </Col>
        </Navbar.Collapse>
         
          <>&nbsp;&nbsp;&nbsp;</>
          
      </Container>
    </Navbar>
  );
}

export default UserNavbar;