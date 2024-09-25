const jwt = require('jsonwebtoken');

const createToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expiration time
  });
};

module.exports = { createToken };
