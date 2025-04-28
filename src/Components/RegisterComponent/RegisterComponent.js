import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterComponent.css';
import { Link, useNavigate } from 'react-router-dom';

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
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        // Validate the specific field that changed
        validateField(name, value);
    };

    const validateField = (fieldName, value) => {
        let tempErrors = { ...errors };
        switch (fieldName) {
            case 'name':
                if (!value.trim() || value.length < 2) {
                    tempErrors.name = "Name must be at least 2 characters long.";
                } else if (!/^[A-Za-z\s]+$/.test(value)) {
                    tempErrors.name = "Name must contain only letters and spaces.";
                } else {
                    delete tempErrors.name;
                }
                break;
            case 'username':
                if (!value.trim() || value.length < 4) {
                    tempErrors.username = "Username must be at least 4 characters.";
                } else {
                    delete tempErrors.username;
                }
                break;
            case 'password':
                if (!value || value.length < 6) {
                    tempErrors.password = "Password must be at least 6 characters.";
                } else {
                    delete tempErrors.password;
                }
                break;
            case 'email':
                if (!/\S+@\S+\.\S+/.test(value)) {
                    tempErrors.email = "Enter a valid email address.";
                } else {
                    delete tempErrors.email;
                }
                break;
            case 'phone':
                if (!/^\d{10}$/.test(value)) {
                    tempErrors.phone = "Phone number must be exactly 10 digits.";
                } else {
                    delete tempErrors.phone;
                }
                break;
            case 'address':
                if (!value.trim()) {
                    tempErrors.address = "Address is required.";
                } else {
                    delete tempErrors.address;
                }
                break;
            case 'securityQuestion':
                if (!value) {
                    tempErrors.securityQuestion = "Please select a security question.";
                } else {
                    delete tempErrors.securityQuestion;
                }
                break;
            case 'securityAnswer':
                if (!value.trim()) {
                    tempErrors.securityAnswer = "Security answer is required.";
                } else {
                    delete tempErrors.securityAnswer;
                }
                break;
            default:
                break;
        }
        setErrors(tempErrors);
    };

    const validateForm = () => {
        let tempErrors = {};

        if (!form.name.trim() || form.name.length < 2)
            tempErrors.name = "Name must be at least 2 characters long.";
        else if (!/^[A-Za-z\s]+$/.test(form.name))
            tempErrors.name = "Name must contain only letters and spaces.";

        if (!form.username.trim() || form.username.length < 4)
            tempErrors.username = "Username must be at least 4 characters.";

        if (!form.password || form.password.length < 6)
            tempErrors.password = "Password must be at least 6 characters.";

        if (!/\S+@\S+\.\S+/.test(form.email))
            tempErrors.email = "Enter a valid email address.";

        if (!/^\d{10}$/.test(form.phone))
            tempErrors.phone = "Phone number must be exactly 10 digits.";

        if (!form.address.trim())
            tempErrors.address = "Address is required.";

        if (!form.securityQuestion)
            tempErrors.securityQuestion = "Please select a security question.";

        if (!form.securityAnswer.trim())
            tempErrors.securityAnswer = "Security answer is required.";

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Please correct the highlighted errors.", {
                position: "top-center",
                autoClose: 2000,
            });
            return;
        }

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
                securityQuestion: form.securityQuestion,
                securityAnswer: form.securityAnswer
            });

            toast.success(res.data.message || "User registered successfully!", {
                position: "top-center",
                autoClose: 500, // Increase the duration
            });

            setTimeout(() => {
                navigate('/login'); // Add a delay before navigating
            }, 1000); // Delay duration matching the toast duration
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Registration failed!", {
                position: "top-center",
                autoClose: 2000,
            });
        }
    };

    return (
        <div>
            <div className="card">
                <ToastContainer />
                <h2>Register</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div>
                        <label>Name</label>
                        <input
                            name="name"
                            placeholder="Name"
                            onChange={handleChange}
                            onBlur={(e) => validateField('name', e.target.value)}
                            required
                        />
                        <div className="error">{errors.name}</div>
                    </div>

                    <div>
                        <label>Username</label>
                        <input
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            onBlur={(e) => validateField('username', e.target.value)}
                            required
                        />
                        <div className="error">{errors.username}</div>
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={(e) => validateField('password', e.target.value)}
                            required
                        />
                        <div className="error">{errors.password}</div>
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={handleChange}
                            onBlur={(e) => validateField('email', e.target.value)}
                            required
                        />
                        <div className="error">{errors.email}</div>
                    </div>

                    <div>
                        <label>Phone</label>
                        <input
                            name="phone"
                            placeholder="Phone"
                            onChange={handleChange}
                            onBlur={(e) => validateField('phone', e.target.value)}
                            required
                        />
                        <div className="error">{errors.phone}</div>
                    </div>

                    <div>
                        <label>Address</label>
                        <input
                            name="address"
                            placeholder="Address"
                            onChange={handleChange}
                            onBlur={(e) => validateField('address', e.target.value)}
                            required
                        />
                        <div className="error">{errors.address}</div>
                    </div>

                    <div>
                        <label>Security Question</label>
                        <select
                            name="securityQuestion"
                            onChange={handleChange}
                            onBlur={(e) => validateField('securityQuestion', e.target.value)}
                            required
                        >
                            <option value="">Select a question</option>
                            <option value="What is your mother's maiden name?">Mother's maiden name?</option>
                            <option value="What was the name of your first pet?">First pet's name?</option>
                            <option value="What was the name of your elementary school?">Elementary school?</option>
                            <option value="What is your favorite book?">Favorite book?</option>
                        </select>
                        <div className="error">{errors.securityQuestion}</div>
                    </div>

                    <div>
                        <label>Security Answer</label>
                        <input
                            type="text"
                            name="securityAnswer"
                            placeholder="Security Answer"
                            onChange={handleChange}
                            onBlur={(e) => validateField('securityAnswer', e.target.value)}
                            required
                        />
                        <div className="error">{errors.securityAnswer}</div>
                    </div>

                    <button type="submit">Register</button>
                </form>
                <Link to="/">
                    <button type="button" className="hm-btn">Home</button>
                </Link>
                <p>Have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default RegisterComponent;