const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware
require('dotenv').config();
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//LISTEN
app.listen(4005, ()=>{
    console.log('Server running on port 4005');
})