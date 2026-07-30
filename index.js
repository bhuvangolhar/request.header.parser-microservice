const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS so freeCodeCamp tests can access your API
app.use(cors({ optionsSuccessStatus: 200 }));

// Base route
app.get('/', (req, res) => {
  res.send('Request Header Parser Microservice is running!');
});

// Endpoint: /api/whoami
app.get('/api/whoami', (req, res) => {
  // Extract client IP address (checks headers first for proxies/cloud hosts)
  const ipaddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // Extract language from headers
  const language = req.headers['accept-language'];

  // Extract software/browser info from headers
  const software = req.headers['user-agent'];

  res.json({
    ipaddress: ipaddress ? ipaddress.split(',')[0].trim() : ipaddress,
    language,
    software
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});