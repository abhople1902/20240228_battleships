const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const { gameStatusCodes } = require('../constants')
const User = require('../models/User')

router.post('/ships', async (req, res) => {
  try {
    const { gameId, playertype, position } = req.body;

    const gaming = await Game.findOne({ gameId: gameId });
    const typeOfPlayer = playertype
    if (!typeOfPlayer) {
      return res.status(404).json({ success: false, message: 'Player not found' });
    }

    const { x, y } = position;

    // Updating the placements array with the clicked index
    
    if(typeOfPlayer === 'Human'){
      const shipPlacements2 = gaming.placementsPlayer2;
      (shipPlacements2 || []).forEach(item => {
        const xValues = item.shipPlacements.map(ship => ship.x);
        if (xValues.includes(x)) {
            console.log(`pos1 matches an x value in placementsPlayer2`);
        } else {
          console.log(`pos1 does not match an x value in placementsPlayer2`);
        }
        const yValues = item.shipPlacements.map(ship => ship.y);
        if (yValues.includes(y)) {
            console.log(`pos2 matches an y value in placementsPlayer2`);
        } else {
          console.log(`pos2 does not match an y value in placementsPlayer2`);
        }
      });
    } else {
      const shipPlacements1 = gaming.placementsPlayer1;
      (shipPlacements1 || []).forEach(item => {
        const xValues = item.shipPlacements.map(ship => ship.x);
        if (xValues.includes(x)) {
            console.log(`pos1 matches an x value in placementsPlayer1`);
        } else {
          console.log(`pos1 does not match an x value in placementsPlayer2`);
        }
        const yValues = item.shipPlacements.map(ship => ship.y);
        if (yValues.includes(y)) {
            console.log(`pos2 matches an y value in placementsPlayer1`);
        } else {
          console.log(`pos2 does not match an y value in placementsPlayer2`);
        }
      });
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












router.get('/user-stats/:userId', async (req, res) => {
  try {
    // const { gameId, playertype, position } = req.body;
    const userId = req.params.gameId;

    // Find all games where the user participated
    const games = await Game.find({
      $or: [{ startedBy: gameId }, { joinedBy: gameId }],
    });

    // Calculate user statistics
    let winCount = 0;
    let loseCount = 0;
    let matchCount = 0;

    games.forEach(game => {
      if (game.gameStatus === 'WIN') {
        if (game.startedBy === gameId) {
          winCount++;
        }
      } else if (game.gameStatus === 'LOSE') {
        if (game.startedBy === gameId) {
          loseCount++;
        }
      }
      // user.totalGamesPlayed++;
    });
    res.json({
      userId,
      winCount,
      loseCount,
      matchCount,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});