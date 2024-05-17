const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const authRoutes = require('./routes/authRoutes');
const stuffRoutes = require('./routes/stuffRoutes');
const actorRoutes = require('./routes/actorRoutes');
const newsRoutes = require('./routes/newsRoutes');
const commentRoutes = require('./routes/commentRoutes');
const eventRoutes = require('./routes/eventRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'MovieLab API',
      version: '1.0.0',
      description: 'API documentation for MovieLab',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/auth', authRoutes);
app.use('/', stuffRoutes);
app.use('/', actorRoutes);
app.use('/', newsRoutes);
app.use('/', commentRoutes);
app.use('/', eventRoutes);

module.exports = app;
