const express = require('express');
const router = express.Router();
const Player1 = require('../models/Game')

router.post('/ships', async (req, res) => {
  try {
    const { playerId, index } = req.body;

    // Finding the player by playerId
    const player = await Player.findOne({ playerID: playerId });

    if (!player) {
      return res.status(404).json({ success: false, message: 'Player not found' });
    }

    // Updating the placements array with the clicked index
    player.placements.push(index);

    // Saving the updated player document
    await player.save();

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