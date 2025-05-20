import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const navigate = useNavigate();

useEffect(() => {
  const storedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!token) {
    navigate('/login', { replace: true });
    return;
  }

  if (storedUser && storedUser !== "undefined") {
    setUser(JSON.parse(storedUser));
  }
  window.history.pushState(null, '', window.location.href);
  const handlePopState = () => {
    navigate(1);
  };
  window.addEventListener('popstate', handlePopState);

  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
}, []);


  return (
    <div className="profile-wrapper">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <h2 className="mb-4 text-center profile-title mt-5">Profile Page</h2>
          <div className="col-md-8 col-lg-6 col-sm-10">
            <div className="profile-card">
              <h4 className="text-center welcome">Welcome, {user.name}!</h4>
              <p className="text-center welcome1">
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
