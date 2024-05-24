const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /actors:
 *   post:
 *     tags:
 *       - Actors
 *     summary: Create a new actor
 *     description: Create a new actor
 *     parameters:
 *       - in: body
 *         name: actor
 *         description: The actor to create
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - characterName
 *           properties:
 *             name:
 *               type: string
 *             characterName:
 *               type: string
 *             bio:
 *               type: string
 *             imageUrl:
 *               type: string
 *     responses:
 *       201:
 *         description: Actor created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/actors', authMiddleware, actorController.createActor);

/**
 * @swagger
 * /actors:
 *   get:
 *     tags:
 *       - Actors
 *     summary: Get all actors
 *     description: Retrieve a list of all actors
 *     responses:
 *       200:
 *         description: List of actors
 *       500:
 *         description: Internal server error
 */
router.get('/actors', actorController.getAllActors);

/**
 * @swagger
 * /actors/{id}:
 *   get:
 *     tags:
 *       - Actors
 *     summary: Get actor by ID
 *     description: Retrieve an actor by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Actor details
 *       404:
 *         description: Actor not found
 *       500:
 *         description: Internal server error
 */
router.get('/actors/:id', actorController.getActorById);

/**
 * @swagger
 * /actors/{id}:
 *   put:
 *     tags:
 *       - Actors
 *     summary: Update actor by ID
 *     description: Update an actor by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *       - in: body
 *         name: actor
 *         description: The actor to update
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             characterName:
 *               type: string
 *             bio:
 *               type: string
 *             imageUrl:
 *               type: string
 *     responses:
 *       200:
 *         description: Actor updated successfully
 *       404:
 *         description: Actor not found
 *       500:
 *         description: Internal server error
 */
router.put('/actors/:id', authMiddleware, actorController.updateActorById);

/**
 * @swagger
 * /actors/{id}:
 *   delete:
 *     tags:
 *       - Actors
 *     summary: Delete actor by ID
 *     description: Delete an actor by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Actor deleted successfully
 *       404:
 *         description: Actor not found
 *       500:
 *         description: Internal server error
 */
router.delete('/actors/:id', authMiddleware, actorController.deleteActorById);

module.exports = router;
