import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { FaUser, FaLock, FaEnvelope, FaMobileAlt, FaAddressCard } from 'react-icons/fa';
// import { MdOutlineLocationOn } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './signUpForm.css';
import axios from 'axios';
import { z } from "zod";


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
  const [numberhandle , setnumberhandler] = useState(true);

  const navigate = useNavigate();

  // const schema = z.object({
  //   firstname: z.string().nonempty(),
  //   lastname: z.string().nonempty(),
  //   Number: z.string().nonempty().min(10),
  //   email: z.string().nonempty().email(),
  //   dob: z.date(),
  //   Address: z.string().nonempty(),
  //   Code: z.string().nonempty(),
  //   password: z.string().min(6),
  //   cpassword: z.string().min(6),
  // });

 



  

  const handleFirstNameChange = (e) => {
    setFName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLName(e.target.value);
  }

  const handleMobileChange = (e) => {
    const num = e.target.value;
    console.log("Mobile Number input:", num); // Debug statement
    if(num.length < 10 || num.length > 10){
         setnumberhandler(false);
    }else{
      setnumberhandler(true);
    }
    setNumber(num);
    console.log("Updated Mobile Number state:", Number); // Debug statement
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
    try {
      schema.parse(data);
      return {}; 
    } catch (err) {
      if (err && err.errors) {
        console.error(err.errors);
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

    if(Number.length !== 10){
      setMessageText(" 10 digit Number")
      setnumberhandler(false);
      console.log("10 digit validation failed")
      return;
    }

    if (password !== cpassword) {
      setErrors({ cpassword: "Passwords don't match" });
      console.log("Incorrect password");
      // setShowModal(true);
      // setMessageColor('red');
      // setMessageText("Passwords don't match");
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
        navigate('/'); // Redirect to home page
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  

  
  // const closeModal = () => {
  //   setShowModal(false);
  // }
  
  

  return (
    <div className="signup">
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
    {!numberhandle && <p className='error-message'> {messageText}</p>}
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
          {/* <FaAddressCard className='icon' /> */}
        </div>
        {/* <div className='Input-Container'> */}
  <div className='Input-Box'>
    <DatePicker className="Date"
      selected={dob}
      onChange={date => setdob(date)}
      placeholderText='Date of Birth'
      dateFormat='dd/MM/yyyy'
      showYearDropdown
      scrollableYearDropdown
      yearDropdownItemNumber={70}
      popperPlacement="bottom"
      // minDate={minDate}
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
  {/* <div className="Input-Box">
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Dropdown
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
        <button class="dropdown-item" type="button">Action</button>
        <button class="dropdown-item" type="button">Another action</button>
        <button class="dropdown-item" type="button">Something else here</button>
      </div>
    </div>
  </div>
</div> */}


        <div className='Input-Box'>
          <input type='text' placeholder='Residents Address' value={Address} onChange={handleAddressChange} required />
          {/* <FaAddressCard className='icon' /> */}
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
  {/* <FaLock className='icon' /> */}
</div>

{/*
  {Object.keys(errors).map((key) => (
    <p key={key} className="error-message">{errors[key]}</p>
  ))}
*/}

{showModal && <p style={{color: "red"}}>Passwords didn't match</p>}

      <button type='submit' className='b1'>Signup</button>
      {/* Registration link */}
      <div className='registration-link'>
        <p>Already have an account? <Link to="/login">Login Here</Link></p>
      </div>
    </form>
   
  </div>
  <img src="/assets/image1.svg" className="" width="500" height="600" alt="Diseases" />
  </div>
  );

      };
    

export default SignupForm;