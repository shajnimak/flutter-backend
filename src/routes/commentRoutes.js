const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new comment
router.post('/comments', authMiddleware, commentController.createComment);

// Get all comments
router.get('/comments', commentController.getAllComments);

// Get comment by ID
router.get('/comments/:id', commentController.getCommentById);

// Update comment by ID
router.put('/comments/:id', authMiddleware, commentController.updateCommentById);

// Delete comment by ID
router.delete('/comments/:id', authMiddleware, commentController.deleteCommentById);

module.exports = router;
