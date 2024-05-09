const Comment = require('../models/Comment');
const logger = require('../utils/logger');

// Create a new comment
async function createComment(req, res) {
    try {
        const { text, author } = req.body;
        const newComment = new Comment({ text, author });
        await newComment.save();
        logger.info('Comment created successfully');
        res.status(201).json(newComment);
    } catch (error) {
        logger.error('Error creating comment:', error);
        res.status(500).json({ error: 'Error creating comment' });
    }
}

// Get all comments
async function getAllComments(req, res) {
    try {
        const comments = await Comment.find();
        logger.info('Retrieved all comments');
        res.status(200).json(comments);
    } catch (error) {
        logger.error('Error retrieving comments:', error);
        res.status(500).json({ error: 'Error retrieving comments' });
    }
}

// Get comment by ID
async function getCommentById(req, res) {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            logger.warn('Comment not found');
            return res.status(404).json({ error: 'Comment not found' });
        }
        logger.info('Retrieved comment by ID');
        res.status(200).json(comment);
    } catch (error) {
        logger.error('Error retrieving comment by ID:', error);
        res.status(500).json({ error: 'Error retrieving comment by ID' });
    }
}

// Update comment by ID
async function updateCommentById(req, res) {
    try {
        const { text, author } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { text, author },
            { new: true }
        );
        if (!updatedComment) {
            logger.warn('Comment not found');
            return res.status(404).json({ error: 'Comment not found' });
        }
        logger.info('Comment updated successfully');
        res.status(200).json(updatedComment);
    } catch (error) {
        logger.error('Error updating comment:', error);
        res.status(500).json({ error: 'Error updating comment' });
    }
}

// Delete comment by ID
async function deleteCommentById(req, res) {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            logger.warn('Comment not found');
            return res.status(404).json({ error: 'Comment not found' });
        }
        logger.info('Comment deleted successfully');
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        logger.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Error deleting comment' });
    }
}

module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    updateCommentById,
    deleteCommentById
};
