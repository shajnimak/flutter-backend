const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new news
router.post('/news', authMiddleware, newsController.createNews);

// Get all news
router.get('/news', newsController.getAllNews);

// Get news by ID
router.get('/news/:id', newsController.getNewsById);

// Update news by ID
router.put('/news/:id', authMiddleware, newsController.updateNewsById);

// Delete news by ID
router.delete('/news/:id', authMiddleware, newsController.deleteNewsById);

module.exports = router;
