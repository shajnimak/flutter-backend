const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    imageUrl: { type: String }
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
