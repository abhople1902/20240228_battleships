const mongoose = require('mongoose');
const { Ships: shipType, Players: playerType, Gamestatus: Status } = require('../../constants')
const Placements = require('../models/placements');
const Moves = require('../models/Moves');

const playerSchema = new mongoose.Schema({
  startedBy: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  startedAt: {type: Date},
  grid_width: {type: Number, default: 8},
  grid_height: {type: Number, default: 8},
  grid: [[{
    type: Number
  }]],
  
  joinedBy: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  joinedAt: {type: Date},
  start_move: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  placements_player1: {type: Placements},
  placements_player2: {type: Placements},
  moves: [{
    type: Moves
  }],
  gameStatus: {type: Gamestatus, default: Gamestatus.NotStarted},
});

module.exports = new mongoose.model('Player1', playerSchema);