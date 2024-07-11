import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from 'react-router-dom';
import './signUpForm.css';
import axios from 'axios';
import { z } from "zod";
import Loading from '../Loading/Loading';

const SignupForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [firstname, setFName] = useState('');
  const [lastname, setLName] = useState('');
  const [Number, setNumber] = useState('');
  const [age, setAge] = useState('');
  const [email, setemail] = useState('');
  const [dob, setdob] = useState(new Date());
  const [bloodGroup, setBloodGroup] = useState('');
  const [Address, setAddress] = useState('');
  const [Code, setCode] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [errors, setErrors] = useState({});
  const [messageColor, setMessageColor] = useState('');
  const [messageText, setMessageText] = useState('');
  const [numberhandle, setnumberhandler] = useState(true);
  const [loading, setLoading] = useState(true); // Loading state

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a loading delay (for demonstration purposes)
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after timeout
    }, 1000); // Adjust the timeout duration as needed

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, []);

  const handleFirstNameChange = (e) => {
    setFName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLName(e.target.value);
  }

  const handleMobileChange = (e) => {
    const num = e.target.value;
    if (num.length < 10 || num.length > 10) {
      setnumberhandler(false);
    } else {
      setnumberhandler(true);
    }
    setNumber(num);
  }

  const handleAge = (e) => {
    setAge(e.target.value);
  }

  const handleEmailChange = (e) => {
    setemail(e.target.value);
  }

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  }

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  }

  const handleBloodGroupChange = (e) => {
    setBloodGroup(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setpassword(enteredPassword);
  };

  const handleCPasswordChange = (e) => {
    setCpassword(e.target.value);
    if (e.target.value !== password) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const validateInputs = (data) => {
    // Assuming schema is defined correctly
    try {
      schema.parse(data);
      return {}; 
    } catch (err) {
      if (err && err.errors) {
        return err.errors.reduce((acc, error) => {
          acc[error.path.join('.')] = error.message;
          return acc;
        }, {});
      } else {
        return {};
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateInputs({
      firstname,
      lastname,
      Number,
      age,
      email,
      dob,
      bloodGroup,
      Address,
      Code,
      password,
      cpassword,
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (Number.length !== 10) {
      setMessageText("10 digit Number");
      setnumberhandler(false);
      return;
    }

    if (password !== cpassword) {
      setErrors({ cpassword: "Passwords don't match" });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/signup', {
        firstname,
        lastname,
        Number,
        age,
        email,
        dob,
        bloodGroup,
        Address,
        Code,
        password,
        cpassword,
      });
      if (response.status === 200) { // Assuming 200 means successful signup
        navigate('/homepage'); // Redirect to home page
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <div className="signup">
      {loading ? (
        <Loading /> // Display Loading component while loading
      ) : (
        <>
          <div className='wrapper'>
            <form onSubmit={handleSubmit}>
              <h1>Signup</h1>
              <div className='Input-Box'>
                <input
                  type='text'
                  id='firstname'
                  placeholder='First Name'
                  value={firstname}
                  onChange={handleFirstNameChange}
                  required
                />
                <input
                  type='text'
                  id='lastname'
                  placeholder='Last Name'
                  value={lastname}
                  onChange={handleLastNameChange}
                  required
                />
              </div>

              <div className='Input-Box'>
                <div className='input-wrapper'>
                  <input
                    type='tel'
                    placeholder='Mobile Number'
                    value={Number}
                    onChange={handleMobileChange}
                    required
                  />
                  {!numberhandle && <p className='error-message'>{messageText}</p>}
                </div>

                <div>
                  <input
                    type='number'
                    placeholder='Age'
                    value={age}
                    onChange={handleAge}
                    required
                  />
                </div>
              </div>

              <div className='Input-Box'>
                <input type='email' placeholder='Email' value={email} onChange={handleEmailChange} required />
              </div>

              <div className='Input-Box'>
                <DatePicker
                  className="Date"
                  selected={dob}
                  onChange={date => setdob(date)}
                  placeholderText='Date of Birth'
                  dateFormat='dd/MM/yyyy'
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={70}
                  popperPlacement="bottom"
                />

                <select className="dropdown" value={bloodGroup} onChange={handleBloodGroupChange}>
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className='Input-Box'>
                <input type='text' placeholder='Residents Address' value={Address} onChange={handleAddressChange} required />
              </div>
              <div className='Input-Box'>
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <input
                  type='password'
                  placeholder='Confirm Password'
                  value={cpassword}
                  onChange={handleCPasswordChange}
                  required
                />
              </div>

              {showModal && <p style={{ color: "red" }}>Passwords didn't match</p>}

              <button type='submit' className='b1'>Signup</button>

              <div className='registration-link'>
                <p>Already have an account? <Link to="/login">Login Here</Link></p>
              </div>
            </form>
          </div>
          <img src="/assets/image1.svg" width="500" height="600" alt="Diseases" />
        </>
      )}
    </div>
  );
};

export default SignupForm;
