const Event = require('../models/Event');
const logger = require('../utils/logger');

// Create a new event
async function createEvent(req, res) {
    try {
        const { title, description, date } = req.body;
        const newEvent = new Event({ title, description, date });
        await newEvent.save();
        logger.info('Event created successfully');
        res.status(201).json(newEvent);
    } catch (error) {
        logger.error('Error creating event:', error);
        res.status(500).json({ error: 'Error creating event' });
    }
}

// Get all events
async function getAllEvents(req, res) {
    try {
        const events = await Event.find();
        logger.info('Retrieved all events');
        res.status(200).json(events);
    } catch (error) {
        logger.error('Error retrieving events:', error);
        res.status(500).json({ error: 'Error retrieving events' });
    }
}

// Get event by ID
async function getEventById(req, res) {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            logger.warn('Event not found');
            return res.status(404).json({ error: 'Event not found' });
        }
        logger.info('Retrieved event by ID');
        res.status(200).json(event);
    } catch (error) {
        logger.error('Error retrieving event by ID:', error);
        res.status(500).json({ error: 'Error retrieving event by ID' });
    }
}

// Update event by ID
async function updateEventById(req, res) {
    try {
        const { title, description, date } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { title, description, date },
            { new: true }
        );
        if (!updatedEvent) {
            logger.warn('Event not found');
            return res.status(404).json({ error: 'Event not found' });
        }
        logger.info('Event updated successfully');
        res.status(200).json(updatedEvent);
    } catch (error) {
        logger.error('Error updating event:', error);
        res.status(500).json({ error: 'Error updating event' });
    }
}

// Delete event by ID
async function deleteEventById(req, res) {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            logger.warn('Event not found');
            return res.status(404).json({ error: 'Event not found' });
        }
        logger.info('Event deleted successfully');
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        logger.error('Error deleting event:', error);
        res.status(500).json({ error: 'Error deleting event' });
    }
}

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEventById,
    deleteEventById
};
