import React, { useState, useEffect } from 'react';
import './BookingAssessment.css';
import Topheader from '../topheader/topheader';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .post('http://localhost:4500/api/create-payment-intent', { amount: 50000 }) // ₹500
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => setMessage(err.message));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'John Doe',
          address: {
            line1: '123 Street',
            city: 'Mumbai',
            state: 'MH',
            postal_code: '400001',
            country: 'IN',
          },
        },
      },
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      setMessage('✅ Payment successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ style: { base: { fontSize: '18px' } } }} />
      <button className="paymentbutton" type="submit" disabled={!stripe}>
        Pay Now
      </button>
      {message && <div className="message">{message}</div>}
    </form>
  );
};

const GetwayPayment = () => {
  return (
    <>
      <Topheader />
      <h1 className="payheading">Payment Gateway</h1>
      <div className="payment">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </>
  );
};

export default GetwayPayment;
