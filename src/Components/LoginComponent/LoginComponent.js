 
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

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
        toast.success(`Welcome ${credentials.username}!!`)
        navigate('/adminnavbar');

      } else if (role === 'User') {
        toast.success(`Welcome ${credentials.username}!!`);
        navigate('/usernavbar');
      } else {  
        toast.info('Signup to know more!!')
        navigate('/register');
      }
    } catch (error) {
      toast.warn('Error logging in:', error);
    }
  };
 
  return (
    <div className='lgcont'>
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
      <form  className='login-form' onSubmit={handleSubmit}>
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
        <button type="submit" >Login</button>
      </form>
      <Link to="/"><button type="button" className='hm-btn'>Home</button></Link>
      <p> Don't have Account? <Link to="/register">Signup</Link>  </p> 
    </div>
    
    </div>
  );
};
 
export default LoginComponent;
 
 