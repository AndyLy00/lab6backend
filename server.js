const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key'; // You should use an environment variable for this in production

app.use(bodyParser.json());

// Dummy user for demonstration purposes
const user = {
    email: 'andy@gmail.com',
    password: "password" // hashed password
};

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Simple email/password validation
    if (email === user.email && password === user.password) {
        // Generate JWT token
        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1m' });
        return res.status(200).json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
});

// // Protected endpoint
// app.get('/protected', (req, res) => {
//     const token = req.headers['authorization'];
//     if (!token) {
//         return res.status(403).json({ message: 'No token provided' });
//     }
//
//     jwt.verify(token, SECRET_KEY, (err, decoded) => {
//         if (err) {
//             return res.status(500).json({ message: 'Failed to authenticate token' });
//         }
//
//         // If token is valid, send protected data
//         res.status(200).json({ message: 'This is protected data', user: decoded });
//     });
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
