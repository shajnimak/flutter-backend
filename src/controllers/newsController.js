const News = require('../models/News');
const logger = require('../utils/logger');

// Create a new news
async function createNews(req, res) {
    try {
        const { title, body, imageUrl } = req.body;
        const newNews = new News({ title, body, imageUrl });
        await newNews.save();
        logger.info('News created successfully');
        res.status(201).json(newNews);
    } catch (error) {
        logger.error('Error creating news:', error);
        res.status(500).json({ error: 'Error creating news' });
    }
}

// Get all news
async function getAllNews(req, res) {
    try {
        const news = await News.find();
        logger.info('Retrieved all news');
        res.status(200).json(news);
    } catch (error) {
        logger.error('Error retrieving news:', error);
        res.status(500).json({ error: 'Error retrieving news' });
    }
}

// Get news by ID
async function getNewsById(req, res) {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            logger.warn('News not found');
            return res.status(404).json({ error: 'News not found' });
        }
        logger.info('Retrieved news by ID');
        res.status(200).json(news);
    } catch (error) {
        logger.error('Error retrieving news by ID:', error);
        res.status(500).json({ error: 'Error retrieving news by ID' });
    }
}

// Update news by ID
async function updateNewsById(req, res) {
    try {
        const { title, body, imageUrl } = req.body;
        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            { title, body, imageUrl },
            { new: true }
        );
        if (!updatedNews) {
            logger.warn('News not found');
            return res.status(404).json({ error: 'News not found' });
        }
        logger.info('News updated successfully');
        res.status(200).json(updatedNews);
    } catch (error) {
        logger.error('Error updating news:', error);
        res.status(500).json({ error: 'Error updating news' });
    }
}

// Delete news by ID
async function deleteNewsById(req, res) {
    try {
        const deletedNews = await News.findByIdAndDelete(req.params.id);
        if (!deletedNews) {
            logger.warn('News not found');
            return res.status(404).json({ error: 'News not found' });
        }
        logger.info('News deleted successfully');
        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        logger.error('Error deleting news:', error);
        res.status(500).json({ error: 'Error deleting news' });
    }
}

module.exports = {
    createNews,
    getAllNews,
    getNewsById,
    updateNewsById,
    deleteNewsById
};
