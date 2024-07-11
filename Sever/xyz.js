const express = require('express');
const hospital = require('./hospitals1.json');
const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

// const ress = hospital.map(hosp => ({
//     STATE: hosp.STATE,
//     CITY: hosp.CITY
// }));

// console.log(ress);

app.get('/hospitals', (req, res) => {
    const { state, city } = req.query; 
    console.log(state, city);

    const filteredHospitals = hospital.filter(hosp => 
        hosp.STATE === state && hosp.CITY === city
    );

    const result = filteredHospitals.map(hosp => ({
        name: hosp.NAME,
        address: hosp.ADDRESS,
        telephone: hosp.TELEPHONE,
        type: hosp.TYPE
    }));
    console.log(res.status)

    console.log(result)

    res.json(result);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
