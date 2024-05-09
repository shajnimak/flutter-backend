const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new actor
router.post('/actors', authMiddleware, actorController.createActor);

// Get all actors
router.get('/actors', actorController.getAllActors);

// Get actor by ID
router.get('/actors/:id', actorController.getActorById);

// Update actor by ID
router.put('/actors/:id', authMiddleware, actorController.updateActorById);

// Delete actor by ID
router.delete('/actors/:id', authMiddleware, actorController.deleteActorById);

module.exports = router;
