const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// GET /profile route to retrieve user profile (protected route)
router.get('/profile', authenticate, (req, res) => {
  try {
    // Retrieve username from req.user object set by authenticate middleware
    const { username } = req.user;

    // Return username in the response
    res.json({ username });
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;