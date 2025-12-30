// Import necessary modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Initialize the Express app
const app = express();
const PORT = 3000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Key Check ---
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
if (!API_KEY) {
    console.error('FATAL ERROR: GOOGLE_BOOKS_API_KEY is not defined in your .env file.');
    process.exit(1);
}

// --- Routes ---
app.get('/api/health-check', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Backend server is running and API key is loaded.' });
});

/**
 * Main Search Endpoint (UPDATED)
 * Now accepts an 'orderBy' parameter.
 */
app.get('/api/search', async (req, res) => {
    // Get all parameters from the frontend
    const { q, startIndex, orderBy } = req.query;

    if (!q) {
        return res.status(400).json({ message: 'Search query (q) is required.' });
    }

    const GOOGLE_API_URL = 'https://www.googleapis.com/books/v1/volumes';

    // Set up the parameters for the Google API call
    const params = {
        q: q,
        key: API_KEY,
        maxResults: 40,
        startIndex: startIndex || 0,
        orderBy: orderBy || 'relevance' // Add the orderBy parameter, default to 'relevance'
    };

    try {
        const response = await axios.get(GOOGLE_API_URL, { params });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching from Google Books API:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error fetching data from Google Books API.' });
    }
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Backend is ready and waiting for requests from the frontend...');
});

