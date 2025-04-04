import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroPage from './Pages/HeroPage';
import NotFound from './Pages/NotFound';
import Navbar from './Components/Navbar';
import NutritionPage from './Pages/NutritionPage';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/nutrition" element={<NutritionPage/>} />
        <Route path="*" element={<NotFound />} />

       
      </Routes>
    </Router>
  );
}

export default App;