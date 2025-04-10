
import React, { useEffect,useState, useRef } from 'react';
import AddProductComponent from '../ProductComponent/AddProductComponent';
import AddSupplierComponent from '../SupplierComponent/AddSupplierComponent';
import LoginComponent from '../LoginComponent/LoginComponent';
import PlaceOrderComponent from '../OrderComponent/PlaceOrderComponent';
import RegisterComponent from '../RegisterComponent/RegisterComponent';
import sampleImg from '../assets/imag.jpg';
import './HomepageComponent.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UserNavbar from './UserNavbar';
import axios from 'axios';


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import AllOrdersComponent from '../OrderComponent/AllOrdersComponent';

function HomepageComponent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('');
  const scrollRef = useRef(null);

  // const products = [
  //   { id: 1, name: 'Product A', category: 'Electronics', img: sampleImg },
  //   { id: 2, name: 'Product B', category: 'Clothing', img: sampleImg },
  //   { id: 3, name: 'Product C', category: 'Books', img: sampleImg },
  //   { id: 4, name: 'Product D', category: 'Furniture', img: sampleImg },
  //   { id: 5, name: 'Product E', category: 'Toys', img: sampleImg },
  // ];
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5203/api/Products')
      .then(res => setProducts(res.data))
      .catch(() => alert('Failed to fetch products'));
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'order': return <PlaceOrderComponent />;
      case 'product': return <AddProductComponent />;
      case 'supplier': return <AddSupplierComponent />;
      case 'register': return <RegisterComponent setActiveComponent={ setActiveComponent } />;
      case 'login': return ( <Router>
        <Routes>
         <Route path="/" element={<LoginComponent />} />
         
         </Routes>
      </Router>);
      default: return null;
    }
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow">
        <div className="text-xl font-semibold">Inventory Management System</div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded"
          >
            Menu
          </button>
          {menuOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white text-black border rounded shadow z-10">
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setActiveComponent('')}>Home</div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setActiveComponent('order')}>Order</div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setActiveComponent('product')}>Product</div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setActiveComponent('supplier')}>Supplier</div>
            </div>
          )}
        </div>

        <div className="space-x-2">
          <button
            onClick={() => setActiveComponent('register')}
            className="px-4 py-2 bg-black text-blue-600 rounded hover:bg-gray-200"
          >
            Register
          </button>
          <button
            onClick={() => setActiveComponent('login')}
            className="px-4 py-2 bg-black text-blue-600 rounded hover:bg-gray-200"
          >
            Login
          </button>
        </div>
      </header>

      {/* Render Main Content */}
      <div className="p-6">
        {activeComponent === '' && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Available Products</h2>
            <div className="relative">
              

              {/* Horizontal Scroll Container */}
              <div
                ref={scrollRef}
                className="horizontal-scroll-container px-10 scrollbar-hide"
              >
                {products.map((product) => (
                  <div key={product.productId} className="flex-shrink-0">
                    <Card style={{ width: '20rem' }}>
                      <Card.Img variant="top" src={sampleImg} width='400px' height='200px' />
                      <Card.Body>
                        <Card.Title> {product.productName}</Card.Title>
                        <Card.Text>
                          Category: {product.category}
                        </Card.Text>
            
                        <Card.Text>Price: ₹{product.unitPrice}</Card.Text>
                        <Card.Text>Quantity: {product.availableQuantity}</Card.Text>
                        <Button variant="primary" onClick={() => alert('login')}>
                           Place Order
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
              {/* Left Arrow */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
              >
                ←
              </button>

              {/* Right Arrow */}
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
              >
                →
              </button>

            </div>
          </>
        )}
        {renderComponent()}
      </div>
    </div>
  );
}

export default HomepageComponent;