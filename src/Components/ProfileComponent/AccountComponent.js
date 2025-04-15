import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AccountComponent.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const AccountComponent = () => {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    name: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    role: '',
    securityQuestion: '',
    securityAnswer: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      try {
        const response = await axios.get(`http://localhost:5203/api/Users/getUser/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating user details:', userInfo); // Debug log
      await axios.put('http://localhost:5203/api/Users/update', userInfo, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setIsEditing(false);
      alert('User details updated successfully.');
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      console.log('Resetting password:', {
        email: userInfo.email,
        securityQuestion: userInfo.securityQuestion,
        securityAnswer: userInfo.securityAnswer,
        newPassword: newPassword
      }); // Debug log
      await axios.post('http://localhost:5203/api/Users/reset-password', {
        email: userInfo.email,
        securityQuestion: userInfo.securityQuestion,
        securityAnswer: userInfo.securityAnswer,
        newPassword: newPassword
      });
      alert('Password reset successfully.');
      setShowResetPassword(false); // Hide after successful reset
      setNewPassword(''); // Clear the password field
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  const toggleResetPassword = () => {
    setShowResetPassword(!showResetPassword);
  };

  if (!userInfo) {
    return <div className="loading-container"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="account-page">
      <div className="account-card">
        <h2>User Profile</h2>
        {isEditing ? (
          <form onSubmit={handleUpdate} className="edit-form">
            <div className="form-group">
              <label htmlFor="userId">User ID:</label>
              <input type="text" id="userId" name="userId" value={userInfo.userId} readOnly className="small-input" />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" placeholder="Name" value={userInfo.name} onChange={handleInputChange} required className="small-input" />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" placeholder="Username" value={userInfo.username} onChange={handleInputChange} required className="small-input" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Email" value={userInfo.email} onChange={handleInputChange} required className="small-input" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="text" id="phone" name="phone" placeholder="Phone" value={userInfo.phone} onChange={handleInputChange} required className="small-input" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" placeholder="Address" value={userInfo.address} onChange={handleInputChange} required className="small-input" />
            </div>
            <div className="form-group">
              <label htmlFor="securityQuestion">Security Question:</label>
              <select
                id="securityQuestion"
                name="securityQuestion"
                value={userInfo.securityQuestion}
                onChange={handleInputChange}
                required
                className="small-input"
              >
                <option value="">Select a question</option>
                <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                <option value="What was the name of your first pet?">What was the name of your first pet?</option>
                <option value="What was the name of your elementary school?">What was the name of your elementary school?</option>
                <option value="What is your favorite book?">What is your favorite book?</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="securityAnswer">Security Answer:</label>
              <input type="text" id="securityAnswer" name="securityAnswer" placeholder="Security Answer" value={userInfo.securityAnswer} onChange={handleInputChange} required className="small-input" />
            </div>
            <button type="submit" className="update-button">Update</button>
          </form>
        ) : (
          <div className="profile-info">
            <div className="info-item">
              <label>User ID:</label>
              <input type="text" value={userInfo.userId} readOnly className="small-input" />
            </div>
            <div className="info-item">
              <label>Name:</label>
              <input type="text" value={userInfo.name} readOnly className="small-input" />
            </div>
            <div className="info-item">
              <label>Username:</label>
              <input type="text" value={userInfo.username} readOnly className="small-input" />
            </div>
            <div className="info-item">
              <label>Email:</label>
              <input type="text" value={userInfo.email} readOnly className="small-input" />
            </div>
            <div className="info-item">
              <label>Phone:</label>
              <input type="text" value={userInfo.phone} readOnly className="small-input" />
            </div>
            <div className="info-item">
              <label>Address:</label>
              <input type="text" value={userInfo.address} readOnly className="small-input" />
            </div>
            <div className="info-item">
              <label>Role:</label>
              <input type="text" value={userInfo.role} readOnly className="small-input" />
            </div>
            <div className="info-item">
              <label>Security Question:</label>
              <input type="text" value={userInfo.securityQuestion} readOnly className="small-input" />
            </div>
            <div className="info-item">
              <label>Security Answer:</label>
              <input type="text" value={userInfo.securityAnswer} readOnly className="small-input" />
            </div>
            <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
          </div>
        )}
        <div className="password-reset-container">
          <h3 onClick={toggleResetPassword} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Reset Password
            <FontAwesomeIcon icon={showResetPassword ? faChevronUp : faChevronDown} />
          </h3>
          {showResetPassword && (
            <form onSubmit={handlePasswordReset} className="reset-password-form">
              <div className="form-group">
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  required
                  className="small-input"
                />
              </div>
              <button type="submit" className="reset-button">Reset Password</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountComponent;