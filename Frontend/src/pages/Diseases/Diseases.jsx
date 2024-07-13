import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Diseases.css';
import Loading from '../Loading/Loading'; // Import your Loading component

const Diseases = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [manualSymptoms, setManualSymptoms] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Handler for checkbox selection
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedSymptoms((prevSymptoms) => ({
      ...prevSymptoms,
      [name]: { ...prevSymptoms[name], checked }
    }));
  };

  // Handler for radio button selection
  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setSelectedSymptoms((prevSymptoms) => ({
      ...prevSymptoms,
      [name]: { ...prevSymptoms[name], value }
    }));
  };

  // Handler for submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://localhost:3001/diseases', {
        selectedSymptoms,
        manualSymptoms, 
      });
      console.log(response.data);
      navigate('/'); 
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  useEffect(() => {
    // Simulate a loading delay (for demonstration purposes)
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after timeout
    }, 1000); // Adjust the timeout duration as needed

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, []);

  return (
    <div className="diseases">
      {loading ? (
        <Loading />
      ) : (
        <div className="form-container">
          <h2>Enter Symptoms Manually</h2>
          <input
            type="text"
            name="manualSymptoms"
            placeholder="Enter Symptoms"
            value={manualSymptoms}
            onChange={(e) => setManualSymptoms(e.target.value)}
          />
          <hr />
          <h2>Select Symptoms:</h2>
          <div className="select-symptoms">
            <div className="form-check">
              <div className="form-check-inline">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="fever"
                  onChange={handleCheckboxChange}
                />
                <p>Fever</p>
                <input className="form-check-input" type="radio" name="fever" value="yes" onChange={handleRadioChange} />
                <label className="form-check-label">Yes</label>
                <input className="form-check-input" type="radio" name="fever" value="no" onChange={handleRadioChange}  />
                <label className="form-check-label">No</label>
              </div>
            </div>
            <div className="form-check">
              <div className="form-check-inline">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="cough"
                  onChange={handleCheckboxChange}
                />
                <p>Cough</p>
                <input className="form-check-input" type="radio" name="cough" value="yes" onChange={handleRadioChange} />
                <label className="form-check-label">Yes</label>
                <input className="form-check-input" type="radio" name="cough" value="no" onChange={handleRadioChange}  />
                <label className="form-check-label">No</label>
              </div>
            </div>
            <div className="form-check">
              <div className="form-check-inline">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="fatigue"
                  onChange={handleCheckboxChange}
                />
                <p>Fatigue</p>
                <input className="form-check-input" type="radio" name="fatigue" value="yes" onChange={handleRadioChange} />
                <label className="form-check-label">Yes</label>
                <input className="form-check-input" type="radio" name="fatigue" value="no" onChange={handleRadioChange}  />
                <label className="form-check-label">No</label>
              </div>
            </div>
            <div className="form-check">
              <div className="form-check-inline">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="breathingIssue"
                  onChange={handleCheckboxChange}
                />
                <p>Breathing Issue</p>
                <input className="form-check-input" type="radio" name="breathing" value="yes" onChange={handleRadioChange} />
                <label className="form-check-label">Yes</label>
                <input className="form-check-input" type="radio" name="breathing" value="no" onChange={handleRadioChange}  />
                <label className="form-check-label">No</label>
              </div>
            </div>
            {/* Add more checkbox inputs as needed */}
          </div>
          <button onClick={handleSubmit} className="btn-submit">Submit</button>
          <img src="/assets/diseases.svg" className="disease-image" alt="Diseases" />
        </div>
      )}
    </div>
  );
};

export default Diseases;
