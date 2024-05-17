const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /events:
 *   post:
 *     tags:
 *       - Events
 *     summary: Create a new event
 *     description: Create a new event
 *     parameters:
 *       - in: body
 *         name: event
 *         description: The event to create
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - description
 *             - date
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             date:
 *               type: string
 *               format: date-time
 *     responses:
 *       201:
 *         description: Event created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/events', authMiddleware, eventController.createEvent);

/**
 * @swagger
 * /events:
 *   get:
 *     tags:
 *       - Events
 *     summary: Get all events
 *     description: Retrieve a list of all events
 *     responses:
 *       200:
 *         description: List of events
 *       500:
 *         description: Internal server error
 */
router.get('/events', eventController.getAllEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     tags:
 *       - Events
 *     summary: Get event by ID
 *     description: Retrieve an event by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.get('/events/:id', eventController.getEventById);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     tags:
 *       - Events
 *     summary: Update event by ID
 *     description: Update an event by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *       - in: body
 *         name: event
 *         description: The event to update
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             date:
 *               type: string
 *               format: date-time
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.put('/events/:id', authMiddleware, eventController.updateEventById);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     tags:
 *       - Events
 *     summary: Delete event by ID
 *     description: Delete an event by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.delete('/events/:id', authMiddleware, eventController.deleteEventById);

module.exports = router;
