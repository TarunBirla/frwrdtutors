import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/image/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email");
      return;
    }

    try {
      const res = await axios.post('https://apifrwrd.smplyrefer.com/api/forget_password', { email });

      if (res.data.success) {
        toast.success('Reset link sent to your email');
        setTimeout(() => {
          navigate('/');
        }, 4000);
      } else {
        toast.error(res.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Server error');
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
            <h2 className="login-title">Forget Password</h2>
          </div>

          <form className="login-form" onSubmit={handleForgetPassword}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter the email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="login-button">Send Reset Link</button>
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

export default ForgetPassword;
