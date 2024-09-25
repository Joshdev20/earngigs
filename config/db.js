const mysql = require('mysql2');
require('dotenv').config();

// Log environment variables to check if they are being read correctly
console.log('Database host:', process.env.DB_HOST);
console.log('Database user:', process.env.DB_USER);
console.log('Database name:', process.env.DB_NAME);


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS || '', // Handles empty password
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;
