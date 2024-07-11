import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Diseases.css'

const Diseases = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [manualSymptoms, setManualSymptoms] = useState('');
  const navigate = useNavigate();

  // Handler for checkbox selection
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, value]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter((symptom) => symptom !== value));
    }
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

  return (
    <div className="diseases">
      <div className="form-group">
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
          <label>
            <input
              type="checkbox"
              value="Fever"
              onChange={handleCheckboxChange}
            />
            Fever
          </label>
          <label>
            <input
              type="checkbox"
              value="Cough"
              onChange={handleCheckboxChange}
            />
            Cough
          </label>
          <label>
            <input
              type="checkbox"
              value="Headache"
              onChange={handleCheckboxChange}
            />
            Headache
          </label>
          {/* Add more checkbox inputs as needed */}
        </div>
        <button onClick={handleSubmit} className="btn-submit">Submit</button>
      </div>
      <img src="/assets/diseases.svg" className="disease-image" alt="Diseases" />
    </div>
  );
};

export default Diseases;
