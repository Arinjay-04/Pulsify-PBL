import React, { useState } from "react";
import axios from "axios";
import './Hospital.css'; // Ensure this import is correct
import { Card, Footer, Hero, Navbar } from '../../components';

const Hospital = () => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [hospitals, setHospitals] = useState([]);

  const handleChangeState = (e) => {
    setState(e.target.value);
  }

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/hospitals", {
        params: { state, city },
      });
      setHospitals(response.data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  }

  return (
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
            <div className="Results">
            <li key={index}>
              <h3>{hospital.name}</h3>
              <p> Type: {hospital.type}</p>
              <p> Address: {hospital.address}</p>
              <p> Telephone Number : {hospital.telephone}</p>
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
    </>
  );
}

export default Hospital;
