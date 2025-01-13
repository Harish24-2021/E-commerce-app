const db = require('../models/db');

// Get all users
const getAllUsers = (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err.message);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
};

// Create a new user
const createUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, results) => {
        if (err) {
            console.error('Error creating user:', err.message);
            res.status(500).send('Error creating user');
            return;
        }
        res.status(201).send('User created successfully');
    });
};

module.exports = { getAllUsers, createUser };
