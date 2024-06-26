require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3001;  // Server on 3001
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3001/auth/google/callback'; // Adjusted to server port
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const BUILD_PATH = path.join(__dirname, '../build'); // Adjust path to be relative

// Middlewares
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to match your React application's URL
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if you're using https
        httpOnly: true,
        maxAge: 3600000 // Session max age in milliseconds
    }
}));

// Serve static files from the React app
app.use(express.static(BUILD_PATH));

// Authentication Routes
app.get('/auth/google', (req, res) => {
    const url = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
        prompt: 'consent' // This will force the consent screen to be displayed every time this is called
    });
    console.log("Gconnected to ",url)
    res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    
    console.log("Calling back")

    try {
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);
        req.session.tokens = tokens; // Save tokens to the session
        console.log("Redirecting with token:", req.session.tokens);
        res.redirect(`http://localhost:3000/login?token=${tokens.access_token}`); // Include the token in the URL for client-side handling
        // Redirect to React App's main page
        //res.redirect('http://localhost:3000/main'); // Redirects to client
    } catch (error) {
        console.error(`Failed to login: ${error}`);
        res.redirect(`http://localhost:3000/login?error=${encodeURIComponent(error.message)}`);
    }
});

// Check if user is logged in
app.get('/check-auth', (req, res) => {
    if (req.session.tokens) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(BUILD_PATH, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
