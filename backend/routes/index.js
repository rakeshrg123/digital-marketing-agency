const express = require('express');
const router = express.Router();

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'Digital Marketing Agency API' });
});

// Add your future API routes here

module.exports = router;
