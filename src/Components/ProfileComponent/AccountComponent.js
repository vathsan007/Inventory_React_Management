import React, { useEffect, useState } from 'react';
import './AccountComponent.css';

function AccountComponent() {
  const [userData, setUserData] = useState(null);
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (username) {
      fetch(`http://localhost:5203/api/Users/getUser/${username}`)
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Status: ${res.status}, Message: ${errorText}`);
          }
          return res.json();
        })
        .then(data => setUserData(data))
        .catch(err => console.error("Fetch error:", err));
    }
  }, [username]);

  if (!userData) {
    return <div className="loading">Loading user data...</div>;
  }

  return (
    <div className="account-container">
      <div className="profile-card">
        <div className="profile-img">
          <i className="fa fa-user-circle"></i>
        </div>
        <div className="profile-details">
          <label>Username</label>
          <p>{userData.username}</p>

          <label>Name</label>
          <p>{userData.name}</p>

          <label>Email</label>
          <p>{userData.email}</p>

          <label>Phone</label>
          <p>{userData.phone} </p>

          <label>Address</label>
          <p>{userData.address}</p>
        </div>
      </div>
    </div>
  );
}

export default AccountComponent;
