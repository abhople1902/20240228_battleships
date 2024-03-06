const mongoose = require('mongoose');

const { gameStatusCodes } = require('../constants')
const placements = require('../models/placements');
const moves = require('../models/moves');

const playerSchema = new mongoose.Schema({
  gameId: { type: String, unique: true },
  startedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startedAt: { type: Date },
  gridWidth: { type: Number, default: 8 },
  gridHeight: { type: Number, default: 8 },

  joinedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  joinedAt: { type: Date },
  firstMove: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  placementsPlayer1: [{ type: placements }],
  placementsPlayer2: [{ type: placements }],
  moves: [{
    type: moves
  }],
  gameStatus: { type: Number, enum: gameStatusCodes, default: gameStatusCodes[0] }
});

module.exports = new mongoose.model('Game', playerSchema);