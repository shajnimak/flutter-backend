const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

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

// Routes
app.use('/auth', authRoutes);
app.use('/', stuffRoutes);
app.use('/', actorRoutes);
app.use('/', newsRoutes);
app.use('/', commentRoutes);
app.use('/', eventRoutes);

module.exports = app;
