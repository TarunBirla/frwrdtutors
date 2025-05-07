import React, { useEffect, useState } from 'react';
import './BookingAssessment.css';
import Topheader from '../topheader/topheader';

const PaymentGetway = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    // Get slots
    const storedSlots = localStorage.getItem("successshowdata");
    if (storedSlots) {
      try {
        setSlots(JSON.parse(storedSlots));
      } catch (err) {
        console.error("Invalid JSON in successshowdata:", err);
      }
    }
  }, []);

  return (
    <>
      <Topheader />
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
          {slots.length > 0 ? (
            slots.map((entry, index) => {
              const { slot, tutor } = entry;
              return (
                <div key={index} className="blocked-class">
                  <span className="icon">📅</span> {slot.day}
                  <span className="icon">⏰</span> {slot.startTime} - {slot.endTime}
                  <span className="icon">📘</span> {slot.subject}
                  <span className="icon">👨‍🏫</span> {tutor.first_name} {tutor.last_name}
                </div>
              );
            })
          ) : (
            <p>No blocked classes found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentGetway;
