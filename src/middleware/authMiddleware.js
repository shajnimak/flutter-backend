const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../config/jwt');
const logger = require('../utils/logger');

// Middleware to authenticate user using JWT token
async function authMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        logger.error('No token provided');
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        // Verify token
        const decoded = verifyToken(token);

        // Check if user exists
        const user = await User.findById(decoded.id);
        if (!user) {
            logger.error('User not found');
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }

        req.user = user; // Attach user object to request
        next(); // Proceed to next middleware
    } catch (error) {
        logger.error('Invalid token');
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}

module.exports = authMiddleware;
