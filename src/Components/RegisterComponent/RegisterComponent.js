import React, { useState, useRef, useEffect } from 'react';
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
    role: 'User', // Set default role
    securityQuestion: '',
    securityAnswer: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const [selectedQuestion, setSelectedQuestion] = useState('');

  const questions = [
    "Select a question",
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What was the name of your elementary school?",
    "What is your favorite book?",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (question) => {
    setSelectedQuestion(question);
    setForm({ ...form, securityQuestion: question });
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef]);

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
        Role: form.role,
        securityQuestion: form.securityQuestion,
        securityAnswer: form.securityAnswer,
      });

      console.log(res.data); // Debug: Check API response

      toast.success(res.data.message || "User registered successfully!", {
        position: "top-center",
        autoClose: 1000,
      });

      // Optionally redirect or clear the form
      // setTimeout(() => setActiveComponent('login'), 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="register-container">
      <div className="card">
        <ToastContainer />
        <h2 className="register-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="form">
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="username" placeholder="Username" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input name="email" placeholder="Email Address" type="email" onChange={handleChange} required />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input name="address" placeholder="Address" onChange={handleChange} required />

          <div className={`custom-select-wrapper ${isOpen ? 'open' : ''}`} ref={selectRef}>
            <label htmlFor="securityQuestion" className="select-label">Security Question:</label>
            <div className="custom-select" onClick={toggleOpen}>
              <span className="selected-value">{selectedQuestion || 'Select a question'}</span>
              <div className={`arrow ${isOpen ? 'open' : ''}`}></div>
            </div>
            {isOpen && (
              <ul className="options">
                {questions.map((question, index) => (
                  <li
                    key={index}
                    onClick={() => handleQuestionChange(question)}
                    className={question === selectedQuestion ? 'selected' : ''}
                  >
                    {question}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            type="text"
            name="securityAnswer"
            placeholder="Security Answer"
            className="input-answer"
            onChange={handleChange}
            required
          />
          <button className="btn register-btn" type="submit">Register</button>
        </form>
        <div className="links">
          <Link to="/" className="home-link">Home</Link>
          <p className="login-prompt">
            Already have an account? <Link to="/login" className="login-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterComponent;