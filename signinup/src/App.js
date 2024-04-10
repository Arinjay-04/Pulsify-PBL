// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginForm from './components/Loginform/LoginForm';
// import SignupForm from './components/SignUpForm/signUpForm';
// import image from './components/Assets/image.svg';
// import './App.css'; // Import your CSS file for styling

// function App() {
//   return (
//     <Router>
//       <div className="container">
//         <div className="form-container">
//           <Routes>
//             <Route path="/login" element={<LoginForm />} />
//             <Route path="/register" element={<SignupForm />} />
//           </Routes>
//         </div>
//         <div className="image-container">
//           <img src={image} alt="Image" width={500} height={500} />
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import LoginForm from './components/Loginform/LoginForm';
// import SignupForm from './components/SignUpForm/signUpForm';
// import loginImage from './components/Assets/image.svg'; // Import login image
// import signupImage from './components/Assets/image1.svg'; // Import signup image
// import Homepage from './components/Homepage/Homepage';
// import './App.css'; // Import your CSS file for styling
// import './index.css';
// import './components/Homepage/Homepage.css'

// function App() {
//   const location = useLocation();
//   return (
//     <Router>
//       <div className="container">
//         <div className="form-container">
//           <Routes>
           
//             <Route path="/login" element={<LoginForm />} />
//             <Route path="/register" element={<SignupForm />} />
//           </Routes>
//         </div>
//         <div className="image-container">
//           {/* Conditional rendering of images based on the current route */}
//           {location.pathname ==='/login' && (
//             <img src={loginImage} alt="Login Image" className="image" />
//           )}
//           {location.pathname === '/register' && (
//             <img src={signupImage} alt="Signup Image" className="image" />
//           )}
//         </div>
//       </div>
//       <div className="main">
//       <Routes>  
//       <Route path="/" element={<Homepage/>} />
//       </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginForm from './components/Loginform/LoginForm.jsx';
import SignupForm from './components/SignUpForm/signUpForm.jsx';
import loginImage from './components/Assets/image.svg'; // Import login image
import signupImage from './components/Assets/image1.svg'; // Import signup image
import Homepage from './components/Homepage/Homepage.jsx';
import './App.css'; // Import your CSS file for styling
import './index.css';
import './components/Homepage/Homepage.css'
import Diseases from './components/Diseases/Diseases.jsx';

function App() {
  return (
    <Router>
     
      <div className="main">
      <Routes>  
      <Route exact path='/' element={<Homepage/>} />
      </Routes>
   </div>
   <AppContent />
   <Routes>
      <Route exact path='/diseases' element={<Diseases/>}/>
   </Routes>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="container">
      <div className="form-container">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<SignupForm />} />
        </Routes>
      </div>
      <div className="image-container">
        {/* Conditional rendering of images based on the current route */}
        {location.pathname === '/login' && (
          <img src={loginImage} alt="Login Image" className="image" />
        )}
        {location.pathname === '/register' && (
          <img src={signupImage} alt="Signup Image" className="image" />
        )}
      </div>
    </div>

  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginForm from './components/Loginform/LoginForm';
// import SignupForm from './components/SignUpForm/signUpForm';
// import Homepage from './components/Homepage/Homepage';
// import './App.css'; // Import your CSS file for styling

// function App() {
//   return (
//     <Router>
//       <div className="main">
//         <Routes>
//           <Route path="/" element={<Homepage />} />
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/register" element={<SignupForm />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

