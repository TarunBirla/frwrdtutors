import React from 'react';
import './BookingAssessment.css';
import Topheader from '../topheader/topheader';
import { Link } from 'react-router-dom';

const BookingAssessment = () => {
  return (
    <>
    <Topheader/>
    <div className="booking-assessment-container">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h2>Thank you for booking your<br />free assessment!</h2>
        <p>
          We’re excited to help you get started on your learning journey.
          Check your email for further details, including your scheduled time.
        </p>
      </div>

      <div className="section">
        <Link to='/getway'>
        <h3>Assessment</h3>
        </Link>

        <div className="assessment-info">
          <div className="info-row">
            <span className="icon">📅</span>
            <div>
              <strong>Monday 16, February 2025</strong>
              <div className="label">Date</div>
            </div>
          </div>
          <div className="info-row">
            <span className="icon">⏰</span>
            <div>
              <strong>9:00</strong>
              <div className="label">Time</div>
            </div>
          </div>
          <div className="info-row">
            <span className="icon">⏱️</span>
            <div>
              <strong>60 min</strong>
              <div className="label">Duration</div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Blocked Classes</h3>
        <div className="blocked-class">
          <span className="icon">📅</span> Monday 16
          <span className="icon">⏰</span> 9:00
          <span className="icon">⏰</span> 12:00
        </div>
        <div className="blocked-class">
          <span className="icon">📅</span> Wednesday 18,
          <span className="icon">⏰</span> 9:00
          <span className="icon">⏰</span> 12:00
        </div>
        <div className="blocked-class">
          <span className="icon">📅</span> Friday 20
          <span className="icon">⏰</span> 9:00
        </div>
      </div>
    </div>
    </>

  );
};

export default BookingAssessment;
