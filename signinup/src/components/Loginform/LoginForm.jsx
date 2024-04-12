// import React, {useState} from "react";
// import { Link } from "react-router-dom";
// import { FaMobileAlt, FaLock } from 'react-icons/fa';

// const LoginForm = () => {

//   const [values, setValues] = useState({
//     email:'',
//     password:''
//   })

//    const handleInput=(event) => {
//           setValues(prev => ({...prev, [event.target.name]:[event.target.value]}))
//    }

//    const handleSubmit= (event) => {
//     event.preventDefault();
//     setValues(validation(values))
//    }

//    const [errors, setErrors] = useState({});

//   return ( 
//           <div className='wrapper'>
//       <form onSubmit={handleSubmit}>
//         <h1>Login</h1>

//         <div className='Input-Box'>
//           <input type='email' placeholder='Email' name="email" onChange={handleInput} required />
//           <FaMobileAlt className='icon' />
//         </div>

//         <div className='Input-Box'>
//           <input type='password' placeholder='Password' name="password" onChange={handleInput} required />
//           <FaLock className='icon' />
//         </div>

//         <div className="remember-forget">
//           <label><input type='checkbox' /> Remember Me</label>
//           <Link to='#'>Forget Password</Link> {/* Use Link from react-router-dom */}
//         </div>

//         <button type='submit' className='b1'>Login</button>

//         <div className='registration-link'>
//           <p>New Registration? <Link to="/register">Register Here</Link></p>
//         </div>
//       </form>
//     </div>
//    );
// }
 
// export default LoginForm;


import { useState } from "react";
import { FaMobileAlt, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { z } from 'zod'; // Import z from zod
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessageText] = useState('')
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Define zod schema for form validation
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form data against the schema
      schema.parse({ email, password });

      // Proceed with API call if data is valid
      const result = await axios.post('http://localhost:3001/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(result);
      // Check if the response indicates a successful login
      if (result.status === 200) {
        // Redirect to the home page or dashboard after successful login
        navigate('/');
      } else {
        // Display an error message for incorrect password
        setMessageText('Password incorrect. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Display a friendly error message to the user
      setMessageText('Error logging in. Please try again later.');
    }

    // schema.parse({ email, password });
      
    // await axios.post('http://localhost:3001/login', { email, password })
    // .then(res => console.log(res));
    

  }

  return (
    <div className="login">
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className='Input-Box'>
          <input type='email' placeholder='Email' value={email} onChange={handleEmailChange} required />
          <FaMobileAlt className='icon' />
        </div>

        <div className='Input-Box'>
          <input type='password' placeholder='Password' value={password} onChange={handlePasswordChange} required />
          <FaLock className='icon' />
        </div>

        <div className="remember-forget">
          <label><input type='checkbox' /> Remember Me</label>
        </div>
        <div className="forget-password">
        <Link to='#' >Forget Password</Link> {/* Use Link from react-router-dom */}
        </div>

        <button type='submit' className='b1'>Login</button>

        <div className='registration-link'>
          <p>New Registration? <Link to="/register">Register Here</Link></p>
        </div>
      </form>
      
    </div>
    <img src="image.svg" className="" width="500" height="600" alt="Diseases" />
    </div>
  )
}

export default LoginForm;

