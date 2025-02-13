import React from 'react';

import Register from './pages/Register';
// import SelfRegistrationForm from './components/Banner';
// import BannerSection from './components/BannerSection';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
export default function App(){
  return(
    <BrowserRouter>

    <Routes>
      <Route path="/" element={<Register />}></Route>
      {/* <Route path="/self-registration" element={<SelfRegistrationForm />}></Route> */}
    </Routes>
    </BrowserRouter>

  )
}
