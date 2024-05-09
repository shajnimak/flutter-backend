const mongoose = require('mongoose');

const stuffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String }
});

const Stuff = mongoose.model('Stuff', stuffSchema);

module.exports = Stuff;
