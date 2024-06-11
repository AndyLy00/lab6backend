const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key'; // You should use an environment variable for this in production

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // or specify allowed origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Simple email/password validation
    if (email && password ) {
        const token = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: '1m' });
        return res.status(200).json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
