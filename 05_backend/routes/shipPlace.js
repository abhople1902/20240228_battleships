const express = require('express');
const router = express.Router();
const Player1 = require('../models/Game')

router.post('/ships', async (req, res) => {
  try {
    const { gameId, playertype, index } = req.body;

    const gaming = await Game.findOne({ gameId: gameId });
    console.log(gaming)
    const typeOfPlayer = playertype
    if (!typeOfPlayer) {
      return res.status(404).json({ success: false, message: 'Player not found' });
    }
    console.log(typeOfPlayer)
    // Updating the placements array with the clicked index
    if(typeOfPlayer === 'Human'){
      // gaming.placementsPlayer1.push(index);
      console.log(index)
    } else {
      gaming.placementsPlayer2.push(index);
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