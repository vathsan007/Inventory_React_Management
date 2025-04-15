import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css'; // Import the CSS file

const LoginComponent = ({ setIsLoggedIn }) => {
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

      console.log('Login successful:', response.data); // Debug log
      //setIsLoggedIn(true); // Update login status

      if (role === 'Admin') {
        navigate('/adminnavbar');
      } else if (role === 'User') {
        navigate('/usernavbar');
      } else {
        navigate('/register');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleRegister = () => {
    navigate('/register');
  };
  const handlehome = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <div className="options">

          <button onClick={handleForgotPassword} className="forgot-password-button">
            Forgot Password?
          </button>
          <button onClick={handleRegister} className="register-button">
            Register
          </button>
        </div>
        <button onClick={handlehome} className="register-button">
            Home
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;