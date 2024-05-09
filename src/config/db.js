const mongoose = require('mongoose');

// MongoDB connection URI
const DB_URI = process.env.DB_URI;

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit with failure
    }
}

module.exports = connectDB;
