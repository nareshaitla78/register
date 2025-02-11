import React from 'react';

import Register from './pages/Register';
import SelfRegistrationForm from './components/Banner';
import BannerSection from './components/BannerSection';
// import Login from './pages/Login';
// import Chat from './pages/Chat';
// import Home from './pages/HomePage';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from '../src/components/ResetPassword';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
export default function App(){
  return(
    <BrowserRouter>
    <BannerSection />
    <SelfRegistrationForm />
    <Routes>
      <Route path="/register" element={<Register />}></Route>
      {/* <Route path="/login" element={<Login />}></Route>
      <Route path="/home" element={< Home/>}></Route>
      <Route path="/" element={<Chat />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route path="/reset-password" element={<ResetPassword />} /> */}
      {/* <Route path="*" element={<div>404 - Page Not Found</div>} /> */}

    </Routes>
    </BrowserRouter>

  )
}
