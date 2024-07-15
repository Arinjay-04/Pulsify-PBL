const express = require('express');
const cors = require('cors');
const pg = require('pg');
const hospital = require('./hospitals1.json');
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

app.get('/hospitals', async(req, res) => {
    try{
        const { state, city } = req.query; 
        const result = await  db.query("SELECT NAME, ADDRESS, TELEPHONE, TYPE, STATUS FROM hospitals WHERE STATE = $1 and CITY = $2",[state, city]);
        const results = result.rows.map(hosp => ({
            name: hosp.name,
            address: hosp.address,
            telephone: hosp.telephone,
            type: hosp.type,
            status: hosp.status
        }));
        res.json(results);
    }catch(err){
        console.log("error: ", err);
    }
});





app.post('/diseases', async  (req, res) => {
    try{
    const ans = req.body.selectedSymptoms;
    const Fever = ans.fever.value;
    const cough = ans.cough.value;
    const fatigue = ans.fatigue.value;
    const breath = ans.breathing.value;
    console.log(Fever+  " " + cough);
    const disease = await db.query(
        'SELECT disease FROM diseases WHERE fever=$1 AND cough=$2 AND fatigue=$3 AND breath=$4', 
        [Fever, cough, fatigue, breath]
      );
      
      console.log('Query Result:', disease); // Log the entire result object

      if (disease.rowCount === 0) {
        res.status(404).send("No records found");
        console.log("No Disease");
        return;
      }
  
       res.status(200).send(disease.rows.map(row => row.disease)); 
       return;

    }catch(error){
        res.status(404).send("No records found");
        console.log("Error in fetching data: ", error);
        return;
    }
    
    

});

app.listen(3001, () => {
    console.log("The port is running");
});

                                             // INSERTING DATA IN DATABASE

// app.post('/hospitalinsert', (req, res) => {
//     try {
//         for (let i = 0; i < diseases.length; i++) {
//             const { Disease, Fever, Cough , Fatigue ,breath, Age , Gender , BP , Choles, outcome } = diseases[i];
//             db.query('INSERT INTO diseases (disease, fever, cough , fatigue , breath, age , gender , bp , choles, outcome) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', 
//                 [Disease, Fever, Cough , Fatigue ,breath, Age , Gender , BP , Choles, outcome],
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
