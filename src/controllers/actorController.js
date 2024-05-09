const Actor = require('../models/Actor');
const logger = require('../utils/logger');

// Create a new actor
async function createActor(req, res) {
    try {
        const { name, characterName, bio, imageUrl } = req.body;
        const newActor = new Actor({ name, characterName, bio, imageUrl });
        await newActor.save();
        logger.info('Actor created successfully');
        res.status(201).json(newActor);
    } catch (error) {
        logger.error('Error creating actor:', error);
        res.status(500).json({ error: 'Error creating actor' });
    }
}

// Get all actors
async function getAllActors(req, res) {
    try {
        const actors = await Actor.find();
        logger.info('Retrieved all actors');
        res.status(200).json(actors);
    } catch (error) {
        logger.error('Error retrieving actors:', error);
        res.status(500).json({ error: 'Error retrieving actors' });
    }
}

// Get actor by ID
async function getActorById(req, res) {
    try {
        const actor = await Actor.findById(req.params.id);
        if (!actor) {
            logger.warn('Actor not found');
            return res.status(404).json({ error: 'Actor not found' });
        }
        logger.info('Retrieved actor by ID');
        res.status(200).json(actor);
    } catch (error) {
        logger.error('Error retrieving actor by ID:', error);
        res.status(500).json({ error: 'Error retrieving actor by ID' });
    }
}

// Update actor by ID
async function updateActorById(req, res) {
    try {
        const { name, characterName, bio, imageUrl } = req.body;
        const updatedActor = await Actor.findByIdAndUpdate(
            req.params.id,
            { name, characterName, bio, imageUrl },
            { new: true }
        );
        if (!updatedActor) {
            logger.warn('Actor not found');
            return res.status(404).json({ error: 'Actor not found' });
        }
        logger.info('Actor updated successfully');
        res.status(200).json(updatedActor);
    } catch (error) {
        logger.error('Error updating actor:', error);
        res.status(500).json({ error: 'Error updating actor' });
    }
}

// Delete actor by ID
async function deleteActorById(req, res) {
    try {
        const deletedActor = await Actor.findByIdAndDelete(req.params.id);
        if (!deletedActor) {
            logger.warn('Actor not found');
            return res.status(404).json({ error: 'Actor not found' });
        }
        logger.info('Actor deleted successfully');
        res.status(200).json({ message: 'Actor deleted successfully' });
    } catch (error) {
        logger.error('Error deleting actor:', error);
        res.status(500).json({ error: 'Error deleting actor' });
    }
}

module.exports = {
    createActor,
    getAllActors,
    getActorById,
    updateActorById,
    deleteActorById
};
