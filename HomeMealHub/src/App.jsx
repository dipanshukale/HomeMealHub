import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroPage from './Pages/HeroPage';
import NotFound from './Pages/NotFound';
import Navbar from './Components/Navbar';
import NutritionPage from './Pages/NutritionPage';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import MealData from './Pages/MealData';
import CartPage from './Pages/CartPage';
import Footer from './Components/Footer';
import CheckOutPage from './Pages/CheckOutPage';
import RazorpayPage from './Pages/RazorpayPage';
import PaymentFailedPage from './Pages/PaymentFailedPage';
import ThankYouPage from './Pages/ThankYouPage';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/MealData" element={<MealData />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/nutrition" element={<NutritionPage/>} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/razorpay" element={<RazorpayPage />} />
        <Route path='/payment-failed' element={<PaymentFailedPage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;