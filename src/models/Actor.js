const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    characterName: { type: String, required: true },
    bio: { type: String, required: true },
    imageUrl: { type: String }
});

const Actor = mongoose.model('Actor', actorSchema);

module.exports = Actor;
