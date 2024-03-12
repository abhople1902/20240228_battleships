const mongoose = require('mongoose');

const { gameStatusCodes } = require('../constants')
const placements = require('../models/placements');
const moves = require('../models/moves');
// this is the playerschema
const playerSchema = new mongoose.Schema({
  gameId: { type: String, unique: true },
  // uuid of the user who start the game 
  startedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startedAt: { type: Date },
  // default height and widht 
  gridWidth: { type: Number, default: 8 },
  gridHeight: { type: Number, default: 8 },
  // uuid is stored in joined by
  joinedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  joinedAt: { type: Date },
  // first move played by the user 
  firstMove: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // From the schema of placements.js
  placementsPlayer1: [{ type: placements }],
  // player 2 is always bot
  placementsPlayer2: [{ type: placements }],
  // moves of the player1 and player 2 are store here
  moves: [{
    type: moves
  }],
  gameStatus: { type: Number, enum: gameStatusCodes, default: gameStatusCodes[0] }
});

module.exports = new mongoose.model('Game', playerSchema);