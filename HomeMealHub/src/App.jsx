import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroPage from './Pages/HeroPage';
import NotFound from './Pages/NotFound';
import Navbar from './Components/Navbar';
import NutritionPage from './Pages/NutritionPage';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/nutrition" element={<NutritionPage/>} />
        <Route path="/ContactUs" element={<ContactUs/>} />
        <Route path="*" element={<NotFound />} />

       
      </Routes>
    </Router>
  );
}

export default App;