const express = require('express');
const router = express.Router();
const stuffController = require('../controllers/stuffController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /stuffs:
 *   post:
 *     tags:
 *       - Stuff
 *     summary: Create a new stuff
 *     description: Create a new stuff
 *     parameters:
 *       - in: body
 *         name: stuff
 *         description: The stuff to create
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - description
 *             - imageUrl
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             imageUrl:
 *               type: string
 *     responses:
 *       201:
 *         description: Stuff created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/stuffs', authMiddleware, stuffController.createStuff);

/**
 * @swagger
 * /stuffs:
 *   get:
 *     tags:
 *       - Stuff
 *     summary: Get all stuffs
 *     description: Retrieve a list of all stuffs
 *     responses:
 *       200:
 *         description: List of stuffs
 *       500:
 *         description: Internal server error
 */
router.get('/stuffs', stuffController.getAllStuffs);

/**
 * @swagger
 * /stuffs/{id}:
 *   get:
 *     tags:
 *       - Stuff
 *     summary: Get stuff by ID
 *     description: Retrieve a stuff by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Stuff details
 *       404:
 *         description: Stuff not found
 *       500:
 *         description: Internal server error
 */
router.get('/stuffs/:id', stuffController.getStuffById);

/**
 * @swagger
 * /stuffs/{id}:
 *   put:
 *     tags:
 *       - Stuff
 *     summary: Update stuff by ID
 *     description: Update a stuff by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *       - in: body
 *         name: stuff
 *         description: The stuff to update
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             imageUrl:
 *               type: string
 *     responses:
 *       200:
 *         description: Stuff updated successfully
 *       404:
 *         description: Stuff not found
 *       500:
 *         description: Internal server error
 */
router.put('/stuffs/:id', authMiddleware, stuffController.updateStuffById);

/**
 * @swagger
 * /stuffs/{id}:
 *   delete:
 *     tags:
 *       - Stuff
 *     summary: Delete stuff by ID
 *     description: Delete a stuff by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Stuff deleted successfully
 *       404:
 *         description: Stuff not found
 *       500:
 *         description: Internal server error
 */
router.delete('/stuffs/:id', authMiddleware, stuffController.deleteStuffById);

module.exports = router;
