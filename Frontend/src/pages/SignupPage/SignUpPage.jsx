import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from 'react-router-dom';
import './signUpForm.css';
import axios from 'axios';
import { string, z } from "zod";
import Loading from '../Loading/Loading';


const SignupForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [firstname, setFName] = useState('');
  const [lastname, setLName] = useState('');
  const [email, setemail] = useState('');
  const [Number, setNumber] = useState('');
  const [dob, setdob] = useState(new Date());
  const [bloodGroup, setBloodGroup] = useState('');
  const [password, setpassword] = useState('');
  const [errors, setErrors] = useState({});
  const [messageColor, setMessageColor] = useState('');
  const [messageText, setMessageText] = useState('');
  const [numberhandle, setnumberhandler] = useState(true);
  const [emailhandler, setemailhandler] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
 

  const navigate = useNavigate();

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setLoading(false); 
    }, 1000); 

    return () => clearTimeout(timeout);
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


  const handleEmailChange = (e) => {
    setemail(e.target.value);
  }


  const handleBloodGroupChange = (e) => {
    setBloodGroup(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
    if (e.target.value.length < 8) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  
  const validateInputs = (data) => {
    
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
      email,
      Number,
      dob,
      bloodGroup,
      password
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if(!email.includes("@")){
      setErrors({ password: "Passwords length must be atleast 8" });
      return;
    }

    if (Number.length !== 10) {
      setMessageText("The mobile number must have atleast 10 digits");
      setnumberhandler(false);
      return;
    }

    if(password.length  < 8){
      setErrors({ password: "Passwords length must be atleast 8" });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/signup', {
        firstname,
        lastname,
        email,
        Number,
        dob,
        bloodGroup,
        password
      });
      if (response.status === 200) { 
        navigate('/homepage'); 
      }else{
        console.log("Error:", response.data);
      }
    } catch (error) {
      setemailhandler(error.response.data);
    }
  };

  return (
    <div className="signup">
      {loading ? (
        <Loading /> 
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
                <input type='email' placeholder='Email' value={email} onChange={handleEmailChange} required />
              </div>
              { <p className='error-message'>{emailhandler}</p>}

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
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  
                /> 
              </div>
              {showModal && <p style={{ color: "red" }}>Passwords Length must be atleast 10 character</p>}
             

              
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
