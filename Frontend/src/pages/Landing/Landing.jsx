import React, { useState, useEffect } from 'react';
import './Landing.css'; // Your CSS styles here
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading'; // Import your Loading component

const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (for demonstration purposes)
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after timeout
    }, 1000); // Adjust the timeout duration as needed

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, []);

  return (
    <div className="landing-page">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="blue-side">
            <img src="/assets/Landing.svg" className="image" width="500" height="600" alt="Landing" />
          </div>
          <div className="white-side">
            <h1>Welcome to <span className='pulsify'>Pulsify</span></h1>
            <p>Where we connect you with the doctors of your choice</p>
            <button><Link to="/signup">Sign Up</Link></button>
          </div>
        </>
      )}
    </div>
  );
}

export default LandingPage;
