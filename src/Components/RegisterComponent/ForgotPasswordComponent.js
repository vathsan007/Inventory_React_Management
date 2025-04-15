import React, { useState } from 'react';
import axios from 'axios';
//import './ForgotPasswordComponent.css';
 
const ForgotPasswordComponent = () => {
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isFetching, setIsFetching] = useState(false);
 
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
 
  const handleQuestionChange = (e) => {
    setSelectedQuestion(e.target.value);
  };
 
  const handleAnswerChange = (e) => {
    setSecurityAnswer(e.target.value);
  };
 
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
 
  const fetchUserInfo = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`http://localhost:5203/api/Users/getUser/${username}`);
      setUserInfo(response.data);
      setIsFetching(false);
    } catch (error) {
      console.error('Error fetching user info:', error);
      setIsFetching(false);
    }
  };
 
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (selectedQuestion !== userInfo.securityQuestion || securityAnswer !== userInfo.securityAnswer) {
      alert('Incorrect security question or answer.');
      return;
    }
    try {
      await axios.post('http://localhost:5203/api/Users/reset-password', {
        email: userInfo.email,
        securityQuestion: selectedQuestion,
        securityAnswer: securityAnswer,
        newPassword: newPassword
      });
      alert('Password reset successfully.');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };
 
  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>
      {!userInfo ? (
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <button onClick={fetchUserInfo} disabled={isFetching}>
            {isFetching ? 'Fetching...' : 'Next'}
          </button>
        </div>
      ) : (
        <form onSubmit={handlePasswordReset}>
          <p><strong>User ID:</strong> {userInfo.userId}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <label htmlFor="securityQuestion">Security Question:</label>
          <select
            id="securityQuestion"
            name="securityQuestion"
            value={selectedQuestion}
            onChange={handleQuestionChange}
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
            value={securityAnswer}
            onChange={handleAnswerChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={handlePasswordChange}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};
 
export default ForgotPasswordComponent;