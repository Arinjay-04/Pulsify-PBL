import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();

   const handleEmailChange = (e) => {
      setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
      try {
         const response = await axios.post('http://localhost:3001/login', {
           email,
           password
         });
         console.log(response.data); 
         navigate('/'); // Redirect to the dashboard page on successful login
       } catch (error) {
         console.error('Error sending data to backend:', error);
       }
    }

    return (
      <div className="signup">
        <div className='wrapper'>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className='Input-Box'>
              <input 
                type='email' 
                placeholder='Email' 
                value={email} 
                onChange={handleEmailChange} 
                required 
              />
            </div>
            <div className='Input-Box'>
              <input 
                type='password' 
                placeholder='Password' 
                value={password} 
                onChange={handlePasswordChange} 
                required 
              />
            </div>
            <button type='submit' className='b1'>Login</button>
            <div className='registration-link'>
              <p>Don't have an account? <Link to="/signup">Signup Here</Link></p>
            </div>
          </form>
        </div> 
        <img src="/assets/image.svg" className="" width="500" height="600" alt="Diseases" />
      </div> 
    )
}

export default LoginPage;
