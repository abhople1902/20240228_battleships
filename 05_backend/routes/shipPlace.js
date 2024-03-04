const express = require('express');
const router = express.Router();

router.post('/api/save-ships', (req, res) => {
  try {
    const { playerId, shipPlacements } = req.body;
    res.json({
      success: true,
      message: 'Ships placements saved successfully.'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;