import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Diseases.css';
import Loading from '../Loading/Loading'; 
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


  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setSelectedSymptoms((prevSymptoms) => ({
      ...prevSymptoms,
      [name]: { ...prevSymptoms[name], value }
    }));
  };

  const HandleSelectGender = (e)=> {
    setGender(e.target.value)
  }

  const HandleSelectAge = (e)=> {
    setAge(e.target.value)
  }

  const HandleSelectBp = (e)=> {
    setBloodPressure(e.target.value)
  }
  const HandleSelectCholes = (e)=> {
    setCholesterol(e.target.value)
  }

  // Handler for submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/diseases', {
        selectedSymptoms,
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
                        <p>Fever</p>
                        <input className="form-check-input" type="radio" name="fever" value="Yes" onChange={handleRadioChange} />
                        <label className="form-check-label">Yes</label>
                        <input className="form-check-input" type="radio" name="fever" value="No" onChange={handleRadioChange} />
                        <label className="form-check-label">No</label>
                      </div>
                    </div>
                    <div className="form-check">
                      <div className="form-check-inline">
                        <p>Cough</p>
                        <input className="form-check-input" type="radio" name="cough" value="Yes" onChange={handleRadioChange} />
                        <label className="form-check-label">Yes</label>
                        <input className="form-check-input" type="radio" name="cough" value="No" onChange={handleRadioChange} />
                        <label className="form-check-label">No</label>
                      </div>
                    </div>
                    <div className="form-check">
                      <div className="form-check-inline">
                        <p>Fatigue</p>
                        <input className="form-check-input" type="radio" name="fatigue" value="Yes" onChange={handleRadioChange} />
                        <label className="form-check-label">Yes</label>
                        <input className="form-check-input" type="radio" name="fatigue" value="No" onChange={handleRadioChange} />
                        <label className="form-check-label">No</label>
                      </div>
                    </div>
                    <div className="form-check">
                      <div className="form-check-inline">
                        <p>Breathing Issue</p>
                        <input className="form-check-input" type="radio" name="breathing" value="Yes" onChange={handleRadioChange} />
                        <label className="form-check-label">Yes</label>
                        <input className="form-check-input" type="radio" name="breathing" value="No" onChange={handleRadioChange} />
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
                        onChange={HandleSelectAge}
                      />
                    </div>

                    {/* Gender Selection */}
          
                    <div className="form-group">
                      <label>Gender:</label>
                      <div className="form-check-inline">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          onChange={HandleSelectGender}
                        />
                        <label>Male</label>
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          onChange={HandleSelectGender}
                        />
                        <label>Female</label>
                      </div>
                    </div>

                     {/* Blood Pressure Selection */}
                     <div className="form-group">
                      <label>Blood Pressure:</label>
                      <select value={bloodPressure} onChange={HandleSelectBp}>
                        <option value="">Select</option>
                        <option value="Low">Low</option>
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
                      </select>
                    </div>

                    {/* Cholesterol Selection */}
                    <div className="form-group">
                      <label>Cholesterol:</label>
                      <select value={cholesterol} onChange={HandleSelectCholes}>
                        <option value="">Select</option>
                        <option value="Low">Low</option>
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
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
