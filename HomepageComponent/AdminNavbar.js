import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminNavbar() {
  return (
    <Navbar expand="lg" bg="dark" variant='dark'>
      <Container>
        <Navbar.Brand href="#home">Inventory Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Orders" id="basic-nav-dropdown">
            
              <NavDropdown.Item href="#action/3.1">Update Order</NavDropdown.Item>    
            </NavDropdown>
          
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Product Lists</NavDropdown.Item> 
               <NavDropdown.Item href="#action/3.2">Add Product</NavDropdown.Item>    
                <NavDropdown.Item href="#action/3.3">Update Product</NavDropdown.Item>   
                 <NavDropdown.Item href="#action/3.4">Delete Product</NavDropdown.Item>        
                  <NavDropdown.Item href="#action/3.5">Filter Product</NavDropdown.Item>  
            </NavDropdown>
            <NavDropdown title="Reports" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">User Order Report </NavDropdown.Item>           
               <NavDropdown.Item href="#action/3.2">Stock Level Report</NavDropdown.Item> 
                <NavDropdown.Item href="#action/3.3">Supplier Performance</NavDropdown.Item> 
            </NavDropdown>
            
             <NavDropdown title="Stocks" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">All Stocks </NavDropdown.Item>           
               <NavDropdown.Item href="#action/3.2">Add Stock</NavDropdown.Item> 
                <NavDropdown.Item href="#action/3.3">Reduce Stock</NavDropdown.Item> 
                <NavDropdown.Item href="#action/3.4">Discard Stock</NavDropdown.Item> 
                <NavDropdown.Item href="#action/3.2">Out Of Stock</NavDropdown.Item> 
            </NavDropdown>
            
            <NavDropdown title="Supplier" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Supplier Details</NavDropdown.Item>           
               <NavDropdown.Item href="#action/3.2">Add Supplier</NavDropdown.Item> 
                <NavDropdown.Item href="#action/3.3">Update Supplier</NavDropdown.Item> 
                <NavDropdown.Item href="#action/3.4">Delete Supplier</NavDropdown.Item> 
                
            </NavDropdown>
            <NavDropdown title="Profile" eventKey={1} href="#memes">
              <NavDropdown.Item href="#action/3.1">Account</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>
         
             
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;

