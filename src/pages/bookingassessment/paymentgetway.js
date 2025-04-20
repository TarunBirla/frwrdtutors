import React from 'react';
import './BookingAssessment.css';
import Topheader from '../topheader/topheader';

const PaymentGetway = () => {
  return (
    <>
    <Topheader/>
    <div className="booking-assessment-container">
      <div className="success-card1">
        <div className="success-icon">✅</div>
        <h2>Thank you for your payment</h2>
        <p>
        Congratulations! You have successfully purchased a package, 
        and your classes have been scheduled for the next two weeks.
        </p>
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

export default PaymentGetway;
