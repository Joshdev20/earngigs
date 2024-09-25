const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const mysql = require('mysql2/promise');

// Create MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'earngigs',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// User registration endpoint
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database (without username)
        await pool.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, role]);

        // Respond with success
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error creating user:', error); // Log the error for debugging
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

// User login endpoint
router.post('/login', async (req, res) => {
    const { name, password } = req.body;

    // Log incoming data for debugging
    console.log('Login data:', req.body);

    // Validate required fields
    if (!name || !password) {
        return res.status(400).json({ message: 'username and password are required' });
    }

    try {
        // Fetch user by name
        const [rows] = await pool.query('SELECT * FROM users WHERE name = ?', [name]);
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Respond with success
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error); // Log the error
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

module.exports = router;
