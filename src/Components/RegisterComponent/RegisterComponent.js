import React, { useState } from 'react';

import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterComponent.css';
import { Link } from 'react-router-dom';

function RegisterComponent({ setActiveComponent }) {
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    role: '',
    securityQuestion: '',
    securityAnswer: ''
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5203/api/Users/register";

    try {
      const res = await axios.post(url, {
        Name: form.name,
        Username: form.username,
        Password: form.password,
        Email: form.email,
        Phone: form.phone,
        Address: form.address,
        Role: "User",
        securityQuestion:form.securityQuestion,
        securityAnswer:form.securityAnswer
      });

      console.log(res.data); // Debug: Check API response

      // Show success message from API or fallback
      toast.success(res.data.message || "User registered successfully!", {
        position: "top-center",
        autoClose: 1000,
      });

      // Redirect to login after 2.2 seconds
      //setTimeout(() => setActiveComponent('login'), 1000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
    <div className="card">
      
      <ToastContainer />
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        {/* <input name="role" placeholder="Role" onChange={handleChange} required /> */}
        <label htmlFor="securityQuestion">Security Question:</label>
          <select
            // id="securityQuestion"
            name="securityQuestion"
            
            onChange={handleChange}
            required
          >
            <option value="">Select a question</option>
            <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
            <option value="What was the name of your first pet?">What was the name of your first pet?</option>
            <option value="What was the name of your elementary school?">What was the name of your elementary school?</option>
            <option value="What is your favorite book?">What is your favorite book?</option>
          </select>
          <input
            type="text"
            name="securityAnswer"
            placeholder="Security Answer"
            
            onChange={handleChange}
            required
          />
        <button className="btn btn-primary" type="submit">Register</button>
      </form>
      <Link to="/"><button type="button" className='hm-btn'>Home</button></Link>
      <p> Have Account? <Link to="/login">Login</Link>  </p> 
    </div>
   
    </div>
  );
}

export default RegisterComponent;
