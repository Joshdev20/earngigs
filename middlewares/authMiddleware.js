const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Retrieve the token from cookies
  const token = req.cookies.token; // Ensure cookie-parser is used
  if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach decoded user to request
    next();  // Continue to the next middleware/route handler
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
