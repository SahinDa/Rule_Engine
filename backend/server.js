const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const ruleRoutes = require('./routes/rules');  // Importing rule routes

require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(cors());


const port =  3000;

// Basic authentication middleware
app.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || token !== "your_secret_token") {
        return res.status(401).send('Unauthorized');
    }
    next();
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ruleEngine')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use rule routes
app.use('/rules', ruleRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
