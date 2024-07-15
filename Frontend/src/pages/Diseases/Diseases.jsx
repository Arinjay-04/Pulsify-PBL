import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Diseases.css';
import Loading from '../Loading/Loading'; // Import your Loading component
import { Navbar } from '../../components';

const Diseases = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [manualSymptoms, setManualSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [cholesterol, setCholesterol] = useState('');
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
        age,
        gender,
        bloodPressure,
        cholesterol
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
        <div>
          <Navbar />
          <section className='flex justify-center items-center'>
            <div className='flex bg-blue-100 justify-between items-center rounded-md p-6 w-[1270px] m-10 max-md:flex-col-reverse'>
              {/* Image Section */}
              <div className='w-[30%]'>
                <img src="/assets/diseases.svg" className="disease-image" alt="Diseases" />
              </div>

              {/* Form Section */}
              <div className='w-[60%]'>
                <hr />
                <h2>Select Symptoms:</h2>
                <div className="form-container">
                  <div className="select-symptoms">
                  <div className="form-check">
                       <div className="form-check-inline">
                     <input  type="checkbox"
                          className="form-check-input"
                          name="fever"
                          onChange={handleCheckboxChange}
                        />
                        <p>Fever</p>
                        <input className="form-check-input" type="radio" name="fever" value="yes" onChange={handleRadioChange} />
                        <label className="form-check-label">Yes</label>
                        <input className="form-check-input" type="radio" name="fever" value="no" onChange={handleRadioChange} />
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
                        <input className="form-check-input" type="radio" name="cough" value="no" onChange={handleRadioChange} />
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
                        <input className="form-check-input" type="radio" name="fatigue" value="no" onChange={handleRadioChange} />
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
                        <input className="form-check-input" type="radio" name="breathing" value="no" onChange={handleRadioChange} />
                        <label className="form-check-label">No</label>
                      </div>
                    </div>

                    {/* Age Selection */}
                    <div className="form-group">
                      <label htmlFor="age">Age:</label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>

                    {/* Gender Selection */}
          
                  <div className="form-group">
                    <label>Gender:</label>
                    <div className="form-check-inline">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label>Male</label>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label>Female</label>
                    </div>
                  </div>

                    {/* BP Selection */}
                    <div className="form-group">
                      <label>Blood Pressure:</label>
                      <select value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)}>
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    {/* Cholesterol Selection */}
                    <div className="form-group">
                      <label>Cholesterol:</label>
                      <select value={cholesterol} onChange={(e) => setCholesterol(e.target.value)}>
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <button onClick={handleSubmit} className="btn-submit">Submit</button>
                  </div>
                  </div>
                </div>
              </div>
            
          </section>
        </div>
      )}
    </div>
  );
};

export default Diseases;

