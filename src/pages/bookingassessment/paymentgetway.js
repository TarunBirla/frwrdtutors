import React, { useEffect, useState } from 'react';
import './BookingAssessment.css';
import Topheader from '../topheader/topheader';

const PaymentGetway = () => {

  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const storedSlots = localStorage.getItem("slots");
    if (storedSlots) {
      try {
        setSlots(JSON.parse(storedSlots));
      } catch (err) {
        console.error("Invalid JSON in localStorage:", err);
      }
    }
  }, []);
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
        {slots.map((slot, index) => (
        <div key={index} className="blocked-class">
          <span className="icon">📅</span> {slot.day}
          <span className="icon">⏰</span> {slot.startTime}
          <span className="icon">⏰</span> {slot.endTime}
          <span className="icon">⏰</span> {slot.subject}
        </div>
      ))}
        
      </div>
    </div>
    </>

  );
};

export default PaymentGetway;
