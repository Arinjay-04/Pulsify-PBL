const express = require('express');
const cors = require('cors');
const pg = require('pg');
const hospital = require('./New_Hospitals.json');
const diseases = require('./New_dataset.json');
const bodyParser = require('body-parser');
const path = require('path'); 
const bcrypt = require("bcrypt");
const passport = require("passport");
const { Strategy } = require("passport-local");
const session = require("express-session");
const flash = require('connect-flash');
const env = require("dotenv");


const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "PBL",
    password: "Arinjay04",
    port: 5432 
});
const app = express();

app.use(express.json());
app.use(cors()); 
db.connect();
const saltRounds = 10;
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


  app.use(session({
    secret: 'your_secret_key', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(flash());
  
app.post('/login', async (req, res) => {
    const { email , password } = req.body;

    try {
        console.log("Attempting login for:", email);

        const userResult = await db.query("SELECT * FROM pbldb WHERE email = $1", [email]);
        
        if (userResult.rows.length === 0) {
            res.status(400).send("User with this email does not exist");
            console.log("User with this email does not exist");
        } else {
            const user = userResult.rows[0];
            console.log("Stored Hashed Password:", user.password);

            const match = await bcrypt.compare(password, user.password);
            console.log("Password Match:", match);

            if (match) {
                req.session.user = user;
                res.status(200).json({ message: 'Login successful' });
            } else {
                req.flash('error', 'Incorrect password');
                res.status(400).send("Incorrect password");
                console.log("Incorrect password");
            }
        }
    } catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).send("Error logging in user");
    }
});

app.post('/signup', async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const number = req.body.Number;
    const dob = req.body.dob;
    const bloodgrp = req.body.bloodGroup;
    const password = req.body.password;

    try {
        const checkResult = await db.query("SELECT * FROM pbldb WHERE email = $1", [email]);

        if (checkResult.rows.length > 0) {
            res.status(400).send("User with this email already exists");
            console.log("User with this email already exists");
        } else {
            const hash = await bcrypt.hash(password, saltRounds);
            const user = await db.query("INSERT INTO pbldb(firstname, lastname, email, number, dob, bg, password) VALUES ($1, $2, $3, $4, $5, $6, $7)", [firstname, lastname, email, number, dob, bloodgrp,  hash]);
            req.session.user = user; // Log the user in by saving user information in session
            console.log("Session ID after signup:", req.sessionID); // Log the session ID
            res.status(200).json({ message: 'Signup successful' });
            // res.redirect('/');
        }
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).send("Error registering user");
    }
});

app.get('/hospitals', async (req, res) => {
    try {
        const { state, city } = req.query; 
        console.log(`State: ${state}`);
        console.log(`City: ${city}`);
        
        if (!state || !city) {
            return res.status(400).json({ error: 'State and City are required' });
        }

        
        const query = "SELECT * FROM hospitals WHERE state=$1 AND city=$2";
        const params = [state.trim(), city.trim()];  

        const result = await db.query(query, params);
        

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No hospitals found' });
        }

        const results = result.rows.map(hosp => ({
            name: hosp.name,
            address: hosp.address,
        }));

        res.json(results);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/diseases', async (req, res) => {
    try {
      const { selectedSymptoms, gender, bloodPressure, cholesterol } = req.body;
  
      // Extract values from selectedSymptoms
      const fever = selectedSymptoms.fever.value;
      const cough = selectedSymptoms.cough.value;
      const fatigue = selectedSymptoms.fatigue.value;
      const breath = selectedSymptoms.breathing.value;
      console.log(fever+" "+cough)
      console.log(bloodPressure);
  
      // Database query to find matching disease
      const queryText = `
        SELECT disease 
        FROM diseases 
        WHERE fever=$1 AND cough=$2 AND fatigue=$3 AND breath=$4 AND gender=$5 AND bp=$6 AND choles=$7
      `;
      const queryValues = [fever, cough, fatigue, breath, gender, bloodPressure, cholesterol];
  
      const result = await db.query(queryText, queryValues);
  
      console.log('Query Result:', result);
  
      if (result.rowCount === 0) {
        res.status(404).json({ message: "No records found" });
        console.log("No Disease");
        return;
      }
  
      res.status(200).json(result.rows.map(row => row.disease));
    } catch (error) {
      res.status(500).json({ message: "Error in fetching data", error: error.message });
      console.error("Error in fetching data:", error);
    }
  });
  

app.listen(3001, () => {
    console.log("The port is running");
});

                                             //INSERTING DATA IN DATABASE// 

// app.post('/hospitalinsert', (req, res) => {
//     try {
//         for (let i = 0; i <hospital.length ; i++) {
//             const { Hospital, State, City, LocalAddress, Pincode  } = hospital[i];
//             // console.log( State);
//             // console.log(Hospital);
                
//             db.query('INSERT INTO hospitals ( name , state , city , address, pincode) VALUES ($1, $2, $3, $4, $5)', 
//                 [Hospital, State, City, LocalAddress, Pincode ],
//                 (error, results) => {
//                     if (error) {
//                         console.error("Error inserting hospital:", error);
//                     } else {
//                         console.log("Hospital inserted successfully:", results);
//                     }
//                 });
//         }
//         res.status(200).send("Data inserted successfully");
//     } catch (err) {
//         console.error("Error:", err);
//         res.status(500).send("Error inserting data");
//     }
// });
