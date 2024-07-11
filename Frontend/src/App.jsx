// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupForm from './pages/SignupPage/SignUpPage';
import Diseases from './pages/Diseases/Diseases';
import Hospitals from './pages/Hospitals/Hospital';
import Landing from './pages/Landing/Landing';



const App = () => {

  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/homepage' element={<Homepage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/diseases' element={<Diseases />} />
          <Route path='/hospital' element={<Hospitals />} />
        </Routes>
    </div>
  );
};

export default App;
