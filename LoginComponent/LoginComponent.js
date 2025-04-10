import React, { useState } from 'react';
import './LoginComponent.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5203/api/Users/login',{
        username,password
      });
      const {token} = response.data;
      console.log(token);
      localStorage.setItem('token',token);
      navigate('/dashboard');
    }
    catch(error){
      alert('invalid credentials!!!!!')
    }
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginComponent;
