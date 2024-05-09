const express = require('express');
const router = express.Router();
const stuffController = require('../controllers/stuffController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new stuff
router.post('/stuffs', authMiddleware, stuffController.createStuff);

// Get all stuffs
router.get('/stuffs', stuffController.getAllStuffs);

// Get stuff by ID
router.get('/stuffs/:id', stuffController.getStuffById);

// Update stuff by ID
router.put('/stuffs/:id', authMiddleware, stuffController.updateStuffById);

// Delete stuff by ID
router.delete('/stuffs/:id', authMiddleware, stuffController.deleteStuffById);

module.exports = router;
