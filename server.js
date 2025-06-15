// Minimal Express REST API for GUID generation
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

// Define required schema: expects { "your-payload-here": string }
app.use(bodyParser.json());

app.post('/api/resource', (req, res) => {
  // Input validation: must have 'your-payload-here' as a non-empty string
  const { 'your-payload-here': payload } = req.body;
  if (typeof payload !== 'string' || !payload.trim()) {
    return res.status(400).json({
      status: 'error',
      message: "Invalid payload: 'your-payload-here' (string) is required."
    });
  }

  // Generate RFC 4122 GUID
  const guid = uuidv4();
  res.status(200).json({
    guid,
    status: 'success'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(400).json({
    status: 'error',
    message: 'Invalid JSON payload.'
  });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
