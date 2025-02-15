import React from 'react';

import Register from './pages/Register';
// import SelfRegistrationForm from './components/Banner';
import BannerSection from './components/BannerSection';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
export default function App(){
  return(
    <BrowserRouter>
    <BannerSection />
    <div className="pt-16"> {/* Add padding to avoid content overlap with the fixed navbar */}
        <Register /> {/* Your registration form */}
      </div>
    </BrowserRouter>

  )
}
