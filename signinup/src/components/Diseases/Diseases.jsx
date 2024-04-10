import React, { useState } from 'react';
import './Diseases.css';

const Diseases = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  // Handler for checkbox selection
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, value]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter((symptom) => symptom !== value));
    }
  };

  return (
    <div className="diseases">
      <div className="form-group">
      <h2>Enter symptoms manually</h2>
      <input type='text' name='symptoms' placeholder='Enter Disease'/>
       <br/>
       <hr/>
        <br/>
        <h2>Select Symptoms:</h2>
        <div className="selectsymptoms">
          <div>
            <input
              type="checkbox"
              id="fever"
              name="symptoms"
              value="Fever"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="fever">Fever</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="cough"
              name="symptoms"
              value="Cough"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="cough">Cough</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="headache"
              name="symptoms"
              value="Headache"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="headache">Headache</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="vomiting"
              name="symptoms"
              value="Nausea and Vomiting"
              onChange={handleCheckboxChange}
            />
            
            <label htmlFor="vomiting">Nausea and Vomiting</label>
            </div>

          <div>
            <input
              type="checkbox"
              id="Rash"
              name="symptoms"
              value="Rash"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="Rash">Rash</label>
          </div>
          <br/>
          
          <h3> or </h3>

          <br/>

          <h2>Enter symptoms manually</h2>
          <input type='text' name='symptoms' placeholder='Enter Symptoms'/>

        </div>

        
      </div>
      <img src="Diseases.svg" width="500" height="600" alt="Diseases" />
    </div>
  );
};

export default Diseases;
