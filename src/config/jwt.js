const jwt = require('jsonwebtoken');

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

// Generate JWT token
function generateToken(payload) {
    return jwt.sign(payload, "Aasdwi383fdskj", { expiresIn: '1h' }); // Token expires in 1 hour
}

// Verify JWT token
function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = { generateToken, verifyToken };
