const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.post('/ships', async (req, res) => {
  try {
    const { gameId, playertype, playerID, position, shipType } = req.body;

    const gaming = await Game.findOne({ gameId: gameId });
    const typeOfPlayer = playertype
    if (!typeOfPlayer) {
      return res.status(404).json({ success: false, message: 'Player not found' });
    }
    // Updating the placements array with the clicked index
    const shipPlacements = gaming.placementsPlayer2
    if(typeOfPlayer === 'Human'){
      const placement = {
        playerID,
        shipPlacements: position,
        shipType
      }
      gaming.placementsPlayer1.push(placement);
    } else {
      shipPlacements.push(index);
      gaming.placementsPlayer2 = shipPlacements
    }

    // Saving the updated player document
    await gaming.save();
    
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