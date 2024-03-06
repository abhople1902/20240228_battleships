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
    
    if(typeOfPlayer === 'Human'){
      // const shipPlacements = gaming.placementsPlayer1
      const placement = {
        playerID,
        shipPlacements: position,
        shipType
      }
      gaming.placementsPlayer1.push(placement);
    } else {
      const placement = {
        playerID,
        shipPlacements: position,
        shipType
      }
      gaming.placementsPlayer2.push(placement);
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