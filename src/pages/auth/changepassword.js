import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/image/logo.png';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ChangePassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!password || !rePassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== rePassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(`https://apifrwrd.smplyrefer.com/api/changepassword/${id}`, {
        newPassword: password
      });

      if (res.data.success) {
        toast.success("Password changed successfully");
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  return (
    <>
     <Toaster/>

    <div className="page-wrapper">
      <div className="logo-container">
        <img src={logo} alt="logo" className="login-logo" />
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2 className="login-title">Change Password</h2>
          </div>

          <form className="login-form" onSubmit={handleChangePassword}>
            <label>New Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="********"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              required
            />

            <button type="submit" className="login-button">Change Password</button>
          </form>
        </div>
      </div>

      <div className="logo-container">
        <span>www.frwrdtutors.com</span>
      </div>
    </div>
    </>

  );
};

export default ChangePassword;
