import React from 'react'
import Homepage from './pages/Homepage/Homepage'
import LoginPage from './pages/LoginPage/LoginPage'
import SignupForm from './pages/SignupPage/SignUpPage'
import Diseases from './pages/Diseases/Diseases.jsx'
import Hospitals from './pages/Hospitals/Hospital.jsx'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (

    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupForm/>}/>
      <Route path='/diseases' element={<Diseases/>}/>
      <Route path='/hospital' element={<Hospitals/>}/>



    </Routes>
  )
}

export default App