const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to check API key
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key']; // Get the API key from the request headers
  const validApiKey = process.env.API_KEY; // Get the valid API key from environment variables

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(403).json({ error: 'Forbidden: Invalid or missing API key' });
  }

  next(); // Proceed to the next middleware/route
};

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());

// Apply API key middleware to all routes
app.use(apiKeyMiddleware);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// Routes
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users); // Return the users as a JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});