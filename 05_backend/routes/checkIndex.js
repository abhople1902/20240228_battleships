const express = require('express');
const router = express.Router();
const Player = require('../models/player1');

router.post('/index', async (req, res) => {
  try {
    const { playerId, index } = req.body; // Extracting playerId and index from the request body

    // Finding the player by playerId
    const player = await Player.findOne({ playerID: playerId });

    if (!player) {
      return res.status(404).json({ success: false, message: 'Player not found' });
    }

    // Checking if the index is stored in the placements array
    const isIndexStored = player.placements.some(item => {
      return item[0] === index[0] && item[1] === index[1];
    });

    res.json({
      success: true,
      isIndexStored: isIndexStored,
      message: isIndexStored ? 'Index is stored.' : 'Index is not stored.'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;