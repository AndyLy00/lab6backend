const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = process.env.SECRET_KEY;

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
    if (email && password) {
        const token = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: '1m' });
        return res.status(200).json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
});

module.exports.handler = serverless(app);