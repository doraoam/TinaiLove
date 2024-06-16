require('dotenv').config();

const express = require('express');
const {OAuth2Client} = require('google-auth-library');

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3001/auth/google/callback';
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the TinaiLove App!</h1> <a href="/auth/google">Login with Google</a>');
});

app.get('/auth/google', (req, res) => {
    const url = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
    });
    res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
    const {code} = req.query;
    try {
        const {tokens} = await client.getToken(code);
        client.setCredentials(tokens);
        res.send('Authentication successful! You can close this window.');
    } catch (error) {
        res.send(`Error during authentication: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
