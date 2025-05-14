// SERVER
const express = require('express');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

// Express middleware
const app = express();

// Rate limiter
app.set('trust proxy', 1);      // trust Vercel proxy
const limiter = rateLimit({ windowMs: 60 * 1000, max: 20 }); // 20 requests per minute
app.use(limiter);

// CORS middleware
const corsOptions = { 
    methods: ['POST', 'GET'],
    origin: ['https://vodaone.vercel.app', 'http://localhost:3000', 'https://netvdf.pt', 'https://www.netvdf.pt'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
};
app.use(cors(corsOptions));

// Helmet security header
const helmetDirectives = { directives: {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'","data:","https://res.cloudinary.com/dxty1jkt7/"],
}};
app.use(helmet.contentSecurityPolicy(helmetDirectives));

// Parse JSON bodies
app.use(express.json());

// Set inner directories
app.use('/setup', express.static(path.join(__dirname, 'setup')));

// Start the server
const PORT = process.env.PORT || 5000;
const log = require('./functions/utils/log.jsx');
app.listen(PORT, () => {
    log("SERVER INFO", `Server is running on port ${PORT}`);
});

// Route to check server status
app.get('/ping', (req, res) => {
    res.status(200).json({ message: "Pong" });
});

// Route to get auth token
app.get('/api/auth/token', (req, res) => {
    res.json({ authToken: process.env.AUTH_TOKEN });
});

// Route to send email
const sendEmail = require('./functions/sendEmail.jsx');
app.post('/api/submit', async (req, res) => {
    // Ignore other requests
    if (req.method !== 'POST') {
        return res.status(200).json({ message: 'ok' });
    }
    // Ping function
    if (req && req.body && req.body.ping) {
        return res.status(200).json({ message: "pong" });
    }
    // Validate request
    if (!req.body || !req.body.authToken || !req.body.zipcode || !req.body.phone) {
        return res.status(400).json({ error: 'Invalid request body' });
      }
    // Send email
    try {
        const result = await sendEmail(req.body);
        return res.status(200).json({ message: "Email sent successfully" });
    // Catch errors
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});