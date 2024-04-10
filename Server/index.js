const express = require('express');
const cors = require('cors');
const pg = require('pg');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module for handling file paths
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
    password: "Arinjay@04",
    port: 5432 // Corrected the property name to 'port'
});

db.connect();

const app = express();
const port = 3001;
const saltRounds = 10;
env.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req,res)=> {
  res.sendFile(path.join(__dirname, '..', '..', 'PULSIFY', 'signinup', 'src', 'components', 'Homepage', 'Homepage.jsx'))
})

// Define a GET route for the login page
app.get('/login', (req, res) => {
    // Assuming your frontend bundle contains a route for /login
    res.sendFile(path.join(__dirname, '..', '..', 'PULSIFY', 'signinup', 'src', 'components', 'Loginform', 'LoginForm.jsx'));
});

// Define a GET route for the register page
app.get('/register', (req, res) => {
    // Assuming signUpForm.jsx is in the 'SignUpForm' directory
    res.sendFile(path.join(__dirname, '..', '..', 'PULSIFY', 'signinup', 'src', 'components', 'SignUpForm', 'signUpForm.jsx'));
});

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new Strategy((email, password, done) => {
  try {
    db.query("SELECT * FROM patient WHERE email = $1", [email])
      .then(result => {
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;

          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              console.error("Error comparing passwords:", err);
              return done(err);
            } else {
              if (valid) {
                return done(null, user); // Authentication successful
              } else {
                return done(null, false, { message: 'Incorrect password.' }); // Incorrect password
              }
            }
          });
        } else {
          return done(null, false, { message: 'User not found.' }); // User not found
        }
      })
      .catch(err => {
        console.error("Error querying database:", err);
        return done(err);
      });
  } catch (err) {
    console.error("Error in Passport strategy:", err);
    return done(err);
  }
}));

// app.post('/login', passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/register",
//   failureFlash: true, // Enable flash messages for failure cases
// }));

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  // This code block will only execute if authentication is successful
  res.status(200).json({ message: 'Login successful' });
}, (err, req, res, next) => {
  // This middleware will handle failed authentication
  res.status(401).json({ message: 'Authentication failed. Incorrect email or password.' });
});

passport.serializeUser((user, cb) => {
   return cb(null, user);
});

passport.deserializeUser((user, cb) => {
  return  cb(null, user);
    
});



app.post('/register', async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const number = req.body.Number;
  const email = req.body.email;
  const dob = req.body.dob;
  const address = req.body.Address;
  const pin = req.body.Code;
  const password = req.body.password;
  const cpassword = req.body.cpassword;

    // Check if passwords match
    if (password !== cpassword) {
        res.status(400).send("Passwords do not match");
        return;
    }

    try {
        const checkResult = await db.query("SELECT * FROM patient WHERE email = $1", [email]);

        if (checkResult.rows.length > 0) {
            res.status(400).send("User with this email already exists");
        } else {
            const hash = await bcrypt.hash(password, saltRounds);
            const result = await db.query("INSERT INTO patient(firstname, lastname, email, dob, address, pin, password, confirmpass, mobile) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [firstname, lastname, email, dob, address, pin, hash, hash, number]);
            const user = result.rows[0];
                  req.login(user, (err) => {
                      console.log("success");
                      res.redirect("/login");
                  });
        }
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).send("Error registering user");
    }
});

app.listen(port, () => {
    console.log("The port is running");
});
