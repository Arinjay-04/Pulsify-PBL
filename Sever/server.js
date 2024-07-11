const express = require('express');
const cors = require('cors');
const pg = require('pg');
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
                res.status(200).json({ message: 'Login successful' });
                // res.redirect('/'); // Assuming you have a dashboard route after login
            } else {
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
    const number = req.body.Number;
    const age = req.body.age;
    const email = req.body.email;
    const dob = req.body.dob;
    const bloodgrp = req.body.bloodGroup;
    const address = req.body.Address;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
  
    console.log(number);
    if (password !== cpassword) {
        return res.status(400).send("Passwords do not match");
    }

    try {
        const checkResult = await db.query("SELECT * FROM pbldb WHERE email = $1", [email]);

        if (checkResult.rows.length > 0) {
            res.status(400).send("User with this email already exists");
            console.log("User with this email already exists");
        } else {
            const hash = await bcrypt.hash(password, saltRounds);
            await db.query("INSERT INTO pbldb(firstname, lastname, number, age, email, dob, bg, address, password, cpassword) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [firstname, lastname, number, age, email, dob, bloodgrp, address, hash, hash]);
            console.log("User registered successfully");
            res.status(200).send("Signup successful");
            // res.redirect('/');
        }
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).send("Error registering user");
    }
});

app.listen(3001, () => {
    console.log("The port is running");
});


app.post('/diseases', (req, res) => {
    const ans1 = req.body.selectedSymptoms;
    const ans2 = req.body.manualSymptoms;
    console.log(ans1);
    console.log(ans2);
    
    // Assuming you want to send a success message back to the client
    res.status(200).send('Data received successfully.');
});
