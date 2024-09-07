require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// enable 'Access-Control-Allow-Origin' header from all sources
app.use(cors());

app.use(express.static('public'));
app.use(express.json());

// env variables
const PORT = process.env.PORT || 4242;

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Cozy Threads backend server.' });
});

// routes
require('./routes/payments.routes.js')(app);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
