const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /news:
 *   post:
 *     tags:
 *       - News
 *     summary: Create a new news
 *     description: Create a new news
 *     parameters:
 *       - in: body
 *         name: news
 *         description: The news to create
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - body
 *             - imageUrl
 *           properties:
 *             title:
 *               type: string
 *             body:
 *               type: string
 *             imageUrl:
 *               type: string
 *     responses:
 *       201:
 *         description: News created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/news', authMiddleware, newsController.createNews);

/**
 * @swagger
 * /news:
 *   get:
 *     tags:
 *       - News
 *     summary: Get all news
 *     description: Retrieve a list of all news
 *     responses:
 *       200:
 *         description: List of news
 *       500:
 *         description: Internal server error
 */
router.get('/news', newsController.getAllNews);

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     tags:
 *       - News
 *     summary: Get news by ID
 *     description: Retrieve a news by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: News details
 *       404:
 *         description: News not found
 *       500:
 *         description: Internal server error
 */
router.get('/news/:id', newsController.getNewsById);

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     tags:
 *       - News
 *     summary: Update news by ID
 *     description: Update a news by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *       - in: body
 *         name: news
 *         description: The news to update
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             body:
 *               type: string
 *             imageUrl:
 *               type: string
 *     responses:
 *       200:
 *         description: News updated successfully
 *       404:
 *         description: News not found
 *       500:
 *         description: Internal server error
 */
router.put('/news/:id', authMiddleware, newsController.updateNewsById);

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     tags:
 *       - News
 *     summary: Delete news by ID
 *     description: Delete a news by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: News deleted successfully
 *       404:
 *         description: News not found
 *       500:
 *         description: Internal server error
 */
router.delete('/news/:id', authMiddleware, newsController.deleteNewsById);

module.exports = router;
