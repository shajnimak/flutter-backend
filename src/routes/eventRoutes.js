const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new event
router.post('/events', authMiddleware, eventController.createEvent);

// Get all events
router.get('/events', eventController.getAllEvents);

// Get event by ID
router.get('/events/:id', eventController.getEventById);

// Update event by ID
router.put('/events/:id', authMiddleware, eventController.updateEventById);

// Delete event by ID
router.delete('/events/:id', authMiddleware, eventController.deleteEventById);

module.exports = router;
