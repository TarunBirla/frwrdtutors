import React from 'react';
import './BookingAssessment.css';
import Topheader from '../topheader/topheader';
import { useNavigate } from 'react-router-dom';

const GetwayPayment = () => {
const navigate = useNavigate()

  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => openRazorpay();
    document.body.appendChild(script);
  };

  const openRazorpay = () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
      amount: 50000, // Amount in paise (e.g., 50000 for 500 INR)
      currency: 'INR',
      name: 'My Company',
      description: 'Payment for Services',
      image: 'https://example.com/your_logo.png', // Optional logo
      handler: function (response) {
        alert(`Payment successful! Razorpay payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#61dafb' // Customize button color
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const loadRazorpaynext = () =>{
    navigate('/paymentgetway')
  }
  return (
    <>
      <Topheader />
      <h1 className="payheading">Payment Gateway</h1>
      <div className="payment">
        <button className="paymentbutton" onClick={loadRazorpaynext}>Pay Amount</button>
      </div>
    </>
  );
};

export default GetwayPayment;
