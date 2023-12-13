const express = require('express');
const server = express();
const globalMiddleware = require('./middleware/middleware'); // Import your global middleware functions here

// Express by default doesn't parse JSON in request bodies, so add this line to enable it
server.use(express.json());

// Use global middleware
server.use(globalMiddleware.logger);
server.use(globalMiddleware.validateUserId);
// Add other global middleware as needed

// Connect the user's router
const usersRouter = require('/Users/walynsmith/node-api3-project/api/users/users-router.js'); // Assuming you have a users router file
server.use('/api/users', usersRouter); // Assuming your user-related routes are under '/api/users'

// Default route
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
