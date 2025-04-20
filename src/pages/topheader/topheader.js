import React, { useState } from 'react';
import {
  FaBars,
  FaUser,
  FaCalendarAlt,
  FaPlusCircle,
  FaSyncAlt,
  FaSignOutAlt
} from 'react-icons/fa';
import logo from '../../assets/image/logo.png';
import profileimage from '../../assets/image/profileimage.png';
import './topheader.css';

const Topheader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bgcolorheader">
        <FaBars className="menu-icon d-lg-none mr-3" onClick={toggleMenu} />
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Logo" className="logoimage" />
        </a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto d-none d-lg-flex align-items-center">
            <li className="nav-item">
              <a className="nav-link text-white d-flex align-items-center" href="#">
                <FaCalendarAlt className="mr-2" /> Manage Class
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white d-flex align-items-center" href="#">
                <FaPlusCircle className="mr-2" /> New Booking
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white d-flex align-items-center" href="#">
                <FaSyncAlt className="mr-2" /> Renew
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white d-flex align-items-center" href="#">
                <FaSignOutAlt className="mr-2" /> Logout
              </a>
            </li>
            <li className="nav-item">
              <FaUser className="user-icon text-white" />
            </li>
          </ul>
        </div>
      </nav>

      {isMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={toggleMenu}></div>
          <div className="mobile-menu-custom">
            <div className="mobile-menu-header text-white">
              <div className="close-btn" onClick={toggleMenu}>&times;</div>

              <div className="profile-wrapper">
                <div className="profile-circle-bg">
                  <img src={profileimage} alt="Profile" className="profile-img-lg" />
                </div>
              </div>

              <div className="text ml-1">
                <p className="welcome-text mb-1">Welcome</p>
                <h5 className="username mb-1">Michael</h5>
              </div>

              {/* <div className="ml-auto profile-link">
                <FaUser className="mr-1" />
                <span>My Profile</span>
              </div> */}
            </div>

            <ul className="list-unstyled menu-items text-center mt-4">
              <li><FaCalendarAlt className="menu-icon" /> Manage Class</li>
              <li><FaPlusCircle className="menu-icon" /> New Booking</li>
              <li><FaSyncAlt className="menu-icon" /> Renew</li>
              <li><FaSignOutAlt className="menu-icon" /> Logout</li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Topheader;