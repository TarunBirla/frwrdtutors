import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/login';
import Dashbord from '../pages/dash/dashbord';
import Package from '../pages/Package/Package';
import Packagedetails from '../pages/Package/packagedetails';
import SlotBooking from '../pages/Slot/slotbooking';
import AvailableTutors from '../pages/AvailableTutors/AvailableTutors';
import ForgetPassword from '../pages/auth/ForgetPassword';
import FreeAssessment from '../pages/Slot/FreeAssessment';
import BookingAssessment from '../pages/bookingassessment/BookingAssessment';
import GetwayPayment from '../pages/bookingassessment/Getwaypayment';
import PaymentGetway from '../pages/bookingassessment/paymentgetway';
import ClientForm from '../pages/Featured/demopage';
import ChnagePassword from '../pages/auth/changepassword';

const Routs = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/changepassword/:id" element={<ChnagePassword />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/package/:id" element={<Package />} />
        <Route path="/packagedetails/:tutorid/:id" element={<Packagedetails/>} />
        <Route path="/slotbooking/:id" element={<SlotBooking/>} />
        <Route path="/availabletutors" element={<AvailableTutors/>} />
        <Route path="/assessment/:id" element={<FreeAssessment/>} />
        <Route path="/bookingassessment" element={<BookingAssessment/>} />
        <Route path="/getway" element={<GetwayPayment/>} />
        <Route path="/paymentgetway" element={<PaymentGetway/>} />
        <Route path="/demopage" element={<ClientForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routs;
