 
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css';
import { ToastContainer, toast } from 'react-toastify';

const LoginComponent = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5203/api/Users/login', credentials);
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', credentials.username);
      localStorage.setItem('role', role);
 
      if (role === 'Admin') {
        navigate('/adminnavbar');
      } else if (role === 'User') {
        navigate('/usernavbar');
      } else {  
        navigate('/register');
      }
    } catch (error) {
      toast.warn('Error logging in:', error);
    }
  };
 
  return (
    
    <div className="login-card">
      <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='login-form'>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
 
export default LoginComponent;
 
 