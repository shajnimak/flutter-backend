const app = require('./app');
const mongoose = require('mongoose');
const swaggerSetup = require('./swagger'); // Add this line to require swagger.js

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://shadyman:shadyman2005@cluster0.tmrr93o.mongodb.net/movieLab?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

swaggerSetup(app); // Add this line to initialize Swagger
