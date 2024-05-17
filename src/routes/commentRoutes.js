const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /comments:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Create a new comment
 *     description: Create a new comment
 *     parameters:
 *       - in: body
 *         name: comment
 *         description: The comment to create
 *         schema:
 *           type: object
 *           required:
 *             - text
 *             - author
 *           properties:
 *             text:
 *               type: string
 *             author:
 *               type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/comments', authMiddleware, commentController.createComment);

/**
 * @swagger
 * /comments:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get all comments
 *     description: Retrieve a list of all comments
 *     responses:
 *       200:
 *         description: List of comments
 *       500:
 *         description: Internal server error
 */
router.get('/comments', commentController.getAllComments);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get comment by ID
 *     description: Retrieve a comment by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Comment details
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.get('/comments/:id', commentController.getCommentById);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     tags:
 *       - Comments
 *     summary: Update comment by ID
 *     description: Update a comment by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *       - in: body
 *         name: comment
 *         description: The comment to update
 *         schema:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *             author:
 *               type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.put('/comments/:id', authMiddleware, commentController.updateCommentById);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Delete comment by ID
 *     description: Delete a comment by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.delete('/comments/:id', authMiddleware, commentController.deleteCommentById);

module.exports = router;
