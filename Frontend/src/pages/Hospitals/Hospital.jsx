import React, { useState, useEffect } from "react";
import axios from "axios";
import './Hospital.css'; // Ensure this import is correct
import { Card, Footer, Hero, Navbar } from '../../components';
import Loading from '../Loading/Loading';

const Hospital = () => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChangeState = (e) => {
    setState(e.target.value);
  }

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3001/hospitals", {
        params: { state, city },
      });
      setHospitals(response.data);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  }

  useEffect(() => {
    // Simulate a loading delay (for demonstration purposes)
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after timeout
    }, 1000); // Adjust the timeout duration as needed

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="Hospitals">
            <form onSubmit={handleSubmit}>
              <div className="Find">
                <h1>Find Hospital Near You</h1>
                <div className="input-group">
                  <input type="text" placeholder="State" onChange={handleChangeState} value={state} required />
                  <input type="text" placeholder="City" onChange={handleChangeCity} value={city} required />
                </div>
              </div>
              <button className='b1' type="submit">Submit</button>
            </form>
          </div>

          <div className="HospitalList">
            <h2>Search Results:</h2>
            <ul>
              {hospitals.map((hospital, index) => (
                <div className="Results" key={index}>
                  <li>
                    <h3>{hospital.name}</h3>
                    <p>Type: {hospital.type}</p>
                    <p>Address: {hospital.address}</p>
                    <p>Telephone Number: {hospital.telephone}</p>
                    <p>Status: {hospital.status}</p>
                  </li>
                  <img
                    src="/assets/undraw_building_re_xfcm (2).svg"
                    className="image"
                    width="200"
                    height="400"
                    alt="Building Illustration"
                  />
                </div>
              ))}
            </ul>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Hospital;
