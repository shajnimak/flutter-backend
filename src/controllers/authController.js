const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken } = require('../config/jwt');
const logger = require('../utils/logger');

// Register a new user
async function register(req, res) {
    try {
        const { username, password } = req.body;

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            logger.warn('User registration failed: Username already exists');
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        logger.info('User registered successfully');
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        logger.error('User registration failed:', error);
        res.status(500).json({ error: 'User registration failed' });
    }
}

// Login user
async function login(req, res) {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            logger.warn('Login failed: User not found');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            logger.warn('Login failed: Invalid password');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken({ id: user._id });

        logger.info('Login successful');
        res.status(200).json({ token });
    } catch (error) {
        logger.error('Login failed:', error);
        res.status(500).json({ error: 'Login failed' });
    }
}

module.exports = { register, login };
