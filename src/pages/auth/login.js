import React, { useState } from 'react';
import './Login.css';
import lockkey from '../../assets/image/lock.png';
import logo from '../../assets/image/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post('https://apifrwrd.smplyrefer.com/api/login', formData);
      if (res.data.success) {
        toast.success('Login successful!');
        localStorage.setItem("firstname",res.data.user.studentfirstname)
        localStorage.setItem("studentid",res.data.user.studentid)
        localStorage.setItem("lastname",res.data.user.studentlastname)
        setTimeout(() => {
          navigate('/dashbord');
        }, 2000);
        console.log("error",res.data.message);

      } else {
        console.log("error",res.response.data.message);
        
      }
    } catch (err) {
      console.error(err);
      console.log("error",err.response.data.message);

      toast.error(err.response?.data?.message || 'Server error');
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
            <h2 className="login-title">Login</h2>
            <img src={lockkey} alt="lock" className="login-lock-img" />
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your registered email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className="forgot-password">
              <Link to="/forget">Forgot password?</Link>
            </div>

            <button type="submit" className="login-button">Login</button>
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

export default Login;
