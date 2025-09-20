keydluffy/Documents/Project/Sealix/backend/server.js
const express = require('express');
const connectDB = require('./config/dbConfig');
const loginRoute = require('./api/auth/login');
const registerRoute = require('./api/auth/register');
const issueDocumentRoute = require('./api/documents/issueDocument');
const forgeryDetectionRoute = require('./api/documents/detectForgery');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', loginRoute);
app.use('/api/auth', registerRoute);
app.use('/api/documents', issueDocumentRoute);
app.use('/api/documents', forgeryDetectionRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));