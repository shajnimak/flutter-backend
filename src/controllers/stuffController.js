const Stuff = require('../models/Stuff');
const logger = require('../utils/logger');

// Create a new stuff
async function createStuff(req, res) {
    try {
        const { name, description, imageUrl } = req.body;
        const newStuff = new Stuff({ name, description, imageUrl });
        await newStuff.save();
        logger.info('Stuff created successfully');
        res.status(201).json(newStuff);
    } catch (error) {
        logger.error('Error creating stuff:', error);
        res.status(500).json({ error: 'Error creating stuff' });
    }
}

// Get all stuffs
async function getAllStuffs(req, res) {
    try {
        const stuffs = await Stuff.find();
        logger.info('Retrieved all stuffs');
        res.status(200).json(stuffs);
    } catch (error) {
        logger.error('Error retrieving stuffs:', error);
        res.status(500).json({ error: 'Error retrieving stuffs' });
    }
}

// Get stuff by ID
async function getStuffById(req, res) {
    try {
        const stuff = await Stuff.findById(req.params.id);
        if (!stuff) {
            logger.warn('Stuff not found');
            return res.status(404).json({ error: 'Stuff not found' });
        }
        logger.info('Retrieved stuff by ID');
        res.status(200).json(stuff);
    } catch (error) {
        logger.error('Error retrieving stuff by ID:', error);
        res.status(500).json({ error: 'Error retrieving stuff by ID' });
    }
}

// Update stuff by ID
async function updateStuffById(req, res) {
    try {
        const { name, description, imageUrl } = req.body;
        const updatedStuff = await Stuff.findByIdAndUpdate(
            req.params.id,
            { name, description, imageUrl },
            { new: true }
        );
        if (!updatedStuff) {
            logger.warn('Stuff not found');
            return res.status(404).json({ error: 'Stuff not found' });
        }
        logger.info('Stuff updated successfully');
        res.status(200).json(updatedStuff);
    } catch (error) {
        logger.error('Error updating stuff:', error);
        res.status(500).json({ error: 'Error updating stuff' });
    }
}

// Delete stuff by ID
async function deleteStuffById(req, res) {
    try {
        const deletedStuff = await Stuff.findByIdAndDelete(req.params.id);
        if (!deletedStuff) {
            logger.warn('Stuff not found');
            return res.status(404).json({ error: 'Stuff not found' });
        }
        logger.info('Stuff deleted successfully');
        res.status(200).json({ message: 'Stuff deleted successfully' });
    } catch (error) {
        logger.error('Error deleting stuff:', error);
        res.status(500).json({ error: 'Error deleting stuff' });
    }
}

module.exports = {
    createStuff,
    getAllStuffs,
    getStuffById,
    updateStuffById,
    deleteStuffById
};
